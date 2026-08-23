const ONE_DAY_MS = 24 * 60 * 60 * 1000

export function isListingAtLeastOneDayOld (
  indexed: string,
  now = Date.now()
): boolean {
  return now - Date.parse(indexed) >= ONE_DAY_MS
}
