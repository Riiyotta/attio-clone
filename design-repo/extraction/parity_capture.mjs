// Per-section capture for live-vs-clone parity.
// Live-vs-clone parity capture (R12). Run once against the live site and once against the clone preview:
//   PW="$(npm root -g)/playwright/index.mjs" node extraction/parity_capture.mjs <base-url> 1440 900 <outdir> <route...>
// then: python3 extraction/parity_compare.py <live-outdir> <clone-outdir> <out.json> [--sheets <dir>]
// PW is the path of an installed Playwright module (never stored in this repo).
// Each <main> section (display:contents unwrapped, boxes <= 2px skipped) is reached by scrolling
// (a full scroll-through first, then scrollTo(section top)), fonts + images awaited, then captured
// in viewport-height tiles. Masked in BOTH builds: the site header (shell, not a section), fixed
// overlays (cookie / chat widgets), <canvas> and <video> (truly dynamic, not measurable).
import fs from 'node:fs'
const { chromium } = await import(process.env.PW)
const [base, W, H, outdir, ...routes] = process.argv.slice(2)
const w = +W, h = +H
fs.mkdirSync(outdir, { recursive: true })
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
const meta = {}
for (const r of routes) {
  const p = await ctx.newPage()
  await p.goto(base + r, { waitUntil: 'load', timeout: 90000 }).catch(e => console.error(r, e.message))
  await p.waitForTimeout(2500)
  await p.evaluate(async () => {
    await document.fonts.ready
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)) }
    window.scrollTo(0, 0)
  })
  await p.waitForTimeout(800)
  await p.evaluate(async () => {
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000) })))
    const st = document.createElement('style')
    st.textContent = 'canvas,video{visibility:hidden!important} [data-parity-mask]{visibility:hidden!important}'
    document.head.appendChild(st)
    for (const hd of document.querySelectorAll('header')) if (!hd.closest('main') && !hd.closest('footer')) hd.setAttribute('data-parity-mask', '')
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el)
      if (cs.position === 'fixed' && !el.closest('main')) el.setAttribute('data-parity-mask', '')
    }
  })
  const secs = await p.evaluate(() => {
    const main = document.querySelector('main'); const out = []
    const walk = el => [...el.children].forEach(c => {
      if (getComputedStyle(c).display === 'contents') return walk(c)
      const bb = c.getBoundingClientRect(); if (bb.height <= 2) return
      const hh = c.querySelector('h1,h2')
      out.push({ y: Math.round(bb.top + scrollY), h: Math.round(bb.height), head: hh ? hh.textContent.trim().replace(/\s+/g, ' ').slice(0, 60) : '' })
    })
    if (main) walk(main); return out
  })
  const doc = await p.evaluate(() => document.documentElement.scrollHeight)
  const slug = r.replace(/\W+/g, '_')
  for (const [i, s] of secs.entries()) {
    s.tiles = []
    for (let off = 0; off < s.h; off += h) {
      const want = s.y + off
      const got = await p.evaluate(y => { window.scrollTo(0, y); return window.scrollY }, want)
      await p.waitForTimeout(1300)
      const top = want - got
      const ch = Math.min(h - top, s.h - off)
      if (ch <= 0) break
      const file = `${slug}__${i}__${off}.png`
      await p.screenshot({ path: `${outdir}/${file}`, clip: { x: 0, y: top, width: w, height: ch } })
      s.tiles.push({ off, file, height: ch })
    }
  }
  meta[r] = { doc, secs }
  await p.close()
  console.error('done', r, secs.length)
}
const prev = fs.existsSync(`${outdir}/meta.json`) ? JSON.parse(fs.readFileSync(`${outdir}/meta.json`, 'utf8')) : {}
fs.writeFileSync(`${outdir}/meta.json`, JSON.stringify({ ...prev, ...meta }, null, 1))
await b.close()
