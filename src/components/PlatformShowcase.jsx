import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { assets } from '../assets.js'
import { Eyebrow } from './ui.jsx'
import { EASE_OUT_CUBIC, reducedMotion, revealOnView } from '../motion/index.js'
import { AvatarStack, Chip, Company, CompanyGlyph, Icon, Initials, Meter, Sparkline, Tag, toneOf } from './mock.jsx'

// Section 4. Placeholder copy matched to spec counts.
const INTRO_LEAD = 'A single workspace across every pipeline.' // c41 w6
const INTRO_CONT =
  ' Keep records, tasks and notes together in one place so each teammate works off a shared view.' // c94 w17

const ARTICLES = [
  {
    id: 'showcase-find-demand',
    nav: 'Spark interest', // c14
    lead: 'Find new demand early.', // c22
    cont: ' Spot promising accounts as they appear, enrich them on arrival and route them to the right owner.', // c97
    asset: 'showcaseIllustration1',
    Mock: IllustrationTable,
    reveal: 0.4,
    sub: [
      ['Leads enriched promptly', 'New companies and people are filled in with helpful details the moment they arrive.', 'showcaseSubVisual1a'],
      ['Route to the right rep', 'Simple rules send every new account to the one person best placed to help.', 'showcaseSubVisual1b'],
    ],
  },
  {
    id: 'showcase-qualify-leads',
    nav: 'Qualify leads', // c13
    lead: 'Qualify every lead quickly.', // c27
    cont: ' Score new interest, check fit against your own rules and hand off the best leads fast.', // c86
    asset: 'showcaseIllustration2',
    Mock: IllustrationRadar,
    reveal: 0.4,
  },
  {
    id: 'showcase-run-playbook',
    nav: 'Run your playbook', // c17
    lead: 'Run a repeatable plan daily.', // c28
    cont: ' Turn your best habits into shared sequences that guide each rep through the next steps.', // c87
    asset: 'showcaseIllustration3',
    Mock: IllustrationColumns,
    reveal: 0.31,
    aspect: true,
    sub: [
      ['Steps that adjust to input', 'Steps pause, branch or continue depending upon how every contact responds.', 'showcaseSubVisual3a'],
      ['Reminders that keep tempo', 'Gentle nudges surface the next action so nothing slips between hectic meetings.', 'showcaseSubVisual3b'],
    ],
  },
  {
    id: 'showcase-forecast',
    nav: 'Forecast results', // c16
    lead: 'Forecast the quarter with certainty', // c35
    cont: ' Roll up pipeline by stage, owner and segment, then compare commits against targets as weeks go past.', // c100
    asset: 'showcaseIllustration4',
    Mock: IllustrationReport,
    reveal: 0.4,
  },
  {
    id: 'showcase-grow-accounts',
    nav: 'Grow the accounts', // c17
    lead: 'Keep and grow accounts.', // c23 (c~22 in spec)
    cont: ' Track usage and health signals to step in early and expand the right accounts.', // c80 w14
    asset: 'showcaseIllustration5',
    Mock: IllustrationStack,
    reveal: 0.4,
    aspect: true,
    sub: [
      ['Health scores at once', 'Usage, sentiment and support trends combine into one simpler view of health.', 'showcaseSubVisual5a', 'roller'],
      ['Every growth signal kept in one view', 'Upgrades, new seats and team growth appear as they happen so you can react.', 'showcaseSubVisual5b'],
    ],
  },
]

