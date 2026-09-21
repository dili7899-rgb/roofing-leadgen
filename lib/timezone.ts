import { DateTime } from 'luxon';

interface QuietHoursResult {
  canCall: boolean;
  reason?: string;
}

export function getTimezoneFromZip(zip: string): string {
  const prefix = parseInt(zip.substring(0, 3), 10);
  
  // Texas (Central / Mountain)
  if (prefix >= 750 && prefix <= 799) return 'America/Chicago';
  // Florida (Eastern / Central)
  if (prefix >= 320 && prefix <= 349) return 'America/New_York';
  // California (Pacific)
  if (prefix >= 900 && prefix <= 961) return 'America/Los_Angeles';

  // Default to Eastern Standard Time
  return 'America/New_York';
}

export function checkTelemarketingQuietHours(zipCode: string): QuietHoursResult {
  const timeZone = getTimezoneFromZip(zipCode);
  const now = DateTime.now().setZone(timeZone);

  const hour = now.hour;
  const weekday = now.weekday; // 1 = Monday, 7 = Sunday

  // Texas SB 140 Sunday rule: No telemarketing calls/SMS before 12:00 PM
  const isTexas = zipCode.startsWith('75') || zipCode.startsWith('76') || zipCode.startsWith('77') || zipCode.startsWith('78') || zipCode.startsWith('79');
  if (isTexas && weekday === 7 && hour < 12) {
    return { canCall: false, reason: 'Texas Sunday restriction (No calls/SMS before 12:00 PM)' };
  }

  // Standard US / Florida / Texas legal window: 08:00 AM - 08:00 PM local time
  if (hour < 8 || hour >= 20) {
    return { canCall: false, reason: `Outside permitted calling hours (8 AM - 8 PM) in ${timeZone}` };
  }

  return { canCall: true };
}
