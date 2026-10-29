import { Bar } from '../ui.jsx'
import { AvatarStack, Chip, Company, Icon, Initials, Sparkline, Meter, Tag } from '../mock.jsx'
import MiniMock from '../marketing/MiniMock.jsx'

// Original artwork for the platform media boxes (fictional "Corvale" CRM). Invented companies,
// people and numbers only; built from the shared mock primitives. No live-site imagery.

function Card({ className = '', children, style }) {
  return (
    <div className={`rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card ${className}`} style={style}>
      {children}
    </div>
  )
}

function Row({ icon, label, value, tone }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="flex items-center gap-2 text-mock-base text-black-700">
        <Icon name={icon} size={14} className="text-black-800" />
        {label}
      </span>
      {tone ? <Chip tone={tone}>{value}</Chip> : <span className="truncate text-mock-base text-black-100">{value}</span>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Split-accordion panels (art box 720:883, contained in 694x640)        */
/* ------------------------------------------------------------------ */
const PANELS = [
  // 0 record with filled attributes
  () => (
    <Card className="flex w-[86%] flex-col p-5">
      <Company id="brightwater" size={28} textClass="text-mock-lg font-semibold text-black-100" />
      <div className="mt-4 flex flex-col divide-y divide-white-400">
        <Row icon="building" label="Industry" value="Climate software" />
        <Row icon="users" label="Headcount" value="214" />
        <Row icon="coin" label="Last round" value="Series B" tone="green" />
        <Row icon="pin" label="Region" value="Northern Europe" />
        <Row icon="sparkle" label="Hiring focus" value="Sales leaders" tone="iris" />
      </div>
    </Card>
  ),
  // 1 workflow run with steps
  () => (
    <div className="flex w-[86%] flex-col items-stretch gap-3">
      {[
        ['bolt', 'Record created', 'blue'],
        ['globe', 'Research the account', 'iris'],
        ['filter', 'Score the fit', 'amber'],
        ['send', 'Notify the owner', 'green'],
      ].map(([i, t, tone], k) => (
        <Card key={t} className="flex items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2.5 text-mock-md text-black-100">
            <Icon name={i} size={16} className="text-blue-500" />
            {t}
          </span>
          <Chip tone={k < 3 ? 'green' : tone}>{k < 3 ? 'Done' : 'Running'}</Chip>
        </Card>
      ))}
    </div>
  ),
  // 2 answer with cited sources
  () => (
    <Card className="flex w-[86%] flex-col gap-3 p-5">
      <span className="flex items-center gap-2 text-mock-md text-black-600">
        <Icon name="sparkle" size={16} className="text-art-iris" />
        Summary
      </span>
      <Bar w="94%" h={7} className="bg-white-600" />
      <Bar w="88%" h={7} className="bg-white-600" />
      <Bar w="62%" h={7} className="bg-white-600" />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {['northwind.news', 'filings.gov', 'careers page'].map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-solid border-white-400 pt-3">
        <span className="text-mock-base text-black-700">Confidence</span>
        <Meter value={0.82} tone="green" className="h-1.5 w-28" />
      </div>
    </Card>
  ),
  // 3 breakdown chart
  () => (
    <Card className="flex w-[86%] flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-mock-md text-black-600">Pipeline by stage</span>
        <Chip tone="blue">This quarter</Chip>
      </div>
      <span className="text-mock-2xl text-black-100">$3.1M</span>
      <div className="flex h-36 items-end gap-2">
        {[0.45, 0.7, 0.55, 0.9, 0.62, 0.38].map((v, i) => (
          <span key={i} className={`flex-1 rounded-4 ${i === 3 ? 'bg-blue-500' : 'bg-blue-200'}`} style={{ height: `${v * 100}%` }} />
        ))}
      </div>
    </Card>
  ),
  // 4 agent log
  () => (
    <Card className="flex w-[86%] flex-col divide-y divide-white-400 px-4 py-1">
      {[
        ['Read 4 recent emails', '09:12'],
        ['Checked the open deal', '09:12'],
        ['Drafted a reply', '09:13'],
        ['Waiting for approval', '09:13'],
      ].map(([t, time], k) => (
        <div key={t} className="flex items-center justify-between gap-3 py-3">
          <span className="flex items-center gap-2 text-mock-md text-black-100">
            <Icon name={k < 3 ? 'checkCircle' : 'clock'} size={16} className={k < 3 ? 'text-traffic-green' : 'text-black-800'} />
            {t}
          </span>
          <span className="text-mock-sm text-black-800">{time}</span>
        </div>
      ))}
    </Card>
  ),
  // 5 people list
  () => <MiniMock variant={3} className="h-full w-full" />,
]

/** Split-accordion media (fills the 694x640 panel; art keeps the 720:883 box, contained). */
export function PanelArt({ variant = 0 }) {
  const P = PANELS[variant % PANELS.length]
  return (
    <div role="img" aria-label="Product illustration" className="mx-auto flex aspect-[720/883] h-full max-w-full items-center justify-center">
      <P />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Grid / bento tiles (400x316 and similar)                              */
/* ------------------------------------------------------------------ */
const TILES = [
  // 0 confidence rating
  () => (
    <Card className="flex w-[78%] flex-col gap-2.5 p-4">
      <span className="text-mock-base text-black-700">Funding stage</span>
      <span className="text-mock-xl text-black-100">Series A</span>
      <div className="flex items-center gap-2">
        <Meter value={0.4} tone="amber" className="h-1.5 flex-1" />
        <span className="text-mock-sm text-black-700">Low confidence</span>
      </div>
    </Card>
  ),
  // 1 reasoning trail
  () => (
    <Card className="flex w-[80%] flex-col gap-2 p-4">
      {['Opened company site', 'Read press page', 'Compared two filings'].map((t, i) => (
        <span key={t} className="flex items-center gap-2 text-mock-base text-black-100">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-mock-2xs text-blue-600">{i + 1}</span>
          {t}
        </span>
      ))}
    </Card>
  ),
  // 2 schedule
  () => (
    <Card className="flex w-[78%] flex-col divide-y divide-white-400 px-4 py-1">
      {[
        ['Run once', false],
        ['Run on every new row', true],
        ['Run weekly', false],
      ].map(([t, on]) => (
        <div key={t} className="flex items-center justify-between py-2.5">
          <span className="text-mock-base text-black-100">{t}</span>
          <span className={`flex h-4 w-7 items-center rounded-full p-0.5 ${on ? 'justify-end bg-blue-500' : 'bg-white-500'}`}>
            <span className="h-3 w-3 rounded-full bg-white-100" />
          </span>
        </div>
      ))}
    </Card>
  ),
  () => <MiniMock variant={0} className="h-full w-full" />,
  () => <MiniMock variant={1} className="h-full w-full" />,
  () => <MiniMock variant={2} className="h-full w-full" />,
  () => <MiniMock variant={3} className="h-full w-full" />,
  () => <MiniMock variant={4} className="h-full w-full" />,
  () => <MiniMock variant={5} className="h-full w-full" />,
]

/** Small media composition centred in its box (S-GRID3, S-BENTO, legacy wells, quad media). */
export function TileArt({ variant = 0, className = '' }) {
  const T = TILES[variant % TILES.length]
  return (
    <div role="img" aria-label="Product illustration" className={`flex h-full w-full items-center justify-center ${className}`}>
      <T />
    </div>
  )
}


/** Stage chart for the tabbed showcase (810x502 panel; column blocks placed like the live panel's
 * chart: four 105px columns on a 425px baseline, ghost bars behind, value badges, hover card).
 * Original content and numbers. */
const FUNNEL = [
  ['Inbound', 121, 121, '100%', '148', 'bg-blue-300'],
  ['Discovery', 121, 294, '44%', '65', 'bg-blue-500'],
  ['Proposal', 294, 357, '21%', '31', 'bg-blue-300'],
  ['Signed', 357, 388, '39%', '12', 'bg-blue-300'],
]
export function FunnelArt() {
  const X = (v) => `${(v / 810) * 100}%`
  const Y = (v) => `${(v / 502) * 100}%`
  return (
    <div role="img" aria-label="Stage chart illustration" className="absolute inset-0">
      <span className="absolute flex items-center gap-2 text-[15px] font-semibold text-black-100" style={{ left: X(188), top: Y(52) }}>
        Deal flow by stage
        <span className="flex items-center gap-1 rounded-6 border border-solid border-white-500 bg-white-100 px-1.5 py-0.5 text-[12px] font-normal text-black-600"><span className="size-3 rounded-[3px] bg-blue-500" />Deals</span>
      </span>
      {FUNNEL.map(([label, ghost, top, pct, n, tone], i) => {
        const left = 188 + i * 111
        return (
          <div key={label}>
            <span className="absolute rounded-t-8 bg-gradient-to-b from-blue-100 to-blue-100/30" style={{ left: X(left), width: X(105), top: Y(ghost), height: Y(425 - ghost) }} />
            <span className={`absolute rounded-t-8 ${tone}`} style={{ left: X(left), width: X(105), top: Y(top), height: Y(425 - top) }} />
            <span className="absolute flex w-[52px] -translate-x-1/2 flex-col items-center gap-1 rounded-8 bg-white-100 py-1.5 shadow-mock-card" style={{ left: X(left + 52), top: Y(Math.min(Math.max(top, 250) - 4, 340)) }}>
              <span className="rounded-4 bg-blue-100 px-1 text-[11px] text-blue-600">{pct}</span>
              <span className="text-[14px] text-black-300">{n}</span>
            </span>
            <span className="absolute -translate-x-1/2 text-[14px] text-black-600" style={{ left: X(left + 52), top: Y(434) }}>{label}</span>
          </div>
        )
      })}
      <span className="absolute flex flex-col gap-2 rounded-8 bg-white-100 py-2.5 pl-7 pr-3 shadow-mock-card" style={{ left: X(375), top: Y(153), width: X(200) }}>
        <span className="absolute bottom-3 left-3 top-3 w-[3px] rounded-full bg-blue-500" />
        <span className="flex items-center gap-2 text-[14px] text-black-600">Stage<span className="rounded-6 bg-white-300 px-1.5 text-[12px]">Discovery</span></span>
        <span className="flex items-center gap-2 text-[14px] text-black-600">Deals<span className="rounded-6 bg-white-300 px-1.5 text-[12px]">65</span></span>
      </span>
    </div>
  )
}

/** Bento chart tiles (wide 804x316 / narrow 457x316). */
export function ChartArt({ variant = 0 }) {
  const bars = [
    [0.3, 0.42, 0.38, 0.55, 0.5, 0.62, 0.58, 0.74, 0.7, 0.86, 0.8, 0.94],
    [0.8, 0.62, 0.5, 0.34, 0.22],
    [0.25, 0.4, 0.35, 0.6, 0.52, 0.7, 0.66],
    [0.5, 0.56, 0.48, 0.66, 0.72, 0.64, 0.8, 0.88, 0.84, 0.92],
  ][variant % 4]
  const title = ['New workspaces by week', 'Where deals stall', 'Shared dashboard', 'Live board'][variant % 4]
  return (
    <div role="img" aria-label="Chart illustration" className="flex h-full w-full items-center justify-center">
      <Card className="flex h-[86%] w-[92%] flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-mock-md text-black-600">{title}</span>
          <AvatarStack people={[['Ada Moss', 'blue'], ['Kai Rhee', 'teal'], ['Lu Park', 'iris']]} size={18} />
        </div>
        {variant % 4 === 1 ? (
          <div className="flex flex-1 flex-col justify-center gap-2">
            {bars.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-16 text-mock-sm text-black-700">{['Lead', 'Demo', 'Trial', 'Review', 'Signed'][i]}</span>
                <span className="h-3 rounded-4 bg-blue-400" style={{ width: `${v * 70}%` }} />
              </div>
            ))}
          </div>
        ) : variant % 4 === 2 ? (
          <Sparkline values={bars} width={400} height={160} className="h-full w-full flex-1 text-art-teal" />
        ) : (
          <div className="flex flex-1 items-end gap-1.5">
            {bars.map((v, i) => (
              <span key={i} className={`flex-1 rounded-4 ${i === bars.length - 1 ? 'bg-blue-500' : 'bg-blue-200'}`} style={{ height: `${v * 100}%` }} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Large product window (S-CENTER-MEDIA, 1158 wide)                       */
/* ------------------------------------------------------------------ */
const WINDOW_ROWS = [
  ['halcyon', 'Nadia Brooks', 'blue', 'Qualified', '$84,000'],
  ['brightwater', 'Theo Laurent', 'teal', 'Proposal', '$126,500'],
  ['kettle', 'Ines Varga', 'iris', 'Discovery', '$42,000'],
  ['pinecrest', 'Sam Okafor', 'amber', 'Negotiation', '$210,000'],
  ['lumenaut', 'Mara Quist', 'blue', 'Qualified', '$61,250'],
  ['orchard', 'Jun Ishida', 'teal', 'Won', '$98,000'],
  ['tidewell', 'Rhea Dalton', 'iris', 'Proposal', '$155,000'],
  ['marigold', 'Owen Pike', 'amber', 'Discovery', '$37,800'],
  ['quarry', 'Lena Ford', 'blue', 'Negotiation', '$72,400'],
  ['vesper', 'Arlo Chen', 'teal', 'Qualified', '$49,900'],
]
const STAGE_TONE = { Qualified: 'blue', Proposal: 'iris', Discovery: 'grey', Negotiation: 'amber', Won: 'green' }

/**
 * Window mock with its own chrome: titlebar, sidebar, and a table (variant 0), an agent activity
 * feed (1) or a chat answer beside the table (2). `aspect` sets the box ratio (w/h).
 */
export function WindowArt({ variant = 0, aspect = 1158 / 693 }) {
  return (
    <div role="img" aria-label="Product window illustration" className="relative w-full overflow-hidden rounded-12 border border-solid border-white-500 bg-white-100 shadow-hero-window" style={{ aspectRatio: aspect }}>
      <div className="flex h-10 items-center gap-2 border-b border-solid border-mock-stroke px-4">
        {['bg-traffic-red', 'bg-traffic-yellow', 'bg-traffic-green'].map((c) => (
          <span key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />
        ))}
        <span className="ml-4 text-mock-base text-black-700">Corvale</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-10 flex">
        <div className="hidden w-[18%] flex-col gap-1 border-r border-solid border-mock-stroke bg-mock-surface p-3 md:flex">
          {['home', 'inbox', 'task', 'list', 'board', 'chart', 'flow', 'settings'].map((i, k) => (
            <span key={i} className={`flex items-center gap-2 rounded-6 px-2 py-1.5 text-mock-base ${k === (variant % 3) + 3 ? 'bg-white-400 text-black-100' : 'text-black-600'}`}>
              <Icon name={i} size={14} />
              {['Home', 'Inbox', 'Tasks', 'Companies', 'Deals', 'Reports', 'Workflows', 'Settings'][k]}
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-1">
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center justify-between border-b border-solid border-mock-stroke px-4 py-2.5">
              <span className="flex items-center gap-2 text-mock-md font-semibold text-black-100">
                <Icon name="board" size={14} className="text-black-700" />
                Active deals
              </span>
              <span className="flex gap-1.5">
                <Tag>Filter</Tag>
                <Tag>Sort</Tag>
              </span>
            </div>
            {WINDOW_ROWS.map(([co, owner, tone, stage, value]) => (
              <div key={co} className="grid grid-cols-[1.4fr_1fr_0.9fr_0.7fr] items-center gap-3 border-b border-solid border-mock-stroke px-4 py-2.5">
                <Company id={co} size={16} />
                <span className="flex min-w-0 items-center gap-1.5 text-mock-base text-black-600">
                  <Initials name={owner} tone={tone} size={16} />
                  <span className="truncate">{owner}</span>
                </span>
                <span>
                  <Chip tone={STAGE_TONE[stage]}>{stage}</Chip>
                </span>
                <span className="text-right text-mock-base tabular-nums text-black-100">{value}</span>
              </div>
            ))}
          </div>
          {variant % 3 !== 0 && (
            <div className="hidden w-[32%] flex-col gap-3 border-l border-solid border-mock-stroke bg-mock-surface p-4 md:flex">
              <span className="flex items-center gap-2 text-mock-md font-semibold text-black-100">
                <Icon name="sparkle" size={14} className="text-art-iris" />
                {variant % 3 === 1 ? 'Agent activity' : 'Assistant'}
              </span>
              {(variant % 3 === 1
                ? ['Watching new signups', 'Enriched 12 companies', 'Flagged 3 renewals', 'Drafted 5 follow-ups']
                : ['Which deals slipped this week?', 'Three deals moved out of the quarter.', 'Pinecrest needs a reply.']
              ).map((t, k) => (
                <Card key={t} className={`px-3 py-2 text-mock-base ${variant % 3 === 2 && k === 0 ? 'self-end bg-blue-100 text-blue-600' : 'text-black-100'}`}>
                  {t}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** S-ORBIT illustration (400x263 box): concentric orbits on a horizon with nodes. */
export function OrbitArt({ className = '' }) {
  // Two overlapping rings with node dots (layout measured on the live S-ORBIT box: r 130,
  // centres 132px apart); original drawing.
  return (
    <svg viewBox="0 0 400 263" role="img" aria-label="Overlapping rings illustration" className={className} fill="none">
      <circle cx="134" cy="131.5" r="129.5" className="text-black-900" stroke="currentColor" />
      <circle cx="266" cy="131.5" r="129.5" className="text-white-800" stroke="currentColor" strokeDasharray="4 6" />
      {[
        [4.5, 131.5, 'text-white-800'],
        [134, 131.5, 'text-black-300'],
        [266, 131.5, 'text-white-800'],
        [395.5, 131.5, 'text-white-800'],
      ].map(([x, y, c]) => (
        <circle key={x} cx={x} cy={y} r="2.5" className={c} fill="currentColor" />
      ))}
    </svg>
  )
}

/** Small glyph tile (marquee card icon / app tile): pastel square with a stroke icon. */
const GLYPH_TONES = [
  'bg-platform-tile-blue text-blue-500',
  'bg-platform-tile-cyan text-art-teal',
  'bg-platform-tile-yellow text-black-500',
  'bg-art-haze text-art-iris',
  'bg-white-300 text-black-500',
]
export function GlyphTile({ icon, tone = 0, size = 20, radius = 'rounded-6', className = '' }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${radius} ${GLYPH_TONES[tone % GLYPH_TONES.length]} ${className}`} style={{ width: size, height: size }}>
      <Icon name={icon} size={Math.round(size * 0.66)} strokeWidth={1.5} />
    </span>
  )
}
