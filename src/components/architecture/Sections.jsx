import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { observeInView, progress, reducedMotion } from '../../motion/index.js'
import { LogoMark } from '../marketing/art.jsx'
import { CHAPTERS, HERO_PHRASES } from '../../data/architecture.js'
import { HeroField, NetworkField, RingsField } from './Canvases.jsx'
import { CodeGlyphs } from './Diagrams.jsx'

// T8 scaffolding: measured containers, type roles and motion (P26-P31); canvases are original.

/** Two-column copy grid: `579px 579px` gap 116 at >= lg, padding x 58 (1/12 below lg). */
export const grid2 = 'grid gap-y-10 px-[calc(100%/12)] lg:grid-cols-2 lg:gap-x-[116px] lg:px-[58px]'
export const body = 'font-sans text-arch-body text-black-600'
export const monoLabel = 'font-mono text-mono-label uppercase'

/** Bordered inner box (1392 at 1440); borders drop below lg. */
export function Box({ className = '', outerClassName = '', children, dark = false }) {
  return (
    <div className={`lg:container ${outerClassName}`}>
      <div className={`relative flex w-full flex-1 flex-col border-solid lg:border-x ${dark ? 'border-black-300' : 'border-white-500'} ${className}`}>{children}</div>
    </div>
  )
}

