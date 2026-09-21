import { sql } from '../db';

export interface AuditLogPayload {
  sessionHash: string;
  phoneE164: string;
  zipCode: string;
  ipAddress: string;
  userAgent: string;
  dwellTimeSeconds: number;
  trustedFormUrl?: string;
  jornayaLeadId?: string;
  sellersPresented: string[];
  winningBuyer: string;
  isCalifornia: boolean;
  cipaConsented: boolean;
}

const MAX_QUEUE_SIZE = 5000;
const memoryQueue: AuditLogPayload[] = [];

export async function enqueueAuditLog(payload: AuditLogPayload) {
  if (memoryQueue.length >= MAX_QUEUE_SIZE) {
    console.warn('[AuditQueue] Memory threshold reached. Direct flushing...');
    await flushSingleLog(payload);
    return;
  }

  memoryQueue.push(payload);
  processQueue().catch((err) => console.error('[AuditQueue] Flush error:', err));
}

async function processQueue() {
  if (memoryQueue.length === 0) return;

  const item = memoryQueue.shift();
  if (item) {
    await flushSingleLog(item);
  }
}

async function flushSingleLog(log: AuditLogPayload) {
  try {
    await sql`
      INSERT INTO consent_audit_logs (
        session_hash, phone_e164, zip_code, ip_address, user_agent,
        dwell_time_seconds, trusted_form_url, jornaya_lead_id,
        sellers_presented, winning_buyer, is_california, cipa_consented
      ) VALUES (
        ${log.sessionHash}, ${log.phoneE164}, ${log.zipCode}, ${log.ipAddress}, ${log.userAgent},
        ${log.dwellTimeSeconds}, ${log.trustedFormUrl || null}, ${log.jornayaLeadId || null},
        ${JSON.stringify(log.sellersPresented)}, ${log.winningBuyer}, ${log.isCalifornia}, ${log.cipaConsented}
      )
    `;
  } catch (error) {
    console.error('[AuditQueue] Database write failure:', error);
  }
}
