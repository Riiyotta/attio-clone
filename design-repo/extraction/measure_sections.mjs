// Optional re-measure tool for extraction/measured-values.json -> sectionHeights.
//
//   BASE_URL=http://localhost:5233 NODE_PATH="$(npm root -g)" node extraction/measure_sections.mjs > out.json
//
// Optional env: PLAYWRIGHT_BROWSER_PATH=<chromium executable> (never hard-coded here),
// WIDTHS=1440,768,390 (sectionHeights must be taken at 1440; other widths only add docHeight).
// For every mounted route it measures the document height and each semantic section contract's
// DOM region (SECTION_MAP below: contract id -> CSS selector, possibly matching several elements for
// repeatable sections), plus simple text statistics used as maxWords evidence. Read-only against the
// running site; writes JSON to stdout only.
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.BASE_URL || 'http://localhost:5233'
const WIDTHS = (process.env.WIDTHS || '1440').split(',').map(Number)
const M = (n) => `main > :nth-child(${n})`
const HELP = 'main > div.container > div > div:last-child'
const SHELL = { 'shell.site-header': 'body #root > div:first-child', 'shell.site-footer': 'footer' }

// route -> { template, sections: [[contractId, selector, variant|null, inFlow?]] }  (order = page order)
export const SECTION_MAP = {
  '/': { template: 'home', sections: [
    ['hero.product-window', M(1), null],
    ['social-proof.logo-wall', '[data-section="customer-logos"]', 'band'],
    ['features.platform-showcase', '[data-section="platform-showcase"]', null],
    ['features.customizable-workspace', '[data-section="self-building"]', null],
    ['features.context-horizon', '[data-section="universal-context-brand"]', null],
    ['features.developer-platform', '[data-section="universal-context-sdk"]', null],
    ['testimonial.quote', '[data-section="quote-reveal"]', 'scroll-curtain'],
    ['social-proof.scale-stats', '[data-section="scale-stats"]', null],
    ['social-proof.customer-stories', 'main > [data-section="customer-stories"]', 'carousel'],
    ['editorial.changelog-preview', '[data-section="changelog"]', null],
    ['conversion.final-cta', '[data-section="final-cta"]', null],
  ] },
  '/pricing': { template: 'pricing', sections: [
    ['hero.pricing-intro', '[data-section="pricing-hero"] > :nth-child(1)', null],
    ['pricing.plan-cards', '[data-section="pricing-hero"] > :nth-child(2)', null],
    ['social-proof.logo-wall', M(2), 'grid'],
    ['pricing.comparison-header', '[data-motion="comparison-desktop"] > :nth-child(1)', null],
    ['pricing.comparison-group', '[data-motion="comparison-desktop"] > :nth-child(2) > div', null],
    ['faq.accordion', M(4), null],
  ] },
  '/customers': { template: 'customer-hub', sections: [
    ['hero.page-centered', M(1), 'plain'], ['social-proof.logo-wall', M(3), 'grid'], ['social-proof.customer-stories', M(4), 'grid'],
    ['testimonial.quote', M(6), 'portrait'], ['conversion.avatar-wall-cta', M(8), null],
  ] },
  '/startups': { template: 'program-landing', sections: [
    ['hero.page-centered', M(1), 'logo-strip'], ['conversion.application-form', M(3), null], ['features.cell-grid', M(5), null],
    ['social-proof.logo-wall', M(7), 'headed'], ['features.perks', M(9), 'band'], ['faq.accordion', M(11), null],
  ] },
  '/partners/app-partners': { template: 'program-landing', sections: [
    ['hero.page-centered', M(1), 'app-tiles'], ['features.cell-grid', M(3), null], ['features.step-list', M(5), 'tabbed'], ['features.app-store-preview', M(7), null],
    ['testimonial.quote', M(9), 'portrait-features'], ['faq.accordion', M(11), null], ['navigation.partner-cross-links', M(13), null],
  ] },
  '/partners/creator-partners': { template: 'program-landing', sections: [
    ['hero.page-centered', M(1), 'creator-carousel'], ['content.audience-profiles', M(3), null], ['features.perks', M(5), 'grid'], ['conversion.application-notice', M(7), null],
    ['testimonial.quote', M(9), 'portrait-features'], ['faq.accordion', M(11), null], ['navigation.partner-cross-links', M(13), null],
  ] },
  '/partners/expert-partners': { template: 'program-landing', sections: [
    ['hero.page-centered', M(1), 'expert-quotes'], ['content.audience-profiles', M(3), null], ['features.partner-tiers', M(5), null], ['features.step-list', M(7), 'single'],
    ['conversion.application-form', M(9), null], ['content.resource-cards', M(11), null], ['faq.accordion', M(13), null], ['navigation.partner-cross-links', M(15), null],
  ] },
  '/careers': { template: 'careers', sections: [
    ['hero.page-centered', M(1), 'contribution-grid'], ['media.interview-video', M(3), null], ['content.team-intro', M(5), null], ['media.team-photos', M(6), null],
    ['content.values', M(8), null], ['listing.open-positions', M(10), null], ['conversion.newsletter-signup', M(12), null], ['content.resource-cards', M(14), null],
  ] },
  '/contact/sales': { template: 'contact-split', sections: [
    ['conversion.demo-request-split', M(1), null],
  ] },
  '/apps': { template: 'app-directory', sections: [
    ['hero.page-centered', M(1), 'icon-band'], ['features.featured-apps', M(3), null], ['listing.directory-header', '#apps > div > header', null],
    ['listing.directory-category', '#apps > div > div > div:last-child > div', null], ['conversion.build-with-us', M(7), null],
  ] },
  '/blog': { template: 'editorial-listing', sections: [
    ['hero.editorial-featured', M(1), 'featured-post'], ['listing.article-index', 'main > section', null],
  ] },
  '/engineering/blog': { template: 'editorial-listing', sections: [
    ['hero.editorial-featured', M(1), 'ascii-field'], ['listing.article-index', M(2), null], ['conversion.careers-heatmap', M(3), null],
  ] },
  '/changelog/2026': { template: 'changelog-year', sections: [
    ['hero.changelog-intro', 'main > section', null], ['listing.changelog-entries', 'main > div', null],
  ] },
  '/help': { template: 'help-docs', sections: [
    ['navigation.docs-sidebar', 'main aside > div', null, false],
    ['hero.help-search', 'union:' + HELP + ' > div > :nth-child(1)||' + HELP + ' > div > :nth-child(2)', null],
    ['content.resource-cards', HELP + ' > div > :nth-child(3)', null], ['listing.lesson-list', HELP + ' > div > :nth-child(4)', 'numbered-preview'],
  ] },
  '/help/academy': { template: 'help-docs', sections: [
    ['navigation.docs-sidebar', 'main aside > div', null, false],
    ['hero.docs-page-header', 'union:' + HELP + ' > :nth-child(1)||' + HELP + ' > :nth-child(3)', null], ['listing.course-grid', HELP + ' > :nth-child(4)', null],
  ] },
  '/help/reference/attio-101': { template: 'help-docs', sections: [
    ['navigation.docs-sidebar', 'main aside > div', null, false],
    ['hero.docs-page-header', 'union:' + HELP + ' > :nth-child(1)||' + HELP + ' > :nth-child(3)', null], ['listing.lesson-list', HELP + ' > :nth-child(4)', 'timeline'],
  ] },
  '/architecture': { template: 'architecture', sections: [
    ['hero.scroll-typewriter', 'section.architecture-hero', null],
    ['content.chapter-header', '#story > :nth-child(1), #architecture > :nth-child(1), #launch > :nth-child(1)', null],
    ['content.prose-split', '#story > :nth-child(2), #story > :nth-child(3), #story > :nth-child(5), #architecture > :nth-child(2)', null],
    ['content.lit-statement', '#story > section.dark', null],
    ['content.scroll-scene', '#architecture > section.dark', null],
    ['features.launch-showcase', '#launch > :nth-child(2)', null],
    ['social-proof.logo-wall', '#launch > section.dark', 'dark-statement'],
    ['conversion.closing-stage', 'main > section:last-child', null],
  ] },
}
const DETAIL = { template: 'app-detail', sections: [
  ['navigation.breadcrumb-bar', 'main > div > div > aside:first-child', null],
  ['hero.app-header', 'main > div > div > header', null],
  ['content.app-meta-sidebar', 'main > div > div > div.relative.flex > aside > div', null, false],
  ['media.screenshot-gallery', 'main > div > div > div.relative.flex > div > div > :first-child', null],
  ['content.article-chapter', 'main article > section', null],
  ['listing.related-apps', 'main > div > div > div:last-child', null],
] }
for (const slug of ['chatgpt', 'claude', 'slack']) SECTION_MAP[`/apps/${slug}`] = DETAIL

