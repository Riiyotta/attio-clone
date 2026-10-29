// Copy-overlap check and reference copy corpus (1.3.0).
//
//   PW="$(npm root -g)/playwright/index.mjs" node extraction/copy_overlap.mjs <clone-base> [--live <live-base>] [--routes r1,r2] [--corpus out.json] [--mock-text]
//
// Renders each route at 1440x900 and collects the text of every heading, paragraph, list item, link and button
// (textContent, whitespace collapsed). With --live, every 5-word run of the clone's strings is checked against
// the 5-word runs of the live page's strings for the same route; each hit is printed and fails the run (exit 1).
// Strings of 3-4 words identical to a live string (nav labels, metric names) are listed as info only. With --corpus, writes the strings of >= 4 words from all routes (sorted,
// de-duplicated) in the schema/reference-copy-corpus.json format. PW is the path of an installed Playwright
// module (never stored in this repo). Read-only against both sites.
import fs from 'node:fs'
const { chromium } = await import(process.env.PW)
const args = process.argv.slice(2)
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null)
const clone = args[0]
const live = opt('--live')
const corpusOut = opt('--corpus')
const routes = (opt('--routes') || '').split(',').filter(Boolean)
// --mock-text also checks span text (the copy inside mock UI artwork); not used for the corpus
const SEL = args.includes('--mock-text') ? 'h1,h2,h3,h4,h5,h6,p,li,a,button,span' : 'h1,h2,h3,h4,h5,h6,p,li,a,button'
const N = 5
const toks = (s) => s.toLowerCase().match(/[a-z0-9]+(?:['’][a-z]+)?/g) || []
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
async function strings(base, r) {
  const p = await ctx.newPage()
  await p.goto(base + r, { waitUntil: 'load', timeout: 90000 })
  await p.waitForTimeout(1500)
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)) } })
  const out = await p.evaluate((sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean), SEL)
  await p.close()
  return [...new Set(out)]
}
const corpus = new Set()
let bad = 0
for (const r of routes) {
  const cs = await strings(clone, r)
  for (const s of cs) if (s.split(' ').length >= 4) corpus.add(s)
  if (!live) continue
  const ls = await strings(live, r)
  const sh = new Map()
  for (const s of ls) { const t = toks(s); for (let i = 0; i + N <= t.length; i++) sh.set(t.slice(i, i + N).join(' '), s) }
  const lset = new Set(ls.map((s) => toks(s).join(' ')))
  for (const s of cs) {
    const t = toks(s)
    const hit = []
    for (let i = 0; i + N <= t.length; i++) { const k = t.slice(i, i + N).join(' '); if (sh.has(k)) hit.push(k) }
    if (hit.length) { bad++; console.log(`${r}\tclone: ${s.slice(0, 90)}\n\tshared run: ${hit[0]}`) }
    // shorter strings identical to a live string are generic labels (nav items, metric names); listed, not failed
    else if (t.length >= 3 && lset.has(t.join(' '))) console.log(`${r}\tinfo, identical short label: ${s.slice(0, 60)}`)
  }
  console.error('checked', r, cs.length, 'strings')
}
await b.close()
if (corpusOut) {
  const prev = fs.existsSync(corpusOut) ? JSON.parse(fs.readFileSync(corpusOut, 'utf8')) : {}
  fs.writeFileSync(corpusOut, JSON.stringify({ ...prev, routes: [...routes].sort(), strings: [...corpus].sort() }, null, 2) + '\n')
  console.error('corpus', corpus.size, 'strings ->', corpusOut)
}
if (live) { console.error(bad ? `${bad} overlap hit(s)` : 'no 5-word overlap with live copy'); process.exit(bad ? 1 : 0) }
