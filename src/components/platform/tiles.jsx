import { Company, Icon, Initials } from '../mock.jsx'

// Small media compositions for v2 S-GRID3 cards (399x315 boxes). Each one mirrors the
// arrangement of the live card it stands in for (a record card, a stacked list, a chart, a
// ring diagram) with invented companies, people and numbers. Original artwork only.

function Card({ className = '', children, style }) {
  return (
    <div className={`rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card ${className}`} style={style}>
      {children}
    </div>
  )
}
const Wrap = ({ children, label }) => (
  <div role="img" aria-label={label} className="flex h-full w-full items-center justify-center">
    {children}
  </div>
)

const ATTRS = [
  ['building', 'Created', 'Mar 2019'],
  ['note', 'Name', 'Halcyon Freight'],
  ['list', 'About', 'Freight software for fleets'],
  ['users', 'Team', 'Ada, Kai, +4'],
  ['tag', 'Segments', 'B2B · Logistics'],
  ['link', 'Linked deals', 'Halcyon expansion'],
]
/** Record card with action row and attribute rows. */
export function RecordCardArt({ person = false }) {
  return (
    <Wrap label="Record detail illustration">
      <Card className="flex w-[250px] flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          {person ? (
            <span className="flex items-center gap-2 text-mock-md font-semibold text-black-100">
              <Initials name="Nadia Brooks" size={20} tone="teal" /> Nadia Brooks
            </span>
          ) : (
            <Company id="halcyon" size={20} textClass="text-mock-md font-semibold text-black-100" />
          )}
          <Icon name="star" size={11} className="text-black-800" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-6 border border-solid border-white-500 px-1.5 py-0.5 text-mock-sm text-black-300">{person ? 'Send email' : 'Add to list'}</span>
          {['mail', 'calendar', 'send', 'dots'].map((i) => (
            <span key={i} className="rounded-6 border border-solid border-white-500 p-1 text-black-600">
              <Icon name={i} size={10} />
            </span>
          ))}
        </div>
        <p className="text-mock-xs text-black-800">{person ? 'Person details' : 'Company details'}</p>
        {ATTRS.map(([i, k, v], n) => (
          <div key={k} className={`flex items-center gap-2 text-mock-sm ${n > 3 ? 'opacity-50' : ''}`}>
            <span className="flex w-20 items-center gap-1.5 text-black-700">
              <Icon name={i} size={10} /> {k}
            </span>
            <span className="truncate text-black-100">{person && n === 1 ? 'Nadia Brooks' : v}</span>
          </div>
        ))}
      </Card>
    </Wrap>
  )
}

/** Searchable attribute picker list. */
export function AttributeListArt() {
  const rows = ['Name', 'Work email', 'About', 'Phone', 'Photo', 'Region', 'Profile link', 'Social handle']
  return (
    <Wrap label="Attribute list illustration">
      <Card className="flex w-[200px] flex-col gap-1.5 p-2.5">
        <span className="text-mock-xs text-black-800">Search...</span>
        {rows.map((r, i) => (
          <span key={r} className="flex items-center justify-between text-mock-sm text-black-300">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border border-solid border-white-700" /> {r}
              <Icon name="sparkle" size={9} className="text-blue-450" />
            </span>
            {(i === 0 || i === 5) && <span className="text-black-800">⌄</span>}
          </span>
        ))}
        <span className="mt-1 text-mock-xs text-black-800">More about attributes</span>
      </Card>
    </Wrap>
  )
}

/** Three stacked confidence cards. */
export function ConfidenceArt() {
  return (
    <Wrap label="Confidence levels illustration">
      <div className="flex w-[320px] flex-col gap-3">
        {[
          ['High', 'bg-traffic-green'],
          ['Medium', 'bg-traffic-yellow'],
          ['Low', 'bg-red-500'],
        ].map(([l, c]) => (
          <Card key={l} className="flex flex-col gap-1 px-3 py-2.5">
            <span className="text-mock-xs text-black-800">Confidence</span>
            <span className="flex items-center gap-1.5 text-mock-base text-black-100">
              <span className={`size-1.5 rounded-full ${c}`} /> {l} confidence
            </span>
          </Card>
        ))}
      </div>
    </Wrap>
  )
}

/** Answer card with reasoning text and source chips. */
export function ReasoningArt() {
  return (
    <Wrap label="Answer reasoning illustration">
      <Card className="flex w-[318px] flex-col gap-1.5 p-3">
        <span className="text-mock-xs text-black-800">Confidence</span>
        <span className="flex items-center gap-1.5 text-mock-base text-black-100">
          <span className="size-1.5 rounded-full bg-traffic-yellow" /> Medium confidence
        </span>
        <span className="mt-1 text-mock-xs text-black-800">Why</span>
        <p className="text-mock-base text-black-100">The round size appears on the company news page, a press note and two trade write-ups.</p>
        <span className="mt-1 text-mock-xs text-black-800">Sources</span>
        <span className="flex flex-wrap gap-x-3 gap-y-1 text-mock-sm text-black-600">
          {['Company news', 'Press note', 'Trade weekly', 'Market brief'].map((s) => (
            <span key={s} className="flex items-center gap-1">
              <Icon name="link" size={9} /> {s}
            </span>
          ))}
        </span>
      </Card>
    </Wrap>
  )
}

