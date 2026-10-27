import { rng, sentence, title } from './copy.js'

// T7 changelog content (invented). 2026 rows follow the live per-entry metrics
// [title c, excerpt c, excerpt lines at 1440, tag c list]; other years reuse the template with
// seeded rows (they were not crawled).
const ROWS_2026 = [[30, 50, 1, [7, 11]], [24, 31, 1, [7, 11]], [11, 77, 2, [7, 11]], [26, 35, 1, [11]], [30, 29, 1, [6, 7, 11]], [18, 27, 1, [6, 7, 11]], [20, 51, 1, [6, 7, 11]], [21, 27, 1, [7, 11]], [19, 18, 1, [7, 11]], [29, 33, 1, [7, 11]], [27, 21, 1, [6, 7, 11]], [27, 24, 1, [6, 7, 11]], [19, 40, 1, [7, 11]], [30, 28, 1, [11]], [24, 25, 1, [11]], [25, 37, 1, [6, 7, 11]], [23, 33, 1, [6, 7, 11]], [21, 32, 1, [6, 11]], [15, 34, 1, [7]], [22, 53, 1, [6, 7, 11]], [25, 27, 1, [6, 7, 11]], [17, 49, 1, [6, 7, 11]], [27, 38, 1, [6, 7, 11]], [20, 41, 1, [6, 11]], [36, 43, 1, [11]], [24, 79, 2, [6, 7, 11]], [13, 102, 2, [11]], [24, 58, 1, [6, 7, 11]], [22, 52, 1, [6, 7, 11]], [20, 51, 1, [6, 7, 11]], [26, 46, 1, [7, 11]], [24, 53, 1, [11]], [26, 34, 1, [6, 7, 11]], [15, 58, 2, [7, 11]], [24, 69, 2, [7]], [13, 42, 1, [6, 7, 11]], [18, 104, 2, [6, 11]], [20, 136, 3, [6, 7, 11]], [20, 31, 1, [6, 7, 11]], [9, 62, 2, [6, 7, 11]], [21, 52, 1, [11]], [26, 119, 3, [6, 7, 11]], [18, 75, 2, [6, 7, 11]], [17, 58, 2, [6, 7, 11]], [33, 71, 2, [6, 7, 11]], [8, 90, 2, [6, 7, 11]], [29, 87, 2, [6, 7, 11]], [10, 34, 1, [7, 11]], [11, 63, 2, [6, 7, 11]], [9, 32, 1, [6, 7, 11]], [14, 93, 2, [6, 7, 11]], [34, 134, 3, [6, 7, 11]], [28, 34, 1, [6, 11]], [35, 96, 2, [7, 11]], [28, 64, 2, [6, 7, 11]]]

export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026]
export const CURRENT_YEAR = 2026
const COUNTS = { 2021: 22, 2022: 31, 2023: 40, 2024: 47, 2025: 52 }
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const TAG = { 6: 'Mobile', 7: 'Desktop' }

export function entriesFor(year) {
  const base = year === CURRENT_YEAR ? ROWS_2026 : ROWS_2026.slice(0, COUNTS[year] ?? 30)
  const r = rng(year)
  const n = base.length
  return base.map(([tc, ec, el, tags], i) => {
    // newest first: spread the entries over the year (Oct 2026 back to Jan)
    const dayOfYear = Math.round(((n - i) / n) * (year === CURRENT_YEAR ? 300 : 360))
    const m = Math.min(11, Math.floor(dayOfYear / 30.5))
    const day = Math.max(1, Math.min(28, Math.round(dayOfYear - m * 30.5)))
    const seed = year * 101 + i
    return {
      id: `${year}-${i}`,
      date: `${MONTHS[m]} ${String(day).padStart(2, '0')}`, // c6, tabular
      title: title(Math.min(tc, 30), seed),
      excerpt: sentence(el === 1 ? Math.min(ec, 54) : Math.max(ec, 62), seed + 5),
      tags: tags.map((c) => (c === 11 ? (r() < 0.5 ? 'Improvement' : 'New feature') : TAG[c])),
    }
  })
}