const launch = { headless: true }
if (process.env.PLAYWRIGHT_BROWSER_PATH) launch.executablePath = process.env.PLAYWRIGHT_BROWSER_PATH
const browser = await chromium.launch(launch)
const out = { measuredAt: new Date().toISOString(), viewportHeight: 900, reducedMotion: false, pages: [] }
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' })
  const page = await ctx.newPage()
  for (const [route, spec] of Object.entries(SECTION_MAP)) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const data = await page.evaluate(({ spec, shell, width }) => {
      const words = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0)
      const stats = (el) => {
        const hs = [...el.querySelectorAll('h1,h2,h3,h4')].map((h) => words(h.textContent))
        const ps = [...el.querySelectorAll('p')].map((p) => words(p.textContent))
        const btn = [...el.querySelectorAll('a,button')].map((b) => words(b.textContent)).filter(Boolean)
        return { headingWordsMax: Math.max(0, ...hs), headings: hs.length, paragraphWordsMax: Math.max(0, ...ps), paragraphs: ps.length, actionWordsMax: Math.max(0, ...btn), actions: btn.length }
      }
      const box = (el) => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), heightPx: Math.round(r.height * 10) / 10 } }
      const rows = []
      for (const [id, sel] of Object.entries(shell)) { const el = document.querySelector(sel); rows.push({ section: id, selector: sel, shell: true, count: el ? 1 : 0, ...(el ? box(el) : {}) }) }
      for (const [id, sel, variant, inFlow] of spec.sections) {
        if (sel.startsWith('union:')) {
          const parts = sel.slice(6).split('||').map((q) => document.querySelector(q))
          if (parts.some((e) => !e)) { rows.push({ section: id, variant, selector: sel, count: 0 }); continue }
          const a = parts[0].getBoundingClientRect(), z = parts[parts.length - 1].getBoundingClientRect()
          const agg = parts.map(stats).reduce((x, y) => { const o = {}; for (const k in x) o[k] = k.endsWith('Max') ? Math.max(x[k], y[k]) : x[k] + y[k]; return o })
          rows.push({ section: id, variant, selector: sel, instance: 0, count: 1, inFlow: inFlow !== false, top: Math.round(a.top + scrollY), heightPx: Math.round((z.bottom - a.top) * 10) / 10, ...(width === 1440 ? agg : {}) })
          continue
        }
        const els = [...document.querySelectorAll(sel)]
        if (!els.length) { rows.push({ section: id, variant, selector: sel, count: 0 }); continue }
        els.forEach((el, i) => rows.push({ section: id, variant, selector: sel, instance: i, count: els.length, inFlow: inFlow !== false, ...box(el), ...(width === 1440 ? stats(el) : {}) }))
      }
      return { docHeightPx: document.documentElement.scrollHeight, rows }
    }, { spec, shell: SHELL, width })
    out.pages.push({ route, template: spec.template, viewportWidth: width, ...data })
  }
  await ctx.close()
}
await browser.close()
console.log(JSON.stringify(out, null, 1))
