import type { FilterOrGroup, StatFilter } from './interfaces'

export function selectVisibleStats (
  stats: FilterOrGroup[],
  exclusions: string
): void {
  const excludePatterns = exclusions
    .split(/\r?\n/)
    .map(pattern => pattern.trim())
    .filter(Boolean)
    .flatMap(pattern => {
      try {
        return [new RegExp(pattern, 'i')]
      } catch {
        return []
      }
    })

  const select = (filter: StatFilter) => {
    if (filter.hidden) return
    filter.disabled = excludePatterns.some(pattern => pattern.test(filter.text))
  }

  for (const stat of stats) {
    if (stat.group === 'mercenary') {
      select(stat.skill)
      stat.supports.forEach(select)
    } else {
      select(stat)
    }
  }
}
