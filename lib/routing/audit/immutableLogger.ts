import { createHash } from 'crypto';

export interface ImmutableProofBundle {
  leadId: string;
  sessionId: string;
  buildId: string;
  trustedFormCertUrl: string;
  tcpaText: string;
  userIp: string;
  assignedNumber: string;
  callConnectTimestampUtc?: string;
  callRecordingHash?: string;
}

export function buildImmutableProof(payload: ImmutableProofBundle) {
  const canonicalString = [
    payload.leadId,
    payload.sessionId,
    payload.buildId,
    payload.trustedFormCertUrl,
    payload.userIp,
    payload.assignedNumber,
    payload.callConnectTimestampUtc || 'PENDING_CONNECT',
  ].join('|');

  const sha256ProofHash = createHash('sha256').update(canonicalString).digest('hex');

  return {
    proofHash: sha256ProofHash,
    fullRecord: {
      ...payload,
      verifiedAtUtc: new Date().toISOString(),
      complianceStandard: "FCC-2026-TCPA-SINGLE-BUNDLE"
    }
  };
}