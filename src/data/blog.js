import { person, rng, sentence, title } from './copy.js'

// T6 editorial listing content (invented). Row metrics are the live per-row title / excerpt
// character + line counts at 1440 ([title c, title lines, excerpt c, excerpt natural lines]).

const BLOG_ROWS = [[49, 1, 139, 3], [48, 1, 82, 2], [39, 1, 216, 4], [58, 2, 113, 2], [25, 1, 46, 1], [19, 1, 95, 2], [24, 1, 198, 4], [55, 2, 155, 3], [24, 1, 76, 2], [20, 1, 67, 2], [21, 1, 112, 2], [33, 1, 73, 2], [27, 1, 94, 2], [26, 1, 87, 2], [29, 1, 87, 2], [25, 1, 97, 2], [27, 1, 133, 3], [27, 1, 142, 3], [35, 1, 86, 2], [45, 1, 111, 2], [33, 1, 150, 3], [25, 1, 148, 3], [45, 1, 208, 4], [30, 1, 56, 1], [65, 2, 166, 3], [59, 2, 206, 4], [49, 1, 213, 4], [49, 1, 155, 3], [37, 1, 169, 3], [39, 1, 169, 4], [44, 1, 216, 4], [65, 2, 174, 4], [23, 1, 190, 4], [34, 1, 186, 4], [49, 1, 265, 5]]
const ENG_ROWS = [[54, 1, 106, 2], [31, 1, 115, 2], [51, 1, 136, 3], [44, 1, 117, 3], [29, 1, 60, 2], [29, 1, 40, 1], [66, 2, 90, 2], [46, 1, 64, 2], [55, 1, 109, 2], [44, 1, 81, 2], [51, 1, 91, 2], [32, 1, 92, 2], [50, 1, 98, 2]]

// Filters: [label, count]. 'All articles' first (active by default).
const BLOG_CATS = [['Product', 9], ['Growth', 6], ['Engineering at scale', 5], ['Company news', 7], ['Case studies', 5], ['Culture', 3]]
const ENG_CATS = [['AI', 3], ['Data systems', 4], ['Platform ops', 3], ['Careers', 2], ['Web', 1]]

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const date = (i) => `${MONTHS[(11 - (i % 12) + 12) % 12]} ${String(28 - ((i * 5) % 27)).padStart(2, '0')}` // c6

function rows(metrics, cats, seed) {
  const order = []
  cats.forEach(([name, n]) => {
    for (let k = 0; k < n; k++) order.push(name)
  })
  const r = rng(seed)
  // deterministic shuffle so categories interleave
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return metrics.map(([tc, tl, ec, el], i) => ({
    id: i,
    title: title(tl === 2 ? Math.max(tc, 62) : Math.min(tc, 51), seed + i),
    excerpt: sentence(el === 1 ? Math.min(ec, 44) : Math.max(ec, 70), seed * 3 + i),
    date: date(i + seed),
    category: order[i],
  }))
}

const author = (seed) => {
  const r = rng(seed)
  const roles = ['Product designer', 'Staff engineer', 'Head of growth', 'Founding engineer', 'Product manager', 'Data scientist']
  return [person(seed), roles[Math.floor(r() * roles.length)]]
}

function feature(seed, titles, excerpts, cats, authors = [1, 2, 1]) {
  return titles.map((tc, i) => ({
    id: `f${i}`,
    category: cats[i],
    date: date(seed + i * 3),
    title: title(tc, seed * 11 + i),
    excerpt: sentence(excerpts[i], seed * 13 + i),
    authors: Array.from({ length: authors[i] }, (_, k) => author(seed * 17 + i * 5 + k)),
  }))
}

export const BLOG = {
  heading: 'Latest articles', // c15
  featured: {
    category: 'Product',
    date: date(2),
    kicker: 'Feature',
    title: title(48, 404), // c48, 2 lines
    author: author(3),
  },
  secondary: feature(5, [39, 58, 26], [120, 113, 87], ['Engineering at scale', 'Company news', 'Culture'], [2, 1, 1]),
  filters: [['All articles', 35], ...BLOG_CATS],
  rows: rows(BLOG_ROWS, BLOG_CATS, 21),
}

export const ENG = {
  title: 'Corvale engineering log', // c22 (H1, mono uppercase)
  heading: 'Latest articles',
  secondary: feature(9, [54, 44, 29], [106, 117, 40], ['AI', 'Data systems', 'Web'], [1, 1, 1]),
  filters: [['All articles', 13], ...ENG_CATS],
  rows: rows(ENG_ROWS, ENG_CATS, 33),
  stats: '1,284 commits from 46 engineers in the past year', // c44-ish
  cta: 'Join a team that builds tools for the long haul', // c56-ish heading
  ctaLink: 'See open positions', // c16-ish
}

