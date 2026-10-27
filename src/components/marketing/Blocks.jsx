import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { observeInView, reducedMotion } from '../../motion/index.js'
import { Button } from '../ui.jsx'
import { Icon } from '../mock.jsx'
import { AbstractAvatar, LogoMark, PortraitArt } from './art.jsx'
import { Arrow, CellGrid, CenteredHead, DashedV, DotPattern, HeroBadge, HoverWash, Section, TwoTone } from './primitives.jsx'

/* ------------------------------------------------------------------ */
/* C1 PageHero                                                          */
/* ------------------------------------------------------------------ */
/**
 * Centered marketing hero. pt/pb 120/128 (>=1200), 100/112 (992-1199), 80/96 (<992).
 * `entrance` enables the P1/P2 load animation (partners pages); customers/startups/careers are static.
 */
export function PageHero({ badge, title, lead, cta, entrance = false, children, className = '', headerClass = '' }) {
  return (
    <Section className={className} boxClassName="isolate" data-entrance={entrance || undefined}>
      <DotPattern masked motion={entrance ? 'hero-dots-in' : undefined} />
      <div className="relative grid grid-cols-12">
        <header className={`col-[2/-2] flex w-full flex-col items-center pb-24 pt-20 lg:pb-28 lg:pt-[100px] xl:pb-32 xl:pt-[120px] ${headerClass}`}>
          <HeroBadge className="mb-6" data-motion={entrance ? 'hero-badge-in' : undefined}>
            {badge}
          </HeroBadge>
          <h2 data-motion={entrance ? 'hero-title-in' : undefined} className="max-w-[15em] text-balance text-center text-page-hero-sm lg:text-page-hero">
            {title}
          </h2>
          {lead && (
            <p data-motion={entrance ? 'hero-lead-in' : undefined} className="mt-4 max-w-xl text-balance text-center text-lg text-black-300 lg:text-xl">
              {lead}
            </p>
          )}
          {cta && <div className="mt-8 flex flex-wrap justify-center gap-2">{cta}</div>}
          {children}
        </header>
      </div>
    </Section>
  )
}

/** Page-level button sizing below lg: h46, 16/22, px14 (measured on pricing/customers at 768). */
export const mobileBtn = 'max-lg:h-[46px] max-lg:px-3.5 max-lg:text-base'

/* ------------------------------------------------------------------ */
/* C3 LogoGrid                                                          */
/* ------------------------------------------------------------------ */
/**
 * 6 cols x 2 rows at >= xl (cells 138.4x48 = 172:60 at h48, gap 18/32, grid centred at its
 * intrinsic width); 4 cols h40 at 992-1199; < lg the grid fills col 2/-2 (4 cols gap 12/20 at
 * 768, 3 cols gap 8/16 at 390 with cells sized by the 172:60 aspect). `inner`: startups variant
 * that stretches across col 2/-2 (166.4x48 cells).
 */
export function LogoGrid({ className = '', inner = false, offset = 0 }) {
  const grid = (
    <div
      className={`mx-auto grid grid-cols-3 gap-x-4 gap-y-2 md:grid-cols-4 md:gap-x-5 md:gap-y-3 lg:gap-x-8 lg:gap-y-5 xl:grid-cols-6 xl:gap-y-[18px] ${
        inner ? 'w-full' : 'w-full lg:w-fit'
      }`}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          role="img"
          aria-label={`Customer logo ${i + 1}`}
          className={`h-7 md:h-10 xl:h-12 ${inner ? '' : 'lg:w-[114.67px] xl:w-[138.4px]'}`}
        >
          <LogoMark i={i + offset} />
        </div>
      ))}
    </div>
  )
  if (inner) return grid
  return (
    <Section className={className}>
      <div className="grid grid-cols-12 py-[100px]">
        <div className="col-[2/-2] lg:col-[1/-1]">{grid}</div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* C5 QuoteReveal                                                       */
/* ------------------------------------------------------------------ */
/** Sets data-reveal pending -> done once the element's top passes 95% of the viewport (P10). */
export function useRevealOnce(ref, attr = 'data-reveal', rootMargin = '0px 0px -5% 0px') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) {
      el.setAttribute(attr, 'done')
      return
    }
    el.setAttribute(attr, 'pending')
    let off = () => {}
    off = observeInView(
      el,
      (inView) => {
        if (inView) {
          requestAnimationFrame(() => el.setAttribute(attr, 'done'))
          off()
        }
      },
      { rootMargin }
    )
    return () => off()
  }, [ref, attr, rootMargin])
}

