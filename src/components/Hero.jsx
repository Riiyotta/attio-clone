import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { assets } from '../assets.js'
import { ease, observeInView, reducedMotion } from '../motion/index.js'
import { Button, ChevronDownIcon, ChevronRightIcon } from './ui.jsx'
import { AvatarStack, Chip, Company, CompanyGlyph, Icon, Initials } from './mock.jsx'

// Placeholder copy matched to spec character/word counts (section 2b).
const BADGE = 'See what shipped with the new release' // c37 w7
const H1 = 'Organize the whole workflow' // c27 w4
const SUBHEAD =
  'A flexible workspace for modern teams to organize records, automate busy work, see what matters.' // c96 w15

export default function Hero() {
  const ref = useRef(null)
  // M3: live toggles data-hero-scrolling as soon as scrollY > 0 (measured at 1px) and removes it at 0.
  useEffect(() => {
    const el = ref.current
    const onScroll = () => {
      if (window.scrollY > 0) el.setAttribute('data-hero-scrolling', '')
      else el.removeAttribute('data-hero-scrolling')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section ref={ref} data-motion="hero" className="relative border-b border-solid border-white-500 bg-white-100">
      <div className="relative grid grid-cols-1">
        <HeroBackground />

        <div className="relative z-[1] col-start-1 row-start-1 flex flex-col">
          {/* 2b text block. Desktop margin-bottom is derived from measurements (see report). */}
          <div
            data-motion="hero-text"
            className="z-[1] flex flex-col items-center justify-center gap-7 px-6 pt-16 text-center md:sticky md:top-[var(--site-header-height)] md:mb-[calc(-1*min(8px_+_20svh,_50svh_-_261px))] md:min-h-[clamp(320px,calc(40svh_-_var(--site-header-height)),520px)] md:gap-6 md:px-14 md:pt-[10svh] lg:mb-[calc(128px_-_min(8px_+_20svh,_50svh_-_261px))] lg:px-[58px] lg:pt-24"
          >
            <div className="flex flex-col items-center gap-8 md:gap-9">
              <HeroBadge />
              <h1
                data-motion="hero-h1"
                className="font-display text-hero-sm text-black-100 md:text-hero-md lg:text-hero"
              >
                {H1}
              </h1>
            </div>
            <p
              data-motion="hero-subhead"
              className="-mt-1 max-w-[486px] text-subhead-sm text-black-700 md:mt-3 md:text-subhead"
            >
              {SUBHEAD}
            </p>

            {/* >= md: two buttons. < md: stacked email form + inline link (measured at 390). */}
            <div data-motion="hero-cta" className="hidden flex-wrap items-center justify-center gap-x-2.5 gap-y-2 md:flex">
              <Button variant="outline">Take the tour</Button>
              <Button variant="primary">Start it today</Button>
            </div>
            <div data-motion="hero-cta-mobile" className="flex w-full flex-col items-center gap-y-2 md:hidden">
              <form className="grid w-[320px] max-w-full grid-cols-1 gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Work email"
                  className="h-10 w-full rounded-10 border border-solid border-white-700 bg-white-100 px-[13px] py-2.5 text-sm text-black-100 outline-none placeholder:text-black-800"
                />
                <Button as="button" type="submit" variant="primary" className="h-10 w-full gap-1.5">
                  <span>Start it today</span>
                </Button>
              </form>
              <Button variant="ghost" className="gap-1.5 pl-3 pr-2">
                <span>Take the tour</span>
                <ChevronDownIcon size={18} className="-rotate-90" />
              </Button>
            </div>
          </div>

          <HeroWindowScene />
        </div>
      </div>
    </section>
  )
}

function HeroBackground() {
  // 2a: three stacked layers. Sticky at >= md; covers the whole section below md (measured at 390).
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 col-start-1 row-start-1 overflow-hidden md:sticky md:inset-auto md:top-[var(--site-header-height)] md:h-[calc(100svh_-_var(--site-header-height))] md:self-start"
    >
      <div className="absolute inset-0 bg-hero-glow opacity-40" />
      <div className="absolute inset-0 bg-hero-pinstripe opacity-40" />
      <div className="absolute left-[-150%] top-0 h-[150%] w-[400%] bg-hero-white-fade" />
    </div>
  )
}

/**
 * M2 badge comet, sampled from the live --x / --angle custom properties: the conic origin travels
 * linearly at 150px/s along the pill's centre line between x = 13 and x = width - 15, pointing
 * -80deg while moving right and 100deg while moving left; at each end the angle turns +180deg over
 * 320ms (ease-in-out). Full loop ~4.0s at the 283px badge.
 */
function useBadgeComet(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const SPEED = 150 // px/s
    const TURN = 320 // ms
    const X0 = 13
    let raf = 0
    let last = 0
    let visible = true
    // Start where the static rest state is drawn (x 190.4, 100deg = moving left).
    let x = 190.411
    let dir = -1
    let turnT = -1 // >= 0 while turning
    let angle = 100
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 64) : 0
      last = now
      const x1 = el.offsetWidth - 15
      if (turnT >= 0) {
        turnT += dt
        const p = Math.min(turnT / TURN, 1)
        // dir is the direction we are turning *to*: 100 -> 280 (= -80) at the left end, -80 -> 100 at the right
        angle = (dir > 0 ? 100 : -80) + 180 * ease.inOut(p)
        if (p >= 1) {
          turnT = -1
          angle = dir > 0 ? -80 : 100
        }
      } else {
        x += (dir * SPEED * dt) / 1000
        if (dir < 0 && x <= X0) {
          x = X0
          dir = 1
          turnT = 0
        } else if (dir > 0 && x >= x1) {
          x = x1
          dir = -1
          turnT = 0
        }
      }
      el.style.setProperty('--badge-x', `${x.toFixed(3)}px`)
      el.style.setProperty('--badge-angle', `${angle.toFixed(3)}deg`)
    }
    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onVis = () => (document.hidden ? stop() : start())
    const off = observeInView(el, (inView) => {
      visible = inView
      inView ? start() : stop()
    })
    document.addEventListener('visibilitychange', onVis)
    start()
    return () => {
      stop()
      off()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [ref])
}

