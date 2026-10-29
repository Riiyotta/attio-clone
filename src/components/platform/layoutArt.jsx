import { Chip, Company, CompanyGlyph, Icon, Initials } from '../mock.jsx'

// LayoutArt (1.3.0): original mock UI placed on an explicit block layout.
// Each media box that sat far from its live counterpart in the parity run gets a list of blocks
// (tables, cards, pills, text rows, bar charts) whose boxes follow where the live media puts its
// content at 1440 (positions only, measured as ink blocks on the live capture). Everything drawn
// inside a block is invented: fictional companies and people from mock.jsx, generic field names,
// made-up numbers. No live screenshot, logo or copy is used.
//
// box: [W, H] reference size of the media container at 1440 (px). Blocks use the same px space and
// are rendered in percentages, so the layout scales with the container below 1440.

const CO = ['halcyon', 'brightwater', 'kettle', 'pinecrest', 'lumenaut', 'orchard', 'tidewell', 'marigold', 'quarry', 'vesper']
const PEOPLE = ['Nadia Brooks', 'Theo Laurent', 'Ines Varga', 'Sam Okafor', 'Mara Quist', 'Jun Ishida', 'Rhea Dalton', 'Owen Pike', 'Lena Ford', 'Arlo Chen', 'Robin Hale', 'Tess Moreau']
const TONES = ['blue', 'green', 'amber', 'iris', 'teal', 'grey', 'red']
const WORDS = ['Renewal', 'Pilot', 'Expansion', 'Inbound', 'Partner', 'Annual', 'Monthly', 'Webinar', 'Referral', 'Trial', 'Upsell', 'Event']
const LABELS = ['Owner', 'Stage', 'Region', 'Headcount', 'Last touch', 'Plan', 'Source', 'Next step', 'Health', 'Value', 'Segment', 'Due']
const SENTENCES = [
  'Moved the renewal to next week after the pricing call',
  'Asked for a security review before the pilot starts',
  'Three new seats requested by the operations team',
  'Budget approved for the second region in spring',
  'Wants a short summary of usage before Friday',
  'Champion changed roles, new contact to be confirmed',
  'Follow up on the integration questions from Tuesday',
  'Shared the onboarding plan with the finance lead',
]
const pick = (arr, i) => arr[((i % arr.length) + arr.length) % arr.length]

function Cell({ kind, i }) {
  switch (kind) {
    case 'co':
      return <Company id={pick(CO, i)} size={16} textClass="truncate text-[13px] text-black-100" />
    case 'person':
      return (
        <span className="flex min-w-0 items-center gap-1.5 text-[13px] text-black-300">
          <Initials name={pick(PEOPLE, i)} size={16} tone={pick(TONES, i)} />
          <span className="truncate">{pick(PEOPLE, i)}</span>
        </span>
      )
    case 'chip':
      return <Chip tone={pick(TONES, i)}>{pick(WORDS, i)}</Chip>
    case 'chips':
      return (
        <span className="flex gap-1">
          <Chip tone={pick(TONES, i)} dot={false}>{pick(WORDS, i)}</Chip>
          {i % 2 === 0 && <Chip tone={pick(TONES, i + 3)} dot={false}>{pick(WORDS, i + 5)}</Chip>}
        </span>
      )
    case 'num':
      return <span className="w-full text-right text-[13px] tabular-nums text-black-100">${(((i * 7919) % 90) + 3) * 1000 + ((i * 131) % 9) * 100}</span>
    case 'date':
      return <span className="text-[13px] text-black-600">{`${((i * 5) % 27) + 1} ${pick(['Mar', 'Apr', 'May', 'Jun'], i)}`}</span>
    case 'text':
      return <span className="truncate text-[13px] text-black-600">{pick(SENTENCES, i)}</span>
    case 'label':
      return <span className="truncate text-[13px] text-black-600">{pick(LABELS, i)}</span>
    default:
      return null
  }
}

