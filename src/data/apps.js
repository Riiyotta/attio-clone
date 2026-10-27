import { brandName, paragraph, rng, sentence, slugify } from './copy.js'

// T4 / T5 app directory content. Every name, developer and description is invented; counts come
// from the live measurement: 11 categories, 272 cards, 124 verified, per-card name / developer /
// description character counts and description line counts (CLONE_SPEC_PAGES T4.3).

// [name c, "by" c, description c, description lines] for all 272 cards, in directory order.
const CARD_METRICS = [[7,8,33,1],[6,8,44,1],[3,8,48,1],[7,8,59,2],[7,10,53,2],[11,14,33,1],[7,10,45,1],[9,12,50,1],[10,13,54,2],[6,9,57,2],[7,10,43,1],[5,22,37,1],[11,19,56,2],[14,17,29,1],[8,11,34,1],[8,11,24,1],[12,14,34,1],[12,15,37,1],[7,10,57,2],[6,9,19,1],[9,12,50,1],[10,13,59,2],[10,13,50,1],[11,14,57,2],[13,8,59,2],[6,8,69,2],[5,8,45,1],[9,12,51,1],[6,14,18,1],[9,12,52,2],[5,8,52,2],[7,8,50,1],[9,12,48,1],[3,6,22,1],[5,8,53,2],[9,12,23,1],[4,8,46,1],[7,10,54,2],[7,10,59,2],[4,7,49,1],[10,13,35,1],[10,13,37,1],[6,9,36,1],[8,11,30,1],[9,12,52,2],[9,11,46,1],[6,9,57,2],[8,11,52,2],[6,9,55,2],[3,19,21,1],[9,12,59,2],[7,10,56,2],[7,13,57,2],[7,10,32,1],[8,23,55,2],[12,9,35,1],[8,18,50,1],[4,7,60,2],[7,10,45,1],[6,20,49,1],[6,9,60,2],[29,22,48,1],[9,11,58,2],[3,6,35,1],[8,11,59,2],[5,8,42,1],[10,13,55,2],[8,11,47,1],[11,14,36,1],[14,13,44,1],[27,9,48,1],[15,9,52,1],[6,9,46,1],[10,13,57,2],[8,10,50,2],[11,14,41,1],[19,8,54,2],[19,12,52,2],[9,12,49,1],[11,14,54,2],[8,11,23,1],[31,12,56,2],[5,8,59,2],[8,11,55,2],[4,7,36,1],[5,8,48,1],[10,13,42,1],[5,8,24,1],[6,12,42,1],[19,13,42,1],[5,8,59,2],[9,12,54,2],[9,12,47,1],[8,11,17,1],[6,9,30,1],[6,9,60,2],[8,8,59,2],[6,8,50,1],[8,11,52,2],[7,27,56,2],[9,12,39,1],[10,13,59,2],[11,14,59,2],[9,12,56,2],[16,22,56,2],[20,22,36,1],[9,9,57,2],[8,11,47,1],[11,8,54,2],[15,8,59,2],[4,8,55,2],[7,10,45,1],[12,12,58,2],[7,8,42,1],[3,6,32,1],[10,13,41,1],[4,27,55,2],[8,12,54,1],[11,8,16,1],[5,8,59,2],[10,13,47,1],[8,11,51,1],[4,7,37,1],[4,7,42,1],[5,8,35,1],[8,11,39,1],[8,11,57,2],[9,12,52,1],[9,12,60,2],[9,9,56,2],[7,10,33,1],[7,10,53,2],[5,5,45,1],[7,10,37,1],[5,8,55,2],[9,12,57,2],[8,11,43,1],[6,9,52,1],[6,9,42,1],[9,12,48,1],[8,11,26,1],[5,8,53,2],[7,8,56,2],[7,10,36,1],[6,9,57,2],[6,8,51,2],[8,8,60,2],[10,13,27,1],[8,11,27,1],[6,9,47,1],[5,8,55,2],[32,14,52,2],[11,15,50,1],[8,11,56,2],[4,7,49,2],[5,8,20,1],[7,10,40,1],[8,11,57,2],[29,22,58,2],[20,12,53,2],[5,8,56,2],[3,11,43,1],[5,8,51,1],[11,14,43,1],[11,14,48,1],[7,26,51,2],[7,10,20,1],[11,25,57,2],[18,10,42,1],[8,11,19,1],[9,8,44,1],[4,7,60,2],[6,8,51,2],[6,8,40,1],[7,8,48,1],[11,14,53,1],[13,8,43,1],[8,11,60,2],[9,12,48,1],[9,12,38,1],[7,10,49,1],[6,8,53,2],[8,8,49,1],[11,14,36,1],[8,11,28,1],[6,9,50,1],[11,14,21,1],[11,14,20,1],[9,12,57,2],[8,11,54,1],[12,15,57,2],[7,10,56,2],[12,10,40,1],[7,10,47,1],[9,12,58,2],[6,9,51,2],[7,10,35,1],[17,22,47,1],[29,22,59,2],[12,15,54,2],[10,13,58,2],[25,15,45,1],[7,10,50,1],[11,22,28,1],[9,22,52,2],[11,22,59,2],[25,23,54,2],[4,7,49,1],[6,22,30,1],[8,9,50,1],[6,9,45,1],[7,10,56,2],[5,8,55,2],[13,13,43,1],[8,11,24,1],[6,9,41,1],[15,13,47,1],[6,9,53,2],[8,11,32,1],[9,12,43,1],[4,7,47,1],[5,24,55,2],[13,22,52,2],[11,17,54,2],[6,9,44,1],[8,11,50,1],[7,10,39,1],[4,7,52,1],[16,16,49,1],[4,7,57,2],[10,13,54,2],[7,9,59,2],[12,15,48,1],[14,20,49,1],[9,12,48,1],[9,12,60,2],[5,8,56,2],[6,9,49,1],[9,8,41,1],[6,8,38,1],[8,8,35,1],[10,13,41,1],[8,11,48,2],[12,15,46,1],[9,14,47,1],[7,10,49,1],[8,8,49,1],[7,10,47,1],[11,8,50,1],[18,21,56,2],[10,13,57,2],[8,22,45,1],[5,22,24,1],[8,11,33,1],[8,16,41,1],[6,8,24,1],[13,7,47,1],[12,8,49,1],[6,9,26,1],[9,9,46,1],[16,22,33,1],[4,7,59,2],[8,11,22,1],[12,15,50,1],[8,11,58,2],[9,11,56,2],[10,13,55,2],[3,8,56,2],[12,8,61,2],[18,8,50,1],[9,12,53,2],[11,22,35,1]]