export default function PlatformShowcase() {
  const [active, setActive] = useState(0)

  // M6 scroll-spy (measured): an article becomes active once its top edge crosses 45% of the
  // viewport height (switch observed between top = 404px and 406px at 1440x900).
  useEffect(() => {
    const els = ARTICLES.map((a) => document.getElementById(a.id)).filter(Boolean)
    let raf = 0
    let last = -1
    const update = (sync = false) => {
      raf = 0
      const line = window.innerHeight * 0.45
      let idx = 0
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) idx = i
      })
      if (idx !== last) {
        last = idx
        if (sync) flushSync(() => setActive(idx))
        else setActive(idx)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => update())
    }
    // scroll events are already frame-aligned; updating synchronously removes an extra frame of lag
    // (live indicator starts ~28ms after the scroll crossing)
    const onScrollNow = () => {
      cancelAnimationFrame(raf)
      raf = 0
      update(true)
    }
    update()
    window.addEventListener('scroll', onScrollNow, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScrollNow)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Indicator: framer shared-layout slide between items. Sampled live: translateY from the previous
  // item's offset to 0 over ~350ms, best fit cubic-bezier(.33,1,.68,1) (no overshoot).
  const listRef = useRef(null)
  const prevTop = useRef(null)
  useLayoutEffect(() => {
    const ind = listRef.current?.querySelector('[data-motion="showcase-nav-indicator"]')
    if (!ind) return
    const top = ind.parentElement.offsetTop
    if (prevTop.current !== null && prevTop.current !== top && !reducedMotion()) {
      // re-sampled: settles ~265ms after onset on live -> 320ms out-cubic (same as the label colour)
      ind.animate([{ transform: `translateY(${prevTop.current - top}px)` }, { transform: 'none' }], {
        duration: 320,
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
      })
    }
    prevTop.current = top
  }, [active])

  return (
    <section className="bg-white-200" data-section="platform-showcase">
      <div className="lg-container">
        <div className="flex flex-col border-solid border-white-500 lg:border-x">
          {/* 4a intro */}
          <div className="border-b border-solid border-white-500 px-[calc(100%/12)] pb-16 pt-[88px] lg:px-[calc(100%/24)] lg:pb-20 lg:pt-[152px]">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>Overview</Eyebrow>
              <h2 className="max-w-[896px] font-display text-section-sm lg:text-section">
                <span className="text-black-100">{INTRO_LEAD}</span>
                <span className="text-black-700">{INTRO_CONT}</span>
              </h2>
            </div>
          </div>

          {/* 4b showcase grid */}
          <div className="lg:grid lg:grid-cols-[repeat(24,minmax(0,1fr))]">
            <nav
              aria-label="Platform sections"
              className="sticky top-[var(--site-header-height)] z-30 -mb-px border-b border-solid border-white-500 bg-white-200 max-lg:shadow-attio-2 lg:col-[1/7] lg:mb-0 lg:grid lg:h-[calc(100vh_-_var(--site-header-height))] lg:grid-cols-subgrid lg:self-start lg:border-b-0 lg:border-r lg:pt-28"
            >
              {/* Desktop list */}
              <ol ref={listRef} className="hidden lg:col-[2/-1] lg:flex lg:flex-col lg:gap-2">
                {ARTICLES.map((a, i) => (
                  <li key={a.id}>
                    <a href={`#${a.id}`} className="group relative block py-1 pr-5 text-showcase-nav">
                      {i === active && (
                        <span
                          data-motion="showcase-nav-indicator"
                          aria-hidden="true"
                          className="absolute inset-y-0 left-[calc(-20%_-_1px)] w-0.5 bg-blue-400"
                        />
                      )}
                      <span
                        className={`transition-colors duration-[320ms] ease-out-cubic motion-reduce:transition-none ${
                          i === active ? 'text-black-100' : 'text-white-700 group-hover:text-black-700'
                        }`}
                      >
                        {a.nav}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
              {/* Below lg: horizontal sticky tab strip (53px incl. border) */}
              <ol className="no-scrollbar flex gap-px overflow-x-auto lg:hidden">
                {ARTICLES.map((a, i) => (
                  <li key={a.id} className="flex-1">
                    <a
                      href={`#${a.id}`}
                      className={`flex h-full items-center justify-center whitespace-nowrap px-5 py-4 text-sm transition-colors duration-200 ease-out ${
                        i === active
                          ? 'bg-white-300 text-black-100'
                          : 'bg-white-200 text-black-600 hover:bg-white-300 hover:text-black-100'
                      }`}
                    >
                      {a.nav}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="lg:col-[7/-1]">
              {ARTICLES.map((a) => (
                <Article key={a.id} article={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Article({ article }) {
  const { id, lead, cont, asset, Mock, aspect, sub, reveal } = article
  return (
    <article
      id={id}
      className="scroll-mt-[calc(var(--site-header-height)_+_88px)] border-b border-solid border-white-500 last:border-b-0 lg:scroll-mt-[var(--site-header-height)]"
    >
      <div className="px-[calc(100%/24)] pb-11 pt-16 lg:px-[calc(100%/18)] lg:pb-14 lg:pt-20 xl:pb-20 xl:pt-28">
        <h3 className="max-w-[560px] text-balance font-display text-showcase-h3">
          <span className="text-black-100">{lead}</span>
          <span className="text-black-700">{cont}</span>
        </h3>
      </div>

      <div className="select-none border-t border-solid border-white-500">
        <IllustrationPanel asset={assets[asset]} aspect={aspect} reveal={reveal}>
          <Mock />
        </IllustrationPanel>
      </div>

      {sub && (
        <div className="grid border-t border-solid border-white-500 bg-white-200 xl:grid-cols-2">
          {sub.map(([title, body, visual, kind], i) => (
            <SubCell
              key={title}
              className={`flex h-[360px] flex-col gap-8 lg:h-[480px] ${
                i === 0 ? 'border-b border-solid border-white-500 xl:border-b-0 xl:border-r' : ''
              }`}
            >
              <div className="px-[calc(100%/24)] pt-6 md:pt-11 lg:pl-[calc(100%/18)] lg:pr-8">
                <h4 className="text-card-title text-black-100">{title}</h4>
                <p className="mt-1 max-w-[352px] text-body text-black-800">{body}</p>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-8 pb-8">
                {assets[visual].src ? (
                  <img src={assets[visual].src} alt={assets[visual].alt} className="max-h-full max-w-full object-contain" />
                ) : kind === 'roller' ? (
                  <SignalRoller />
                ) : (
                  <SubCardMock visual={visual} />
                )}
              </div>
            </SubCell>
          ))}
        </div>
      )}
    </article>
  )
}

/** Sub-card cell; also the in-view root for its visual (live trigger: ~56% of the cell visible). */
function SubCell({ children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => revealOnView(ref.current, 0.56), [])
  return (
    <div ref={ref} data-hm-root="" {...rest}>
      {children}
    </div>
  )
}

/**
 * Illustration panel: bg #f3f4f6, 327 tall below lg / 654 at lg (or aspect 1044/654 for #3 and #5).
 * Mock content lives on a 1044x654 canvas anchored top-right (measured at 1280/768/390):
 * scale 1 at lg, 0.5 below lg; aspect panels scale to the panel width.
 */
function IllustrationPanel({ asset, aspect, reveal = 0.4, children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)
  // Live: framer whileInView on the 654px panel; reveals fire at ~40% panel visibility (31% for #3).
  useEffect(() => revealOnView(ref.current, reveal), [reveal])
  useLayoutEffect(() => {
    if (!aspect) return
    const el = ref.current
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1044))
    ro.observe(el)
    return () => ro.disconnect()
  }, [aspect])

  return (
    <div
      ref={ref}
      data-hm-root=""
      className={`relative w-full overflow-hidden bg-white-300 ${aspect ? 'aspect-[1044/654]' : 'h-[327px] lg:h-[654px]'}`}
    >
      {asset.src ? (
        <img src={asset.src} alt={asset.alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={asset.alt}
          className={`absolute right-0 top-0 h-[654px] w-[1044px] origin-top-right ${aspect ? '' : 'scale-50 lg:scale-100'}`}
          style={aspect ? { transform: `scale(${scale})` } : undefined}
        >
          {children}
        </div>
      )}
    </div>
  )
}

/* ---------- Original illustration mocks (fictional "Corvale" CRM; white cards on #f3f4f6) ---------- */

const ROWS1 = [
  ['lumenaut', [['Hiring', 'blue']], ['Maya Chen', 'blue'], 'Applied research tools for lab teams'],
  ['marigold', [['Web visit', 'grey']], ['Ade Okafor', 'amber'], 'Brand and packaging design studio'],
  ['vesper', [['Funding', 'green']], ['Jonas Weber', 'teal'], 'Shared e-scooter fleets for cities'],
  ['halcyon', [['Funding', 'green'], ['Hiring', 'blue']], ['Jonas Weber', 'teal'], 'Freight ops software for carriers', true],
  ['orchard', [['Trial', 'iris']], ['Priya Nair', 'iris'], 'Grocery demand planning platform'],
  ['quarry', [['Web visit', 'grey']], ['Leo Brandt', 'red'], 'Materials sourcing marketplace'],
  ['kettle', [['Hiring', 'blue']], ['Priya Nair', 'iris'], 'Wholesale ceramics and tableware'],
  ['tidewell', [['Intent', 'amber']], ['Maya Chen', 'blue'], 'Digital-first regional bank'],
  ['pinecrest', [['Trial', 'iris']], ['Ade Okafor', 'amber'], 'Outpatient clinic network'],
]

// #1: 756x457 table card at (71,73) + 340x465 side card at (623,110)
function IllustrationTable() {
  const fields = [
    ['building', 'Industry', 'Logistics software'],
    ['users', 'Employees', '240'],
    ['pin', 'Headquarters', 'Rotterdam, NL'],
    ['coin', 'Funding', 'Series B · $38M'],
    ['chart', 'Est. revenue', '$14M ARR'],
    ['globe', 'Domain', 'halcyonfreight.io'],
  ]
  return (
    <>
      <div data-hm-item="" data-hm-dur="680" data-hm-blur="2.5" className="absolute left-[71px] top-[73px] h-[457px] w-[756px] overflow-hidden rounded-12 bg-white-100 text-black-100">
        <div className="flex h-12 items-center gap-2 border-b border-solid border-mock-stroke px-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-6 bg-white-300">
            <Icon name="building" size={14} className="text-black-600" />
          </span>
          <span className="text-mock-lg font-medium">Companies</span>
          <span className="text-mock-md text-black-800">1,284</span>
          <div className="ml-auto flex items-center gap-2">
            <AvatarStack people={[['Maya Chen', 'blue'], ['Jonas Weber', 'teal']]} size={20} />
            <span className="flex h-7 items-center gap-1 rounded-8 border border-solid border-white-500 px-2 text-mock-base text-black-500">
              <Icon name="sparkle" size={13} className="text-blue-500" /> Enrich
            </span>
          </div>
        </div>
        <div className="flex h-12 items-center justify-between border-b border-solid border-mock-stroke px-3">
          <div className="flex items-center gap-1 text-mock-base">
            <span className="rounded-8 bg-white-300 px-2 py-1">All companies</span>
            <span className="px-2 py-1 text-black-700">New this week</span>
            <span className="rounded-4 bg-blue-100 px-1 text-mock-xs text-blue-600">38</span>
          </div>
          <span className="flex h-7 w-[79px] items-center justify-center gap-1 rounded-8 bg-black-100 text-mock-base text-white-200">
            <Icon name="plus" size={12} /> Import
          </span>
        </div>
        <div className="flex h-[37px] items-center border-b border-solid border-mock-stroke bg-mock-surface text-mock-sm text-black-700">
          {[
            ['building', 'Company', 175],
            ['bolt', 'Signals', 140],
            ['users', 'Owner', 160],
            ['note', 'Description', 280],
          ].map(([ic, l, w]) => (
            <span key={l} className="flex items-center gap-1.5 border-r border-solid border-mock-stroke px-[9px] last:border-r-0" style={{ width: w }}>
              <Icon name={ic} size={12} /> {l}
            </span>
          ))}
        </div>
        {ROWS1.map(([co, signals, [owner, tone], desc, sel]) => (
          <div key={co} className={`flex h-9 items-center border-b border-solid border-mock-stroke text-mock-base ${sel ? 'bg-blue-100/60' : ''}`}>
            <span className="w-[175px] px-[9px]">
              <Company id={co} size={16} textClass="text-mock-base font-medium" />
            </span>
            <span className="flex w-[140px] gap-1 px-[9px]">
              {signals.map(([s, t]) => (
                <Chip key={s} tone={t}>{s}</Chip>
              ))}
            </span>
            <span className="flex w-[160px] items-center gap-1.5 px-[9px] text-black-500">
              <Initials name={owner} tone={tone} size={18} /> {owner}
            </span>
            <span className="w-[280px] truncate px-[9px] text-black-600">{desc}</span>
          </div>
        ))}
      </div>
      <div data-hm-item="" data-hm-dur="340" data-hm-blur="2" data-hm-amount="0.49" className="absolute left-[623px] top-[110px] flex h-[465px] w-[340px] flex-col rounded-12 bg-white-100 text-black-100 shadow-mock-card">
        <div className="flex flex-col gap-3 px-4 pb-3 pt-4">
          <div className="flex items-center gap-2.5">
            <CompanyGlyph shape="wave" tone="blue" size={36} radius="rounded-10" />
            <div className="flex flex-col">
              <span className="text-mock-lg font-semibold">Halcyon Freight</span>
              <span className="text-mock-base text-black-700">halcyonfreight.io</span>
            </div>
            <Chip tone="green" className="ml-auto">Enriched</Chip>
          </div>
        </div>
        <div className="flex flex-col border-t border-solid border-mock-stroke px-4 py-2">
          {fields.map(([ic, k, v]) => (
            <div key={k} className="flex h-8 items-center gap-2 text-mock-base">
              <Icon name={ic} size={13} className="text-black-800" />
              <span className="w-[96px] text-black-700">{k}</span>
              <span className="truncate">{v}</span>
              <Icon name="sparkle" size={12} className="ml-auto text-blue-400" />
            </div>
          ))}
        </div>
        <div className="mx-3 mb-3 mt-auto flex flex-col gap-2.5 rounded-12 bg-white-200 p-3">
          <p className="flex items-center gap-1.5 text-mock-sm font-medium text-black-600">
            <Icon name="flow" size={12} /> Routing
          </p>
          <div className="flex items-center gap-2 text-mock-base">
            <Tag>EMEA</Tag>
            <Tag>200+ staff</Tag>
            <Icon name="arrowRight" size={12} className="text-black-800" />
            <Initials name="Jonas Weber" tone="teal" size={20} />
            <span className="font-medium">Jonas Weber</span>
          </div>
          <div className="flex items-center gap-2 rounded-8 bg-white-100 px-2.5 py-2 text-mock-base text-black-600 shadow-mock-chip">
            <Icon name="checkCircle" size={14} className="text-traffic-green" />
            Assigned and posted in #deal-desk
          </div>
        </div>
      </div>
    </>
  )
}

// #2: concentric rings + six lead cards (positions from the measured label boxes)
const LEADS = [
  ['Ada Lindqvist', 'teal', 'Head of Research · Brightwater', 92, 'green'],
  ['Tomás Reyes', 'amber', 'COO · Vesper Mobility', 78, 'blue'],
  ['Hana Sato', 'iris', 'VP Finance · Tidewell Bank', 88, 'green'],
  ['Felix Moreau', 'red', 'Founder · Marigold Studio', 54, 'amber'],
  ['Nadia Haddad', 'blue', 'Ops Lead · Halcyon Freight', 81, 'blue'],
  ['Owen Price', 'grey', 'Buyer · Kettle & Kiln', 37, 'grey'],
]
function IllustrationRadar() {
  const nodes = [
    [180, 120],
    [552, 120],
    [148, 316],
    [426, 320],
    [752, 316],
    [752, 510],
  ]
  return (
    <div data-hm-item="" data-hm-dur="680" data-hm-blur="2.5" className="absolute inset-0">
      <svg className="absolute inset-0" width="1044" height="654" viewBox="0 0 1044 654" aria-hidden="true">
        <defs>
          <radialGradient id="radar-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" className="text-blue-300" stopColor="currentColor" stopOpacity=".35" />
            <stop offset="1" className="text-blue-300" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="522" cy="327" r="330" fill="url(#radar-core)" />
        {[90, 170, 250, 330].map((r, i) => (
          <circle
            key={r}
            data-motion={i % 2 ? 'pipeline-radar-ring-outer' : 'pipeline-radar-ring-inner'}
            cx="522"
            cy="327"
            r={r}
            fill="none"
            className="stroke-white-700"
            strokeWidth="1"
          />
        ))}
        <path d="M522 0v654M0 327h1044" className="stroke-white-500" strokeDasharray="3 5" />
        {[
          [612, 297, 'fill-blue-500'],
          [380, 210, 'fill-blue-400'],
          [700, 460, 'fill-art-teal'],
          [330, 470, 'fill-white-900'],
          [770, 200, 'fill-white-900'],
          [455, 520, 'fill-blue-300'],
        ].map(([x, y, c]) => (
          <g key={`${x}${y}`}>
            <circle cx={x} cy={y} r="9" className={c} opacity=".18" />
            <circle cx={x} cy={y} r="3.5" className={c} />
          </g>
        ))}
      </svg>
      {nodes.map(([x, y], i) => {
        const [name, tone, role, score, st] = LEADS[i]
        return (
          <div
            key={i}
            data-motion="pipeline-radar-bob"
            className="absolute flex h-12 w-[228px] items-center gap-2.5 rounded-12 bg-white-100 px-2.5 text-black-100 shadow-mock-chip"
            // live bob durations 3800/4150/4500/4850ms with delays 1000/1650/2300/2950ms (4 nodes; cycled here)
            // + mount enter (live tailwindcss-animate `enter` 500ms ease, delays 0/120/240/360ms; cycled like the bob)
            style={{ left: x, top: y, '--bob-dur': `${3800 + (i % 4) * 350}ms`, '--bob-delay': `${1000 + (i % 4) * 650}ms`, '--enter-delay': `${(i % 4) * 120}ms` }}
          >
            <Initials name={name} tone={tone} size={28} />
            <div className="flex min-w-0 flex-col">
              <span className="text-mock-base font-medium">{name}</span>
              <span className="truncate text-mock-sm text-black-700">{role}</span>
            </div>
            <span className={`ml-auto flex h-6 min-w-[30px] items-center justify-center rounded-8 px-1 text-mock-base font-semibold ${toneOf(st).soft}`}>{score}</span>
          </div>
        )
      })}
    </div>
  )
}

// #3: horizontal 16px-gap row of sequence-step cards starting 57 in, 73 from top, overflowing right
const STEPS = [
  {
    h: 420,
    icon: 'mail',
    title: 'Intro email',
    day: 'Day 1',
    body: (
      <>
        <div className="flex flex-col gap-1.5 rounded-8 border border-solid border-mock-stroke bg-mock-surface p-2.5 text-mock-base">
          <p className="text-black-700">
            To <span className="text-black-100">{'{first_name}'}</span>
          </p>
          <p className="font-medium">Quick idea for your analyst team</p>
          <p className="text-mock-sm text-black-600">Hi {'{first_name}'}, teams like {'{company}'} often lose a day a week to handoffs. A shared pipeline per region could…</p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ['Sent', '128'],
            ['Opened', '74%'],
            ['Replied', '18%'],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col rounded-8 bg-white-200 px-2 py-1.5">
              <span className="text-mock-xs text-black-700">{k}</span>
              <span className="text-mock-lg font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <ContactList names={[['Ada Lindqvist', 'teal', 'Opened', 'blue'], ['Hana Sato', 'iris', 'Replied', 'green'], ['Owen Price', 'grey', 'Sent', 'grey']]} />
      </>
    ),
  },
  {
    h: 520,
    icon: 'flow',
    title: 'Branch on reply',
    day: 'Day 3',
    body: (
      <>
        <div className="flex items-center gap-2 rounded-8 border border-solid border-blue-200 bg-blue-100/60 p-2.5 text-mock-base text-blue-600">
          <Icon name="flow" size={14} /> If contact replied
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-mock-sm">
          <div className="flex flex-col gap-1 rounded-8 bg-traffic-green/10 p-2">
            <span className="font-medium text-traffic-green">Yes · 23</span>
            <span className="text-black-600">Book a meeting</span>
          </div>
          <div className="flex flex-col gap-1 rounded-8 bg-white-200 p-2">
            <span className="font-medium text-black-600">No · 105</span>
            <span className="text-black-600">Follow up in 2d</span>
          </div>
        </div>
        <ContactList
          names={[
            ['Hana Sato', 'iris', 'Meeting', 'green'],
            ['Tomás Reyes', 'amber', 'Waiting', 'grey'],
            ['Nadia Haddad', 'blue', 'Meeting', 'green'],
            ['Felix Moreau', 'red', 'Waiting', 'grey'],
            ['Owen Price', 'grey', 'Bounced', 'red'],
          ]}
        />
      </>
    ),
  },
  {
    h: 360,
    icon: 'phone',
    title: 'Call task',
    day: 'Day 5',
    body: (
      <>
        {[
          ['Call Tomás about fleet pilot', 'Today', 'amber'],
          ['Check in with Felix', 'Tomorrow', 'grey'],
          ['Share pricing with Owen', 'Fri', 'grey'],
        ].map(([t, d, tone], i) => (
          <div key={t} className="flex items-center gap-2 rounded-8 border border-solid border-mock-stroke p-2.5 text-mock-base">
            <span className={`flex h-4 w-4 items-center justify-center rounded-4 border border-solid ${i ? 'border-white-800' : 'border-blue-500 bg-blue-500 text-white-100'}`}>
              {!i && <Icon name="check" size={10} strokeWidth={2} />}
            </span>
            <span className={`truncate ${i ? '' : 'text-black-700 line-through'}`}>{t}</span>
            <Chip tone={tone} dot={false} className="ml-auto">{d}</Chip>
          </div>
        ))}
      </>
    ),
  },
  {
    h: 581,
    icon: 'send',
    title: 'Final follow-up',
    day: 'Day 8',
    body: (
      <>
        <div className="flex flex-col gap-1.5 rounded-8 border border-solid border-mock-stroke bg-mock-surface p-2.5 text-mock-base">
          <p className="font-medium">Closing the loop</p>
          <p className="text-mock-sm text-black-600">No pressure at all. Happy to send a two-minute walkthrough if that is easier.</p>
        </div>
        <ContactList names={[['Felix Moreau', 'red', 'Queued', 'blue'], ['Tomás Reyes', 'amber', 'Queued', 'blue'], ['Owen Price', 'grey', 'Skipped', 'grey']]} />
      </>
    ),
  },
]

function ContactList({ names }) {
  return (
    <div className="flex flex-col rounded-8 border border-solid border-mock-stroke">
      {names.map(([n, t, s, st], i) => (
        <div key={n + i} className={`flex h-9 items-center gap-2 px-2.5 text-mock-base ${i ? 'border-t border-solid border-mock-stroke' : ''}`}>
          <Initials name={n} tone={t} size={18} />
          <span className="truncate">{n}</span>
          <Chip tone={st} className="ml-auto">{s}</Chip>
        </div>
      ))}
    </div>
  )
}

// Live run-status badges: "Running" 2000ms linear opacity [0,1,1,0,0] @ [0,.25,.65,.8,1] while the next
// badge fades in 500ms (delay 1300) out-cubic; nodes start 0 / 2600 / 6030 / 8630ms after the panel reveal.
const STEP_RUN_AT = [0, 2600, 6030, 8630]
const STEP_W = 271.5
const STEP_GAP = 16

function IllustrationColumns() {
  const ref = useRef(null)
  useEffect(() => {
    const row = ref.current
    const root = row?.closest('[data-hm-root]')
    if (!root) return
    const badges = [...row.querySelectorAll('[data-step-badge]')]
    if (reducedMotion()) {
      badges.forEach((b) => (b.querySelector('[data-badge="done"]').style.opacity = '1'))
      return
    }
    const timers = []
    const play = (b) => {
      b.querySelector('[data-badge="running"]').animate(
        { opacity: [0, 1, 1, 0, 0], offset: [0, 0.25, 0.65, 0.8, 1], easing: [EASE_OUT_CUBIC, EASE_OUT_CUBIC, 'cubic-bezier(0.32, 0, 0.67, 0)', 'cubic-bezier(0.32, 0, 0.67, 0)'] },
        { duration: 2000, easing: 'linear', fill: 'both' },
      )
      b.querySelector('[data-badge="done"]').animate({ opacity: [0, 1] }, { duration: 500, delay: 1300, easing: EASE_OUT_CUBIC, fill: 'both' })
    }
    const onPlay = () => badges.forEach((b, i) => timers.push(setTimeout(() => play(b), STEP_RUN_AT[i] ?? 0)))
    root.addEventListener('hmplay', onPlay, { once: true })
    return () => {
      root.removeEventListener('hmplay', onPlay)
      timers.forEach(clearTimeout)
    }
  }, [])
  return (
    <div ref={ref} className="absolute left-[57px] top-[73px] flex w-[1134px] items-start gap-4">
      {STEPS.map((s, i) => (
        <span
          key={`b${i}`}
          data-step-badge={i}
          aria-hidden="true"
          className="pointer-events-none absolute top-[-13px] z-[1] h-5"
          style={{ left: i * (STEP_W + STEP_GAP) + STEP_W - 3 }}
        >
          <span data-badge="running" className="absolute right-0 top-0 flex h-5 items-center gap-1 whitespace-nowrap rounded-full bg-white-100 px-2 text-mock-xs text-blue-600 shadow-mock-chip" style={{ opacity: 0 }}>
            <span className="h-3 w-3 rounded-full border-2 border-solid border-blue-200 border-t-blue-500 motion-safe:animate-spin" />
            Running
          </span>
          <span data-badge="done" className="absolute right-0 top-0 flex h-5 items-center gap-1 whitespace-nowrap rounded-full bg-white-100 px-2 text-mock-xs text-black-600 shadow-mock-chip" style={{ opacity: 0 }}>
            <Icon name="checkCircle" size={12} className="text-traffic-green" />
            {i === 0 ? 'Sent' : 'Completed'}
          </span>
        </span>
      ))}
      {STEPS.map((s, i) => (
        // live sequence cards: opacity 425ms out-cubic, delays 170 / 230 (+60ms per card)
        <div key={i} data-hm-item="" data-hm-dur="425" data-hm-delay={170 + i * 60} className="flex w-[271.5px] shrink-0 flex-col gap-3 overflow-hidden rounded-12 bg-white-100 p-3 text-black-100 shadow-mock-card" style={{ height: s.h }}>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-6 bg-white-300 text-black-600">
              <Icon name={s.icon} size={13} />
            </span>
            <span className="text-mock-md font-medium">{s.title}</span>
            <span className="ml-auto text-mock-sm text-black-800">{s.day}</span>
          </div>
          {s.body}
          <span className="mt-auto flex h-8 shrink-0 items-center justify-center gap-1 rounded-8 border border-dashed border-white-700 text-mock-base text-black-700">
            <Icon name="plus" size={12} /> Add step
          </span>
        </div>
      ))}
    </div>
  )
}

// #4: 904x456 card at (69,129), radius 12 12 0 0, chip shadow, padding 24 gap 12, inner chart card
const WEEKS = [
  [40, 30, 20], [55, 30, 25], [60, 40, 20], [72, 38, 30], [80, 50, 25], [96, 46, 30], [104, 58, 26], [0, 120, 40], [0, 132, 46], [0, 140, 52],
]
function IllustrationReport() {
  return (
    // live #4: question 680ms d0, answer panel 680ms d238 (blur 2.5px); then answer rows 425ms (blur 2px)
    // at +390 / +601 / +1615 / +1786 / +2000ms after the trigger
    <div data-hm-item="" data-hm-dur="680" data-hm-blur="2.5" className="absolute left-[69px] top-[129px] flex h-[456px] w-[904px] flex-col gap-3 rounded-t-12 bg-white-100 p-6 text-black-100 shadow-mock-chip">
      <div className="flex items-center gap-2">
        <Icon name="chart" size={16} className="text-black-600" />
        <span className="text-mock-lg font-semibold">Q4 revenue forecast</span>
        <div className="ml-auto flex items-center gap-1.5">
          <Tag>All regions</Tag>
          <Tag>By week</Tag>
          <AvatarStack people={[['Leo Brandt', 'red'], ['Priya Nair', 'iris']]} size={20} />
        </div>
      </div>
      <div data-hm-item="" data-hm-dur="680" data-hm-delay="238" data-hm-blur="2.5" className="grid grid-cols-4 gap-3">
        {[
          ['Closed won', '$1.18M', '+14%', 'green'],
          ['Commit', '$2.42M', '+6%', 'green'],
          ['Best case', '$3.05M', '−2%', 'red'],
          ['Target', '$2.80M', '86% to goal', 'grey'],
        ].map(([k, v, d, t]) => (
          <div key={k} className="flex flex-col gap-0.5 rounded-10 border border-solid border-mock-stroke px-3 py-2">
            <span className="text-mock-sm text-black-700">{k}</span>
            <span className="flex items-baseline gap-2">
              <span className="text-mock-xl">{v}</span>
              <span className={`text-mock-sm ${toneOf(t).soft.split(' ').find((c) => c.startsWith('text-'))}`}>{d}</span>
            </span>
          </div>
        ))}
      </div>
      <div data-hm-item="" data-hm-dur="425" data-hm-delay="390" data-hm-blur="2" className="relative mt-auto flex h-[276px] flex-col rounded-12 border border-solid border-window-hairline bg-mock-surface px-6 pb-3 pt-4">
        <div data-hm-item="" data-hm-dur="425" data-hm-delay="601" data-hm-blur="2" className="flex items-center gap-4 text-mock-sm text-black-600">
          {[
            ['bg-blue-500', 'Closed won'],
            ['bg-blue-300', 'Commit'],
            ['bg-blue-100', 'Best case'],
          ].map(([c, l]) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-2 ${c}`} /> {l}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="w-3 border-t border-dashed border-black-700" /> Target
          </span>
        </div>
        <div data-hm-item="" data-hm-dur="425" data-hm-delay="1615" data-hm-blur="2" className="relative mt-3 flex flex-1 items-end gap-4 border-b border-solid border-white-500">
          {[0, 1, 2, 3].map((g) => (
            <span key={g} className="absolute inset-x-0 border-t border-solid border-white-400" style={{ bottom: `${(g + 1) * 22}%` }} />
          ))}
          <span data-hm-item="" data-hm-dur="425" data-hm-delay="1786" data-hm-blur="2" className="absolute inset-x-0 border-t border-dashed border-black-700" style={{ bottom: 168 }} />
          <span data-hm-item="" data-hm-dur="425" data-hm-delay="2000" data-hm-blur="2" className="absolute -left-1 z-[1] rounded-4 bg-black-100 px-1.5 text-mock-xs text-white-200" style={{ bottom: 172 }}>
            Target $2.80M
          </span>
          {WEEKS.map(([won, commit, best], i) => (
            <div key={i} className="relative flex flex-1 flex-col justify-end overflow-hidden rounded-t-4">
              <span className="bg-blue-100" style={{ height: best }} />
              <span className="bg-blue-300" style={{ height: commit }} />
              {won > 0 && <span className="bg-blue-500" style={{ height: won }} />}
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex gap-4 text-mock-xs text-black-800">
          {WEEKS.map((_, i) => (
            <span key={i} className="flex-1 text-center">W{i + 40}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// #5: two stacked cards (568x159, 568x355) at (57,57) gap 24 + 486x537 right card at (650,57)
const SIGNALS = [
  ['users', 'blue', 'Orchardly', 'added 12 seats in the last week', '2m'],
  ['trend', 'green', 'Tidewell Bank', 'usage up 38% across treasury', '1h'],
  ['alert', 'red', 'Quarrystone', 'champion left the company', '3h'],
  ['star', 'amber', 'Pinecrest Health', 'asked about the Scale plan', '5h'],
  ['heart', 'teal', 'Kettle & Kiln', 'left a 9/10 satisfaction score', '1d'],
]
function IllustrationStack() {
  return (
    <>
      <div className="absolute left-[57px] top-[57px] flex w-[568px] flex-col gap-6 text-black-100">
        <div data-hm-item="" data-hm-dur="595" data-hm-blur="2.5" className="flex h-[159px] flex-col gap-3 rounded-12 bg-white-100 p-4 shadow-mock-card">
          <div className="flex items-center gap-2">
            <Company id="orchard" size={20} textClass="text-mock-md font-medium" />
            <span className="text-mock-md text-black-700">· Account health</span>
            <Chip tone="green" className="ml-auto">Healthy</Chip>
          </div>
          <div className="flex flex-1 gap-3">
            <div className="flex flex-1 flex-col justify-between rounded-8 bg-white-200 p-3">
              <span className="text-mock-sm text-black-700">Health score</span>
              <span className="flex items-end justify-between">
                <span className="text-mock-2xl">86</span>
                <Sparkline values={[0.3, 0.4, 0.35, 0.55, 0.6, 0.72, 0.8]} width={64} height={22} className="text-traffic-green" />
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-8 bg-white-200 p-3">
              <span className="text-mock-sm text-black-700">Seats used</span>
              <span className="flex flex-col gap-1.5">
                <span className="text-mock-2xl">
                  142<span className="text-mock-md text-black-800">/150</span>
                </span>
                <Meter value={0.95} tone="blue" />
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-8 bg-white-200 p-3">
              <span className="text-mock-sm text-black-700">Satisfaction</span>
              <span className="flex items-end justify-between">
                <span className="text-mock-2xl">+48</span>
                <span className="text-mock-sm text-traffic-green">↑ 6</span>
              </span>
            </div>
          </div>
        </div>
        <div data-hm-item="" data-hm-dur="595" data-hm-delay="102" data-hm-blur="2.5" className="flex h-[355px] flex-col rounded-12 bg-white-100 shadow-mock-card">
          <div className="flex items-center gap-2 px-4 pt-4">
            <Icon name="trend" size={14} className="text-black-600" />
            <span className="text-mock-md font-medium">Expansion candidates</span>
            <span className="ml-auto text-mock-sm text-black-800">Sorted by health</span>
          </div>
          <div className="mt-3 flex h-8 items-center border-y border-solid border-mock-stroke bg-mock-surface px-4 text-mock-sm text-black-700">
            <span className="w-[200px]">Account</span>
            <span className="w-[150px]">Health</span>
            <span className="w-[100px]">Seats</span>
            <span>Status</span>
          </div>
          {[
            ['orchard', 0.86, '142/150', ['Ready', 'green']],
            ['tidewell', 0.8, '310/400', ['Ready', 'green']],
            ['pinecrest', 0.71, '88/100', ['Talking', 'blue']],
            ['kettle', 0.64, '24/40', ['Watch', 'amber']],
            ['quarry', 0.38, '19/60', ['At risk', 'red']],
          ].map(([co, h, seats, [s, t]]) => (
            <div key={co} className="flex h-[52px] items-center border-b border-solid border-mock-stroke px-4 text-mock-base last:border-b-0">
              <span className="w-[200px]">
                <Company id={co} size={20} textClass="text-mock-base font-medium" />
              </span>
              <span className="flex w-[150px] items-center gap-2 pr-6">
                <Meter value={h} tone={h > 0.75 ? 'green' : h > 0.5 ? 'amber' : 'red'} className="h-1.5 flex-1" />
                <span className="text-mock-sm text-black-600">{Math.round(h * 100)}</span>
              </span>
              <span className="w-[100px] text-black-600">{seats}</span>
              <Chip tone={t}>{s}</Chip>
            </div>
          ))}
        </div>
      </div>
      <div data-hm-item="" data-hm-dur="595" data-hm-delay="153" data-hm-blur="2.5" className="absolute left-[650px] top-[57px] flex h-[537px] w-[486px] flex-col gap-4 rounded-12 bg-white-100 p-4 text-black-100 shadow-mock-card">
        <div data-hm-item="" data-hm-dur="425" data-hm-delay="516" data-hm-blur="2" className="flex items-center gap-2">
          <Icon name="bolt" size={14} className="text-black-600" />
          <span className="text-mock-md font-medium">Signals</span>
          <span className="rounded-4 bg-blue-100 px-1 text-mock-xs text-blue-600">5 new</span>
          <span className="ml-auto text-mock-sm text-black-800">Today</span>
        </div>
        {SIGNALS.map(([ic, tone, co, text, time]) => (
          <div key={co} className="flex items-start gap-3 rounded-8 border border-solid border-mock-stroke p-3">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-8 ${toneOf(tone).soft}`}>
              <Icon name={ic} size={14} />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-mock-md">
                <span className="font-medium">{co}</span> <span className="text-black-600">{text}</span>
              </span>
              <span className="flex items-center gap-1.5 text-mock-sm text-black-800">
                <Icon name="clock" size={11} /> {time} ago · Owner review suggested
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ---------- Sub-card visuals (inside the 457x302 flex-1 area) ---------- */

function SubFrame({ children, className = '', ...rest }) {
  return (
    <div className={`flex w-full max-w-[360px] flex-col gap-2.5 text-black-100 ${className}`} {...rest}>
      {children}
    </div>
  )
}

// 1a: a person record filling in as enrichment runs
function SubEnrich() {
  const rows = [
    ['mail', 'Email', 'ada@brightwater.dev', true],
    ['building', 'Company', 'Brightwater Labs', true],
    ['pin', 'Location', 'Malmö, Sweden', true],
    ['star', 'Seniority', null],
  ]
  return (
    <SubFrame>
      <div className="flex flex-col rounded-12 bg-white-100 shadow-mock-card">
        <div className="flex items-center gap-2.5 border-b border-solid border-mock-stroke p-3">
          <Initials name="Ada Lindqvist" tone="teal" size={32} />
          <div className="flex flex-col">
            <span className="text-mock-md font-medium">Ada Lindqvist</span>
            <span className="text-mock-sm text-black-700">Head of Research</span>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-mock-sm text-blue-600">
            <Icon name="sparkle" size={11} /> Enriching
          </span>
        </div>
        {rows.map(([ic, k, v, done]) => (
          <div key={k} className="flex h-9 items-center gap-2 px-3 text-mock-base">
            <Icon name={ic} size={13} className="text-black-800" />
            <span className="w-[72px] text-black-700">{k}</span>
            {/* loading shimmer: live "Thinking" shimmer fades in 200ms ease-out when the sub-card is in view */}
            {v ? <span className="truncate">{v}</span> : <span data-hm-item="" data-hm-dur="200" data-hm-ease="ease-out" className="h-2 w-28 rounded-full bg-[linear-gradient(90deg,theme(colors.white.400),theme(colors.blue.100),theme(colors.white.400))]" />}
            {done && <Icon name="checkCircle" size={13} className="ml-auto text-traffic-green" />}
          </div>
        ))}
      </div>
    </SubFrame>
  )
}

// 1b: routing rule -> assignee, with rep load
function SubRoute() {
  return (
    <SubFrame>
      <div className="flex flex-col gap-2 rounded-12 bg-white-100 p-3 shadow-mock-card">
        <p className="flex items-center gap-1.5 text-mock-sm text-black-700">
          <Icon name="bolt" size={12} /> When a company is created
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-mock-base">
          <Tag>Employees &gt; 200</Tag>
          <span className="text-mock-sm text-black-800">and</span>
          <Tag>Region is EMEA</Tag>
        </div>
      </div>
      <div className="ml-6 h-3 w-px bg-white-800" />
      <div className="flex flex-col gap-2 rounded-12 bg-white-100 p-3 shadow-mock-card">
        <p className="text-mock-sm text-black-700">Assign round-robin</p>
        {[
          ['Jonas Weber', 'teal', 0.4, true],
          ['Priya Nair', 'iris', 0.65],
          ['Leo Brandt', 'red', 0.8],
        ].map(([n, t, load, next]) => (
          <div key={n} className="flex items-center gap-2 text-mock-base">
            <Initials name={n} tone={t} size={20} />
            <span className="w-[92px]">{n}</span>
            <Meter value={load} tone={next ? 'blue' : 'grey'} className="h-1 flex-1" />
            {next ? <Chip tone="blue">Next</Chip> : <span className="w-[42px] text-right text-mock-sm text-black-800">{Math.round(load * 20)} open</span>}
          </div>
        ))}
      </div>
    </SubFrame>
  )
}

// 3a: branching flow
function SubBranch() {
  const node = 'flex items-center gap-2 rounded-10 bg-white-100 px-3 py-2 text-mock-base shadow-mock-card'
  return (
    // live #3 sub-cards: tailwindcss-animate `enter` (fade-in-0 slide-in-from-bottom-2) 500ms ease at mount
    <div data-hm-enter="" className="relative h-[240px] w-full max-w-[380px] text-black-100">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 380 240" fill="none" aria-hidden="true">
        <path d="M190 38v40M190 118v20c0 14-10 20-24 20H96c-14 0-20 8-20 22v8M190 138c0 14 10 20 24 20h70c14 0 20 8 20 22v8" className="stroke-white-800" strokeWidth="1.2" />
      </svg>
      <div className={`${node} absolute left-1/2 top-0 -translate-x-1/2`}>
        <Icon name="mail" size={13} className="text-black-600" /> Intro email sent
      </div>
      <div className="absolute left-1/2 top-[78px] flex -translate-x-1/2 items-center gap-2 rounded-10 border border-solid border-blue-200 bg-blue-100 px-3 py-2 text-mock-base text-blue-600">
        <Icon name="flow" size={13} /> Replied within 2 days?
      </div>
      <div className={`${node} absolute left-0 top-[188px]`}>
        <Icon name="calendar" size={13} className="text-traffic-green" /> Book a meeting
      </div>
      <div className={`${node} absolute right-0 top-[188px]`}>
        <Icon name="clock" size={13} className="text-traffic-yellow" /> Gentle follow-up
      </div>
      <span className="absolute left-[92px] top-[146px] rounded-4 bg-traffic-green/10 px-1 text-mock-xs text-traffic-green">Yes</span>
      <span className="absolute right-[92px] top-[146px] rounded-4 bg-white-300 px-1 text-mock-xs text-black-600">No</span>
    </div>
  )
}

// 3b: reminder stack
function SubReminders() {
  return (
    <SubFrame data-hm-enter="">
      {[
        ['Follow up with Hana Sato', 'Pricing questions from Tuesday', 'Today', 'amber', 'iris'],
        ['Send recap to Tomás Reyes', 'Fleet pilot next steps', 'Tomorrow', 'grey', 'amber'],
        ['Prep call with Ada Lindqvist', 'Security review checklist', 'Fri', 'grey', 'teal'],
      ].map(([t, d, due, tone, av], i) => (
        <div key={t} className={`flex items-center gap-3 rounded-12 bg-white-100 p-3 shadow-mock-card ${i === 0 ? '' : 'opacity-90'}`}>
          <span className="flex h-4 w-4 shrink-0 rounded-4 border border-solid border-white-800" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-mock-md font-medium">{t}</span>
            <span className="truncate text-mock-sm text-black-700">{d}</span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <Chip tone={tone} dot={false}>{due}</Chip>
            <Initials name={t.split(' ').slice(-2).join(' ')} tone={av} size={16} />
          </div>
        </div>
      ))}
    </SubFrame>
  )
}

// 5b: growth signal chart
function SubGrowth() {
  return (
    <SubFrame>
      <div className="flex flex-col gap-2 rounded-12 bg-white-100 p-3 shadow-mock-card">
        <div className="flex items-center gap-2">
          <Company id="tidewell" size={18} textClass="text-mock-md font-medium" />
          <Chip tone="green" className="ml-auto">↑ 24% seats</Chip>
        </div>
        <Sparkline values={[0.15, 0.2, 0.18, 0.3, 0.34, 0.42, 0.4, 0.55, 0.62, 0.7, 0.86]} width={334} height={70} className="block h-[70px] w-full text-blue-500" />
        <div className="flex justify-between text-mock-xs text-black-800">
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
        </div>
      </div>
      {[
        ['arrowUp', 'green', 'Upgraded to the Scale plan', '2d ago'],
        ['users', 'blue', '12 seats added by the treasury team', '5d ago'],
      ].map(([ic, t, l, time]) => (
        <div key={l} className="flex items-center gap-2.5 rounded-12 bg-white-100 px-3 py-2.5 shadow-mock-card">
          <span className={`flex h-6 w-6 items-center justify-center rounded-6 ${toneOf(t).soft}`}>
            <Icon name={ic} size={13} />
          </span>
          <span className="text-mock-base">{l}</span>
          <span className="ml-auto text-mock-sm text-black-800">{time}</span>
        </div>
      ))}
    </SubFrame>
  )
}

const SUB_VISUALS = { showcaseSubVisual1a: SubEnrich, showcaseSubVisual1b: SubRoute, showcaseSubVisual3a: SubBranch, showcaseSubVisual3b: SubReminders, showcaseSubVisual5b: SubGrowth }

function SubCardMock({ visual }) {
  const V = SUB_VISUALS[visual]
  return V ? <V /> : null
}

// M8 signal roller: list duplicated for a seamless loop. Static state = translateY(0);
// the Animation pass applies translateY(0 -> -50%) over 24s linear infinite on [data-motion="signal-roller"].
const ROLLER = [
  ['orchard', 'Health score up to 86', ['Healthy', 'green'], '2m'],
  ['quarry', 'Weekly active users down 22%', ['At risk', 'red'], '18m'],
  ['pinecrest', 'Support tickets resolved in < 4h', ['Stable', 'blue'], '1h'],
  ['kettle', 'Renewal in 45 days, no QBR booked', ['Watch', 'amber'], '3h'],
  ['tidewell', 'Admin invited 12 new teammates', ['Growing', 'teal'], '6h'],
]
function SignalRoller() {
  return (
    <div className="h-full w-full max-w-[290px] overflow-hidden">
      <div data-motion="signal-roller" className="flex flex-col">
        {[...ROLLER, ...ROLLER].map(([co, text, [s, t], time], k) => (
          <div key={k} className="pb-3" aria-hidden={k >= ROLLER.length ? 'true' : undefined}>
            <div className="flex flex-col gap-2 rounded-12 bg-white-100 p-3 text-black-100 shadow-mock-card">
              <div className="flex items-center gap-2">
                <Company id={co} size={16} textClass="text-mock-base font-medium" />
                <span className="ml-auto text-mock-sm text-black-800">{time}</span>
              </div>
              <p className="text-mock-base text-black-600">{text}</p>
              <Chip tone={t} className="self-start">{s}</Chip>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
