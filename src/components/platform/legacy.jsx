import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../../motion/index.js'
import { Button } from '../ui.jsx'
import { Chip, Company, CompanyGlyph, Icon, Initials, Tag } from '../mock.jsx'
import { AgentCard } from './heroes.jsx'
import { WindowArt } from './art.jsx'
import { HomeWindowArt, SequenceEditorArt } from './windows.jsx'
import { DashedH, DashedV, DotWell, GuideRow, Hairline, HatchFill, HeroCopy, LegacyBlock, LegacyHeader, LegacyHeading } from './shell.jsx'

// Route heroes and route-specific sections of the T2 "platform v1 / legacy" pages
// (/platform/ask, call-intelligence, data, sequences, workflows), CLONE_SPEC_PLATFORM.md 3.1,
// 3.13, 3.18 (ask variant), 3.20 and 3.22, re-measured live on 2026-10-29 (1440x900).
// Artwork is original (fictional "Corvale" CRM, invented companies/people); only boxes,
// positions, colours and timings follow the live pages.

/* ------------------------------------------------------------------ */
/* Shared mock bits                                                      */
/* ------------------------------------------------------------------ */
function MockCard({ className = '', children, style }) {
  return (
    <div className={`rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card ${className}`} style={style}>
      {children}
    </div>
  )
}

function Line({ w = '100%', className = 'bg-white-400' }) {
  return <span className={`block h-2 rounded-4 ${className}`} style={{ width: w }} />
}

/** "+" crosshair markers on the four outer corners of a panel (P8, ask tabs frame). */
function Crosshairs() {
  return ['-left-5 -top-5', '-right-5 -top-5', '-bottom-5 -left-5', '-bottom-5 -right-5'].map((p) => (
    <svg key={p} aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" className={`pointer-events-none absolute text-white-500 max-lg:hidden ${p}`}>
      <path d="M20 0v40M0 20h40" stroke="currentColor" />
    </svg>
  ))
}

/* ------------------------------------------------------------------ */
/* H-ASK: 838 stage (wave canvas + copy + chat widget) + 144 strip       */
/* ------------------------------------------------------------------ */
/** Original ambient bar field drawn on a canvas (stands in for the unmeasured live canvas). */
function AskWaveCanvas() {
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
      if (c.width !== Math.round(w * dpr)) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      for (let x = 0; x < w; x += 8) {
        const u = x / w
        const amp = 0.18 + 0.1 * Math.sin(u * 9 + t) + 0.06 * Math.cos(u * 23 - t * 1.4)
        const bh = h * Math.max(0.04, amp)
        ctx.fillStyle = 'rgba(228,231,236,0.55)'
        ctx.fillRect(x, h - bh, 1, bh)
      }
      t += 0.01
      if (!reducedMotion()) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}

function AskWidget({ query, status, answer }) {
  return (
    <div role="img" aria-label="Assistant answer illustration" className="ask-hero-rise flex w-full max-w-[403px] flex-col gap-2">
      <div className="flex h-[45px] items-center justify-between gap-2 rounded-12 border border-solid border-white-500 bg-white-100 px-3 shadow-mock-card">
        <span className="truncate text-mock-md text-black-100">{query}</span>
        <span className="flex shrink-0 items-center gap-1.5 rounded-8 border border-solid border-white-500 px-2 py-1 text-mock-base text-black-700">
          <Icon name="search" size={12} />
          {status}
        </span>
      </div>
      <div className="ask-hero-fade flex min-h-[45px] items-center rounded-12 border border-solid border-white-500 bg-white-100 px-3 py-2.5 shadow-mock-card">
        <p className="truncate text-mock-md text-black-300">{answer}</p>
      </div>
    </div>
  )
}