// 11 categories (overline c9..c18 as measured, in order) with their card counts.
export const CATEGORIES = [
  ['Analytics', 24],
  ['Automations', 72],
  ['Calling', 12],
  ['Billing', 33],
  ['Communication', 19],
  ['Data enrichments', 10],
  ['Developer platforms', 68],
  ['Forms and surveys', 8],
  ['Marketing tooling', 9],
  ['Product engagement', 12],
  ['Support', 5],
].map(([name, count]) => ({ name, count, slug: slugify(name) }))

// The three crawled detail routes keep their slugs but show invented names (c7 / c6 / c5 H1s).
const ROUTE_APPS = {
  3: { slug: 'chatgpt', name: 'Parlant' },
  29: { slug: 'claude', name: 'Quilla' },
  104: { slug: 'slack', name: 'Hubbo' },
}

const DEVS = ['Corvale', 'Northwind Apps', 'Lattice Works', 'Bramble Labs', 'Quarry Tools', 'Halden Co', 'Mosaic Bit', 'Plover Studio', 'Tidewell', 'Orchardly']

function makeApps() {
  const apps = []
  let i = 0
  CATEGORIES.forEach((cat, ci) => {
    for (let k = 0; k < cat.count; k++, i++) {
      const [nc, bc, dc, dl] = CARD_METRICS[i]
      const fixed = ROUTE_APPS[i]
      const name = fixed?.name ?? brandName(nc, i + 1)
      const r = rng(i + 77)
      const dev = bc <= 8 ? 'Corvale' : DEVS[Math.floor(r() * DEVS.length)]
      // Keep the measured wrap: 1-line descriptions stay <= 47 chars, 2-line ones >= 56.
      const len = dl === 1 ? Math.min(dc, 47) : Math.max(dc, 56)
      apps.push({
        id: i,
        name,
        slug: fixed?.slug ?? slugify(name) + '-' + i,
        by: 'By ' + dev,
        desc: sentence(len, i + 3),
        verified: Math.floor(((i + 1) * 124) / 272) !== Math.floor((i * 124) / 272),
        category: ci,
        seed: i,
      })
    }
  })
  return apps
}

