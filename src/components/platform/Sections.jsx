import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { reducedMotion, observeInView, Spring } from '../../motion/index.js'
import { Button, ChevronRightIcon, Streaks } from '../ui.jsx'
import { Icon } from '../mock.jsx'
import { HoverWash } from '../marketing/primitives.jsx'
import { SubscribeForm } from '../forms/Fields.jsx'
import { AbstractAvatar } from '../marketing/art.jsx'
import { GlyphTile, OrbitArt } from './art.jsx'
import {
  CtaPair,
  DashedH,
  DotWell,
  GuideRow,
  GuideStub,
  Hairline,
  LegacyBlock,
  LegacyHeader,
  Overline,
  StackedHeader,
  StripeField,
  V2Block,
  V2Heading,
  V2Spacer,
} from './shell.jsx'

/* ------------------------------------------------------------------ */
/* S-CTA (3.24): platform final CTA                                      */
/* ------------------------------------------------------------------ */
// M16 streak x positions (relative to the 1392 box), same set as the homepage CTA.
const CTA_STREAKS = [
  [1311, 1],
  [1167, 2],
  [87, 1],
  [1351, 2],
  [983, 2],
  [151, 2],
]

/** lines: one string (1 line) or two strings (two span.block lines). */
export function PlatformCta({ lines, primary = 'Start for free', secondary = 'Talk to sales' }) {
  const arr = Array.isArray(lines) ? lines : [lines]
  return (
    <section className="dark relative overflow-hidden border-y border-solid border-black-400 bg-black-50" data-section="platform-final-cta">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="container h-full max-lg:contents">
          <div className="relative h-full w-full">
            <div className="pl-cta-mask absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-dark-stripes" />
            </div>
            <Streaks xs={CTA_STREAKS} variant="cta" />
          </div>
        </div>
      </div>
      <div className="container flex flex-1 flex-col max-lg:contents">
        <div className="relative flex min-h-[448px] w-full flex-1 flex-col items-center justify-center gap-6 border-x border-solid border-black-400 px-6 py-20 max-lg:border-none">
          <h2 className="max-w-4xl text-balance text-center font-display text-page-hero-sm text-white-100 lg:text-page-hero">
            {arr.length > 1 ? arr.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            )) : arr[0]}
          </h2>
          <CtaPair primary={primary} secondary={secondary} className="gap-2" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* S-CENTER-MEDIA (3.7)                                                  */
/* ------------------------------------------------------------------ */
/** variant 'top' (image under header, pt 32 pb 56) | 'centered' (640 box, image vertically centred). */
export function CenterMedia({ lead, cont, media, variant = 'top', className = '' }) {
  return (
    <V2Block className={className} data-section="center-media">
      <header className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px]">
        <div className="col-[2/-2] mx-auto max-w-[816px] text-center mix-blend-multiply">
          <V2Heading lead={lead} cont={cont} lh={44} />
        </div>
      </header>
      <div
        className={`relative overflow-hidden px-[8.333%] ${variant === 'centered' ? 'flex items-center py-8 lg:h-[640px]' : 'pb-14 pt-8'}`}
      >
        <StripeField />
        <div className="relative w-full">{media}</div>
      </div>
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-STAT (3.9)                                                          */
/* ------------------------------------------------------------------ */
export function Stat({ lead, cont, value, label, className = '' }) {
  return (
    <V2Block className={className} data-section="stat">
      <div className="grid grid-cols-24">
        <div className="col-[3/-3] flex items-center py-16 lg:col-[2/15] lg:py-20">
          <V2Heading lead={lead} cont={cont} lh={44} className="max-w-[524px]" />
        </div>
        <div className="col-span-full border-t border-solid border-white-500 lg:col-[16/-1] lg:border-l lg:border-t-0" style={{ containerType: 'inline-size' }}>
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-8 py-16 lg:min-h-[464px]">
            <p className="font-display text-[clamp(56px,19cqw,100px)] font-medium leading-none tracking-[-0.01em] text-black-300">{value}</p>
            <p className="text-center text-lg text-black-700">{label}</p>
          </div>
        </div>
      </div>
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-COLUMNS / S-STEPS (3.12)                                            */
/* ------------------------------------------------------------------ */
function Ruler({ className }) {
  return (
    <div aria-hidden="true" className={`flex justify-evenly ${className}`}>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="block h-full w-px bg-white-500" />
      ))}
    </div>
  )
}

