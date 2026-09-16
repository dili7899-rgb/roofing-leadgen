import { headers } from 'next/headers';

export interface DniSession {
  sessionId: string;
  assignedNumber: string;
  buildId: string;
  timestamp: string;
}

export async function getServerDniSession(): Promise<DniSession> {
  const headerList = await headers();
  const buildId = process.env.VERCEL_GIT_COMMIT_SHA || 'production-build-2026';

  const sessionId = headerList.get('x-session-id') || `sess_${Math.random().toString(36).substring(2, 15)}`;
  const assignedNumber = process.env.NEXT_PUBLIC_MARKETCALL_ROOFING_NUMBER || "18005550199";

  return {
    sessionId,
    assignedNumber,
    buildId,
    timestamp: new Date().toISOString(),
  };
}