/** Square-bulleted label (8px #101010 square). */
export function Bullet({ children, className = '' }) {
  return (
    <p className={`flex items-center gap-3 self-start ${className}`}>
      <span aria-hidden="true" className="block size-2 shrink-0 bg-black-50" />
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Hero: sticky 100svh stage, scroll-typed headline (P26), wheel (P27)  */
/* ------------------------------------------------------------------ */
const TOTAL = HERO_PHRASES.reduce((n, [a, b]) => n + a.length + b.length, 0)

export function ArchHero() {
  const ref = useRef(null)
  const progressRef = useRef(0)
  const [typed, setTyped] = useState(() => (reducedMotion() ? TOTAL : 0))
  const [cue, setCue] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCue(true), 50)
    if (reducedMotion()) {
      progressRef.current = 1
      return () => clearTimeout(t)
    }
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const vh = window.innerHeight
      // typing runs through the 300svh story part of the hero
      const p = progress(-el.getBoundingClientRect().top, 0, vh * 3)
      progressRef.current = p
      setTyped(Math.round(p * TOTAL))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Which phrase is on screen, and how much of it is typed.
  let left = Math.max(1, typed)
  let phrase = HERO_PHRASES[0]
  let shown = 0
  for (const ph of HERO_PHRASES) {
    const len = ph[0].length + ph[1].length
    phrase = ph
    if (left <= len) {
      shown = left
      break
    }
    left -= len
    shown = len
  }
  const l1 = phrase[0].slice(0, shown)
  const l2 = phrase[1].slice(0, Math.max(0, shown - phrase[0].length))

  return (
    <section ref={ref} className="architecture-hero">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-white-100">
        <HeroField progressRef={progressRef} />
        <div className="relative flex h-full items-center justify-center px-6">
          <h1 className="sr-only">{HERO_PHRASES.map((p) => p.join(' ')).join(' ')}</h1>
          <p aria-hidden="true" className="arch-typewriter text-center font-serif text-black-100">
            {l1}
            {l2 && <br />}
            {l2}
            <span className="arch-caret" />
          </p>
        </div>
        <div aria-hidden="true" className={`absolute bottom-8 left-1/2 flex h-7 w-4 -translate-x-1/2 justify-center rounded-full border border-solid border-white-800 bg-white-100 pt-1.5 transition-opacity duration-[400ms] ${cue ? 'opacity-100' : 'opacity-0'}`}>
          <span className="arch-wheel block h-1.5 w-px bg-black-700" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Chapter header band (666.7 at 1440): drifting blobs (P28) + noise    */
/* ------------------------------------------------------------------ */
const BLOB_POS = [
  ['-10%', '-30%', '60%'],
  ['45%', '-20%', '55%'],
  ['70%', '30%', '50%'],
  ['-15%', '40%', '55%'],
  ['20%', '55%', '45%'],
  ['55%', '60%', '50%'],
  ['30%', '0%', '40%'],
  ['80%', '-25%', '40%'],
]

export function Chapter({ id }) {
  const ref = useRef(null)
  const c = CHAPTERS[id]
  useEffect(() => {
    const el = ref.current
    return observeInView(el, (vis) => el.setAttribute('data-inview', vis ? 'true' : 'false'))
  }, [])
  const words = c.title.split(' ')
  return (
    <div ref={ref} data-chapter={id} className="arch-chapter relative isolate flex min-h-[clamp(30rem,46.3vw,50rem)] w-full flex-col items-center justify-center overflow-hidden px-8 py-12">
      {BLOB_POS.map(([x, y, s], i) => (
        <span key={i} aria-hidden="true" className="architecture-gradient-blob" style={{ left: x, top: y, width: s, '--blob': `var(--blob-${id}-${i + 1})`, animationDelay: `${-i * 3}s` }} />
      ))}
      <span aria-hidden="true" className="arch-noise absolute inset-0 -z-0" />
      <hgroup className="relative flex flex-col items-center gap-3 text-black-100">
        <p className={monoLabel}>{c.label}</p>
        <h2 className="max-w-[13em] text-balance text-center font-serif text-serif-chapter-sm lg:text-serif-chapter">
          {words.map((w, i) => (
            <span key={i} className="inline-block">
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>
      </hgroup>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Scroll-lit words (P29): rgba(255,255,255,.2) -> #fff as the block    */
/* moves from 100% to 50% of the viewport; per-word colour 500ms.       */
/* ------------------------------------------------------------------ */
export function useScrollLit(ref, count, from = 1, to = 0.5) {
  const [lit, setLit] = useState(() => (reducedMotion() ? count : 0))
  useEffect(() => {
    if (reducedMotion()) return
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const top = el.getBoundingClientRect().top / window.innerHeight
      setLit(Math.round(progress(from - top, 0, from - to) * count))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, count, from, to])
  return lit
}

export function LitWords({ text, className = '', wordClass = '', duration = 500 }) {
  const ref = useRef(null)
  const words = text.split(' ')
  const lit = useScrollLit(ref, words.length)
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className={`lit-word ${duration === 300 ? 'lit-word-fast' : ''} ${i < lit ? 'text-white-100' : 'text-dim-white'} ${wordClass}`}>
          {w}{' '}
        </span>
      ))}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Sticky dark canvas scene (4950 at 1440)                              */
/* ------------------------------------------------------------------ */
const TAGS = [
  ['14%', '22%'],
  ['68%', '18%'],
  ['30%', '64%'],
  ['78%', '58%'],
  ['50%', '38%'],
  ['20%', '82%'],
]
export function DarkScene({ tags, children }) {
  return (
    <section className="dark relative bg-black-50">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <NetworkField />
        {tags.map((t, i) => (
          <span key={t} className="absolute flex items-center gap-2" style={{ left: TAGS[i][0], top: TAGS[i][1] }}>
            <span className="relative flex size-2">
              <span className="arch-ping absolute inline-flex size-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-400" />
            </span>
            <span className="rounded-[3px] border border-solid border-tag-line bg-black-50 px-1.5 py-0.5 font-mono text-mono-tag uppercase text-white-100">{t}</span>
          </span>
        ))}
      </div>
      <div className="relative -mt-[100svh]">{children}</div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Dark code band (680) + 4 logos                                       */
/* ------------------------------------------------------------------ */
export function CodeBand({ title }) {
  return (
    <section className="dark relative bg-black-50">
      <Box dark className="isolate items-center justify-center overflow-hidden px-4 py-40 lg:h-[680px] lg:px-[calc(100%/12)] lg:py-[120px]">
        <CodeGlyphs />
        <div className="relative flex w-full flex-col items-center gap-20 lg:gap-[120px]">
          <h3 className="max-w-[655px] text-balance text-center font-sans text-statement text-black-600">{title}</h3>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 lg:gap-x-[120px]">
            {[0, 3, 6, 9].map((i) => (
              <span key={i} className="block h-8 w-[148px] text-black-800 xl:w-[186px]">
                <LogoMark i={i} scale={1.4} className="!text-black-700" />
              </span>
            ))}
          </div>
        </div>
      </Box>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Closing: sticky canvas stage + 2-card nav                            */
/* ------------------------------------------------------------------ */
export function Closing({ line, nav }) {
  return (
    <section className="relative bg-white-100 motion-safe:h-[290svh]">
      <div className="sticky top-0 h-[100svh]">
        <Box outerClassName="h-full" className="h-full items-center justify-center overflow-hidden pb-[63px]">
          <RingsField />
          <div className="relative flex w-full flex-col items-center px-4 text-center">
            <p className="max-w-[17em] text-balance font-serif text-serif-chapter-sm text-black-100 lg:text-serif-chapter">{line}</p>
            <nav aria-label="Next steps" className="relative mt-12 grid w-full max-w-[580px] grid-cols-2 border border-solid border-white-500 bg-white-100 lg:mt-14">
              <span aria-hidden="true" className="absolute -left-[5px] -top-[5px] size-[9.3px] border border-solid border-black-100 bg-white-100" />
              <span aria-hidden="true" className="absolute -bottom-[5px] -right-[5px] size-[9.3px] border border-solid border-black-100 bg-white-100" />
              {nav.map(([a, b], i) => (
                <Link key={a} to="/contact/sales" className={`group flex h-[81px] flex-col justify-center gap-1 px-5 text-left ${i ? 'border-l border-solid border-white-500' : ''}`}>
                  <span className={`${monoLabel} text-black-100 transition-transform duration-150 ease-out group-hover:translate-x-1`}>{a} →</span>
                  <span className={`${monoLabel} text-black-700 transition-transform duration-150 ease-out group-hover:translate-x-1`}>{b}</span>
                </Link>
              ))}
            </nav>
          </div>
        </Box>
      </div>
    </section>
  )
}
