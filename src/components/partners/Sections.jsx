import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui.jsx'
import { Icon, Initials } from '../mock.jsx'
import { INTEGRATION_GLYPHS } from '../logos.jsx'
import StoryArt from '../StoryArt.jsx'
import { LeadForm } from '../forms/Fields.jsx'
import { mobileBtn } from '../marketing/Blocks.jsx'
import { AbstractAvatar } from '../marketing/art.jsx'
import { Arrow, CellGrid, DashedV, DotPattern, GuideRow, Hatch, HeroBadge, Section, SectionHead } from '../marketing/primitives.jsx'

/* ------------------------------------------------------------------ */
/* C1 hero with the partner entrance (P1/P2)                           */
/* ------------------------------------------------------------------ */
export function PartnerHeroHeader({ badge, title, lead, cta, ctaClass = 'mt-6', headerClass = 'pb-[60px] pt-20 lg:pt-[100px] xl:pt-[120px]' }) {
  return (
    <header className={`flex w-full flex-col items-center ${headerClass}`}>
      <HeroBadge className="mb-6" data-motion="hero-badge-in">
        {badge}
      </HeroBadge>
      <h2 data-motion="hero-title-in" className="max-w-[15em] text-balance text-center text-page-hero-sm lg:text-page-hero">
        {title}
      </h2>
      <p data-motion="hero-lead-in" className="mt-4 max-w-xl text-balance text-center text-lg text-black-300 lg:text-xl">
        {lead}
      </p>
      {cta && (
        <div data-motion="hero-lead-in" className={`flex w-full items-center justify-center gap-x-2.5 gap-y-2 max-md:flex-col ${ctaClass}`}>
          {cta}
        </div>
      )}
    </header>
  )
}

/* T2-d.1 app-tile row: 11 tiles 140x141 gap 40 spanning -78..1518, framed with hairlines. */
function AppTile({ i }) {
  if (i % 2 === 1) {
    // framed pattern tile
    return (
      <svg width="140" height="141" viewBox="0 0 140 141" aria-hidden="true" className="text-white-600">
        {Array.from({ length: 6 }, (_, k) => (
          <line key={k} x1={10 + k * 24} y1="10" x2={10 + k * 24} y2="131" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        ))}
      </svg>
    )
  }
  const G = INTEGRATION_GLYPHS[(i * 3) % INTEGRATION_GLYPHS.length]
  return (
    <div className="flex size-[140px] items-center justify-center rounded-[32px] bg-integration-tile shadow-integration-tile">
      <div className="[&>svg]:size-[72px]">
        <G />
      </div>
    </div>
  )
}

