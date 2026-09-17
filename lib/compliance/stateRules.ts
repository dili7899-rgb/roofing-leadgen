export interface ComplianceCheck {
  canSendSms: boolean;
  canCall: boolean;
  reason?: string;
}

export function evaluateStateCompliance(zipCode: string, userState: string): ComplianceCheck {
  const now = new Date();
  const currentHour = now.getHours();

  // 1. Texas (SB 140), Florida (FTSA), & Maryland - Restricted outbound messaging hours (8 AM - 8 PM)
  if (["TX", "FL", "MD"].includes(userState.toUpperCase())) {
    if (currentHour < 8 || currentHour >= 20) {
      return {
        canSendSms: false,
        canCall: false,
        reason: `Restricted hours in ${userState} under Mini-TCPA. Lead queued for 08:00 AM local time.`,
      };
    }
  }

  // 2. Default nighttime rules for all other states (8 AM - 8 PM)
  if (currentHour < 8 || currentHour >= 20) {
    return {
      canSendSms: false,
      canCall: false,
      reason: "Nighttime hours. Lead queued for morning delivery.",
    };
  }

  return { canSendSms: true, canCall: true };
}