function HeroBadge() {
  const gradientRef = useRef(null)
  useBadgeComet(gradientRef)
  return (
    <a
      href="#"
      data-motion="hero-badge"
      className="group relative inline-flex rounded-13 border border-solid border-white-400 transition-colors duration-300 ease-in-out active:border-white-500"
    >
      {/* Conic "comet" border layer; --badge-angle / --badge-x are the M2 hooks. */}
      <span ref={gradientRef} data-motion="hero-badge-gradient" aria-hidden="true" className="hero-badge-gradient absolute -inset-px rounded-13" />
      <span className="relative flex items-center gap-1 rounded-13 bg-white-100 py-[5px] pl-[11px] pr-[7px] transition-colors duration-300 ease-in-out hover:bg-badge-hover">
        <span className="whitespace-nowrap text-badge text-black-300">{BADGE}</span>
        {/* Live: chevron nudges 1px LEFT on hover (50ms in, 300ms out) */}
        <ChevronRightIcon size={12} className="text-black-300 transition-transform duration-300 ease-in-out group-hover:-translate-x-px group-hover:duration-[50ms] group-active:translate-x-0 motion-reduce:transition-none" />
      </span>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* 2c product window scene                                              */
/* ------------------------------------------------------------------ */

function TrafficLights({ compact = false }) {
  const d = compact ? 'h-1.5 w-1.5' : 'h-3 w-3'
  return (
    <div className={`absolute flex ${compact ? 'left-1.5 top-[5px] gap-[3px]' : 'left-2 top-2.5 gap-1.5'}`} aria-hidden="true">
      <span className={`${d} rounded-full bg-traffic-red`} />
      <span className={`${d} rounded-full bg-traffic-yellow`} />
      <span className={`${d} rounded-full bg-traffic-green`} />
    </div>
  )
}

/** Window shell: translucent frame, 32px title bar with three dots, white content area. */
function WindowShell({ dark = false, compact = false, className = '', contentClassName = '', children, ...rest }) {
  return (
    <div
      className={`backdrop-blur-[12px] will-change-transform ${
        dark ? 'bg-window-shell-dark' : 'bg-window-shell'
      } ${compact ? 'rounded-8 px-[3px] pb-[3px]' : 'rounded-16 px-1.5 pb-1.5'} shadow-hero-window ${className}`}
      {...rest}
    >
      <div className={`relative ${compact ? 'h-4' : 'h-8'}`}>
        <TrafficLights compact={compact} />
      </div>
      <div
        className={`overflow-hidden border border-solid border-window-hairline ${compact ? 'rounded-6' : 'rounded-12'} ${
          dark ? 'bg-black-50' : 'bg-white-100'
        } ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  )
}

function HeroWindowScene() {
  return (
    <div
      data-motion="hero-window-scene"
      className="relative z-[2] flex items-center pb-6 pt-10 md:sticky md:top-0 md:h-[100svh] md:justify-center md:pb-20 md:pt-[var(--site-header-height)]"
    >
      {/* Desktop (>= lg): main window sized to 75vw (derived: 1080 @1440, 960 @1280) + three side windows */}
      <div className="relative hidden w-[75vw] lg:block">
        <WindowShell
          data-motion="hero-main-window"
          className="relative z-[3] origin-center"
        >
          <ScaledCanvas asset={assets.heroAppScreen}>
            <AppMock />
          </ScaledCanvas>
        </WindowShell>

        <WindowShell
          data-motion="hero-side-window"
          data-window="chat"
          className="absolute left-[-160px] top-[-16px] z-[2] w-[268px] max-w-[268px] origin-bottom-right"
          contentClassName="h-[154px]"
        >
          <SlotOr asset={assets.heroChatWindow}>
            <ChatMock />
          </SlotOr>
        </WindowShell>

        <WindowShell
          data-motion="hero-side-window"
          data-window="call"
          className="absolute right-[-160px] top-10 z-[1] w-[272px] max-w-[272px] origin-bottom-left"
          contentClassName="h-[333px]"
        >
          <SlotOr asset={assets.heroCallWindow}>
            <CallMock />
          </SlotOr>
        </WindowShell>

        <WindowShell
          dark
          data-motion="hero-side-window"
          data-window="terminal"
          className="absolute bottom-8 left-[-128px] z-[4] w-[300px] max-w-[300px] origin-top-right"
          contentClassName="h-[277px]"
        >
          <SlotOr asset={assets.heroTerminalWindow}>
            <TerminalMock />
          </SlotOr>
        </WindowShell>
      </div>

      {/* Below lg: mobile scene (not measured beyond the main box). 510x398 centred at md; 374x315 flush right at < md. */}
      <WindowShell
        compact
        data-motion="hero-main-window-mobile"
        className="ml-4 w-[calc(100%_-_16px)] rounded-r-none pr-0 md:ml-0 md:w-[510px] md:rounded-r-8 md:pr-[3px] lg:hidden"
        contentClassName="h-[296px] md:h-[379px] max-md:rounded-r-none"
      >
        <SlotOr asset={assets.heroMobileScreen}>
          <MobileAppMock />
        </SlotOr>
      </WindowShell>
    </div>
  )
}

function SlotOr({ asset, children }) {
  if (asset.src) return <img src={asset.src} alt={asset.alt} className="h-full w-full object-cover" />
  return children
}

/** Renders a fixed 1152x626 canvas scaled to the available width (transform-origin top-left). */
function ScaledCanvas({ asset, children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0.925)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / asset.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [asset.width])
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: asset.height * scale }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: asset.width, height: asset.height, transform: `scale(${scale})` }}
      >
        {asset.src ? <img src={asset.src} alt={asset.alt} className="h-full w-full object-cover" /> : children}
      </div>
    </div>
  )
}

/* ---------- Original product mock: fictional "Corvale" CRM (invented data) ---------- */

const NAV_MAIN = [
  ['home', 'Home'],
  ['inbox', 'Inbox', 4],
  ['task', 'Tasks', 3],
  ['note', 'Notes'],
  ['chart', 'Reports'],
  ['flow', 'Automations'],
]
const NAV_RECORDS = [
  ['building', 'Companies'],
  ['users', 'People'],
  ['coin', 'Deals', null, true],
]
const NAV_LISTS = [
  ['blue', 'Enterprise pipeline'],
  ['amber', 'Q4 renewals'],
  ['teal', 'Partner sourced'],
  ['iris', 'Expansion bets'],
]

function SideItem({ icon, label, count, active, dot }) {
  return (
    <div className={`flex h-7 items-center gap-2 rounded-8 px-2 text-mock-md ${active ? 'bg-white-100 text-black-100 shadow-mock-chip' : 'text-black-500'}`}>
      {dot ? <span className={`ml-[3px] mr-[3px] h-2 w-2 rounded-[3px] ${{ blue: 'bg-blue-500', amber: 'bg-traffic-yellow', teal: 'bg-art-teal', iris: 'bg-art-iris' }[dot]}`} /> : <Icon name={icon} size={14} className={active ? 'text-black-100' : 'text-black-700'} />}
      <span className="truncate">{label}</span>
      {count && <span className="ml-auto rounded-4 bg-white-400 px-1 text-mock-xs text-black-600">{count}</span>}
    </div>
  )
}

const STAGES = [
  {
    name: 'Discovery',
    tone: 'blue',
    total: '$186k',
    cards: [
      { co: 'lumenaut', title: 'Platform rollout', value: '$64,000', date: 'Nov 14', owner: ['Maya Chen', 'blue'], tag: ['Inbound', 'grey'] },
      { co: 'marigold', title: 'Studio seats', value: '$12,400', date: 'Nov 21', owner: ['Ade Okafor', 'amber'], tag: ['Referral', 'iris'] },
      { co: 'vesper', title: 'Fleet pilot', value: '$38,000', date: 'Dec 02', owner: ['Jonas Weber', 'teal'] },
    ],
  },
  {
    name: 'Qualified',
    tone: 'iris',
    total: '$241k',
    cards: [
      { co: 'tidewell', title: 'Advisor workspace', value: '$96,000', date: 'Nov 30', owner: ['Priya Nair', 'iris'], tag: ['Champion', 'green'] },
      { co: 'orchard', title: 'Data sync add-on', value: '$19,000', date: 'Nov 18', owner: ['Maya Chen', 'blue'] },
      { co: 'quarry', title: 'Team expansion', value: '$41,500', date: 'Dec 09', owner: ['Leo Brandt', 'red'], tag: ['At risk', 'red'] },
    ],
  },
  {
    name: 'Proposal',
    tone: 'amber',
    total: '$132k',
    cards: [
      { co: 'halcyon', title: 'Ops annual plan', value: '$48,000', date: 'Nov 08', owner: ['Jonas Weber', 'teal'], tag: ['Pricing sent', 'amber'], live: true },
      { co: 'brightwater', title: 'Research seats', value: '$32,500', date: 'Nov 12', owner: ['Ade Okafor', 'amber'] },
      { co: 'kettle', title: 'Wholesale CRM', value: '$22,800', date: 'Nov 26', owner: ['Priya Nair', 'iris'], tag: ['Legal review', 'grey'] },
    ],
  },
  {
    name: 'Negotiation',
    tone: 'teal',
    total: '$158k',
    cards: [
      { co: 'pinecrest', title: 'Clinic network', value: '$112,000', date: 'Nov 05', owner: ['Maya Chen', 'blue'], tag: ['Security OK', 'green'] },
      { co: 'tidewell', title: 'Treasury team', value: '$46,000', date: 'Nov 19', owner: ['Leo Brandt', 'red'] },
    ],
  },
  {
    name: 'Won',
    tone: 'green',
    total: '$304k',
    cards: [
      { co: 'orchard', title: 'Growth plan', value: '$58,000', date: 'Oct 28', owner: ['Priya Nair', 'iris'] },
      { co: 'lumenaut', title: 'Pilot', value: '$9,600', date: 'Oct 21', owner: ['Maya Chen', 'blue'] },
    ],
  },
]

function DealCard({ card }) {
  return (
    <div className={`flex flex-col gap-2 rounded-10 border border-solid bg-white-100 p-2.5 shadow-mock-chip ${card.live ? 'border-blue-300' : 'border-transparent'}`}>
      <div className="flex items-center justify-between gap-2">
        <Company id={card.co} size={16} textClass="text-mock-base font-medium text-black-100" />
        <Icon name="dots" size={14} className="text-black-900" strokeWidth={2.2} />
      </div>
      <p className="text-mock-base text-black-600">{card.title}</p>
      <div className="flex items-center gap-1.5">
        <span className="text-mock-md font-semibold text-black-100">{card.value}</span>
        {card.tag && (
          <Chip tone={card.tag[1]} className="ml-auto">
            {card.tag[0]}
          </Chip>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-solid border-mock-stroke pt-2">
        <span className="flex items-center gap-1 text-mock-sm text-black-700">
          <Icon name="calendar" size={12} />
          {card.date}
        </span>
        <Initials name={card.owner[0]} tone={card.owner[1]} size={18} />
      </div>
    </div>
  )
}

function AppMock() {
  // 272px sidebar / 880px main (spec 2c)
  return (
    <div className="grid h-full grid-cols-[272px_880px] text-black-100">
      <aside className="flex flex-col border-r border-solid border-mock-stroke bg-mock-surface">
        <div className="flex h-11 items-center gap-2 border-b border-solid border-mock-stroke pl-3 pr-3">
          <CompanyGlyph shape="orbit" tone="dark" size={20} />
          <span className="text-mock-md font-semibold">Fernhill Co.</span>
          <Icon name="chevronDown" size={12} className="text-black-700" />
          <Icon name="sidebar" size={15} className="ml-auto text-black-800" />
        </div>
        <div className="flex h-11 items-center px-2.5">
          <div className="flex h-[26px] w-full items-center gap-1.5 rounded-8 bg-white-100 pl-2 pr-1 text-mock-base text-black-800 shadow-mock-chip">
            <Icon name="search" size={13} />
            <span>Search</span>
            <span className="ml-auto rounded-4 border border-solid border-white-500 px-1 text-mock-xs text-black-700">⌘K</span>
          </div>
        </div>
        <div className="flex flex-col gap-px px-2.5">
          {NAV_MAIN.map(([ic, l, c]) => (
            <SideItem key={l} icon={ic} label={l} count={c} />
          ))}
        </div>
        <p className="mb-1 mt-4 px-[19px] text-mock-sm text-black-800">Records</p>
        <div className="flex flex-col gap-px px-2.5">
          {NAV_RECORDS.map(([ic, l, c, a]) => (
            <SideItem key={l} icon={ic} label={l} count={c} active={a} />
          ))}
        </div>
        <p className="mb-1 mt-4 px-[19px] text-mock-sm text-black-800">Lists</p>
        <div className="flex flex-col gap-px px-2.5">
          {NAV_LISTS.map(([d, l]) => (
            <SideItem key={l} dot={d} label={l} />
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-solid border-mock-stroke px-3 py-2.5">
          <Initials name="Maya Chen" tone="blue" size={22} />
          <div className="flex flex-col">
            <span className="text-mock-base">Maya Chen</span>
            <span className="text-mock-xs text-black-800">Account executive</span>
          </div>
          <Icon name="settings" size={14} className="ml-auto text-black-800" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col overflow-hidden">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-solid border-mock-stroke pl-4 pr-3">
          <div className="flex items-center gap-1.5 text-mock-md">
            <Icon name="coin" size={15} className="text-black-600" />
            <span className="text-black-700">Deals</span>
            <Icon name="chevronRight" size={12} className="text-black-900" />
            <span className="font-medium">Sales pipeline</span>
            <Icon name="star" size={13} className="ml-1 text-traffic-yellow" />
          </div>
          <div className="flex items-center gap-2">
            <AvatarStack people={[['Maya Chen', 'blue'], ['Jonas Weber', 'teal'], ['Priya Nair', 'iris']]} size={22} />
            <span className="flex h-7 items-center rounded-8 border border-solid border-white-500 px-2.5 text-mock-base text-black-500">Share</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-8 text-black-700">
              <Icon name="dots" size={16} strokeWidth={2.2} />
            </span>
          </div>
        </div>
        <div className="flex h-11 shrink-0 items-center gap-1 border-b border-solid border-mock-stroke px-3">
          {[
            ['board', 'Board', true],
            ['list', 'Table'],
            ['chart', 'Forecast'],
          ].map(([ic, l, a]) => (
            <span key={l} className={`flex h-7 items-center gap-1.5 rounded-8 px-2 text-mock-base ${a ? 'bg-white-300 text-black-100' : 'text-black-700'}`}>
              <Icon name={ic} size={13} />
              {l}
            </span>
          ))}
          <span className="mx-1 h-4 w-px bg-white-500" />
          <span className="flex h-6 items-center gap-1 rounded-6 border border-dashed border-white-700 px-1.5 text-mock-sm text-black-600">
            <Icon name="filter" size={12} /> Owner is me +2
          </span>
          <span className="flex h-6 items-center gap-1 rounded-6 bg-blue-100 px-1.5 text-mock-sm text-blue-600">
            Close date: this quarter
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="flex h-7 items-center gap-1 rounded-8 px-2 text-mock-base text-black-600">
              <Icon name="sort" size={13} /> Sort
            </span>
            <span className="flex h-7 items-center gap-1 rounded-8 bg-black-200 px-2.5 text-mock-base text-white-200">
              <Icon name="plus" size={13} /> New deal
            </span>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 gap-2.5 bg-mock-surface px-3 pt-3">
          {STAGES.map((st) => (
            <div key={st.name} className="flex w-[204px] shrink-0 flex-col gap-2 rounded-12 bg-white-300/70 p-1.5">
              <div className="flex h-7 items-center gap-1.5 px-1.5">
                <Chip tone={st.tone}>{st.name}</Chip>
                <span className="text-mock-sm text-black-800">{st.cards.length + 2}</span>
                <span className="ml-auto text-mock-sm font-medium text-black-600">{st.total}</span>
              </div>
              {st.cards.map((c) => (
                <DealCard key={c.co + c.title} card={c} />
              ))}
              <span className="flex h-7 items-center gap-1 px-1.5 text-mock-base text-black-800">
                <Icon name="plus" size={12} /> Add deal
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChatMock() {
  return (
    <div className="flex h-full flex-col text-black-100">
      <div className="flex h-7 shrink-0 items-center gap-1 border-b border-solid border-mock-stroke px-2.5 text-mock-base font-semibold">
        <Icon name="hash" size={12} className="text-black-700" />
        deal-desk
        <span className="ml-auto rounded-full bg-blue-500 px-1.5 text-mock-2xs font-medium text-white-100">2 new</span>
      </div>
      <div className="flex flex-col gap-2 px-2.5 pt-2">
        <div className="flex gap-2">
          <Initials name="Jonas Weber" tone="teal" size={22} />
          <div className="min-w-0">
            <p className="text-mock-sm">
              <span className="font-semibold">Jonas Weber</span> <span className="text-black-800">9:41</span>
            </p>
            <p className="text-mock-sm text-black-500">Halcyon signed the annual plan. Can someone close it out?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CompanyGlyph shape="orbit" tone="dark" size={22} radius="rounded-6" />
          <div className="min-w-0 flex-1">
            <p className="text-mock-sm">
              <span className="font-semibold">Corvale</span> <span className="rounded-4 bg-white-300 px-1 text-mock-2xs text-black-600">APP</span>
            </p>
            <div className="mt-1 flex items-center gap-1.5 rounded-8 border border-solid border-white-500 px-1.5 py-1">
              <Company id="halcyon" size={14} textClass="text-mock-sm font-medium" />
              <Chip tone="green" className="ml-auto h-4 text-mock-2xs">Won</Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TRANSCRIPT = [
  ['Ada Lindqvist', 'teal', '12:02', 'We run about forty analysts today, and the handoffs are where we lose time.'],
  ['Maya Chen', 'blue', '12:19', 'Makes sense. Would a shared pipeline view per region help?'],
  ['Ada Lindqvist', 'teal', '12:31', 'Yes, as long as security signs off before we roll it out to everyone.'],
]

function CallMock() {
  return (
    <div className="flex h-full flex-col text-black-100">
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-solid border-white-500 px-2.5 text-mock-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-traffic-red" />
        <span className="font-medium">Recording</span>
        <span className="text-black-800">12:48</span>
        <span className="ml-auto truncate text-black-700">Brightwater · Discovery</span>
      </div>
      <div className="px-1.5 pt-1.5">
        <div className="grid h-[138px] grid-cols-2 gap-1 rounded-6 bg-black-100 p-1">
          {[
            ['Ada Lindqvist', 'teal', true],
            ['Maya Chen', 'blue'],
          ].map(([n, t, speaking]) => (
            <div key={n} className={`relative flex items-center justify-center rounded-4 bg-black-300 ${speaking ? 'ring-1 ring-art-teal' : ''}`}>
              <Initials name={n} tone={t} size={40} />
              <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded-4 bg-black-0/50 px-1 text-mock-2xs text-white-200">
                {speaking && <Icon name="mic" size={9} />}
                {n.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex h-[27px] shrink-0 items-center gap-3 border-b border-solid border-white-500 px-2.5 text-mock-sm">
        <span className="flex h-full items-center border-b border-solid border-black-100 font-medium">Transcript</span>
        <span className="text-black-800">Summary</span>
        <span className="ml-auto flex items-center gap-1 text-blue-600">
          <Icon name="sparkle" size={11} /> Notes
        </span>
      </div>
      <div className="flex flex-col gap-2.5 px-2.5 pt-2.5">
        {TRANSCRIPT.map(([n, t, time, text], i) => (
          <div key={i} className="flex gap-2">
            <Initials name={n} tone={t} size={18} />
            <div className="min-w-0">
              <p className="text-mock-sm">
                <span className="font-medium">{n}</span> <span className="text-black-900">{time}</span>
              </p>
              <p className="text-mock-sm text-black-600">{text}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-1.5 rounded-8 bg-blue-100 px-2 py-1.5 text-mock-sm text-blue-600">
          <Icon name="sparkle" size={12} />
          Next step: security review by Nov 12
        </div>
      </div>
    </div>
  )
}

// Live caret: WAAPI opacity [1, 0], 550ms ease-out, iterations Infinity, direction normal, fill both.
function TerminalCaret() {
  const ref = useRef(null)
  useEffect(() => {
    if (reducedMotion()) return
    const a = ref.current?.animate({ opacity: [1, 0] }, { duration: 550, easing: 'ease-out', iterations: Infinity, fill: 'both' })
    return () => a?.cancel()
  }, [])
  return <span ref={ref} data-motion="hero-terminal-caret" className="inline-block h-3 w-1.5 translate-y-0.5 bg-black-800" />
}

function TerminalMock() {
  // JetBrains Mono 10/15 #8f99a8 (measured type). Invented CLI for the fictional product.
  const ok = <span className="text-traffic-green">✓</span>
  return (
    <div className="flex h-full flex-col font-mono text-terminal text-black-800">
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden px-3 py-2.5">
        <p className="rounded-2 bg-black-300 px-1 py-0.5 text-white-500">
          <span className="text-black-700">$</span> corvale sync deals --since 7d
        </p>
        <div className="pl-2">
          <p>{ok} fetched 1,284 records <span className="text-black-600">0.8s</span></p>
          <p>{ok} matched 312 companies</p>
          <p><span className="text-blue-400">↻</span> updated 47 deals</p>
        </div>
        <p className="rounded-2 bg-black-300 px-1 py-0.5 text-white-500">
          <span className="text-black-700">$</span> corvale query <span className="text-art-teal">"stage = proposal"</span>
        </p>
        <div className="rounded-6 border border-solid border-black-400 px-1.5 py-1">
          <p className="whitespace-pre text-black-600">NAME             VALUE  OWNER</p>
          <p className="whitespace-pre text-white-500">Halcyon Freight  48.0k  MC</p>
          <p className="whitespace-pre text-white-500">Brightwater Labs 32.5k  AO</p>
          <p className="whitespace-pre text-white-500">Kettle &amp; Kiln    22.8k  PN</p>
        </div>
        <p className="pl-2 text-black-600">3 rows · 41ms</p>
      </div>
      <div className="border-t border-solid border-black-400 px-3 pb-3 pt-2.5">
        <p>
          <span className="text-white-500">❯</span> <TerminalCaret />
        </p>
      </div>
    </div>
  )
}

function MobileAppMock() {
  const rows = [
    ['halcyon', '$48,000', ['Proposal', 'amber']],
    ['pinecrest', '$112,000', ['Negotiation', 'teal']],
    ['tidewell', '$96,000', ['Qualified', 'iris']],
    ['lumenaut', '$64,000', ['Discovery', 'blue']],
    ['orchard', '$58,000', ['Won', 'green']],
    ['brightwater', '$32,500', ['Proposal', 'amber']],
    ['vesper', '$38,000', ['Discovery', 'blue']],
    ['kettle', '$22,800', ['Proposal', 'amber']],
  ]
  return (
    <div className="flex h-full flex-col text-black-100">
      <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-solid border-mock-stroke px-2.5 text-mock-sm">
        <CompanyGlyph shape="orbit" tone="dark" size={16} radius="rounded-4" />
        <span className="font-semibold">Deals</span>
        <Icon name="chevronRight" size={10} className="text-black-900" />
        <span className="text-black-700">Sales pipeline</span>
        <Initials name="Maya Chen" tone="blue" size={16} className="ml-auto" />
      </div>
      <div className="flex shrink-0 items-center gap-1 px-2.5 py-2 text-mock-xs">
        <span className="rounded-6 bg-white-300 px-1.5 py-0.5">Table</span>
        <span className="px-1.5 text-black-700">Board</span>
        <span className="ml-auto rounded-6 bg-black-200 px-1.5 py-0.5 text-white-200">+ New</span>
      </div>
      <div className="mx-2.5 flex flex-col overflow-hidden rounded-8 border border-solid border-mock-stroke">
        <div className="flex h-6 items-center bg-mock-surface px-2 text-mock-2xs text-black-700">
          <span className="flex-1">Company</span>
          <span className="w-[72px]">Stage</span>
          <span className="w-14 text-right">Value</span>
        </div>
        {rows.map(([id, v, [st, t]]) => (
          <div key={id} className="flex h-8 items-center border-t border-solid border-mock-stroke px-2">
            <Company id={id} size={14} className="flex-1" textClass="text-mock-xs font-medium" />
            <span className="w-[72px]">
              <Chip tone={t} className="h-4 text-mock-2xs">{st}</Chip>
            </span>
            <span className="w-14 text-right text-mock-xs font-medium">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
