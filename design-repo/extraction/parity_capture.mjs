// Per-section capture for live-vs-clone parity.
// Live-vs-clone parity capture (R12). Run once against the live site and once against the clone preview:
//   PW="$(npm root -g)/playwright/index.mjs" node extraction/parity_capture.mjs <base-url> 1440 900 <outdir> <route...>
// then: python3 extraction/parity_compare.py <live-outdir> <clone-outdir> <out.json> [--sheets <dir>]
// PW is the path of an installed Playwright module (never stored in this repo).
// Each <main> section (display:contents unwrapped, boxes <= 2px skipped) is reached by scrolling
// (a full scroll-through first, then scrollTo(section top)), fonts + images awaited, then captured
// in viewport-height tiles. Masked in BOTH builds: the site header (shell, not a section), fixed
// overlays (cookie / chat widgets), <canvas> and <video> (truly dynamic, not measurable).
// Motion phase (1.3.0, applied identically to both builds; PARITY_FREEZE=0 restores the 1.2.0 real-time capture):
//   - JS time is a Playwright fake clock, paused at a fixed epoch before navigation and advanced only by
//     clock.fastForward(): 2500ms after load, 80ms per scroll-through step, 800ms back at the top, 1300ms after
//     each tile's scrollTo (a 300ms real wait before each jump lets IntersectionObservers and network settle,
//     100ms after lets the jump render). fastForward fires each due timer / animation frame at most once per jump,
//     so rAF tweens land on the value for that JS time and interval loops (auto-advancing tabs and accordions,
//     typing, orbit and hero run states) step at most once per jump: both builds are sampled at the same JS time
//     since mount / since entering view. (runFor() was tried first: on the live site its per-frame loops made each
//     1300ms step cost 2-20s of real time and grow with every tile.)
//   - Then every CSS/WAAPI animation is seeked: finite ones finish() (their end state), infinite loops are
//     paused at currentTime 0 (the first frame of the loop). Nothing is hidden or removed by this step.
import fs from 'node:fs'
const { chromium } = await import(process.env.PW)
const [base, W, H, outdir, ...routes] = process.argv.slice(2)
const w = +W, h = +H
fs.mkdirSync(outdir, { recursive: true })
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
const FREEZE = process.env.PARITY_FREEZE !== '0'
const EPOCH = new Date('2026-01-01T00:00:00Z')
const meta = {}
// advance: real wait (network, images, IntersectionObserver delivery) + the same fake-clock advance in both builds
const SETTLE = +(process.env.PARITY_SETTLE || 600)
const advance = async (p, ms, settle = SETTLE) => {
  if (!FREEZE) return p.waitForTimeout(ms)
  await p.waitForTimeout(Math.min(ms, 300))
  if (ms > settle) await p.clock.fastForward(ms - settle)
  await p.clock.runFor(Math.min(ms, settle)); await p.waitForTimeout(100)
}
const seek = p => FREEZE && p.evaluate(() => {
  for (const a of document.getAnimations()) {
    try {
      const t = a.effect && a.effect.getComputedTiming()
      if (t && t.iterations === Infinity) { a.pause(); a.currentTime = 0 } else a.finish()
    } catch (e) { /* finish() throws on an infinite or zero-rate animation; leave it */ }
  }
})
for (const r of routes) {
  const p = await ctx.newPage()
  if (FREEZE) { await p.clock.install({ time: EPOCH }); await p.clock.pauseAt(new Date(EPOCH.getTime() + 1000)) }
  await p.goto(base + r, { waitUntil: 'load', timeout: 90000 }).catch(e => console.error(r, e.message))
  if (FREEZE) await p.waitForTimeout(2500)
  await advance(p, 2500, 2500) // load phase stepped in full, so hero intro sequences play as in real time
  await p.evaluate(() => document.fonts.ready)
  for (let y = 0, H = await p.evaluate(() => document.documentElement.scrollHeight); y < H; y += 400) {
    await p.evaluate(y => window.scrollTo(0, y), y)
    await advance(p, 80)
  }
  await p.evaluate(() => window.scrollTo(0, 0))
  await advance(p, 800)
  // image wait is capped from the Node side (page timers are fake while frozen)
  await Promise.race([p.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r })))), p.waitForTimeout(4000)])
  await p.evaluate(async () => {
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
      await advance(p, 1300)
      await seek(p)
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