/** Serif quote split into word spans with a hanging open-quote glyph. */
export function RevealQuote({ text, className = '' }) {
  const ref = useRef(null)
  useRevealOnce(ref)
  const words = text.split(' ')
  return (
    <p ref={ref} className={`relative text-pretty font-quote ${className}`}>
      <span aria-hidden="true" className="absolute left-0 -translate-x-full">
        “
      </span>
      <span className="sr-only">{`“${text}”`}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden align-top">
              <span className="reveal-word will-change-transform" style={{ '--i': i }}>
                {i === words.length - 1 ? `${w}”` : w}
              </span>
            </span>{' '}
          </span>
        ))}
      </span>
    </p>
  )
}

function Attribution({ name, role, className = '' }) {
  return (
    <p className={`text-sm text-black-300 ${className}`}>
      <span className="font-bold">{name}</span> · {role}
    </p>
  )
}

/**
 * Customers variant: col 2/-2 bordered box with py 48, inner 10-col grid py 60; portrait col 1-3,
 * quote col 4/-2. Partners variant (`overline`, `features`): rows 36/300/56, pt 60.
 */
export function QuoteReveal({ quote, name, role, overline, features, featuresLabel, portrait = 0, className = '' }) {
  const partners = !!overline
  return (
    <Section as={partners ? 'div' : 'section'} className={className}>
      {/* >= lg */}
      <div className="relative grid grid-cols-12 overflow-hidden max-lg:hidden">
        <div className={`col-[2/-2] border-x border-solid border-white-500 ${partners ? '' : 'py-12'}`}>
          {partners ? (
            <div className="relative grid grid-cols-10 grid-rows-[14px_300px_56px] items-center pt-[60px] xl:grid-rows-[36px_300px_56px]">
              <p className="col-[4/-1] row-start-1 text-overline uppercase text-black-900">{overline}</p>
              <div className="col-[1/4] row-start-2 justify-self-center">
                <PortraitArt variant={portrait} className="size-[200px] xl:size-60" />
              </div>
              <div className="col-[4/-2] row-start-2 flex flex-col gap-7">
                <RevealQuote text={quote} className="text-serif-quote text-black-100" />
                <Attribution name={name} role={role} />
              </div>
              {features && (
                <>
                  <div className="col-[1/4] row-start-3 flex h-[150px] items-center justify-evenly overflow-hidden max-xl:hidden">
                    <p className="whitespace-nowrap text-center text-sm font-semibold text-black-800">{featuresLabel}</p>
                  </div>
                  <div className="col-[4/-1] row-start-3 flex items-center gap-8 max-xl:hidden">
                    {features.map(([icon, label]) => (
                      <span key={label} className="flex items-center gap-1.5">
                        <Icon name={icon} size={18} className="text-black-800" />
                        <span className="truncate text-sm text-black-800">{label}</span>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="relative grid grid-cols-10 grid-rows-[auto_auto] items-center gap-y-10 py-[60px]">
              <div className="col-[1/4] row-start-2 justify-self-center">
                <PortraitArt variant={portrait} className="size-[200px] xl:size-60" />
              </div>
              <div className="col-[4/-2] row-start-2 flex flex-col gap-7">
                <RevealQuote text={quote} className="text-serif-quote text-black-100" />
                <Attribution name={name} role={role} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* < lg: stacked */}
      <div className="grid grid-cols-12 py-[100px] lg:hidden">
        <div className="col-[2/-2] flex flex-col">
          {overline && <p className="mb-6 text-overline uppercase text-black-900">{overline}</p>}
          <PortraitArt variant={portrait} size={120} className="mb-7 h-[132.5px] w-[120px]" />
          <RevealQuote text={quote} className="text-serif-quote-sm text-black-100" />
          <Attribution name={name} role={role} className="mt-6" />
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* C6 CtaAvatarWall                                                     */
/* ------------------------------------------------------------------ */
// Deterministic pseudo-random (mulberry32) so the wall is stable between renders.
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildWall(rows, cols, avatarCount, seed) {
  const r = rng(seed)
  const cells = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = (x - (cols - 1) / 2) / (cols / 2)
      const dy = (y - (rows - 1) / 2) / (rows / 2)
      const d = Math.min(1, Math.hypot(dx, dy * 0.6))
      // P11: delays .23-.83s, centre-out with jitter
      const delay = 0.23 + 0.6 * Math.min(1, d * 0.75 + r() * 0.25)
      cells.push({ x, y, d, delay: Math.round(delay * 1000) / 1000, k: r() })
    }
  }
  // avatars favour the centre: lowest (d + noise) scores win
  const ranked = [...cells].sort((a, b) => a.d + a.k * 0.9 - (b.d + b.k * 0.9))
  ranked.slice(0, avatarCount).forEach((c) => (c.avatar = true))
  return cells
}

function Wall({ rows, cols, avatars, tile, seed, hideEdge = 0, className = '' }) {
  const cells = useMemo(() => buildWall(rows, cols, avatars, seed), [rows, cols, avatars, seed])
  return (
    <div aria-hidden="true" className={`relative flex w-full flex-col justify-center overflow-x-clip ${className}`}>
      {Array.from({ length: rows }, (_, y) => (
        <div key={y} className="flex justify-center gap-px pb-px last-of-type:pb-0">
          {cells.slice(y * cols, y * cols + cols).map((c) => (
            <div
              key={c.x}
              data-motion="wall-tile"
              style={{ '--d': `${c.delay}s`, width: tile, height: tile, flex: `0 0 ${tile}px` }}
              className={`rounded-[7px] ${c.avatar ? 'p-px' : 'bg-avatar-tile'} ${
                hideEdge && (c.x < hideEdge || c.x >= cols - hideEdge) ? 'max-md:hidden' : ''
              }`}
            >
              {c.avatar && <AbstractAvatar size={tile - 2} seed={c.y * 31 + c.x} radius="7px" />}
            </div>
          ))}
        </div>
      ))}
      <span className="wall-fade pointer-events-none absolute inset-0" />
    </div>
  )
}

export function CtaAvatarWall({ line1, line2, primary, secondary }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    el.dataset.wall = 'pending'
    const off = observeInView(
      el,
      (inView) => {
        if (inView) {
          el.dataset.wall = 'play'
          off()
        }
      },
      { threshold: 0.4 }
    )
    return () => off()
  }, [])
  return (
    <div className="container w-full" ref={ref}>
      <div className="relative z-[1] flex flex-col gap-10 border-solid border-white-500 py-[60px] lg:gap-0 lg:border-x lg:pb-40 lg:pt-0">
        <svg aria-hidden="true" className="h-40 w-full text-white-700 max-lg:hidden" style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 30%, transparent)', maskImage: 'linear-gradient(to bottom, #000 30%, transparent)' }}>
          <defs>
            <pattern id="wall-dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wall-dots)" />
        </svg>
        <Wall rows={10} cols={50} avatars={249} tile={24} seed={7} className="min-h-[249px] max-lg:hidden" />
        <Wall rows={16} cols={15} avatars={96} tile={28} seed={11} hideEdge={2} className="min-h-[463px] lg:hidden" />
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center">
            <span className="block overflow-hidden">
              <span data-motion="wall-line" style={{ '--d': '600ms' }} className="block text-heading-md text-black-100">
                {line1}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-motion="wall-line" style={{ '--d': '750ms' }} className="block pb-0.5 font-quote text-serif-cta text-black-100">
                {line2}
              </span>
            </span>
          </h2>
          <div data-motion="wall-buttons" className="mt-6 flex w-full items-center justify-center gap-2 max-md:flex-col">
            <Button variant="primary" className={mobileBtn} {...primary.props}>
              {primary.label}
            </Button>
            <Button variant="outline" className={mobileBtn} {...secondary.props}>
              {secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* C7 ResourceCards                                                     */
/* ------------------------------------------------------------------ */
export function ResourceCards({ cards, cols = 4, gridClass, className = '' }) {
  const grid = gridClass ?? (cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')
  return (
    <div className={`grid grid-cols-1 gap-3 ${grid} ${className}`}>
      {cards.map((c) => (
        <a key={c.title} href={c.href ?? '#'} className="group relative flex h-[150px] flex-col gap-4 overflow-hidden rounded-16 border border-solid border-white-500 px-6 pb-6 pt-[22px]">
          <HoverWash />
          <div className="relative flex items-center justify-between">
            <Icon name={c.icon} size={20} className="text-black-500" />
            <Arrow className="arrow-shift text-black-900 group-hover:text-black-300" />
          </div>
          <div className="relative flex flex-col gap-1">
            <p className="text-base font-semibold text-black-300">{c.title}</p>
            <p className="text-sm text-black-600">{c.desc}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* C8 PartnerCrossLinks                                                 */
/* ------------------------------------------------------------------ */
const PARTNER_LINKS = [
  {
    to: '/partners/app-partners',
    overline: 'App partners', // c12
    lead: 'Build apps for teams.',
    cont: 'Reach new customers with your app.',
    link: 'Explore the app program',
  },
  {
    to: '/partners/creator-partners',
    overline: 'Creator program',
    lead: 'Share what you make.',
    cont: 'Get rewarded for teaching others.',
    link: 'Explore creator program',
  },
  {
    to: '/partners/expert-partners',
    overline: 'Expert program',
    lead: 'Help teams set up well.',
    cont: 'Join our network of consultants.',
    link: 'Explore expert program',
  },
]

export function PartnerCrossLinks({ current, title, sub }) {
  const links = PARTNER_LINKS.filter((l) => l.to !== current)
  return (
    <Section boxClassName="flex flex-col">
      <div className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40">
        <div className="col-[2/-2] mix-blend-multiply">
          <CenteredHead title={title} sub={sub} />
        </div>
      </div>
      <div className="relative grid grid-cols-12">
        <DotPattern />
        <div aria-hidden="true" className="absolute inset-x-0 -top-5 grid h-[150px] grid-cols-12 max-lg:hidden">
          <div className="col-[2/-2] flex justify-between">
            <DashedV />
            <DashedV />
            <DashedV />
          </div>
        </div>
        <div className="relative col-[2/-2] grid grid-cols-1 gap-px border border-solid border-white-500 bg-white-500 lg:grid-cols-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="group relative grid grid-cols-12 bg-white-100">
              <span aria-hidden="true" className="absolute inset-0 z-0 bg-white-200 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-40" />
              <div className="relative col-[2/-2] flex flex-col items-start gap-y-24 py-14">
                <p className="text-overline uppercase text-black-900">{l.overline}</p>
                <div className="flex flex-col gap-y-2">
                  <div className="text-balance text-card-h3">
                    <TwoTone lead={l.lead} cont={l.cont} as="h3" />
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-base text-black-100">
                    {l.link}
                    <Arrow className="arrow-shift" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="grid h-[100px] grid-cols-12 lg:h-[120px] xl:h-40">
        <div className="col-[2/-2] flex justify-between max-lg:hidden">
          <DashedV />
          <DashedV />
          <DashedV />
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* C11 Tooltip                                                          */
/* ------------------------------------------------------------------ */
function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6.5" fill="currentColor" />
      <path d="M7 6.6v2.9M7 4.6v.1" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

/** 20x20 info trigger (32x32 hit area). Opens after a delay (Radix default 700ms), fade 150ms. */
export function Tooltip({ text }) {
  const [open, setOpen] = useState(false)
  const timer = useRef(0)
  const show = (delay) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(true), delay)
  }
  const hide = () => {
    clearTimeout(timer.current)
    setOpen(false)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <span className="relative flex">
      <button
        type="button"
        aria-label="More info"
        onMouseEnter={() => show(700)}
        onMouseLeave={hide}
        onFocus={() => show(0)}
        onBlur={hide}
        className="group flex size-5 items-center"
      >
        <span className="relative flex items-center justify-center text-white-700 transition-colors duration-[400ms] before:absolute before:size-8 before:content-[''] group-hover:text-black-900 group-hover:duration-150">
          <InfoIcon />
        </span>
      </button>
      {open && (
        <span role="tooltip" data-motion="tooltip" className="absolute bottom-full left-0 z-[3] mb-1 w-max max-w-[256px] rounded-6 bg-black-300 p-2 text-sm text-white-400 shadow-tooltip">
          {text}
        </span>
      )}
    </span>
  )
}