function Table({ b }) {
  const cols = b.cols || ['co', 'person', 'chip']
  const widths = b.widths || cols.map(() => 1)
  const rowH = b.rowH || 36
  const tpl = widths.map((w) => `${w}fr`).join(' ')
  return (
    <div className={`flex h-full flex-col overflow-hidden ${b.bare ? '' : 'rounded-10 border border-solid border-white-500 bg-white-100 shadow-mock-card'}`}>
      {b.header !== false && (
        <div className="grid shrink-0 items-center border-b border-solid border-mock-stroke px-3 text-[12px] text-black-600" style={{ gridTemplateColumns: tpl, height: b.headH || rowH }}>
          {cols.map((c, k) => (
            <span key={k} className="flex items-center gap-1.5 truncate">
              <Icon name={['list', 'users', 'tag', 'coin', 'clock'][k % 5]} size={12} />
              {pick(LABELS, k + (b.seed || 0))}
            </span>
          ))}
        </div>
      )}
      {Array.from({ length: b.rows || 5 }, (_, r) => (
        <div key={r} className="grid shrink-0 items-center gap-2 border-b border-solid border-mock-stroke px-3" style={{ gridTemplateColumns: tpl, height: rowH }}>
          {cols.map((c, k) => (
            <span key={k} className="flex min-w-0 items-center">
              <Cell kind={c} i={r + (b.seed || 0) + k * 3} />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function CardBlock({ b }) {
  const rowH = b.rowH || 32
  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card ${b.pad ?? 'px-4 py-3'}`}>
      {b.title && (
        <span className="flex shrink-0 items-center gap-2 pb-2 text-[14px] font-semibold text-black-100">
          {b.co ? <CompanyGlyph shape="orbit" tone={pick(TONES, b.seed || 0)} size={20} radius="rounded-6" /> : <Icon name={b.icon || 'sparkle'} size={15} className="text-black-600" />}
          {b.title}
        </span>
      )}
      {Array.from({ length: b.rows || 0 }, (_, r) => (
        <div key={r} className="flex shrink-0 items-center justify-between gap-3" style={{ height: rowH }}>
          <span className="flex items-center gap-2 text-[13px] text-black-600">
            <Icon name={['tag', 'users', 'pin', 'clock', 'coin', 'link'][(r + (b.seed || 0)) % 6]} size={13} />
            {pick(LABELS, r + (b.seed || 0))}
          </span>
          {b.value === 'chip' ? <Chip tone={pick(TONES, r + 1)}>{pick(WORDS, r + (b.seed || 0))}</Chip> : <span className="truncate text-[13px] text-black-100">{pick(WORDS, r + 2 + (b.seed || 0))}</span>}
        </div>
      ))}
      {b.lines && <Lines b={{ n: b.lines, lineH: b.lineH || 20, seed: b.seed }} />}
    </div>
  )
}

function Lines({ b }) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: b.n || 2 }, (_, r) => (
        <span key={r} className="truncate text-black-600" style={{ height: b.lineH || 20, fontSize: b.size || 13, lineHeight: `${b.lineH || 20}px` }}>
          {pick(SENTENCES, r + (b.seed || 0))}
        </span>
      ))}
    </div>
  )
}

function Bars({ b }) {
  const vals = b.vals || [0.4, 0.55, 0.5, 0.7, 0.62, 0.8, 0.74, 0.92]
  return (
    <div className={`flex h-full items-end ${b.gap || 'gap-1.5'}`}>
      {vals.map((v, i) => (
        <span key={i} className={`flex-1 rounded-t-4 ${i === (b.hi ?? vals.length - 1) ? 'bg-blue-500' : b.tone || 'bg-blue-200'}`} style={{ height: `${v * 100}%` }} />
      ))}
    </div>
  )
}

function Pill({ b }) {
  return (
    <span className={`flex h-full items-center gap-1.5 overflow-hidden whitespace-nowrap border border-solid border-white-500 bg-white-100 px-2.5 text-[13px] text-black-300 shadow-mock-chip ${b.round || 'rounded-8'}`}>
      {b.icon && <Icon name={b.icon} size={13} />}
      {b.text || pick(WORDS, b.seed || 0)}
    </span>
  )
}

/** Speaker tracks: avatar + name + share on the right, a segmented talk-time bar under each row. */
function Tracks({ b }) {
  const segs = (r) => Array.from({ length: 7 }, (_, k) => [((r * 37 + k * 53) % 90) + 2, ((r * 11 + k * 7) % 8) + 3])
  return (
    <div className="flex h-full flex-col justify-center rounded-12 border border-solid border-white-500 bg-white-100 px-3 shadow-mock-card">
      {Array.from({ length: b.rows || 3 }, (_, r) => (
        <div key={r} className="flex flex-col justify-center gap-1.5" style={{ height: b.rowH || 50 }}>
          <span className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-2 text-black-100">
              <Icon name={r === (b.hi ?? 1) ? 'check' : 'dots'} size={11} className="text-black-800" />
              <Initials name={pick(PEOPLE, r + (b.seed || 0))} size={16} tone={pick(TONES, r)} />
              {pick(PEOPLE, r + (b.seed || 0))}
            </span>
            <span className="text-[12px] text-black-800">{`${31 + r * 17}% · ${4 + r * 3} min`}</span>
          </span>
          <span className="relative block h-1 w-full">
            {segs(r).map(([x, w], k) => (
              <span key={k} className={`absolute h-1 rounded-full ${['bg-art-iris', 'bg-traffic-yellow', 'bg-art-teal'][r % 3]}`} style={{ left: `${x}%`, width: `${w}%` }} />
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

/** One inline row: optional icon, avatar or company glyph, then text (invented). */
function Row({ b }) {
  const i = b.seed || 0
  return (
    <span className={`flex h-full min-w-0 items-center gap-2 text-black-300 ${b.text_cls || 'text-[13px]'}`}>
      {b.icon && <Icon name={b.icon} size={13} className="shrink-0 text-black-800" />}
      {b.avatar && <Initials name={pick(PEOPLE, i)} size={b.avatar === true ? 18 : b.avatar} tone={pick(TONES, i)} />}
      {b.glyph && <CompanyGlyph shape={['orbit', 'grid', 'peak', 'wave', 'arc'][i % 5]} tone={pick(TONES, i + 1)} size={16} radius="rounded-4" />}
      <span className="truncate">{b.text || (b.avatar ? pick(PEOPLE, i) : pick(SENTENCES, i))}</span>
    </span>
  )
}

/** Territory map: an invented landmass drawn as a field of square cells in four blue shades. */
function Regions({ b }) {
  const cols = b.cols || 44
  const rows = b.rows || 18
  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = (c + 0.5) / cols - 0.5
      const v = (r + 0.5) / rows - 0.5
      // irregular blob: ellipse with a wobbling edge and a bay on the lower right
      const edge = 0.5 + 0.06 * Math.sin(c * 0.9) + 0.05 * Math.cos(r * 1.3 + c * 0.4)
      const bay = u > 0.18 && v > 0.22 && u < 0.36
      if (Math.max(Math.abs(u) * 1.02, Math.abs(v) * 1.05) + 0.12 * (u * u + v * v) < edge * 0.98 && !(u < -0.3 && v > 0.3) && !bay) cells.push([c, r, (c * 7 + r * 13 + ((c * r) % 5)) % 4])
    }
  }
  const tone = ['#c8dcff', '#94b9ff', '#709ff5', '#266df0']
  // optional pale zone: cells right of `paleFrom` (0-1 across) use the lightest tint
  const fill = (c, t) => (b.paleFrom != null && c / cols > b.paleFrom ? '#e8f0ff' : tone[t])
  return (
    <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none" className="size-full" aria-hidden="true">
      {cells.map(([c, r, t]) => (
        <rect key={`${c}-${r}`} x={c + 0.06} y={r + 0.06} width="0.88" height="0.88" rx="0.12" fill={fill(c, t)} />
      ))}
    </svg>
  )
}

function Donut({ b }) {
  const parts = b.parts || [0.42, 0.27, 0.18, 0.13]
  const tone = b.tones || ['#266df0', '#709ff5', '#94b9ff', '#c8dcff']
  let a = 0
  const R = 40
  const C = 2 * Math.PI * R
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      {parts.map((p, i) => {
        const el = <circle key={i} cx="50" cy="50" r={R} fill="none" stroke={tone[i % 4]} strokeWidth={b.thick || 16} strokeDasharray={`${p * C} ${C}`} strokeDashoffset={-a * C} transform="rotate(-90 50 50)" />
        a += p
        return el
      })}
    </svg>
  )
}

function Area({ b }) {
  const vals = b.vals || [0.2, 0.28, 0.25, 0.4, 0.37, 0.52, 0.48, 0.63, 0.6, 0.78]
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * 100},${100 - v * 100}`).join(' ')
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full" aria-hidden="true">
      {[25, 50, 75].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#e4e7ec" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />)}
      <polygon points={`0,100 ${pts} 100,100`} fill={b.fill || '#e8f0ff'} opacity="0.9" />
      <polyline points={pts} fill="none" stroke={b.stroke || '#266df0'} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {b.second && <polyline points={b.second.map((v, i) => `${(i / (b.second.length - 1)) * 100},${100 - v * 100}`).join(' ')} fill="none" stroke="#94b9ff" strokeWidth="2" vectorEffect="non-scaling-stroke" />}
    </svg>
  )
}

function Block({ b }) {
  switch (b.k) {
    case 'table':
      return <Table b={b} />
    case 'card':
      return <CardBlock b={b} />
    case 'lines':
      return <Lines b={b} />
    case 'bars':
      return <Bars b={b} />
    case 'row':
      return <Row b={b} />
    case 'regions':
      return <Regions b={b} />
    case 'donut':
      return <Donut b={b} />
    case 'area':
      return <Area b={b} />
    case 'tracks':
      return <Tracks b={b} />
    case 'tip':
      return (
        <span className="flex h-full items-center justify-center gap-2 rounded-8 bg-black-100 px-3 text-[12px] text-white-100">
          <Icon name="sparkle" size={12} />
          {b.text}
        </span>
      )
    case 'pill':
      return <Pill b={b} />
    case 'avatar':
      return <Initials name={pick(PEOPLE, b.seed || 0)} size={b.w} tone={pick(TONES, b.seed || 0)} />
    case 'glyph':
      return <CompanyGlyph shape={b.shape || 'orbit'} tone={b.tone || 'blue'} size={b.w} radius="rounded-8" />
    case 'fill':
      return <span className={`block h-full w-full ${b.cls || 'rounded-8 bg-white-500'}`} />
    case 'frame':
      return <span className={`block h-full w-full rounded-12 border border-solid border-white-500 ${b.cls || 'bg-white-100 shadow-mock-card'}`} />
    default:
      return b.node || null
  }
}

export function LayoutArt({ box, blocks, label = 'Product illustration', contained = false, className = '' }) {
  const [W, H] = box
  return (
    <div role="img" aria-label={label} className={`${contained ? 'relative size-full' : 'absolute inset-0'} overflow-hidden ${className}`}>
      {blocks.map((b, i) => (
        <div key={i} className="absolute" style={{ left: `${(b.x / W) * 100}%`, top: `${(b.y / H) * 100}%`, width: `${(b.w / W) * 100}%`, height: `${(b.h / H) * 100}%` }}>
          <Block b={b} />
        </div>
      ))}
    </div>
  )
}
