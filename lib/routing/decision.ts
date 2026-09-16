// lib/routing/decision.ts

export interface RoutingContext {
  zipCode: string;
  hasActiveLeak: boolean;
  timestamp: Date; // UTC Date object
  hasActiveBuyerCaps: boolean; // Dynamic status from MarketCall Live Ping API
}

export type RoutingStrategy = 'CPL_FORM' | 'PAY_PER_CALL';

export interface RoutingDecision {
  strategy: RoutingStrategy;
  reason: 'EMERGENCY_LEAK' | 'AFTER_HOURS' | 'CAPS_EXHAUSTED' | 'STANDARD_CPL';
  targetCallNumber?: string;
}

/**
 * Evaluates context and determines whether to serve a CPL Lead Form or Pay-Per-Call UI.
 */
export function determineRoutingStrategy(ctx: RoutingContext): RoutingDecision {
  // Convert current UTC execution time to US Eastern Standard Time (EST)
  const currentHourEST = new Date(
    ctx.timestamp.toLocaleString('en-US', { timeZone: 'America/New_York' })
  ).getHours();

  const dayOfWeek = ctx.timestamp.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Business Hours: Monday-Friday, 8:00 AM - 8:00 PM EST
  const isBusinessHours = !isWeekend && currentHourEST >= 8 && currentHourEST < 20;

  // 1. Immediate Fallback for Active Leaks (High Urgency -> Pay-Per-Call)
  if (ctx.hasActiveLeak) {
    return {
      strategy: 'PAY_PER_CALL',
      reason: 'EMERGENCY_LEAK',
      targetCallNumber: process.env.NEXT_PUBLIC_PPC_PHONE_NUMBER || '1-800-ROOF-NOW'
    };
  }

  // 2. After-Hours Fallback (Off-Peak Hours & Weekends -> Pay-Per-Call)
  if (!isBusinessHours) {
    return {
      strategy: 'PAY_PER_CALL',
      reason: 'AFTER_HOURS',
      targetCallNumber: process.env.NEXT_PUBLIC_PPC_PHONE_NUMBER || '1-800-ROOF-NOW'
    };
  }

  // 3. Overflow Fallback (Buyer Caps Exhausted -> Pay-Per-Call Surge UI)
  if (!ctx.hasActiveBuyerCaps) {
    return {
      strategy: 'PAY_PER_CALL',
      reason: 'CAPS_EXHAUSTED',
      targetCallNumber: process.env.NEXT_PUBLIC_PPC_PHONE_NUMBER || '1-800-ROOF-NOW'
    };
  }

  // 4. Default High-Payout CPL Routing
  return {
    strategy: 'CPL_FORM',
    reason: 'STANDARD_CPL'
  };
}