/** variant 'columns' (UC 5 / enrichment 4) | 'steps' (numbered, docs button, mcp). */
export function TextColumns({ lead, cont, items, variant = 'columns', button, className = '' }) {
  const steps = variant === 'steps'
  return (
    <V2Block spacer={!steps} className={className} data-section="text-columns">
      <header
        className={`grid grid-cols-24 ${
          steps ? 'pb-[60px] pt-[100px] lg:pb-20 lg:pt-[120px] xl:pt-40' : 'pb-16 pt-[100px] lg:pt-[120px] xl:pb-32'
        }`}
      >
        <div className="col-[3/-3] lg:col-[2/-2]">
          <div className={`flex flex-col items-start gap-6 ${steps ? '' : 'lg:flex-row lg:items-end lg:justify-between'}`}>
            <V2Heading lead={lead} cont={cont} lh={44} className={steps ? 'max-w-[22em]' : 'max-w-[768px]'} />
            {steps && button && (
              <div className="flex items-center justify-center gap-x-2.5">
                <Button variant="outline" className="h-10 px-[13px]">
                  {button}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="relative">
        <div className="pl-scrollbar-none snap-x snap-mandatory overflow-x-auto">
          {(() => {
            const Tag = steps ? 'ol' : 'div'
            const Item = steps ? 'li' : 'article'
            return (
              <Tag className="grid w-max min-w-full auto-cols-[280px] grid-flow-col px-[8.333%] lg:w-full lg:auto-cols-fr lg:px-[4.167%]">
                {items.map((it, i) => (
                  <Item key={it.title} className="flex snap-start flex-col border-l border-solid border-white-500">
                    {steps ? (
                      <div className="flex min-h-[200px] grow flex-col gap-4 px-6 pb-12">
                        <Overline className="text-black-700">{String(i + 1).padStart(2, '0')}</Overline>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg text-black-300">{it.title}</h3>
                          <p className="text-base text-black-700">{it.body}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[236px] grow px-4 pb-12">
                        <h3 className="text-lg text-black-300">{it.title}</h3>
                        <p className="mt-1 text-base text-black-700">{it.body}</p>
                      </div>
                    )}
                    <Ruler className={steps ? 'h-10 lg:h-12 xl:h-14' : 'h-8'} />
                  </Item>
                ))}
              </Tag>
            )
          })()}
        </div>
      </div>
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-MARQUEE (3.8): two-row card band, scroll-linked (M-S3)              */
/* ------------------------------------------------------------------ */
function MarqueeCard({ card, i }) {
  return (
    <div className="w-64 shrink-0 rounded-12 border border-solid border-platform-card-border backdrop-blur-[4px]">
      <div className="flex flex-col overflow-hidden rounded-[11px] bg-white-100 shadow-attio-4">
        <div className="flex flex-col gap-2 p-3">
          <GlyphTile icon={card.icon} tone={i} />
          <div className="flex h-[52px] flex-col gap-0.5 pr-9">
            <p className="truncate text-marquee-title text-platform-card-title">{card.title}</p>
            <p className="line-clamp-2 text-marquee-desc text-platform-card-desc">{card.desc}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="block overflow-hidden rounded-[30%] border border-solid border-platform-card-border">
              <AbstractAvatar size={14} seed={i} radius="0" />
            </span>
            <span className="text-marquee-desc text-platform-card-label">{card.label}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// M-S3: v = 0 when the band top is ~870px below the viewport top (900 tall), then ~0.0985px per
// px scrolled; framer smooths it (settles ~1s after a stop). Spring constants are approximate.
const MARQUEE_START = 870 / 900
const MARQUEE_RATE = 0.0985
const ROW2_OFFSET = -128.5 // second row's static offset (measured inline translateX at rest)

/**
 * header: 'v2' ({ lead, cont }, stripe field) | 'legacy' ({ title, sub }, 120-line field).
 * rows: [cardsRow1, cardsRow2]; card = { icon, title, desc, label }.
 */
export function CardMarquee({ header = 'v2', lead, cont, title, sub, rows, className = '' }) {
  const bandRef = useRef(null)
  const r1 = useRef(null)
  const r2 = useRef(null)
  useEffect(() => {
    const band = bandRef.current
    if (!band || reducedMotion()) return
    const spring = new Spring(0, 100, 20)
    let raf = 0
    let last = 0
    const target = () => Math.max(0, window.innerHeight * MARQUEE_START - band.getBoundingClientRect().top) * MARQUEE_RATE
    const apply = () => {
      r1.current.style.transform = `translateX(${(-spring.x).toFixed(2)}px)`
      r2.current.style.transform = `translateX(${(ROW2_OFFSET + spring.x).toFixed(2)}px)`
    }
    spring.snap(target())
    apply()
    const tick = (now) => {
      const dt = last ? Math.min(now - last, 64) / 1000 : 1 / 60
      last = now
      spring.target = target()
      const moving = spring.step(dt)
      apply()
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    const kick = () => {
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }
    let visible = false
    const onScroll = () => visible && kick()
    window.addEventListener('scroll', onScroll, { passive: true })
    const off = observeInView(band, (v) => {
      visible = v
      if (v) kick()
    })
    return () => {
      cancelAnimationFrame(raf)
      off()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const v2 = header === 'v2'
  const band = (
    <div ref={bandRef} className={`relative flex flex-col items-center overflow-hidden ${v2 ? 'pb-16 lg:pb-[120px]' : 'py-16'}`}>
      <div className="flex flex-col gap-y-5 max-lg:scale-[0.8]">
        <div className="relative">
          <div ref={r1} className="flex gap-6">
            {rows[0].map((c, i) => (
              <MarqueeCard key={`a${i}`} card={c} i={i} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div ref={r2} className="flex gap-6" style={{ transform: `translateX(${ROW2_OFFSET}px)` }}>
            {rows[1].map((c, i) => (
              <MarqueeCard key={`b${i}`} card={c} i={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (v2) {
    return (
      <V2Block className={`relative overflow-hidden ${className}`} boxClassName="relative overflow-hidden" data-section="card-marquee">
        <StripeField mask="t20" />
        <header className="relative grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-24">
          <div className="col-[2/-2] mx-auto max-w-[768px] text-center mix-blend-multiply">
            <V2Heading lead={lead} cont={cont} lh={44} />
          </div>
        </header>
        {band}
        <Hairline />
      </V2Block>
    )
  }
  return (
    <LegacyBlock className={`relative overflow-hidden ${className}`} boxClassName="overflow-hidden" data-section="card-marquee">
      <div aria-hidden="true" className="pl-mask-t-80 absolute inset-0 flex items-end justify-around">
        {Array.from({ length: 120 }, (_, i) => (
          <span key={i} className="block h-full w-px bg-white-400" />
        ))}
      </div>
      <StackedHeader title={title} sub={sub} className="relative" />
      {band}
      <GuideRow className="relative" />
    </LegacyBlock>
  )
}

/* ------------------------------------------------------------------ */
/* S-QUOTE (3.16): big serif testimonial, scroll-lit words (M-S4)        */
/* ------------------------------------------------------------------ */
// First word lights when the quote top reaches ~850px (900 viewport), all lit at ~400px.
const LIT_START = 850 / 900
const LIT_END = 400 / 900

/** variant 'legacy' (dashed guide rows, 62svh) | 'v2' (plain 160 rows, 800 tall at >= lg). */
export function ScrollQuote({ text, name, role, variant = 'legacy', className = '' }) {
  const ref = useRef(null)
  const words = text.split(' ')
  const [lit, setLit] = useState(reducedMotion() ? words.length : 0)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    let raf = 0
    const update = () => {
      raf = 0
      const top = el.getBoundingClientRect().top
      const vh = window.innerHeight
      const p = (vh * LIT_START - top) / (vh * (LIT_START - LIT_END))
      const n = Math.max(0, Math.min(words.length, Math.ceil(p * words.length)))
      setLit(n)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [words.length])

  const legacy = variant === 'legacy'
  const row = legacy ? <GuideRow /> : <div aria-hidden="true" className="h-[100px] lg:h-40" />
  const body = (
    <div className={`relative flex flex-col justify-center ${legacy ? 'min-h-[62svh]' : 'min-h-[62svh] lg:min-h-[800px]'}`}>
      <DotWell />
      {row}
      <div className="relative grid flex-1 grid-cols-12 items-center">
        <div className="col-[2/-2] flex flex-col items-center">
          <p ref={ref} className="max-w-[20em] text-pretty text-center font-quote text-quote-sm lg:text-serif-cta">
            <span className="sr-only">{text}</span>
            {words.map((w, i) => (
              <span key={i} aria-hidden="true" className="pl-word" data-lit={i < lit ? '' : undefined}>
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
          <p className="mt-12 text-center text-sm font-semibold text-black-300">{name}</p>
          <p className="mt-0.5 text-center text-sm text-black-300">{role}</p>
        </div>
      </div>
      {row}
    </div>
  )
  return legacy ? (
    <LegacyBlock className={className} data-section="quote-scroll-lit">
      {body}
    </LegacyBlock>
  ) : (
    <V2Block spacer={false} className={className} data-section="quote-scroll-lit">
      {body}
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-STRIP (3.17): integration arc strip, 356                            */
/* ------------------------------------------------------------------ */
// Original tile set placed along the top of the 1440x1360 arc (angle from top, degrees).
// The live tiles orbit (positions sampled off-screen); orbit motion was not measured, so these
// tiles are static.
const ARC_R = 680
const ARC_TILES = [-30, -19, -8, 3, 14, 25]

export function IntegrationStrip({ title, sub, tiles, shell = 'v2', className = '' }) {
  const inner = (
    <div className="relative overflow-hidden bg-white-200">
      <header className="grid grid-cols-12">
        <div className="relative col-[2/-2] flex flex-col items-center">
          <div className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-12 lg:pt-20">
            <div className="col-[2/-2] text-center text-xl">
              <h2 className="text-balance font-semibold text-black-100">{title}</h2>
              <p className="mt-1 text-balance text-black-700">{sub}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="pl-mask-strip relative pt-3">
        <div className="absolute left-1/2 top-3 h-[1360px] w-[1440px] -translate-x-1/2">
          <svg aria-hidden="true" width="1440" height="1360" viewBox="0 0 1440 1360" fill="none" className="text-white-900">
            <circle cx="720" cy="680" r={ARC_R - 0.5} stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0">
            {ARC_TILES.map((deg, i) => {
              const a = (deg * Math.PI) / 180
              const x = 720 + ARC_R * Math.sin(a)
              const y = 680 - ARC_R * Math.cos(a)
              return (
                <div
                  key={deg}
                  className="absolute aspect-square size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-solid border-platform-card-border backdrop-blur-[4px]"
                  style={{ left: x, top: y }}
                >
                  <div className="flex size-full items-center justify-center overflow-hidden rounded-[calc(100%-1px)] bg-white-100 shadow-attio-5">
                    <Icon name={tiles[i % tiles.length]} size={22} className="text-black-500" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <GuideRow heightClass="h-[100px] lg:h-40" />
      </div>
    </div>
  )
  return shell === 'v2' ? (
    <V2Block spacer={false} className={className} data-section="integration-arc-strip">
      {inner}
    </V2Block>
  ) : (
    <LegacyBlock className={className} data-section="integration-arc-strip">
      {inner}
    </LegacyBlock>
  )
}

/* ------------------------------------------------------------------ */
/* S-LINKS (3.15): platform link grid (v2 split / legacy stacked)        */
/* ------------------------------------------------------------------ */
function LinkCell({ link, i, legacy }) {
  const cls = `group relative flex flex-col justify-between bg-white-100 ${legacy ? 'h-24 p-5 md:h-[120px]' : 'h-[120px] p-6 md:h-[136px] lg:p-8'}`
  const content = (
    <>
      <HoverWash />
      <Overline className="relative text-black-900">{`[${String(i + 1).padStart(2, '0')}]`}</Overline>
      <div className="relative flex items-end justify-between gap-3">
        <h3 className="text-base text-black-100">{link.label}</h3>
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="pl-link-arrow shrink-0 text-black-900" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 11 11 5M6 5h5v5" />
        </svg>
      </div>
    </>
  )
  return link.to ? (
    <Link to={link.to} className={cls}>
      {content}
    </Link>
  ) : (
    <a href="#" className={cls}>
      {content}
    </a>
  )
}

/** variant 'v2' ({ lead, cont }) | 'legacy' ({ title, sub }). links: 8 x { label, to? }. */
export function LinksGrid({ variant = 'v2', lead, cont, title, sub, links, className = '' }) {
  if (variant === 'v2') {
    return (
      <V2Block className={className} data-section="platform-link-grid">
        <div className="grid lg:grid-cols-[13fr_11fr]">
          <div className="px-[8.333%] py-16 lg:px-[7.692%] lg:py-[58px]">
            <V2Heading lead={lead} cont={cont} lh={44} className="max-w-[520px]" />
          </div>
          <div className="grid grid-cols-2 gap-px border-t border-solid border-white-500 bg-white-500 lg:border-l lg:border-t-0">
            {links.map((l, i) => (
              <LinkCell key={l.label} link={l} i={i} />
            ))}
          </div>
        </div>
        <Hairline />
        <V2Spacer />
      </V2Block>
    )
  }
  return (
    <LegacyBlock className={className} data-section="platform-link-grid">
      <StackedHeader title={title} sub={sub} />
      <section className="relative grid grid-cols-12">
        <GuideStub />
        <DashedH className="absolute inset-x-0 top-0" />
        <div className="relative col-[2/-2]">
          <div className="relative grid grid-cols-1 gap-px bg-white-500 p-px md:grid-cols-2 xl:grid-cols-4">
            {links.map((l, i) => (
              <LinkCell key={l.label} link={l} i={i} legacy />
            ))}
          </div>
        </div>
        <DashedH className="absolute inset-x-0 bottom-0" />
      </section>
      <GuideRow heightClass="h-[100px] xl:h-[120px]" />
    </LegacyBlock>
  )
}

/* ------------------------------------------------------------------ */
/* S-TABS (3.18) legacy tabbed showcase (click only, no auto-advance)    */
/* ------------------------------------------------------------------ */
/** tabs: [{ label, title, desc, media }]; more: label for the trailing ghost link. */
export function Tabs({ lead, cont, tabs, more = 'More', block = true, className = '' }) {
  const [active, setActive] = useState(0)
  const t = tabs[active]
  return (
    <LegacyBlock className={className} data-section="tabbed-showcase">
      <LegacyHeader lead={lead} cont={cont} block={block} />
      <div className="grid grid-cols-12">
        <div className="col-[2/-2] pb-5 max-lg:items-center">
          <div role="tablist" className="flex gap-2 max-lg:flex-wrap max-lg:gap-1.5">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`pl-tab-pill inline-flex h-8 cursor-pointer items-center justify-center rounded-10 border border-solid bg-white-100 px-2.5 text-xs lg:text-sm ${
                  i === active ? 'pointer-events-none border-white-800 text-black-300' : 'border-white-500 text-black-600 lg:text-black-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <a href="#" className="pl-tab-pill inline-flex h-8 items-center justify-center gap-1 rounded-10 border border-solid border-transparent pl-2.5 pr-1.5 text-xs text-black-300 lg:text-sm">
              {more}
              <ChevronRightIcon size={12} />
            </a>
          </div>
        </div>
      </div>
      <div className="relative mt-5 grid w-full grid-cols-12">
        <GuideStub />
        <Hairline className="absolute inset-x-0 top-0" />
        <Hairline className="absolute inset-x-0 bottom-0" />
        <div className="relative col-[2/-2] flex w-full py-px lg:h-[502px]">
          <div className="relative w-[30%] border-r border-solid border-white-500 bg-white-100 max-lg:hidden">
            <div key={`t${active}`} className="absolute left-10 top-12 animate-[pages-fade-in_300ms_ease-out]">
              <h3 className="max-w-[20em] text-balance pr-6 font-display text-panel-title text-black-100">{t.title}</h3>
            </div>
            {t.list ? (
              <div key={`d${active}`} className="absolute inset-x-10 bottom-10 mb-3 flex animate-[pages-fade-in_300ms_ease-out] flex-col gap-3">
                <p className="text-sm text-black-900">{t.listLabel}</p>
                {t.list.map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm text-black-300">
                    <Icon name="list" size={14} className="text-black-800" />
                    {item}
                  </p>
                ))}
              </div>
            ) : (
              <p key={`d${active}`} className="absolute inset-x-10 bottom-10 mb-3 animate-[pages-fade-in_300ms_ease-out] text-base text-black-600">
                {t.desc}
              </p>
            )}
          </div>
          <div className="relative flex flex-1 overflow-hidden bg-white-200 max-lg:aspect-[809/500]">
            <DotWell />
            {tabs.map((tab, i) => (
              <div key={tab.label} aria-hidden={i !== active} className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}>
                {tab.media}
              </div>
            ))}
          </div>
        </div>
      </div>
      <GuideRow />
    </LegacyBlock>
  )
}

/* ------------------------------------------------------------------ */
/* S-UCBAND (3.19): dark "Powered by" band                               */
/* ------------------------------------------------------------------ */
/** Original generative wireframe terrain (stands in for the unmeasured live canvas). */
function TerrainCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    let raf = 0
    let t = 0
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = c.clientWidth
      const h = c.clientHeight
      if (c.width !== w * dpr) {
        c.width = w * dpr
        c.height = h * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      const rows = 26
      for (let r = 0; r < rows; r++) {
        const z = r / rows
        const y0 = h * 0.2 + z * z * h * 0.85
        ctx.strokeStyle = `rgba(143,153,168,${0.08 + z * 0.34})`
        ctx.beginPath()
        for (let x = 0; x <= w; x += 12) {
          const u = x / w - 0.5
          const y = y0 - Math.sin(u * 7 + t + r * 0.35) * 14 * z - Math.cos(u * 3 - t * 0.6) * 22 * z * z
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      t += 0.004
      if (!reducedMotion()) raf = requestAnimationFrame(draw)
    }
    let off = observeInView(c, (v) => {
      cancelAnimationFrame(raf)
      if (v) raf = requestAnimationFrame(draw)
    })
    return () => {
      cancelAnimationFrame(raf)
      off()
    }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-x-0 top-0 h-full w-full" />
}

function DarkGuideRow() {
  return (
    <div aria-hidden="true" className="grid h-[100px] grid-cols-12 lg:h-[120px] xl:h-40">
      <div className="col-[2/-2] flex justify-between text-black-300">
        {[0, 1].map((i) => (
          <svg key={i} width="1" height="100%" preserveAspectRatio="none" className="block h-full w-px overflow-visible">
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>
        ))}
      </div>
    </div>
  )
}

/** cards: 5 x { icon, text, cont }. title supports a trailing ™. */
export function UcBand({ kicker, title, cards, className = '' }) {
  return (
    <section className={`dark relative flex min-h-svh flex-col justify-center overflow-hidden bg-black-50 ${className}`} data-section="uc-band">
      <div className="pointer-events-auto absolute inset-x-0 top-0 h-[610px] overflow-hidden">
        <TerrainCanvas />
      </div>
      <header className="relative flex flex-col gap-3 pt-[368px]">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-[2/-2] flex flex-col items-center gap-3">
              <p className="text-lg text-black-700">{kicker}</p>
              <h2 className="relative w-fit text-center font-display text-page-hero-sm text-white-100 lg:text-page-hero">{title}</h2>
            </div>
          </div>
        </div>
      </header>
      <DarkGuideRow />
      <div className="relative">
        <div className="container">
          <div className="relative isolate grid grid-cols-12">
            <div className="relative col-[2/-2] grid w-full grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-5">
              {cards.map((c) => (
                <div key={c.text} className="relative aspect-[2/1] md:aspect-[4/3] lg:aspect-square">
                  <div className="absolute inset-0 flex flex-col justify-between gap-3 p-6">
                    <Icon name={c.icon} size={20} className="text-white-100 max-xl:size-4" />
                    <p className="text-balance text-uc-band-sm text-white-100 3xl:text-base">
                      {c.text} <span className="text-black-800">{c.cont}</span>
                    </p>
                  </div>
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-black-300" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-black-300" />
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-black-300" />
                  <span aria-hidden="true" className="absolute inset-y-0 right-0 w-px bg-black-300" />
                  {['-left-0.5 -top-0.5', '-right-0.5 -top-0.5', '-bottom-0.5 -left-0.5', '-bottom-0.5 -right-0.5'].map((p) => (
                    <span key={p} aria-hidden="true" className={`absolute size-1 bg-black-700 ${p}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DarkGuideRow />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* S-ORBIT (3.14)                                                        */
/* ------------------------------------------------------------------ */
export function Orbit({ lead, cont, items, className = '' }) {
  return (
    <V2Block className={className} data-section="orbit-illustration">
      <div className="py-16">
        <div className="relative flex justify-center">
          <Hairline className="absolute inset-x-0 top-1/2" />
          <OrbitArt className="relative h-auto w-60 max-w-[80%] lg:w-[400px]" />
        </div>
        <div className="grid grid-cols-12 gap-y-16 pt-16 lg:pt-24">
          <div className="col-[2/-2] mx-auto max-w-[696px] text-center">
            <V2Heading lead={lead} cont={cont} block className="lg:leading-[1.15]" />
          </div>
          <div className="col-[2/-2] grid gap-8 lg:col-[3/-3] lg:grid-cols-3 lg:gap-6">
            {items.map((it) => (
              <div key={it.title}>
                <h3 className="text-lg text-black-300">{it.title}</h3>
                <p className="mt-0.5 text-base text-black-800">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-NEWS (3.23): inline newsletter (shared SubscribeForm)               */
/* ------------------------------------------------------------------ */
export function Newsletter({ title, sub, placeholder, buttonLabel, className = '' }) {
  return (
    <V2Block spacer={false} className={className} data-section="newsletter-inline">
      <div className="flex flex-col gap-8 px-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-[4.167%]">
        <div>
          <h2 className="font-display text-2xl text-black-100">{title}</h2>
          <p className="font-display text-2xl text-black-700">{sub}</p>
        </div>
        <SubscribeForm placeholder={placeholder} buttonLabel={buttonLabel} className="min-h-16 w-full max-w-sm sm:!grid-cols-[1fr_auto] lg:max-w-[400px]" />
      </div>
      <Hairline />
      <V2Spacer />
    </V2Block>
  )
}

