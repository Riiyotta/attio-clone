import { LeadForm } from '../forms/Fields.jsx'
import { LogoGrid } from '../marketing/Blocks.jsx'
import { LogoMark } from '../marketing/art.jsx'
import MiniMock from '../marketing/MiniMock.jsx'
import { CellGrid, DashedV, DotPattern, GuideRow, Hatch, HeroBadge, Section, SectionHead } from '../marketing/primitives.jsx'
import { Icon } from '../mock.jsx'
import { INTEGRATION_GLYPHS } from '../logos.jsx'

/* T2-b.1 PageHero + logo strip (two rows of 4 logos 115x40 at width 576). Static (no entrance). */
export function StartupsHero() {
  return (
    <Section boxClassName="isolate">
      <DotPattern masked />
      <div className="relative grid grid-cols-12">
        <header className="col-[2/-2] flex w-full flex-col items-center pb-24 pt-20 lg:pb-28 lg:pt-[100px] xl:pb-32 xl:pt-[120px]">
          <HeroBadge className="mb-6">Founder program</HeroBadge>
          <h2 className="max-w-[15em] text-balance text-center text-page-hero-sm lg:text-page-hero">Built for day one</h2>
          <p className="mt-4 max-w-xl text-balance text-center text-lg text-black-300 lg:text-xl">
            Early teams get a full year of the workspace at a fraction of the price, plus perks from partners we trust.
          </p>
          {[0, 4].map((o, row) => (
            <div key={o} className={`flex w-full max-w-xl justify-between gap-5 ${row ? 'mt-2.5' : 'mt-12 xl:mt-[60px]'}`}>
              {[0, 1, 2, 3].map((k) => (
                <div key={k} role="img" aria-label={`Startup logo ${o + k + 1}`} className="h-10 w-[115px] max-sm:w-[22%]">
                  <LogoMark i={o + k + 2} scale={0.85} />
                </div>
              ))}
            </div>
          ))}
        </header>
      </div>
    </Section>
  )
}

const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Africa']
export const APPLY_ROWS = [
  [
    { name: 'firstName', label: 'First name', placeholder: 'First', error: 'Please add your first name' },
    { name: 'lastName', label: 'Last name', placeholder: 'Last', error: 'Please add your last name' },
  ],
  [{ name: 'email', kind: 'email', label: 'Company email', placeholder: 'Your work email', error: 'Please add a valid work email' }],
  [
    { name: 'region', kind: 'select', label: 'Region', placeholder: 'Select', options: REGIONS, error: 'Please pick a region' },
    { name: 'size', kind: 'select', label: 'Team size', placeholder: 'Select', options: ['1-5', '6-20', '21-50', '51+'], error: 'Please pick a team size' },
  ],
  [
    { name: 'stage', kind: 'select', label: 'Funding stage', placeholder: 'Select', options: ['Pre-seed', 'Seed', 'Series A'], error: 'Please pick a funding stage' },
    { name: 'investor', kind: 'select', label: 'Lead investor type', placeholder: 'Select', options: ['Accelerator', 'Venture fund', 'Angel group', 'None yet'], error: 'Please pick an investor type' },
  ],
  [{ name: 'company', label: 'Company name', placeholder: 'Your company', error: 'Please add your company name' }],
  [{ name: 'website', label: 'Company website', placeholder: 'yourcompany.com', error: 'Please add your website' }],
]