export const APPS = makeApps()
export const appBySlug = (slug) => APPS.find((a) => a.slug === slug)

// T4.2 featured tabs (5 chips, labels c5..c9) -> one app each.
export const FEATURED = [
  { label: 'Parlant', app: 3, title: 'Parlant', desc: 'Ask questions about any record and get answers in plain words.' },
  { label: 'Hubbo', app: 104, title: 'Hubbo ai', desc: 'Post deal updates to team channels the moment they change.' },
  { label: 'Quill', app: 29, title: 'Quilla ai', desc: 'Draft follow-up notes from your meetings in a single click.' },
  { label: 'Ledgers', app: 60, title: 'Ledgerly', desc: 'Keep invoices and payment events next to every account.' },
  { label: 'Formwise', app: 150, title: 'Formwise', desc: 'Turn survey replies into fresh records without manual entry.' },
]

/* ------------------------------------------------------------------ */
/* T5 app detail content (invented; block lengths follow the measured c / line counts)            */
/* ------------------------------------------------------------------ */
// Overview blocks: ['p', c] paragraph, ['b', c] bold standalone line, ['ul', [[leadC, totalC], ...]]
const DETAIL_SHAPES = {
  chatgpt: {
    subtitle: 33,
    sections: [
      [8, [['p', 241], ['p', 269], ['p', 195]]],
      [12, [['p', 28], ['ul', [[30, 115], [27, 111], [28, 112], [17, 126], [20, 92], [19, 146], [27, 102]]]]],
      [9, [['p', 15], ['ul', [[7, 60], [7, 14], [18, 50], [0, 52], [7, 40], [0, 33]]], ['p', 13], ['ul', [[4, 11], [5, 29], [7, 14], [18, 25], [0, 52], [7, 40], [0, 33]]]]],
    ],
  },
  claude: {
    subtitle: 44,
    sections: [
      [8, [['p', 210], ['p', 300], ['p', 193]]],
      [12, [['p', 27], ['ul', [[30, 112], [31, 114], [22, 120], [12, 102], [29, 116], [24, 122], [14, 117]]]]],
      [9, [['p', 42], ['ul', [[0, 44], [9, 41], [10, 17], [13, 26], [5, 49], [7, 58], [0, 32]]]]],
    ],
  },
  slack: {
    subtitle: 45,
    sections: [
      [8, [['p', 380]]],
      [12, [['b', 18], ['ul', [[0, 51], [0, 110], [0, 52], [0, 100], [0, 58]]], ['b', 18], ['ul', [[0, 60], [0, 58]]]]],
      [9, [['p', 184], ['p', 184], ['p', 46]]],
    ],
  },
}
const SECTION_TITLES = { 8: 'Overview', 12: 'Key features', 9: 'Use cases' }

export function appDetail(app) {
  const shape = DETAIL_SHAPES[app.slug] ?? DETAIL_SHAPES.slack
  const s = app.seed + 11
  return {
    subtitle: sentence(shape.subtitle, s),
    sections: shape.sections.map(([tc, blocks], si) => ({
      title: SECTION_TITLES[tc],
      blocks: blocks.map(([kind, v], bi) => {
        const seed = s * 97 + si * 13 + bi
        if (kind === 'ul')
          return {
            kind,
            items: v.map(([lead, total], li) => ({
              lead: lead ? titleCase(sentence(lead + 1, seed + li).slice(0, -1)) : null,
              text: sentence(Math.max(8, total - lead - 2), seed + li * 7),
            })),
          }
        if (kind === 'b') return { kind, text: titleCase(sentence(v + 1, seed).slice(0, -1)) }
        return { kind, text: v > 90 ? paragraph(v, seed) : sentence(v, seed) }
      }),
    })),
    related: APPS.filter((a) => a.category === app.category && a.id !== app.id).slice(0, 6),
  }
}
const titleCase = (t) => t.charAt(0).toUpperCase() + t.slice(1)
