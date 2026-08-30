const FIVE_HOURS_MS = 5 * 60 * 60 * 1000

export function isListingAtLeastFiveHoursOld (
  indexed: string,
  now = Date.now()
): boolean {
  return now - Date.parse(indexed) >= FIVE_HOURS_MS
}
