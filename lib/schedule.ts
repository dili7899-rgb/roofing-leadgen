export function isMarketCallOpen(stateCode: string = 'TX'): boolean {
  const timezones: Record<string, string> = {
    TX: 'America/Chicago',
    FL: 'America/New_York',
    KS: 'America/Chicago',
    OK: 'America/Chicago',
  };

  const tz = timezones[stateCode] || 'America/Chicago';
  const now = new Date();
  const localTimeStr = now.toLocaleString('en-US', { timeZone: tz });
  const localDate = new Date(localTimeStr);

  const hour = localDate.getHours();
  const day = localDate.getDay(); // 0 = Sunday

  // Texas SB 140 compliance: No calls on Sunday morning or after 9 PM
  if (stateCode === 'TX' && day === 0 && hour < 12) return false;

  // Standard buyer open hours (8:00 AM - 8:00 PM local)
  return hour >= 8 && hour < 20;
}