export function AppPartnersHero() {
  return (
    <div className="container" data-entrance="">
      <div className="overflow-hidden border-x border-solid border-white-500">
        <div className="relative mt-16 flex justify-center gap-x-10" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-px bg-white-500" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-white-500" />
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="relative grid w-[142px] shrink-0 place-items-center">
              <span className="absolute -inset-y-3 left-0 w-px bg-white-500" />
              <span className="absolute -inset-y-3 right-0 w-px bg-white-500" />
              <AppTile i={i} />
            </div>
          ))}
        </div>
        <div className="relative mt-3 grid grid-cols-12 pb-20">
          <DotPattern masked motion="hero-dots-in" />
          <div className="relative col-[2/-2]">
            <PartnerHeroHeader
              badge="App partners" // c12
              title="Build for every revenue team" // c30 l1
              lead="Publish an app in our directory and reach thousands of teams already at work." // c75 l2
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* T2-d.2 TwoPaths: CellGrid 2-up (461.8 cells, col 3/-3) on hatch; GuideRow below. */
export function TwoPaths({ cells }) {
  return (
    <Section as="section">
      <div className="relative grid grid-cols-12">
        <Hatch className="absolute inset-0 col-[2/-2] size-full max-xl:col-[1/-1]" />
        <div aria-hidden="true" className="absolute inset-x-0 -top-5 grid h-[150px] grid-cols-12 max-lg:hidden">
          <div className="col-[2/-2] flex justify-between">
            {Array.from({ length: 11 }, (_, i) => (
              <DashedV key={i} />
            ))}
          </div>
        </div>
        <div className="relative col-[2/-2] mb-px grid grid-cols-1 gap-px bg-white-500 px-px lg:col-[3/-3] lg:grid-cols-2">
          {cells.map(([h, p, btn]) => (
            <div key={h} className="grid grid-cols-12 grid-rows-[repeat(5,minmax(0,1fr))] bg-white-100 lg:h-[233.3px]">
              <div className="col-[2/-2] row-[2/-2] flex flex-col justify-between gap-5 max-lg:py-10">
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 text-lg font-semibold text-black-100">{h}</h3>
                  <p className="text-balance text-base text-black-600">{p}</p>
                </div>
                <Button variant="outline" className={`w-fit ${mobileBtn}`}>
                  {btn}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GuideRow />
    </Section>
  )
}

/* T2-d.4 ExploreApps: frame 1158x562; left text cell 385 wide, right original app-store mock. */
function StoreMock() {
  const cats = [
    ['Communication', 'mail'],
    ['Data enrichment', 'sparkle'],
    ['Billing', 'coin'],
  ]
  const cards = [
    ['Mailbridge', 'Official', 'Inbox sync'],
    ['Ledgerly', 'Partner', 'Payments'],
    ['Signalbox', 'Official', 'Alerts'],
  ]
  return (
    <div className="pointer-events-none relative flex size-full select-none items-center justify-center overflow-hidden bg-white-100" role="img" aria-label="App directory illustration">
      <svg aria-hidden="true" className="absolute inset-0 size-full text-white-600" viewBox="0 0 771 560" preserveAspectRatio="none" fill="none">
        <path d="M385 300 V200 M385 300 L230 400 M385 300 L540 400 M385 300 L385 440" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
      <div className="absolute left-1/2 top-[52px] flex -translate-x-1/2 gap-3">
        {cats.map(([c, i]) => (
          <span key={c} className="flex h-[31.5px] items-center gap-1.5 bg-white-100 px-2 text-[12px] font-medium leading-[14px] tracking-[-0.24px] text-black-100">
            <Icon name={i} size={12.6} className="text-black-700" />
            {c}
          </span>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 size-[64.8px] -translate-x-1/2 -translate-y-1/2 rounded-12 bg-white-500 shadow-app-tile">
        <div className="absolute inset-0 overflow-hidden rounded-12 bg-app-tile-ring" />
        <div className="absolute inset-px flex items-center justify-center rounded-[11px] bg-white-100">
          <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" className="text-black-100">
            <path d="M15.9 7.6A6 6 0 1 0 17.6 13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="17.4" cy="8.6" r="1.9" fill="currentColor" />
          </svg>
        </div>
      </div>
      {cards.map(([name, tag, sub], k) => (
        <div
          key={name}
          className="absolute flex w-[162px] flex-col gap-1.5 rounded-12 border border-solid border-white-500 bg-white-100 p-[9px]"
          style={[{ left: '19.5%', top: '64%' }, { left: '59.5%', top: '64%' }, { left: '39.4%', top: '75%' }][k]}
        >
          <div className="flex items-center gap-1.5">
            <Initials name={name} size={16} tone={['blue', 'teal', 'iris'][k]} />
            <p className="text-[12px] font-medium leading-4 tracking-[-0.24px] text-black-100">{name}</p>
            <span className="ml-auto rounded-8 border border-solid border-mock-stroke bg-tag-pill px-1.5 py-0.5 text-[10px] font-medium leading-[14px] tracking-[-0.2px] text-black-100">{tag}</span>
          </div>
          <span className="text-[10px] font-medium leading-3 tracking-[-0.2px] text-black-700">{sub}</span>
        </div>
      ))}
    </div>
  )
}

export function ExploreApps() {
  return (
    <Section as="section">
      <SectionHead lead="Find the apps teams love." cont="Browse apps built by partners and our team." />
      <div className="grid grid-cols-12">
        <div className="relative col-span-12 grid w-full grid-cols-12 border border-solid border-white-500 max-lg:divide-y lg:col-[2/-2] lg:h-[562px]">
          <div className="col-span-12 grid h-full w-full grid-cols-12 items-start bg-white-100 lg:col-span-4 lg:border-r lg:border-solid lg:border-white-500">
            <div className="col-span-12 flex h-full flex-col justify-between px-8 pb-[18px] pt-8 max-lg:gap-6">
              <p className="mb-3 text-pretty text-base text-black-600">
                Every app in the directory is reviewed before it goes live, so teams can install with confidence and get back to selling faster.
              </p>
              <Button variant="ghost" className="-ml-[14px] h-10 w-fit gap-1.5 rounded-12 pl-[13px] pr-2.5 text-base text-black-400">
                Discover apps
                <Arrow className="arrow-shift" />
              </Button>
            </div>
          </div>
          <div className="col-span-12 h-[360px] lg:col-span-8 lg:h-full">
            <StoreMock />
          </div>
        </div>
      </div>
      <GuideRow />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Creator partners                                                    */
/* ------------------------------------------------------------------ */
const CREATORS = ['Ava Morales', 'Kenji Ito', 'Leah Brandt', 'Omar Haddad', 'Priya Nair', 'Tom Becker', 'Zoe Laurent']

/** 480x270 slide: poster art + 56px avatar (bottom-left 16) + name pill (bottom-right 16). */
function CreatorSlide({ i }) {
  return (
    <div className="relative mx-3 aspect-video w-[480px] shrink-0 overflow-hidden rounded-16 shadow-creator-slide max-md:w-[320px]">
      <div className="absolute inset-0 bg-white-200" />
      <div className="absolute inset-0">
        <StoryArt variant={i % 4} />
      </div>
      <div className="absolute bottom-4 left-4 size-14">
        <AbstractAvatar size={56} seed={i * 5 + 2} />
        <div className="absolute inset-0 size-full rounded-full shadow-quote-ring" />
      </div>
      <span className="absolute bottom-4 right-4 rounded-full bg-name-pill px-2 py-0.5 text-xs text-black-100 backdrop-blur-[16px]">{CREATORS[i]}</span>
    </div>
  )
}

export function CreatorHero() {
  // P22: continuous leftward scroll ≈74 px/s. One set = 7 x 504px = 3528px -> 47.7s per loop.
  return (
    <div className="lg:container" data-entrance="">
      <div className="border-solid border-white-500 lg:border-x">
        <div className="relative grid grid-cols-12">
          <DotPattern masked motion="hero-dots-in" />
          <div className="relative col-[2/-2]">
            <PartnerHeroHeader
              badge="Creator partners" // c16
              title="Teach thousands of teams how to sell smarter" // c37 l2
              lead="Make videos, guides and templates about the workspace, and get rewarded for every team you help along the way." // c102 l2
              ctaClass="mt-8"
              cta={
                <Button variant="primary" href="#creator-partners-form" className={mobileBtn}>
                  Apply to become a creator
                </Button>
              }
            />
          </div>
        </div>
        <div className="relative mt-16 flex w-full overflow-x-hidden pb-[100px] lg:pb-[120px] xl:pb-40" aria-label="Creator videos" role="region">
          <div className="-ml-4 flex w-max py-1" data-motion="marquee" style={{ '--marquee-dur': '47.7s', '--marquee-shift': '-50%' }}>
            {[...Array(14)].map((_, k) => (
              <div key={k} className="pl-4" aria-hidden={k >= 7 || undefined}>
                <CreatorSlide i={k % 7} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhoYouAre({ cells }) {
  return (
    <Section as="section">
      <SectionHead center lead="Made for people who love to teach." cont="Every format has a place in the program." />
      <div className="relative grid grid-cols-12">
        <Hatch className="absolute inset-0 col-[1/2] size-full" />
        <div aria-hidden="true" className="absolute inset-x-0 -top-5 grid h-[220px] grid-cols-12 max-lg:hidden">
          <div className="col-[2/-2] flex justify-between">
            {[0, 1, 2, 3].map((k) => (
              <DashedV key={k} />
            ))}
          </div>
        </div>
        <Hatch className="absolute inset-y-0 right-0 w-[calc(100%/12)]" />
        <CellGrid className="relative col-[2/-2] grid-cols-1 lg:grid-cols-3">
          {cells.map(([label, h, p, icon]) => (
            <div key={label} className="relative flex min-h-[198px] flex-col justify-end bg-white-100">
              <p className="absolute inset-x-0 top-5 px-8 text-xs font-semibold uppercase text-black-800">{label}</p>
              <div className="flex flex-col items-start gap-y-3 p-8">
                <h3 className="flex items-center gap-x-2 text-base font-semibold text-black-300">
                  <Icon name={icon} size={16} className="text-black-700" />
                  {h}
                </h3>
                <p className="text-pretty text-base text-black-700">{p}</p>
              </div>
            </div>
          ))}
        </CellGrid>
      </div>
      <GuideRow lines={4} />
    </Section>
  )
}

function PerkArt({ i }) {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-8 bg-white-200" aria-hidden="true">
      <svg viewBox="0 0 336.8 200" className="absolute inset-0 size-full" fill="none">
        {i === 0 && (
          <>
            <rect x="98" y="40" width="140" height="120" rx="14" className="fill-white-100 stroke-white-600" />
            <path d="M120 120 l28-30 22 18 36-42" className="stroke-blue-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="206" cy="66" r="6" className="fill-blue-500" />
          </>
        )}
        {i === 1 && (
          <>
            {[0, 1, 2].map((k) => (
              <rect key={k} x={78 + k * 64} y={60 - k * 8} width="52" height={80 + k * 16} rx="10" className={k === 1 ? 'fill-art-haze stroke-art-iris' : 'fill-white-100 stroke-white-600'} />
            ))}
          </>
        )}
        {i === 2 && (
          <>
            <circle cx="168" cy="100" r="54" className="fill-white-100 stroke-white-600" />
            <path d="M168 62v76M130 100h76" className="stroke-white-700" strokeDasharray="4 6" strokeLinecap="round" />
            <circle cx="168" cy="100" r="18" className="fill-traffic-yellow" />
          </>
        )}
      </svg>
    </div>
  )
}

export function Perks({ top, bottom }) {
  return (
    <Section as="section">
      <SectionHead
        center
        lead="Perks for our creators."
        cont="Early access to new features, a direct line to the product team, and rewards for teams you bring."
        padClass="pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40"
      >
        <Button variant="outline" href="#creator-partners-form" className={`mt-8 ${mobileBtn}`}>
          Apply to become a creator
        </Button>
      </SectionHead>
      <div className="relative grid grid-cols-12">
        <Hatch className="absolute inset-0 size-full" />
        <div className="relative col-[2/-2] flex w-full flex-col gap-px bg-white-500 p-px">
          <div className="grid grid-cols-1 gap-px lg:grid-cols-3">
            {top.map(([h, p], i) => (
              <div key={h} className="flex flex-col bg-white-100 px-7 pb-7 pt-8 lg:min-h-[378px] lg:pt-10">
                <p className="text-overline uppercase text-black-900">0{i + 1} /</p>
                <div className="mt-2 max-lg:hidden">
                  <PerkArt i={i} />
                </div>
                <h3 className="mt-7 text-base font-semibold text-black-100 lg:mt-auto xl:mb-1.5 xl:text-xl">{h}</h3>
                <p className="text-base text-black-800">{p}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-px lg:grid-cols-3">
            {bottom.map(([h, p], i) => (
              <div key={h} className="flex flex-col bg-white-100 px-7 pb-7 pt-8 lg:min-h-[200px] lg:pt-10">
                <p className="text-overline uppercase text-black-900">0{i + 4} /</p>
                <h3 className="mt-7 text-base font-semibold text-black-100 lg:mt-auto">{h}</h3>
                <p className="text-base text-black-800">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GuideRow />
    </Section>
  )
}

export function ApplyNotice() {
  return (
    <section className="bg-white-200" id="creator-partners-form">
      <Section>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 grid h-[150px] grid-cols-12 max-lg:hidden">
          <div className="col-[2/-2] flex justify-between">
            <DashedV />
            <DashedV />
            <DashedV />
          </div>
        </div>
        <div className="h-[57px] border-b border-solid border-white-500" />
        <div className="grid grid-cols-12 py-20 lg:py-32">
          <h2 className="col-[2/-2] mx-auto max-w-md text-pretty text-center text-lg text-black-700">Applications are closed until the next round opens.</h2>
        </div>
        <div className="h-[57px] border-t border-solid border-white-500" />
      </Section>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Expert partners                                                     */
/* ------------------------------------------------------------------ */
function Flag() {
  // neutral two-band flag glyph (18x12, radius 2, inset ring)
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" className="inline-block h-3 rounded-2 shadow-media-ring">
      <rect width="18" height="6" className="fill-blue-400" />
      <rect y="6" width="18" height="6" className="fill-traffic-yellow" />
    </svg>
  )
}

const EXPERT_QUOTES = [
  [
    'Partnering here changed how we run our practice. We now set up a workspace for a new client in a few days instead of a few weeks, and the support we get from the partner team means we never feel stuck on a tricky build.',
    'Hana Kowalski, Northgate Advisory',
  ],
  [
    'Our clients notice the difference straight away. The directory brings us steady, well-matched leads, and the training program gave our consultants the confidence to take on far larger and more complex projects every quarter.',
    'Luis Ferreira, Ridgeline Ops',
  ],
]

export function ExpertHero() {
  const cloud = useMemo(() => {
    let seed = 21
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    const out = []
    for (let row = 0; row < 3; row++)
      for (let k = 0; k < 15; k++) out.push({ x: 8 + k * 64 + (row % 2) * 32 - 16, y: 9 + row * 64, r: rnd() })
    const ranked = [...out].sort((a, b) => a.r - b.r)
    ranked.slice(0, 15).forEach((d) => (d.photo = true))
    ranked[0].size = 54.2
    ranked[1].size = 50.7
    return out
  }, [])
  return (
    <div className="container flex flex-1 flex-col" data-entrance="">
      <div className="relative flex w-full flex-1 flex-col border-x border-solid border-white-500">
        <DotPattern masked motion="hero-dots-in" />
        <div className="relative">
          <PartnerHeroHeader
            badge="Expert partners" // c15
            title="Grow your consulting work" // c25 l1
            lead="Join a network of trusted experts who help teams set up, migrate and scale their workspace." // c88 l2
            cta={
              <>
                <Button variant="primary" href="#expert-partners-form" className={mobileBtn}>
                  Apply to become an expert
                </Button>
                <Button as={Link} to="/contact/sales" variant="outline" className={mobileBtn}>
                  Find an expert
                </Button>
              </>
            }
          />
          <div className="grid grid-cols-12 pb-[120px]">
            <div className="col-[2/-2] mt-6 flex flex-col items-center justify-center">
              <div className="mask-x-fade relative h-[192px] w-[960px] max-w-full overflow-hidden" aria-hidden="true">
                {cloud.map((d, i) => {
                  const s = d.size ?? 45.9
                  const style = { left: `calc(50% + ${d.x - 480 - (s - 45.9) / 2}px)`, top: d.y - (s - 45.9) / 2, width: s, height: s }
                  return d.photo ? (
                    <div key={i} className="absolute overflow-hidden rounded-full" style={style}>
                      <AbstractAvatar size={s} seed={i * 7} />
                      <div className="absolute inset-0 rounded-full shadow-media-ring" />
                    </div>
                  ) : (
                    <div key={i} className="absolute rounded-full bg-white-700" style={style} />
                  )
                })}
              </div>
              {/* Two testimonials stacked in place; crossfade timing was not measured (spec), so the
                  second sits at opacity 0 (hook: data-motion="expert-quote"). */}
              <div className="relative flex min-h-40 w-full max-w-[672px] items-center justify-center text-center max-lg:min-h-[232px]">
                {EXPERT_QUOTES.map(([q, who], i) => (
                  <div key={who} data-motion="expert-quote" data-active={i === 0 || undefined} className={`col-start-1 row-start-1 ${i ? 'absolute inset-0 flex flex-col items-center justify-center opacity-0' : ''}`} aria-hidden={i ? true : undefined}>
                    <p className="mb-2 text-pretty font-quote text-xl text-black-100">“{q}”</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-black-300">
                      <Flag />
                      <span>{who}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhoWereLookingFor({ cols }) {
  const bars = useMemo(() => {
    let seed = 5
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    return Array.from({ length: 131 }, (_, i) => 24 + Math.round(Math.abs(Math.sin(i / 9)) * 90 + rnd() * 30))
  }, [])
  return (
    <div className="container flex flex-1 flex-col">
      <div className="relative flex w-full flex-1 flex-col overflow-hidden border-x border-solid border-white-500">
        <SectionHead lead="Who we are looking for" cont="Experienced builders who put customers first." />
        <div className="relative">
          <div className="grid grid-cols-12">
            <div className="col-[2/-2] grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {cols.map(([h, p]) => (
                <div key={h} className="relative border-l border-solid border-white-500 pl-4 pr-6 lg:h-64">
                  <h3 className="text-pretty text-lg font-semibold text-black-300">{h}</h3>
                  <p className="mt-2 max-w-[22em] text-pretty text-sm text-black-700">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-[100px] min-w-[1340px] items-end justify-evenly lg:h-[120px] xl:h-40" aria-hidden="true">
            {bars.map((h, i) => (
              <span key={i} className="w-px bg-white-500" style={{ height: `${Math.min(100, (h / 150) * 100)}%` }} />
            ))}
          </div>
          <div className="fade-edge-l pointer-events-none absolute inset-y-0 left-0 w-1/12" />
          <div className="fade-edge-r pointer-events-none absolute inset-y-0 right-0 w-1/12" />
        </div>
      </div>
    </div>
  )
}

function Emblem({ rings, dark }) {
  const tones = ['stroke-white-800', 'stroke-white-900', 'stroke-black-600']
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true" className="absolute right-4 top-4 z-10" fill="none">
      <circle cx="44" cy="44" r="43.5" className={dark ? 'fill-black-300 stroke-black-500' : 'fill-white-100 stroke-white-500'} />
      {Array.from({ length: rings }, (_, k) => (
        <circle key={k} cx="44" cy="44" r={34 - k * 9} className={tones[k]} strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export function Tiers({ tiers }) {
  return (
    <div className="container flex flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500">
        <SectionHead lead="Three tiers, one network" cont="Grow from a first project to a top practice in the directory." />
        <div className="relative grid grid-cols-12 lg:pb-[88px]">
          {/* < lg: the three cards sit as a stacked deck (measured offsets: 2nd card ~.96 scale +30px,
              3rd ~.94 scale +51px, behind the first). >= lg: three columns. */}
          <div className="relative col-[2/-2] grid h-[511px] grid-cols-1 lg:h-auto lg:grid-cols-3">
            {tiers.map((t, i) => {
              const dark = i === 2
              const deck = ['', 'max-lg:translate-y-[30px] max-lg:scale-[0.96]', 'max-lg:translate-y-[51px] max-lg:scale-[0.94]'][i]
              return (
                <div key={t.name} className={`flex flex-col items-center px-8 max-lg:absolute max-lg:inset-x-0 max-lg:top-0 lg:items-stretch ${deck}`} style={{ zIndex: 3 - i }}>
                  <p className="mb-12 text-overline uppercase text-black-900 max-lg:hidden">[{i + 1}]</p>
                  <div
                    className={`relative flex aspect-[4/5] w-full max-w-[320px] flex-col lg:max-w-[322px] justify-between overflow-hidden rounded-16 shadow-tier-card [transform-style:preserve-3d] ${
                      dark ? 'bg-black-300' : i === 1 ? 'bg-white-300' : 'bg-white-100'
                    }`}
                  >
                    <Emblem rings={i + 1} dark={dark} />
                    <div className="relative h-[62%] w-full">
                      {i === 0 && (
                        <>
                          <div className="size-full bg-white-500 [mask-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M8 5v6M5 8h6' stroke='black'/%3E%3C/svg%3E&quot;)]" />
                          <div className="absolute inset-0 bg-[linear-gradient(191deg,rgba(255,255,255,0.85)_28%,rgba(255,255,255,0.3)_55%,rgba(255,255,255,0.85)_76%)]" />
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(7,14,14,0.14),transparent_90%)]" />
                          <div className="absolute inset-0 bg-[linear-gradient(192deg,transparent_23%,rgba(255,255,255,0.8)_50%,transparent_82%)]" />
                        </>
                      )}
                      {i === 2 && (
                        <>
                          <Hatch dark className="absolute inset-0 size-full" />
                          <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(35,37,42,0.9)_23%,transparent_60%,rgba(35,37,42,0.9)_100%)]" />
                        </>
                      )}
                    </div>
                    <div className="relative pb-6">
                      <h3 className={`relative mt-auto px-6 pb-4 text-2xl ${dark ? 'text-white-100' : 'text-black-100'}`}>{t.name}</h3>
                      <ul className="flex flex-col gap-1 px-6">
                        {t.items.map((it) => (
                          <li key={it} className={`text-sm ${dark ? 'text-white-900' : 'text-black-600'}`}>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="grid grid-cols-12 border-y border-solid border-white-500">
          <div className="col-[2/-2] flex items-center justify-between gap-6 px-8 py-8 max-lg:flex-col max-lg:items-start">
            <div>
              <p className="text-base text-black-700">Not sure which tier fits you?</p>
              <p className="text-base text-black-100">Every partner starts at Core and moves up as projects grow.</p>
            </div>
            <Button variant="primary" href="#expert-partners-form" className={mobileBtn}>
              Start your application
            </Button>
          </div>
        </div>
        <div className="h-[100px] lg:h-[120px] xl:h-40" />
      </div>
    </div>
  )
}

export function ExpertApply({ rows }) {
  return (
    <section className="bg-white-200" id="expert-partners-form">
      <Section>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 grid h-[150px] grid-cols-12 max-lg:hidden">
          <div className="col-[2/-2] flex justify-between">
            <DashedV />
            <DashedV />
            <DashedV />
          </div>
        </div>
        <div className="relative grid grid-cols-12 py-[57px] lg:min-h-[754px]">
          <div className="col-[2/-2] flex items-center lg:col-[2/7]">
            <div className="max-w-[20em] text-head-sm-md lg:text-head-sm">
              <h2 className="inline text-pretty font-semibold text-black-100">Ready to join the expert network?</h2>{' '}
              <p className="inline text-pretty font-medium text-black-800">Tell us about your practice below.</p>
            </div>
          </div>
          <div className="col-[2/-2] max-lg:mt-10 lg:col-[7/-1] lg:py-5 lg:pl-5">
            {/* Native form in place of the third-party embed (539x600, radius 8). */}
            <div className="w-full min-h-[640px] max-w-[539.2px] rounded-8 bg-white-100 p-8 lg:min-h-[600px]">
              <LeadForm id="expert-form" rows={rows} submitLabel="Apply now" />
            </div>
          </div>
        </div>
      </Section>
    </section>
  )
}