/** A single workflow block crossed by a vertical connector. */
export function RunNodeArt() {
  return (
    <Wrap label="Workflow step illustration">
      <div className="relative flex h-full w-full items-center justify-center">
        <span className="absolute inset-y-0 left-1/2 w-px bg-white-700" />
        <div className="relative flex h-[86px] w-[350px] flex-col justify-center gap-1 rounded-12 border border-solid border-black-800 bg-white-100 px-4">
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full border border-solid border-black-700 bg-white-100" />
          <span className="flex items-center gap-2 text-mock-lg text-black-100">
            <Icon name="sparkle" size={14} className="text-black-700" /> Run research
          </span>
          <span className="text-mock-base text-black-800">Fill in yearly revenue</span>
        </div>
      </div>
    </Wrap>
  )
}

/** Line chart card with axis labels and a hover tooltip. */
export function LineChartArt({ title = 'New workspaces', area = false }) {
  const pts = area ? [60, 52, 56, 44, 40, 34, 30] : [70, 64, 40, 28, 52, 74, 66]
  const d = pts.map((y, i) => `${i ? 'L' : 'M'}${20 + i * 40} ${y}`).join(' ')
  return (
    <Wrap label="Line chart illustration">
      <Card className="flex w-[338px] flex-col gap-2 bg-white-200 p-3">
        <div className="flex items-center justify-between text-mock-base">
          <span className="text-black-100">{title}</span>
          <span className="rounded-4 border border-solid border-white-500 bg-white-100 px-1 text-mock-xs text-black-600">Workspaces</span>
        </div>
        <svg viewBox="0 0 300 100" className="w-full" fill="none">
          {[25, 50, 75].map((y) => (
            <line key={y} x1="20" x2="300" y1={y} y2={y} className="text-white-500" stroke="currentColor" />
          ))}
          {area && <path d={`${d} L260 90 L20 90 Z`} className="text-white-500" fill="currentColor" />}
          <path d={d} className="text-black-600" stroke="currentColor" strokeWidth="1.5" />
          {!area && pts.map((y, i) => <circle key={i} cx={20 + i * 40} cy={y} r="2.5" className="text-black-600" fill="currentColor" />)}
        </svg>
        <div className="flex justify-between px-3 text-mock-xs text-black-700">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </Card>
    </Wrap>
  )
}

/** Pie chart with legend and tooltip. */
export function PieArt() {
  return (
    <Wrap label="Pie chart illustration">
      <div className="relative flex h-[200px] w-[338px] items-center justify-center gap-8 rounded-12 bg-white-300">
        <span className="flex flex-col gap-2 text-mock-sm text-black-600">
          {['Team', 'Growth', 'Starter'].map((l, i) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${['bg-black-600', 'bg-black-900', 'bg-white-700'][i]}`} /> {l}
            </span>
          ))}
        </span>
        <svg viewBox="0 0 100 100" className="size-[150px]">
          <circle cx="50" cy="50" r="40" className="text-white-700" fill="currentColor" />
          <path d="M50 50 L50 10 A40 40 0 0 1 88 62 Z" className="text-black-900" fill="currentColor" />
          <path d="M50 50 L88 62 A40 40 0 0 1 22 79 Z" className="text-black-600" fill="currentColor" />
        </svg>
        <Card className="absolute right-6 top-8 px-2.5 py-1.5 text-mock-sm text-black-100">Team · $64k</Card>
      </div>
    </Wrap>
  )
}

/** Grouped list ("This week" / "This month") of calls. */
export function GroupListArt() {
  return (
    <Wrap label="Grouped call list illustration">
      <div className="flex w-[300px] flex-col gap-2.5 text-mock-base">
        <span className="text-mock-sm text-black-700">
          This week <span className="rounded-4 bg-white-300 px-1">1</span>
        </span>
        <span className="flex items-center gap-2 text-black-100">
          <Icon name="video" size={12} /> Halcyon / Corvale: renewal sync
        </span>
        <span className="mt-4 text-mock-sm text-black-700">
          This month <span className="rounded-4 bg-white-300 px-1">2</span>
        </span>
        <span className="flex items-center gap-2 text-black-100">
          <Icon name="video" size={12} /> Ines Varga and Theo Laurent
        </span>
        <span className="flex items-center gap-2 text-black-100">
          <Icon name="video" size={12} /> Kettle pricing feedback
        </span>
      </div>
    </Wrap>
  )
}

/** Concentric rings with floating action chips. */
export function RingChipsArt() {
  const chips = [
    ['Move the deal', 'left-[8%] top-[22%]'],
    ['Invite Nadia to the demo', 'right-[2%] top-[6%]'],
    ['Send the pricing note', 'bottom-[24%] left-[6%]'],
    ['Book the review', 'bottom-[12%] right-[4%]'],
  ]
  return (
    <Wrap label="Assistant actions illustration">
      <div className="relative h-full w-full">
        <svg viewBox="0 0 400 315" className="absolute inset-0 size-full" fill="none">
          {[130, 90, 52].map((r) => (
            <circle key={r} cx="200" cy="157" r={r} className="text-white-500" stroke="currentColor" />
          ))}
          <circle cx="200" cy="157" r="18" className="text-white-700" stroke="currentColor" />
        </svg>
        {chips.map(([t, p]) => (
          <span key={t} className={`absolute rounded-8 border border-solid border-white-500 bg-white-100 px-2 py-1 text-mock-sm text-black-600 shadow-mock-chip ${p}`}>
            {t}
          </span>
        ))}
      </div>
    </Wrap>
  )
}