/** T2-b.2 ApplyBlock (T3 split layout, 754 tall): left copy col 2-5, right #fafafb panel. */
export function ApplyBlock() {
  const bullets = [
    'Half off any paid plan for your first year.',
    'Priority help from a dedicated onboarding team.',
    'Templates built for raising and hiring.',
    'Exclusive credits from partner tools that early teams rely on every single day, all in one place.',
  ]
  return (
    <div className="container flex flex-1 flex-col" id="apply">
      <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500">
        <div className="grid h-full grid-cols-12">
          <div className="col-[2/-2] flex flex-col justify-start lg:col-[2/6] lg:justify-between">
            <div className="flex flex-col pb-4 pt-20 lg:pb-0 lg:pt-[104px]">
              <h1 className="max-w-[15em] text-pretty text-heading-md-sm lg:text-heading-md">Apply for the founder program today</h1>
              <ul className="mt-8 flex flex-col gap-5">
                {bullets.map((b) => (
                  <li key={b} className="relative pl-3 text-base text-black-300 before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-black-700 before:content-['']">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <p className="pb-20 text-balance text-sm text-black-700 max-lg:pt-6">Open to teams under two years old and $5M raised.</p>
          </div>
          <div className="col-[1/-1] grid grid-cols-6 overflow-hidden border-solid border-white-500 bg-white-200 max-lg:mt-10 max-lg:border-t lg:col-[7/-1] lg:border-l">
            <div className="col-[1/-1] h-[100px] lg:h-[120px] xl:h-20" />
            <div className="col-[2/-2] max-lg:col-[1/-1] max-lg:px-[calc(100%/12)]">
              <LeadForm id="startup-form" rows={APPLY_ROWS} submitLabel="Apply" />
            </div>
            <div className="col-[1/-1] h-[100px] lg:h-[120px] xl:h-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

const CELLS = [
  ['[01]', 'Up and running in a day', 'Import, map and go live fast.'],
  ['[02]', 'Shaped around your work', 'Model any process in minutes.'],
  ['[03]', 'Grows with your team', 'Add seats as you start to hire.'],
  ['[04]', 'Fundraise in one place', 'Track every investor and intro.'],
]

function FeatureCell({ c, v }) {
  return (
    <div className="grid grid-cols-12 bg-white-100">
      <div className="col-[2/-2] flex flex-col pb-10 pt-10">
        <div className="text-overline uppercase text-black-900">{c[0]}</div>
        <MiniMock variant={v} className="mt-8 aspect-[481.4/288.8] w-full" />
        <h3 className="mt-9 text-base font-semibold text-black-300 md:text-lg lg:max-xl:text-base">{c[1]}</h3>
        <p className="mt-1 max-w-[24em] text-balance text-sm text-black-700 md:text-base lg:max-xl:text-sm">{c[2]}</p>
      </div>
    </div>
  )
}

/** T2-b.3 FeatureCells: SectionHead + 2x2 CellGrid with a static quote cell between rows. */
export function FeatureCells() {
  return (
    <Section as="section">
      <SectionHead
        lead="Everything a young company needs."
        cont="Spend less time on admin and more time with customers. The workspace adapts to how you sell today and keeps up as your team, pipeline and product grow."
      />
      <div className="relative grid grid-cols-12">
        <DotPattern />
        <Hatch className="absolute inset-y-0 left-0 w-[calc(100%/12)]" />
        <Hatch className="absolute inset-y-0 right-0 w-[calc(100%/12)]" />
        <div aria-hidden="true" className="absolute inset-x-0 -top-5 grid h-[150px] grid-cols-12 max-lg:hidden">
          <div className="col-[2/-2] flex justify-between">
            <DashedV />
            <DashedV />
          </div>
        </div>
        <CellGrid className="relative col-[2/-2] grid-cols-1 lg:grid-cols-2">
          <FeatureCell c={CELLS[0]} v={0} />
          <FeatureCell c={CELLS[1]} v={1} />
          <div className="relative col-[1/-1] grid grid-cols-12 bg-white-100">
            <DotPattern />
            <div className="relative col-[2/-2] flex flex-col items-center py-32 text-center">
              <p className="max-w-[20em] text-pretty font-quote text-serif-quote-sm text-black-100 lg:text-serif-quote">
                We set it up before our first hire and never had to switch. It grew right alongside the company.
              </p>
              <p className="mt-10 text-sm font-semibold text-black-300">Jonah Ellery</p>
              <p className="mt-1 text-sm text-black-300">Co-founder and CEO of Varnstead</p>
            </div>
          </div>
          <FeatureCell c={CELLS[2]} v={2} />
          <FeatureCell c={CELLS[3]} v={3} />
        </CellGrid>
      </div>
      <GuideRow />
    </Section>
  )
}

/** T2-b.4 ProgramPartners: centered SectionHead + LogoGrid (166.4x48 cells in col 2/-2) + note. */
export function ProgramPartners() {
  return (
    <Section>
      <SectionHead
        center
        padClass="pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-[100px] xl:pt-40"
        lead="Backed by the best accelerators."
        cont="Members of these programs get extra credit on top of the standard offer, applied automatically when you sign up."
      />
      <div className="grid grid-cols-12 pb-[100px]">
        <div className="col-[2/-2]">
          <LogoGrid inner offset={3} />
          <p className="mx-auto mt-10 max-w-md text-balance text-center text-sm text-black-700">
            Part of a program not listed here? Apply anyway and mention it in the form, we review every request by hand.
          </p>
        </div>
      </div>
    </Section>
  )
}

/** T2-b.5 PerksBand (#fafafb, 382): heading + orbit illustration (decorative media box). */
export function PerksBand() {
  const tokens = [
    [300, 74],
    [470, 22],
    [720, 2],
    [970, 22],
    [1140, 74],
    [160, 150],
    [1280, 150],
  ]
  return (
    <div className="container flex flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500">
        <div className="relative overflow-hidden bg-white-200 lg:h-[382px]">
          <svg aria-hidden="true" width="1440" height="1360" viewBox="0 0 1440 1360" className="absolute left-1/2 top-[222px] -translate-x-1/2 overflow-visible text-white-600" fill="none">
            {[680, 600, 520].map((r) => (
              <circle key={r} cx="720" cy="680" r={r} stroke="currentColor" />
            ))}
          </svg>
          <div aria-hidden="true" className="absolute left-1/2 top-[222px] h-[160px] w-[1440px] -translate-x-1/2 max-lg:hidden">
            {tokens.map(([x, y], i) => {
              const G = INTEGRATION_GLYPHS[(i * 5) % INTEGRATION_GLYPHS.length]
              return (
                <div key={i} className="absolute size-16 rounded-full border border-solid border-tile-ring backdrop-blur-[4px]" style={{ left: x - 32, top: y - 32 }}>
                  <div className="m-px flex size-[62px] items-center justify-center overflow-hidden rounded-full bg-white-100 p-5 shadow-attio-5">
                    <span className="flex size-[22px] items-center justify-center rounded-6 bg-black-300 [&>svg]:size-[18px]">
                      <G />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="relative grid grid-cols-12 pb-[140px] pt-20">
            <div className="col-[2/-2] mx-auto max-w-[965px] text-center">
              <h2 className="text-balance text-xl font-semibold text-black-100">Plus credits and discounts from tools early teams already use.</h2>
              <p className="mt-1 text-balance text-xl text-black-700">
                Hosting, payments, analytics and more. Members unlock offers worth thousands in the first year, redeemable from one shared page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