export function HeroAsk({ title, sub, widget, strip, timing }) {
  const m = (k) => ({ '--pl-dur': `${timing.dur}ms`, '--pl-delay': `${timing[k]}ms` })
  return (
    <section data-section="hero" className="relative">
      <div className="relative overflow-hidden bg-gradient-to-b from-white-100 from-20% to-white-300 max-lg:min-h-[700px] lg:h-[838px]">
        <AskWaveCanvas />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-6 pb-16 lg:pb-0">
          <header className="flex max-w-xl flex-col items-center pb-10 pt-[120px] text-center lg:pb-[60px]">
            <h1 className="pl-enter text-balance font-display text-page-hero-sm text-black-100 lg:text-page-hero" style={m('title')}>
              {title}
            </h1>
            <p className="pl-enter mt-4 text-balance text-lg text-black-300 lg:text-xl" style={m('sub')}>
              {sub}
            </p>
          </header>
          <div className="flex w-full justify-center lg:mt-[2px] lg:h-[326px] lg:items-start">
            <AskWidget {...widget} />
          </div>
          <div className="absolute inset-x-0 top-[670px] mx-auto w-full max-w-[1000px] max-lg:hidden">
            <GuideRow heightClass="h-[120px]" lines={2} />
          </div>
        </div>
      </div>
      <Hairline />
      <div className="container">
        <div className="border-x border-solid border-white-500">
          <div className="grid grid-cols-12">
            <div className="col-[2/-2] flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
              <p className="max-w-[448px] text-pretty text-lg text-black-300">{strip}</p>
              <div className="flex shrink-0 items-center gap-2.5">
                <Button variant="outline" className="max-md:hidden">
                  Talk to sales
                </Button>
                <Button variant="primary">Start for free</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* S-TABS ask variant (3.18): centred H2, 5 text tabs over a tick ruler  */
/* ------------------------------------------------------------------ */
const ASK_GROUPS = [
  ['halcyon', [['Deal stage', 'Negotiation'], ['Next step', 'Nadia to send the security review']]],
  ['person', [['Role', 'Head of IT']]],
  ['kettle', [['Funding raised', '$100M - $250M']]],
]
function AskPanelMock({ variant = 0 }) {
  return (
    <div role="img" aria-label="Suggested updates illustration" className="flex w-[346px] max-w-[86%] flex-col gap-3">
      <div className="mb-1 flex h-9 items-center justify-end">
        <span className="rounded-8 bg-white-400 px-2.5 py-1.5 text-mock-base text-black-300">
          {['Update all three', 'Draft the recap', 'Update this deal', 'Summarise week', 'Compare funds'][variant % 5]}
        </span>
      </div>
      {ASK_GROUPS.map(([co, rows]) => (
        <div key={co} className="flex flex-col gap-2.5">
          {co === 'person' ? (
            <span className="flex items-center gap-1.5 text-mock-base text-black-100">
              <Initials name="Nadia Brooks" size={16} tone="teal" />
              Nadia Brooks
            </span>
          ) : (
            <Company id={co} size={16} />
          )}
          {rows.map(([label, value]) => (
            <MockCard key={label} className="flex items-start justify-between px-2.5 py-[11px]">
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-mock-sm text-black-800">{label}</span>
                <span className="truncate text-mock-base text-black-100">{value}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-mock-sm text-black-600">
                <Icon name="check" size={11} />
                Accept
              </span>
            </MockCard>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Call-template document (S-TABS right panel on call notes): stacked field cards. */
export function TemplateArt({ fields }) {
  return (
    <div role="img" aria-label="Call template illustration" className="absolute inset-0 flex justify-center overflow-hidden px-[8%] pt-[56px]">
      <div className="flex w-full max-w-[555px] flex-col gap-[10px]">
        {fields.slice(0, 3).map(([title, body, format], i) => (
          <MockCard key={title} className="flex min-h-[160px] flex-col gap-3 p-4">
            <div className="flex items-center justify-between text-[13px] font-semibold text-black-100">
              {title}
              <Icon name="dots" size={12} className="text-black-800" />
            </div>
            <p className="text-[13px] leading-5 text-black-600">{body}</p>
            <span className="mt-auto flex items-center gap-2 text-[12px] text-black-800">
              Format
              <span className="flex items-center gap-1 text-black-600">
                <Icon name={i % 2 ? 'list' : 'note'} size={11} />
                {format}
              </span>
            </span>
          </MockCard>
        ))}
      </div>
    </div>
  )
}

export function AskTabs({ title, tabs, className = '' }) {
  const [active, setActive] = useState(2)
  const t = tabs[active]
  return (
    <LegacyBlock className={className} data-section="ask-tabs">
      <header className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40">
        <h2 className="col-[2/-2] text-balance text-center font-display text-head-sm-md text-black-100 lg:text-head-sm">{title}</h2>
      </header>
      <div className="grid grid-cols-12 pb-10">
        <div className="col-[2/-2] overflow-hidden">
          <div role="tablist" className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:gap-0 lg:pb-0">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`h-9 shrink-0 cursor-pointer text-sm transition-colors duration-300 ${i === active ? 'text-black-300' : 'text-black-900 hover:text-black-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div aria-hidden="true" className="pl-mask-x-96 flex h-3 items-start justify-center gap-3 overflow-hidden">
            {Array.from({ length: 160 }, (_, i) => (
              <span key={i} className={`block w-px shrink-0 ${i === 80 ? 'h-3 bg-black-800' : 'h-2 bg-white-500'}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="relative col-[2/-2] grid border-y border-solid border-white-500 lg:h-[580px] lg:grid-cols-2">
          <Crosshairs />
          <div className="relative flex flex-col justify-between gap-6 bg-white-100 p-8 lg:px-10 lg:py-12">
            <h3 key={`t${active}`} className="max-w-[480px] animate-[pages-fade-in_300ms_ease-out] text-balance font-display text-panel-title text-black-100">
              {t.title}
            </h3>
            <p key={`d${active}`} className="max-w-[200px] animate-[pages-fade-in_300ms_ease-out] text-sm text-black-700">
              {t.desc}
            </p>
          </div>
          <div className="relative flex aspect-square items-center justify-center overflow-hidden border-solid border-white-500 bg-white-200 max-lg:border-t lg:aspect-auto lg:border-l">
            <DotWell />
            <div className="relative flex w-full justify-center" key={`m${active}`}>
              <AskPanelMock variant={active} />
            </div>
          </div>
        </div>
      </div>
      <GuideRow />
    </LegacyBlock>
  )
}

/* ------------------------------------------------------------------ */
/* S-ASK-INTEL (3.20): header, masked product window, 3 cells            */
/* ------------------------------------------------------------------ */
export function AskIntel({ title, cards, className = '' }) {
  return (
    <LegacyBlock className={className} data-section="ask-intel">
      <GuideRow />
      <Hairline />
      <header className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40">
        <h2 className="col-[2/-2] mx-auto max-w-[448px] text-balance text-center font-display text-head-sm-md text-black-100 lg:text-head-sm">{title}</h2>
      </header>
      <div className="relative grid grid-cols-12">
        <DashedH className="absolute inset-x-0 top-0" />
        <div className="col-[2/-2] h-[360px] overflow-hidden pt-1 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_85%)] md:h-[520px] lg:h-[704px]">
          <HomeWindowArt h={640} />
        </div>
      </div>
      <Hairline />
      <div className="grid grid-cols-1 gap-px bg-white-500 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="flex flex-col bg-white-100 p-6">
            <Icon name={c.icon} size={24} className="mb-4 text-black-300" strokeWidth={1.4} />
            <h3 className="text-lg text-black-300">{c.title}</h3>
            <p className="mt-1 max-w-[384px] text-balance text-black-700">{c.body}</p>
            <div className="flex flex-1 items-end">
              <div className="relative mt-8 flex aspect-[6/5] w-full items-center justify-center overflow-hidden bg-white-200 p-6">{c.media}</div>
            </div>
          </div>
        ))}
      </div>
      <Hairline />
      <GuideRow />
    </LegacyBlock>
  )
}

/** Mini UI compositions for the three S-ASK-INTEL wells (original art). */
export function AskIntelArt({ variant = 0 }) {
  if (variant === 1) {
    return (
      <svg viewBox="0 0 345 345" className="h-full max-h-[300px] w-auto" role="img" aria-label="Permission rings illustration" fill="none">
        {[172, 134, 96].map((r, i) => (
          <circle key={r} cx="172.5" cy="172.5" r={r - 0.5} className="text-white-600" stroke="currentColor" strokeDasharray={i === 1 ? '4 6' : undefined} />
        ))}
        <rect x="127" y="127" width="91" height="91" rx="20" className="text-white-100" fill="currentColor" />
        <rect x="127.5" y="127.5" width="90" height="90" rx="19.5" className="text-white-600" stroke="currentColor" />
        <path d="M160 168v-6a12.5 12.5 0 0 1 25 0v6m-29 0h33v22h-33z" className="text-black-700" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }
  if (variant === 2) {
    return (
      <div className="flex w-[296px] max-w-full flex-col gap-4">
        {[
          ['Nadia Brooks', 'Owner', 'Head of IT'],
          ['Brightwater', 'Funding', '$12M - $15M'],
        ].map(([n, l, v], i) => (
          <MockCard key={n} className="flex flex-col gap-2 p-3">
            <span className="flex items-center gap-2 text-mock-base text-black-100">
              {i === 0 ? <Initials name={n} size={16} tone="teal" /> : <Company id="brightwater" size={16} textClass="text-mock-base text-black-100" />}
              {i === 0 ? n : null}
            </span>
            <span className="flex items-center justify-between rounded-8 bg-white-200 px-2.5 py-2 text-mock-base">
              <span className="text-black-700">{l}</span>
              <span className="text-black-100">{v}</span>
            </span>
          </MockCard>
        ))}
      </div>
    )
  }
  return (
    <div className="flex w-[280px] max-w-full flex-col gap-2">
      {[
        ['quarry', 'Waiting on legal sign-off'],
        ['lumenaut', 'Asked for a pilot in Q1'],
        ['vesper', 'No reply in two weeks'],
        ['tidewell', 'Expanding to a second team'],
      ].map(([co, note]) => (
        <MockCard key={co} className="flex flex-col gap-1 px-3 py-2.5">
          <Company id={co} size={16} />
          <span className="truncate text-mock-sm text-black-700">{note}</span>
        </MockCard>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-SPLIT-L call-intelligence: CRM table + floating call-recording card */
/* ------------------------------------------------------------------ */
const CI_COLS = ['Company', 'Contacts', 'Deal stage', 'Close date', 'Domains', 'Open deals']
const CI_ROWS = [
  ['vesper', '', '', '', '', ''],
  ['halcyon', 'Nadia Brooks', 'Lead', 'in 7 days', 'halcyon.example', '2'],
  ['quarry', '', '', '', '', ''],
  ['kettle', '', '', '', '', ''],
  ['tidewell', '', '', '', '', ''],
]

function CallCard({ title, summary }) {
  return (
    <div role="img" aria-label="Call recording illustration" className="w-[424px] rounded-16 border border-solid border-white-500 bg-white-400 p-1 shadow-hero-window">
      <div className="flex h-[619px] flex-col overflow-hidden rounded-12 bg-white-100">
        <div className="flex h-[47px] items-center gap-2 border-b border-solid border-mock-stroke px-4">
          <Icon name="video" size={16} className="text-black-700" />
          <span className="truncate text-[15px] font-semibold text-black-100">{title}</span>
        </div>
        <div className="p-1.5 pb-2">
          <div className="relative flex h-[227px] items-end overflow-hidden rounded-8 bg-white-300">
            {/* recording still: light frame darkening towards the player bar (block layout of the live player) */}
            <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-transparent via-black-700/60 to-black-200" />
            <div className="absolute inset-x-0 top-[22%] flex items-center justify-center gap-6">
              <Initials name="Nadia Brooks" size={56} tone="teal" />
              <Initials name="Robin Hale" size={56} tone="iris" />
            </div>
            <div className="relative flex h-12 w-full flex-col justify-center gap-1.5 px-2">
              <span className="flex justify-between text-[10px] text-white-100">
                <span>12:40</span>
                <span>31:05</span>
              </span>
              <span className="flex h-1 gap-1">
                <span className="block h-1 w-[38%] rounded-full bg-white-100" />
                <span className="block h-1 flex-1 rounded-full bg-white-100/40" />
                <span className="block h-1 w-[22%] rounded-full bg-white-100/40" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-[47px] items-center gap-8 border-y border-solid border-mock-stroke px-9 text-sm text-black-600">
          <span className="text-black-100">Insights</span>
          <span>Transcript</span>
        </div>
        <div className="flex flex-col gap-4 px-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-black-100">Summary</span>
            <span className="rounded-8 border border-solid border-white-500 px-2 py-0.5 text-sm text-black-600">Discovery call</span>
          </div>
          <p className="text-[15px] leading-[22px] text-black-600">{summary}</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 border-t border-solid border-mock-stroke px-4 pt-4">
          <span className="text-[15px] font-semibold text-black-100">Insights</span>
          <Line w="88%" />
          <Line w="64%" />
          <Line w="72%" />
        </div>
      </div>
    </div>
  )
}

export function HeroCallIntel({ copy, call, timing }) {
  return (
    <div className="container" data-section="hero">
      <div className="relative overflow-hidden border-x border-solid border-white-500 lg:overflow-visible">
        <div className="grid grid-cols-12 pt-20 lg:pt-[116px]">
          <div className="relative col-[2/-2] h-[259px] overflow-hidden bg-white-100 [mask-image:linear-gradient(to_right,#000_70%,transparent),linear-gradient(to_bottom,#000_40%,transparent)] [mask-composite:intersect] max-md:hidden">
            <div className="grid gap-px bg-white-500 p-0.5 pb-0" style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
              {CI_COLS.map((c) => (
                <div key={c} className="flex h-10 items-center bg-white-100 px-4 text-sm text-black-600">
                  {c}
                </div>
              ))}
              {CI_ROWS.map((r, ri) =>
                r.map((v, ci) => (
                  <div key={`${ri}-${ci}`} className={`flex h-[42px] items-center px-4 text-sm ${ri === 1 ? 'bg-blue-100/40' : 'bg-white-100'}`}>
                    {ci === 0 ? <Company id={v} size={16} textClass="text-sm text-black-100" /> : ci === 1 && v ? <span className="flex items-center gap-1.5 text-black-100"><Initials name={v} size={16} tone="teal" />{v}</span> : ci === 2 && v ? <Chip tone="blue">{v}</Chip> : <span className="text-black-600">{v}</span>}
                  </div>
                )),
              )}
            </div>
          </div>
          <div className="col-[2/-2] pb-20 pt-12 max-lg:hidden lg:col-[2/7] lg:pb-32">
            <HeroCopy {...copy} timing={timing} align="left" />
          </div>
          {/* below lg the copy leads (centred), then the table and the call card stack under it */}
          <div className="order-first col-[2/-2] pb-16 lg:hidden">
            <HeroCopy {...copy} timing={timing} />
          </div>
          <div className="relative col-[2/-2] -mt-20 flex justify-center pb-16 lg:hidden">
            <div className="w-full max-w-[424px] max-sm:[&>div]:w-full">
              <CallCard {...call} />
            </div>
          </div>
        </div>
        <div className="absolute left-[64.6%] top-[66px] max-lg:hidden">
          <CallCard {...call} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-SPLIT-L workflows: copy + 5-node flow diagram (684x590)             */
/* ------------------------------------------------------------------ */
// Card top-left positions inside the 684x590 diagram box (measured at 1440).
const FLOW_POS = [
  [201, 0],
  [201, 150],
  [201, 300],
  [9, 510],
  [394, 510],
]
const FLOW_MS = 2900

export function HeroWorkflows({ copy, nodes }) {
  const [step, setStep] = useState(-1)
  useEffect(() => {
    if (reducedMotion()) return setStep(nodes.length)
    let s = -1
    let id = setTimeout(function next() {
      s = (s + 1) % (nodes.length + 1)
      setStep(s)
      id = setTimeout(next, s === nodes.length ? FLOW_MS * 2 : FLOW_MS)
    }, 800)
    return () => clearTimeout(id)
  }, [nodes.length])
  const stateOf = (i) => (step === nodes.length || i < step || (step === 4 && i === 3) ? 'done' : i === step || (step === 3 && i === 4) ? 'running' : 'idle')
  return (
    <div className="relative bg-white-100" data-section="hero">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_684px] lg:gap-6 lg:py-[100px]">
          <div className="max-lg:hidden lg:pl-[118px] lg:pt-[18px]">
            <HeroCopy {...copy} align="left" className="max-w-[448px]" />
          </div>
          <div className="lg:hidden">
            <HeroCopy {...copy} />
          </div>
          {/* below lg: the flow stacks vertically under the copy */}
          <div className="mx-auto flex w-full max-w-[500px] flex-col items-stretch lg:hidden">
            {nodes.slice(0, 4).map((n, i) => (
              <div key={n.title} className="flex flex-col items-center">
                {i > 0 && <span aria-hidden="true" className="h-12 border-l border-dashed border-white-700" />}
                <AgentCard agent={n} i={i} state={stateOf(i)} widthClass="w-full" />
              </div>
            ))}
          </div>
          <div className="relative h-[590px] w-[684px] max-lg:hidden">
            <svg aria-hidden="true" className="absolute inset-0 size-full text-white-700" viewBox="0 0 684 590" fill="none">
              <path d="M341.5 80v70M341.5 230v70" stroke="currentColor" strokeDasharray="4 6" />
              <path d="M341.5 380v65H149.5v65M341.5 445h193v65" stroke="currentColor" strokeDasharray="4 6" />
            </svg>
            {nodes.map((n, i) => (
              <div key={n.title} className="absolute" style={{ left: FLOW_POS[i][0], top: FLOW_POS[i][1] }}>
                {n.tab && (
                  <span className="absolute -top-[18px] left-4 rounded-t-6 border border-b-0 border-solid border-white-500 bg-white-200 px-2 text-xs text-black-600">{n.tab}</span>
                )}
                <AgentCard agent={n} i={i} state={stateOf(i)} widthClass="w-[281px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-SEQ sequences: email-step mock rising above the copy                */
/* ------------------------------------------------------------------ */
export function HeroSequences({ copy, steps, booked, timing }) {
  return (
    <div className="container" data-section="hero">
      <div className="border-x border-solid border-white-500">
        <div className="grid grid-cols-12">
          <div className="relative col-[2/-2] h-[400px] overflow-hidden border-x border-solid border-white-500">
            <DashedH className="absolute inset-x-0 top-[351px]" />
            <div aria-hidden="true" className="absolute left-1/2 top-[120px] size-40 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="seq-hero-stack absolute inset-x-0 bottom-5 flex flex-col items-center px-4">
              {steps.map((s, i) => (
                <div key={s.subject} className="flex w-full flex-col items-center">
                  <MockCard className="w-full max-w-[512px] p-4" style={{ height: s.height }}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-mock-md font-semibold text-black-100">
                        <Icon name="mail" size={14} className="text-black-700" />
                        {s.subject}
                      </span>
                      <span className="text-mock-base text-black-800">{s.when}</span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {Array.from({ length: s.lines }, (_, k) => (
                        <Line key={k} w={`${92 - ((k * 13) % 40)}%`} />
                      ))}
                    </div>
                  </MockCard>
                  <span className="my-[50px] flex h-[18px] items-center gap-1.5 text-xs text-black-800">
                    <Icon name={i === steps.length - 1 ? 'checkCircle' : 'clock'} size={12} />
                    {s.wait}
                  </span>
                </div>
              ))}
              <div className="flex h-[58px] w-[342px] max-w-full items-center gap-3 rounded-full border border-solid border-white-500 bg-white-100 py-2 pl-2 pr-5 shadow-[0_0_0_4px_#fafafb,0_0_0_5px_#e4e7ec]">
                <span className="flex">
                  <Initials name="Robin Hale" size={40} tone="iris" ring />
                  <Initials name="Nadia Brooks" size={40} tone="teal" ring className="-ml-2" />
                </span>
                <span className="truncate text-base text-black-100">{booked}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-[2/-2] pb-20 pt-12 lg:pb-32">
            <HeroCopy {...copy} timing={timing} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-DATA: copy, schema diagram, perspective product window, sticky tabs */
/* ------------------------------------------------------------------ */
// Entity cards in the 1392x345 diagram box (left, top, width, height), measured at 1440.
const SCHEMA_BOXES = [
  [0, 0, 260, 163],
  [1132, 0, 260, 163],
  [236, 212, 260, 132],
  [566, 212, 260, 132],
  [897, 212, 260, 132],
]

function SchemaCard({ box, entity }) {
  const [l, t, w, h] = box
  return (
    <div className="absolute flex flex-col overflow-hidden rounded-10 border border-solid border-white-500 bg-white-100 shadow-mock-chip" style={{ left: `${(l / 1392) * 100}%`, top: t, width: `${(w / 1392) * 100}%`, height: h }}>
      <div className="flex items-center justify-between border-b border-solid border-mock-stroke px-2.5 py-2">
        <span className="flex items-center gap-1.5 text-[14px] font-semibold leading-[15.5px] text-black-100">
          <CompanyGlyph shape={entity.glyph || 'grid'} tone={entity.tone || 'blue'} size={18} radius="rounded-4" />
          {entity.name}
        </span>
        <span className={`rounded-4 px-1.5 py-0.5 text-xs ${entity.custom ? 'bg-platform-tile-blue text-blue-600' : 'bg-white-300 text-black-600'}`}>{entity.custom ? 'Custom' : 'Standard'}</span>
      </div>
      <div className="flex flex-col px-2.5 py-1">
        {entity.fields.map((f) => (
          <span key={f} className="flex h-[30px] items-center gap-1.5 text-mock-base text-black-600">
            <Icon name={['note', 'tag', 'pin', 'users'][entity.fields.indexOf(f) % 4]} size={13} className="text-black-600" />
            {f}
          </span>
        ))}
        <span className="flex h-[30px] items-center gap-1.5 text-mock-sm text-black-800"><Icon name="plus" size={11} />{entity.more}</span>
      </div>
    </div>
  )
}


/** Records-table product window for H-DATA (original content; block geometry follows the live
 * 1132x562 window: 236px sidebar, 48px title bar, two toolbar rows, 36px rows, footer row). */
const DW_NAV = [['bell', 'Alerts'], ['task', 'Tasks'], ['note', 'Notes'], ['mail', 'Emails'], ['chart', 'Reports'], ['flow', 'Workflows']]
const DW_REC = [['users', 'People', 'blue'], ['building', 'Companies', 'blue'], ['board', 'Deals', 'ember'], ['link', 'Partners', 'green'], ['coin', 'Invoices', 'amber']]
const DW_ROWS = [
  ['halcyon', 'Annual', 'blue', '$4,800', 'Nadia Brooks', 'Webinar', 'grey'],
  ['brightwater', 'Monthly', 'green', '$71,250', 'Theo Laurent', 'Partner', 'iris'],
  ['kettle', 'Pilot', 'grey', '$6,100', 'Ines Varga', 'Partner', 'iris'],
  ['pinecrest', 'Monthly', 'green', '$102,400', 'Sam Okafor', 'Meetup', 'teal'],
  ['lumenaut', 'Annual', 'blue', '$3,600', 'Mara Quist', 'Organic', 'amber'],
  ['orchard', 'Annual', 'blue', '$6,900', 'Jun Ishida', 'Webinar', 'grey'],
  ['tidewell', 'Bespoke', 'red', '$4,250', 'Rhea Dalton', 'Webinar', 'grey'],
  ['marigold', 'Monthly', 'green', '$88,300', 'Owen Pike', 'Meetup', 'teal'],
  ['quarry', 'Annual', 'blue', '$3,450', 'Lena Ford', 'Partner', 'iris'],
  ['vesper', 'Bespoke', 'red', '$7,700', 'Arlo Chen', 'Organic', 'amber'],
]
const DW_COLS = 'grid-cols-[24.3%_17.9%_19.9%_17.5%_minmax(0,1fr)]'
function DataWindowArt() {
  return (
    <div role="img" aria-label="Records table illustration" className="relative flex w-full overflow-hidden rounded-12 border border-solid border-white-500 bg-white-100 text-[15px] shadow-hero-window" style={{ aspectRatio: 1132 / 562 }}>
      <div className="hidden w-[20.9%] shrink-0 flex-col border-r border-solid border-mock-stroke bg-mock-surface px-2.5 md:flex">
        <span className="flex h-12 items-center gap-2 pl-1 font-semibold text-black-100">
          <span className="flex size-6 items-center justify-center rounded-6 bg-black-100 text-white-100"><Icon name="board" size={14} /></span>
          Northwind
          <Icon name="chevronDown" size={12} className="text-black-600" />
        </span>
        <span className="mt-1 flex h-[30px] items-center gap-2">
          <span className="flex h-full flex-1 items-center gap-1.5 rounded-8 border border-solid border-white-500 bg-white-100 px-2 text-[14px] text-black-100"><Icon name="bolt" size={13} />Shortcuts</span>
          <span className="flex h-full w-12 items-center justify-center rounded-8 border border-solid border-white-500 bg-white-100 text-black-600"><Icon name="search" size={13} /></span>
        </span>
        <span className="mt-[9px] flex flex-col">
          {DW_NAV.map(([i, l]) => (
            <span key={l} className="flex h-8 items-center gap-2 px-1.5 text-black-300"><Icon name={i} size={15} />{l}</span>
          ))}
        </span>
        <span className="mt-[10px] flex h-[28px] items-center gap-2 px-1.5 text-[13px] text-black-600"><Icon name="chevronRight" size={11} />Starred</span>
        <span className="mt-[10px] flex h-[28px] items-center gap-2 px-1.5 text-[13px] text-black-600"><Icon name="chevronDown" size={11} />Objects</span>
        <span className="flex flex-col">
          {DW_REC.map(([i, l, t], k) => (
            <span key={l} className={`flex h-[33px] items-center gap-2 rounded-8 px-1.5 text-black-300 ${k === 2 ? 'bg-white-400' : ''}`}>
              <CompanyGlyph shape="grid" tone={t} size={16} radius="rounded-4" />{l}
            </span>
          ))}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-solid border-mock-stroke px-4">
          <span className="text-[16px] font-semibold text-black-100">Deals</span>
          <span className="flex">
            {['Nadia Brooks', 'Robin Hale', 'Theo Laurent'].map((n, k) => <Initials key={n} name={n} size={24} tone={['teal', 'iris', 'amber'][k]} ring className="-ml-1.5" />)}
          </span>
        </div>
        <div className="flex h-[47px] shrink-0 items-center justify-between border-b border-solid border-mock-stroke px-2.5">
          <span className="flex h-[30px] items-center gap-1.5 rounded-8 border border-solid border-white-500 px-2 text-black-100"><CompanyGlyph shape="grid" tone="green" size={16} radius="rounded-4" />Open deals<Icon name="chevronDown" size={11} /></span>
          <span className="flex gap-2">
            <span className="flex h-[30px] items-center gap-1.5 rounded-8 border border-solid border-white-500 px-2.5 text-black-100"><Icon name="settings" size={13} />Table options</span>
            <span className="flex h-[30px] items-center gap-1.5 rounded-8 border border-solid border-white-500 px-2.5 text-black-100"><Icon name="arrowUp" size={13} />Share and sync<Icon name="chevronDown" size={11} /></span>
          </span>
        </div>
        <div className="flex h-[45px] shrink-0 items-center border-b border-solid border-mock-stroke px-2.5">
          <span className="flex size-[30px] items-center justify-center rounded-8 border border-dashed border-white-600 text-black-600"><Icon name="sort" size={13} /></span>
        </div>
        <div className={`grid ${DW_COLS} h-9 shrink-0 border-b border-solid border-mock-stroke text-black-300`}>
          {[['', 'Deal'], ['tag', 'Plan'], ['coin', 'Contract value'], ['users', 'Owner'], ['link', 'Channel']].map(([i, l], k) => (
            <span key={l} className={`flex items-center gap-2 border-r border-solid border-mock-stroke px-2.5 ${k === 0 ? 'pl-2' : ''}`}>
              {k === 0 ? <span className="size-4 rounded-4 border border-solid border-white-600" /> : <Icon name={i} size={13} />}
              {l}
            </span>
          ))}
        </div>
        {DW_ROWS.map(([co, plan, pt, val, owner, ch, ct]) => (
          <div key={co} className={`grid ${DW_COLS} h-9 shrink-0 border-b border-solid border-mock-stroke`}>
            <span className="flex min-w-0 items-center gap-2 border-r border-solid border-mock-stroke pl-2"><span className="size-4 shrink-0 rounded-4 border border-solid border-white-600" /><Company id={co} size={16} textClass="text-[15px] text-black-100" /></span>
            <span className="flex items-center border-r border-solid border-mock-stroke px-2"><Chip tone={pt} dot={false} className="h-6 rounded-6 px-1.5 !text-[15px] !font-normal">{plan}</Chip></span>
            <span className="flex items-center justify-end border-r border-solid border-mock-stroke px-2.5 tabular-nums text-black-100">{val}</span>
            <span className="flex min-w-0 items-center border-r border-solid border-mock-stroke px-2"><span className="flex items-center gap-1.5 rounded-8 border border-solid border-white-500 px-1.5 py-0.5 text-black-600"><Initials name={owner} size={14} tone="teal" /><span className="truncate">{owner}</span></span></span>
            <span className="flex items-center px-2"><Chip tone={ct} dot={false} className="h-6 rounded-6 px-1.5 !text-[15px] !font-normal">{ch}</Chip></span>
          </div>
        ))}
        <div className={`grid ${DW_COLS} h-[26px] shrink-0 text-[14px] text-black-600`}>
          <span className="flex items-center justify-end gap-1 px-2.5"><span className="text-black-100">2,740</span> rows</span>
          <span className="flex items-center justify-end px-2.5">+ Add total</span>
          <span className="flex items-center justify-end gap-1 px-2.5"><span className="text-black-100">$81,904,300</span> total</span>
          <span className="flex items-center justify-end px-2.5">+ Add total</span>
          <span className="flex items-center justify-end px-2.5">+ Add total</span>
        </div>
      </div>
    </div>
  )
}

export function HeroData({ copy, timing, entities, tabs }) {
  const [active, setActive] = useState(0)
  return (
    <div className="relative overflow-x-clip bg-white-100" data-section="hero">
      <div className="relative mx-auto max-w-[1200px] px-6">
        <HeroCopy {...copy} timing={timing} className="pt-20 lg:pt-[120px]" />
      </div>
      <div className="relative mx-auto mt-10 max-w-[1440px] px-6 lg:-mt-[50px]">
        <div className="data-hero-enter [perspective:3000px]">
          <div className="relative h-[345px] max-lg:hidden">
            <svg aria-hidden="true" className="absolute inset-0 size-full text-white-700" viewBox="0 0 1392 345" preserveAspectRatio="none" fill="none">
              <path d="M260 81H366V212M1132 81H1027V212M696 160V212M496 278H566M826 278H897" stroke="currentColor" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
            </svg>
            {entities.map((e, i) => (
              <SchemaCard key={e.name} box={SCHEMA_BOXES[i]} entity={e} />
            ))}
          </div>
          <div className="mx-auto mt-20 max-w-6xl rounded-16 border border-solid border-white-500 bg-white-300 p-2.5">
            <DataWindowArt />
          </div>
        </div>
        <ul className="sticky bottom-5 z-10 mx-auto mt-9 flex w-fit max-w-full gap-2 overflow-x-auto rounded-[15px] bg-white-100 p-2.5 shadow-xl lg:mt-[37px]">
          {tabs.map((t, i) => (
            <li key={t.label}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-10 border border-solid py-[5px] pl-[9px] pr-[11px] text-sm text-black-600 transition-colors duration-200 ease-out hover:bg-white-200 ${i === active ? 'border-white-800 text-black-300' : 'border-white-500'}`}
              >
                <Icon name={t.icon} size={18} />
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <GuideRow heightClass="h-[100px]" className="container" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* S-SHOWCASE-L (3.22): legacy header + full product window in a well    */
/* ------------------------------------------------------------------ */
export function Showcase({ lead, cont, className = '' }) {
  return (
    <LegacyBlock className={className} data-section="product-showcase">
      <LegacyHeader lead={lead} cont={cont} />
      <Hairline />
      <div className="pl-scrollbar-none relative overflow-x-auto bg-white-200 px-6 py-10 lg:px-[8.333%] lg:py-20">
        <HatchFill className="absolute inset-0 opacity-60" />
        <div className="min-w-[740px] md:min-w-0">
          <SequenceEditorArt />
        </div>
      </div>
    </LegacyBlock>
  )
}

/* ------------------------------------------------------------------ */
/* S-COLUMNS-L (3.13): legacy agent columns + ruler + edge fades         */
/* ------------------------------------------------------------------ */
export function AgentColumns({ lead, cont, items, className = '' }) {
  return (
    <LegacyBlock className={className} data-section="agent-columns">
      <LegacyHeader lead={lead} cont={cont} />
      <div className="relative">
        <div className="pl-scrollbar-none snap-x snap-mandatory overflow-x-auto">
          <div className="grid min-w-[1340px] grid-cols-12 lg:min-w-0">
            <div className="col-[2/-2] grid grid-cols-5">
              {items.map((it) => (
                <div key={it.title} className="relative h-64 snap-start border-l border-solid border-white-500 pl-4 pr-6">
                  <span aria-hidden="true" className="absolute -left-px top-0 h-6 w-px bg-black-300" />
                  <h3 className="text-lg font-semibold text-black-300">{it.title}</h3>
                  <p className="mt-2 max-w-[22em] text-sm text-black-700">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="flex h-[100px] min-w-[1340px] justify-evenly lg:h-40 lg:min-w-0">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className="block h-full w-px bg-white-500" />
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[116px] bg-gradient-to-r from-white-100 to-transparent max-lg:w-8" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[116px] bg-gradient-to-l from-white-100 to-transparent max-lg:w-8" />
      </div>
    </LegacyBlock>
  )
}

export { DashedV, LegacyHeading }
