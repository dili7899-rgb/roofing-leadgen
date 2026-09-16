// lib/logger.ts
import crypto from 'crypto';

export interface LeadLog {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  zipCode: string;
  phoneHash: string;
  trustedFormUrl: string;
  consentTextVersion: string;
  marketcallResponseId?: string;
  consentHash?: string;
}

export interface AuditPayload {
  ip: string;
  userAgent: string;
  timestamp: string;
  tcpaText: string;
  trustedFormUrl: string;
  phoneNumber: string;
  zipCode: string;
  buyerName: string;
}

/**
 * Compliance audit trail output (Vercel KV / Supabase / Console drain)
 */
export async function logLeadSubmission(log: LeadLog): Promise<void> {
  console.log('[COMPLIANCE LOG]', JSON.stringify(log));
}

/**
 * Generates an immutable SHA-256 hash of the exact rendered DOM consent text and user metadata.
 */
export function generateCanonicalAuditLog(payload: AuditPayload) {
  const dataToHash = [
    payload.timestamp,
    payload.phoneNumber,
    payload.tcpaText.trim(),
    payload.trustedFormUrl,
    payload.buyerName,
    payload.ip
  ].join('|');

  const consentHash = crypto.createHash('sha256').update(dataToHash).digest('hex');

  return {
    ...payload,
    consentHash,
  };
}