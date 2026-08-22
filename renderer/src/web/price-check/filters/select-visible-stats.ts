import type { FilterOrGroup, StatFilter } from './interfaces'

export function compileModifierPatterns (patterns: string): RegExp[] {
  return patterns
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
}

export function selectVisibleStats (
  stats: FilterOrGroup[],
  excludePatterns: RegExp[],
  selectByDefault = true
): void {
  const select = (filter: StatFilter) => {
    if (filter.hidden) return
    filter.disabled = !selectByDefault || excludePatterns.some(pattern => pattern.test(filter.text))
  }

  for (const stat of stats) {
    if (stat.group === 'mercenary') {
      select(stat.meta)
      stat.stats.forEach(select)
    } else if (stat.group === undefined) {
      select(stat)
    }
  }
}
