// Deterministic placeholder-copy helpers. Every string on the new pages is invented and sized to
// the spec's recorded character counts (c) so line wraps match the measured layouts.

/** Small seeded PRNG (mulberry32). */
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const pick = (r, list) => list[Math.floor(r() * list.length)]

const VERBS = ['Sync', 'Track', 'Route', 'Capture', 'Enrich', 'Send', 'Score', 'Log', 'Share', 'Draft', 'Match', 'Push', 'Pull', 'Bring', 'Keep', 'Map', 'Plan', 'Merge', 'Review', 'Tag']
const OBJECTS = ['call notes', 'deal updates', 'contact records', 'support tickets', 'meeting summaries', 'invoices', 'form replies', 'product events', 'team updates', 'lead scores', 'company profiles', 'pipeline stages', 'calendar invites', 'email threads', 'payment events', 'survey answers', 'usage data', 'open tasks', 'signed quotes', 'renewal dates']
const TAILS = ['into your workspace', 'across every record', 'without manual entry', 'in real time', 'for the whole team', 'with a single click', 'from your inbox', 'on a set schedule', 'as soon as they change', 'alongside each deal', 'in one shared view', 'for faster follow-ups', 'with clear owners', 'for every account', 'before each meeting']
const FILL = ['and', 'then', 'and also']

/**
 * Sentence of ~n characters (closest of 60 seeded candidates of 1-3 clauses), ending in a
 * period. Built from neutral product-workflow fragments.
 */
export function sentence(n, seed = 1) {
  const r = rng(seed * 9973 + n)
  let best = ''
  for (let k = 0; k < 60; k++) {
    let s = `${pick(r, VERBS)} ${pick(r, OBJECTS)} ${pick(r, TAILS)}`
    const clauses = n > 95 ? 3 : n > 52 ? 2 : 1
    for (let c = 1; c < clauses; c++) s += ` ${pick(r, FILL)} ${pick(r, VERBS).toLowerCase()} ${pick(r, OBJECTS)} ${pick(r, TAILS)}`
    s += '.'
    if (!best || Math.abs(s.length - n) < Math.abs(best.length - n)) best = s
    if (best.length === n) break
  }
  while (best.length > n + 2 && n > 160) best = fit(best.slice(0, -1), n)
  return best
}

/** Trim to ~n chars at a word boundary and close with a period. */
export function fit(s, n) {
  if (s.length <= n - 1) return s.replace(/[.,]?$/, '.')
  let cut = s.slice(0, n - 1)
  const sp = cut.lastIndexOf(' ')
  if (sp > n * 0.6) cut = cut.slice(0, sp)
  return cut.replace(/\s+(and|then|so|while|plus|with|for|the|a|in|on|of|to|from|as|into)$/i, '').replace(/[,\s]+$/, '') + '.'
}

/** Long paragraph of ~n characters made of several sentences. */
export function paragraph(n, seed = 1) {
  let out = ''
  let k = 0
  while (out.length < n - 20) {
    const left = n - out.length - (out ? 1 : 0)
    const part = sentence(Math.min(left, 40 + ((seed + k) % 4) * 15), seed * 31 + k)
    out += (out ? ' ' : '') + part
    k++
  }
  return out
}

const TITLE_A = ['How', 'Why', 'What', 'Inside', 'Notes on', 'A guide to', 'Lessons from', 'Building', 'Rethinking', 'Designing']
const TITLE_B = ['small teams', 'our data model', 'fast imports', 'calm software', 'shared inboxes', 'pipeline reviews', 'live reporting', 'quiet launches', 'record pages', 'better onboarding', 'custom objects', 'weekly rituals', 'team workflows', 'clean data', 'agent handoffs', 'sync engines']
const TITLE_C = ['ship faster', 'scale with care', 'stay in sync', 'grow together', 'find focus', 'earn trust', 'keep context', 'win more deals', 'work in public', 'move as one']

/** Headline-ish title of ~n chars (no trailing period): closest of 80 seeded candidates. */
export function title(n, seed = 1) {
  const r = rng(seed * 7919 + n * 31)
  let best = ''
  for (let k = 0; k < 80; k++) {
    let t = `${pick(r, TITLE_A)} ${pick(r, TITLE_B)}`
    const c1 = pick(r, TITLE_C)
    if (n > 18 || r() < 0.5) t += ` ${c1}`
    if (n > 44) t += ` and ${pick(r, TITLE_C.filter((c) => c !== c1))}`
    if (!best || Math.abs(t.length - n) < Math.abs(best.length - n)) best = t
    if (best.length === n) break
  }
  return best
}

const SYL_A = ['Ar', 'Bel', 'Cor', 'Dun', 'El', 'Fen', 'Gal', 'Hal', 'Ist', 'Jun', 'Kel', 'Lum', 'Mar', 'Nor', 'Ost', 'Pel', 'Quin', 'Ros', 'Sel', 'Tor', 'Ul', 'Ver', 'Wyn', 'Yar', 'Zep', 'Brin', 'Cal', 'Dov', 'Esk', 'Fal']
const SYL_B = ['a', 'io', 'ly', 'ora', 'ent', 'ix', 'ware', 'loop', 'desk', 'base', 'flow', 'note', 'grid', 'cast', 'sync', 'post', 'lane', 'beam', 'port', 'mint', 'wise', 'kit', 'ary', 'on']
const WORD2 = ['Hub', 'Labs', 'Cloud', 'Connect', 'Studio', 'Works', 'Suite', 'Pay', 'Forms', 'Voice', 'Data', 'Metrics']

/** Invented product / company name of ~n characters (closest seeded candidate). */
export function brandName(n, seed = 1) {
  const r = rng(seed * 6007 + n * 13)
  let best = ''
  for (let k = 0; k < 80; k++) {
    let s = pick(r, SYL_A) + pick(r, SYL_B)
    if (n >= 9) s += ' ' + pick(r, WORD2)
    else if (n >= 7 && r() < 0.6) s += pick(r, SYL_B)
    if (n <= 3) s = s.slice(0, 3)
    if (!best || Math.abs(s.length - n) < Math.abs(best.length - n)) best = s
    if (best.length === n) break
  }
  return best
}

const FIRST = ['Ada', 'Bram', 'Cleo', 'Dario', 'Esme', 'Finn', 'Greta', 'Hugo', 'Ines', 'Jonah', 'Kira', 'Lars', 'Mira', 'Nico', 'Odile', 'Pavel', 'Rhea', 'Soren', 'Tamsin', 'Uri', 'Vera', 'Wes', 'Yuki', 'Zara']
const LAST = ['Okafor', 'Lindqvist', 'Moreau', 'Haddad', 'Tanaka', 'Castell', 'Brenner', 'Novak', 'Ferreira', 'Quinlan', 'Strand', 'Achterberg', 'Iyer', 'Dalton', 'Varga', 'Sato']
/** Invented person name. */
export function person(seed = 1) {
  const r = rng(seed * 4241)
  return `${pick(r, FIRST)} ${pick(r, LAST)}`
}

/** Exactly-n-char label from a fixed word list (pads/truncates the last word). */
export function label(n, seed = 1, words = ['Release', 'Update', 'Fixes', 'Records', 'Lists', 'Views', 'Imports', 'Mail', 'Reports', 'Access']) {
  const r = rng(seed * 3301 + n)
  let s = pick(r, words)
  while (s.length < n) s += ' ' + pick(r, words).toLowerCase()
  return s.slice(0, n).trimEnd()
}

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
