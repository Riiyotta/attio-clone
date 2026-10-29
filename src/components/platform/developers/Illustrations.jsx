// Original line-art diagrams for the developers page (CLONE_SPEC_PLATFORM section 4: "dashed-stroke
// diagrams, stroke #23252a / #383e47"). Fills/strokes use the measured card palette:
// node #1c1d1f + #383e47 ring, well #131416, dashes #23252a, chip ring #2e3238, text #a4adba/#505967.
// Everything here is drawn from scratch for the invented "Corvale" product.
import { useId } from 'react'

const mono = { className: 'font-mono', fontSize: 10, xmlSpace: 'preserve', style: { whiteSpace: 'pre' } }

/** Mono chip (rx 6, fill #1c1d1f, 0.8 ring #2e3238). Width from char count (6.02px per glyph at 10px). */
function Chip({ x, y, parts, h = 18, pad = 6, anchor = 'start' }) {
  const segs = typeof parts === 'string' ? [[parts, 'fill-black-900']] : parts
  const w = segs.reduce((a, [t]) => a + t.length * 6.02, 0) + pad * 2
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x
  let cx = x0 + pad
  return (
    <g>
      <rect x={x0} y={y} width={w} height={h} rx="6" className="fill-black-100 stroke-black-400" strokeWidth="0.8" />
      {segs.map(([t, c], i) => {
        const el = (
          <text key={i} x={cx} y={y + h / 2 + 3.4} {...mono} className={`font-mono ${c}`}>
            {t}
          </text>
        )
        cx += t.length * 6.02
        return el
      })}
    </g>
  )
}

/** Round node: r24 #1c1d1f with #383e47 ring, inner r16 well, 12px glyph. */
function Node({ cx, cy, r = 24, glyph = 'dot' }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="fill-black-100 stroke-black-500" />
      <circle cx={cx} cy={cy} r={r * 0.667} className="fill-dev-well stroke-dev-dash" />
      <Glyph name={glyph} cx={cx} cy={cy} />
    </g>
  )
}

function Glyph({ name, cx, cy, s = 1, className = 'stroke-black-700' }) {
  const t = `translate(${cx - 6 * s} ${cy - 6 * s}) scale(${s})`
  const p = { fill: 'none', strokeWidth: 1.1, strokeLinecap: 'round', strokeLinejoin: 'round', className }
  const g = {
    terminal: <path d="M1.5 2.5h9v7h-9zM3.5 5l1.5 1.2-1.5 1.2M6.5 7.6h2" {...p} />,
    hook: <path d="M6 2.2a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM2.6 9.8a1.6 1.6 0 1 1 0-.1zM9.4 9.8a1.6 1.6 0 1 1 0-.1zM6 5.4 3.4 8.4M6 5.4l2.6 3M4.2 9.8h3.6" {...p} />,
    shield: <path d="M6 1.6 9.8 3v3c0 2.4-1.6 3.9-3.8 4.8C3.8 9.9 2.2 8.4 2.2 6V3zM4.6 6.1l1 1 1.9-2" {...p} />,
    user: <path d="M6 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM2.4 10.2c.6-1.8 2-2.7 3.6-2.7s3 .9 3.6 2.7" {...p} />,
    plug: <path d="M4 1.8v2.4M8 1.8v2.4M2.8 4.2h6.4v1.6a3.2 3.2 0 0 1-6.4 0zM6 9v1.8" {...p} />,
    spark: <path d="M6 1.5 7 5l3.5 1L7 7l-1 3.5L5 7 1.5 6 5 5z" {...p} />,
    mark: <path d="M8.8 3.4A3.6 3.6 0 1 0 8.8 8.6M6.6 6h3" {...p} strokeWidth="1.5" className="stroke-white-400" />,
    dot: <circle cx="6" cy="6" r="1.6" className="fill-black-700" />,
    grid: <path d="M2 2h3v3H2zM7 2h3v3H7zM2 7h3v3H2zM7 7h3v3H7z" {...p} />,
    clock: <path d="M6 1.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zM6 3.8V6l1.5 1" {...p} />,
  }[name]
  return <g transform={t}>{g}</g>
}

const Dash = ({ d, className = 'stroke-dev-dash', w = 1 }) => (
  <path d={d} fill="none" strokeWidth={w} strokeDasharray="4 4" strokeLinecap="round" className={className} />
)

/** Concentric dashed rings (sampled rotation angles 37deg / 323deg kept static, see hand-off). */
function Rings({ cx, cy, radii, angles = [37, 323, 37] }) {
  return radii.map((r, i) => (
    <circle
      key={r}
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      strokeDasharray="4 4"
      className="stroke-black-400"
      transform={`rotate(${angles[i % angles.length]} ${cx} ${cy})`}
    />
  ))
}

/* ---------------------------------------------------------------- */
/* Card diagrams                                                      */
/* ---------------------------------------------------------------- */

export function RestArt() {
  const lines = [
    ['curl -X POST \\', 'fill-black-700'],
    ["  https://api.corvale.dev/v1/collections/deals/entries \\", 'fill-black-600'],
    ["  -H 'Authorization: Bearer $CORVALE_KEY' \\", 'fill-black-600'],
    ["  -H 'Content-Type: application/json' \\", 'fill-black-600'],
    ["  -d '{", 'fill-black-600'],
    ['    "values": { "stage": "won" }', 'fill-black-600'],
  ]
  return (
    <svg viewBox="0 0 409 191" width="100%" height="100%" fill="none" aria-hidden="true">
      <Dash d="M76 95.5h52" />
      <Node cx={52} cy={95.5} glyph="terminal" />
      <rect x="128.5" y="6.5" width="300" height="200" rx="10" className="fill-black-100 stroke-black-400" />
      <path d="M128.5 36.5h300" className="stroke-black-300" />
      <Chip x={138} y={12.5} parts="POST" />
      <text x="184" y="25" {...mono} className="font-mono fill-black-900">
        /v1/collections/
      </text>
      <Chip x={284} y={12.5} parts="{slug}" />
      <text x="334" y="25" {...mono} className="font-mono fill-black-600">
        /entries
      </text>
      {lines.map(([t, c], i) => (
        <text key={i} x="140" y={58 + i * 17} {...mono} className={`font-mono ${c}`}>
          {t}
        </text>
      ))}
    </svg>
  )
}

export function WebhookArt({ chip = 'entry.updated' }) {
  return (
    <svg viewBox="0 0 274 266" width="100%" height="100%" fill="none" aria-hidden="true">
      <Rings cx={106} cy={133} radii={[86, 64, 43]} />
      <circle cx="106" cy="133" r="43" className="fill-black-100" opacity="0.5" />
      <Node cx={106} cy={133} glyph="hook" />
      {chip && <Chip x={168} y={124} parts={chip} />}
    </svg>
  )
}

export function OAuthArt() {
  return (
    <svg viewBox="0 0 274 266" width="100%" height="100%" fill="none" aria-hidden="true">
      <Dash d="M137 72v108" />
      <Dash d="M20 192h234" />
      {[48, 92, 137, 182, 226].map((x) => (
        <circle key={x} cx={x} cy="192" r="3.5" className="fill-primary-background stroke-black-400" />
      ))}
      <Chip x={137} y={52} parts={[['GET', 'fill-black-600'], [' /oauth/grant', 'fill-black-900']]} anchor="middle" />
      <Node cx={137} cy={133} glyph="shield" />
    </svg>
  )
}

export function EntryPointsArt() {
  return (
    <svg viewBox="0 0 389 265" width="100%" height="100%" fill="none" aria-hidden="true">
      <rect x="20.5" y="18.5" width="340" height="260" rx="10" className="fill-primary-background stroke-black-300" />
      <path d="M20.5 52.5h340M20.5 92.5h340" className="stroke-black-300" />
      <rect x="128.5" y="60.5" width="78" height="22" rx="6" className="fill-black-100 stroke-black-400" />
      <Glyph name="grid" cx={142} cy={71.5} s={0.8} />
      <text x="152" y="75" fontSize="11" className="fill-black-900">
        New entry
      </text>
      {[214, 242, 270, 298].map((x) => (
        <g key={x}>
          <rect x={x + 0.5} y="60.5" width="22" height="22" rx="6" className="fill-black-100 stroke-black-400" />
          <Glyph name={['user', 'spark', 'plug', 'hook'][(x - 214) / 28]} cx={x + 11.5} cy={71.5} s={0.8} />
        </g>
      ))}
      <rect x="326.5" y="60.5" width="22" height="22" rx="6" className="fill-black-400 stroke-black-500" />
      <path d="M332 71.5h.01M337.5 71.5h.01M343 71.5h.01" strokeWidth="2" strokeLinecap="round" className="stroke-white-900" />
      <rect x="176.5" y="102.5" width="172" height="88" rx="8" className="fill-black-100 stroke-black-400" />
      <Glyph name="spark" cx={194} cy={119} s={0.9} />
      <text x="206" y="123" fontSize="11" className="fill-black-900">
        Run automation
      </text>
      <rect x="181" y="134" width="163" height="22" rx="5" className="fill-black-400" />
      <Glyph name="grid" cx={194} cy={145} s={0.8} />
      <text x="206" y="149" fontSize="11" className="fill-white-900">
        Sync ledger
      </text>
      <Glyph name="grid" cx={194} cy={171} s={0.8} />
      <text x="206" y="175" fontSize="11" className="fill-black-600">
        Export summary
      </text>
    </svg>
  )
}

export function FormArt() {
  return (
    <svg viewBox="0 0 274 265" width="100%" height="100%" fill="none" aria-hidden="true">
      <rect x="32.5" y="0.5" width="210" height="300" rx="10" className="fill-primary-background stroke-black-300" />
      <text x="44" y="21" fontSize="10" className="fill-black-600">Label</text>
      <rect x="44.5" y="27.5" width="186" height="22" rx="6" className="fill-black-100 stroke-black-400" />
      <text x="52" y="42" fontSize="10" className="fill-black-900">Account name</text>
      <text x="44" y="68" fontSize="10" className="fill-black-600">Label</text>
      <rect x="44.5" y="74.5" width="186" height="22" rx="6" className="fill-black-100 stroke-black-400" />
      <text x="52" y="89" fontSize="10" className="fill-black-900">Choose a stage</text>
      <path d="m216 84 3 3 3-3" strokeLinecap="round" className="stroke-black-700" />
      <rect x="44.5" y="101.5" width="186" height="96" rx="6" className="fill-black-100 stroke-black-400" />
      <text x="52" y="117" fontSize="10" className="fill-black-700">Search…</text>
      <path d="M44.5 124.5h186" className="stroke-black-400" />
      <rect x="48" y="129" width="179" height="20" rx="4" className="fill-black-400" />
      {['Prospect', 'Qualified', 'Closed won'].map((t, i) => (
        <g key={t}>
          <Glyph name={['spark', 'clock', 'grid'][i]} cx={58} cy={139 + i * 20} s={0.7} />
          <text x="68" y={142.5 + i * 20} fontSize="9.5" className={i === 0 ? 'fill-white-900' : i === 1 ? 'fill-black-700' : 'fill-black-600'}>
            {t}
          </text>
        </g>
      ))}
      <rect x="160.5" y="207.5" width="16" height="9" rx="4.5" className="fill-black-400" />
      <circle cx="165" cy="212" r="3" className="fill-black-600" />
      <text x="182" y="215.5" fontSize="10" className="fill-black-600">Toggle</text>
    </svg>
  )
}

export function FunctionsArt() {
  const gid = `dev-fn-${useId().replace(/:/g, '')}`
  const fns = ['fetchInvoices', 'syncLedger', 'purgeStale']
  return (
    <svg viewBox="0 0 231 265" width="100%" height="100%" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <Dash d="M200.5 20v225" />
      {fns.map((t, i) => {
        const y = 52 + i * 60
        return (
          <g key={t}>
            <Dash d={`M136 ${y + 21}h64`} />
            <rect x="0" y={y} width="136" height="42" rx="7" fill={`url(#${gid})`} className="text-black-100" />
            <path d={`M30 ${y + 0.5}h99a6.5 6.5 0 0 1 6.5 6.5v28a6.5 6.5 0 0 1-6.5 6.5H30`} className="stroke-black-400" />
            <text x="126" y={y + 24.5} textAnchor="end" {...mono} className="font-mono fill-black-900">
              {t}
            </text>
            <circle cx="200.5" cy={y + 21} r="3.5" className="fill-primary-background stroke-black-400" />
          </g>
        )
      })}
    </svg>
  )
}

export function ConnectionArt() {
  return (
    <svg viewBox="0 0 274 243" width="100%" height="100%" fill="none" aria-hidden="true">
      <Dash d="M137 54v134" />
      <Node cx={137} cy={42} glyph="user" />
      <Chip x={137} y={112} parts="getConnection()" anchor="middle" h={20} />
      <Node cx={137} cy={196} glyph="plug" />
    </svg>
  )
}

/** UI-component rows; live offsets sampled at translateX(-5.2%, -43.8%, -7.7%, -45.6%) (static here). */
export function ComponentsArt() {
  const rows = [
    { x: -5.2, h: 35, items: [['input', 150], ['sq'], ['sq']] },
    { x: -43.8, h: 44, items: [['ghost', 'Button'], ['toggle', 0], ['toggle', 1], ['banner', 'Heads up: sync is running'], ['ghost', 'Retry']] },
    { x: -7.7, h: 55, items: [['check'], ['avatar'], ['cube'], ['letter'], ['link', 'Read the guide'], ['pill', 'Synced']] },
    { x: -45.6, h: 35, items: [['sq'], ['input', 80], ['input', 80], ['sq']] },
  ]
  return (
    <div className="flex size-full flex-col justify-center" aria-hidden="true">
      {rows.map((r, i) => (
        <div key={i} className="flex w-[370px] shrink-0 items-center gap-2.5 whitespace-nowrap" style={{ height: r.h, transform: `translateX(${r.x}%)`, marginLeft: i % 2 ? '50%' : 0 }}>
          {r.items.map((it, j) => (
            <UiBit key={j} kind={it[0]} arg={it[1]} />
          ))}
        </div>
      ))}
    </div>
  )
}

function UiBit({ kind, arg }) {
  if (kind === 'input') return <span className="block h-6 shrink-0 rounded-8 border border-solid border-black-400 bg-black-100" style={{ width: arg }} />
  if (kind === 'sq') return <span className="block size-6 shrink-0 rounded-6 border border-solid border-black-400 bg-black-100" />
  if (kind === 'ghost')
    return (
      <span className="flex h-6 shrink-0 items-center gap-1 rounded-6 bg-black-200 px-2 text-sm text-black-600">
        <span className="size-2.5 rounded-full border border-solid border-black-600" />
        {arg}
      </span>
    )
  if (kind === 'toggle')
    return (
      <span className={`flex h-[18px] w-8 shrink-0 items-center rounded-full px-0.5 ${arg ? 'justify-end bg-black-500' : 'bg-black-400'}`}>
        <span className={`size-3.5 rounded-full ${arg ? 'bg-white-900' : 'bg-black-600'}`} />
      </span>
    )
  if (kind === 'banner')
    return (
      <span className="flex h-6 w-[176px] shrink-0 items-center gap-1.5 rounded-6 bg-black-400 px-2 text-[9px] text-black-800">
        <span className="size-2 rounded-full border border-solid border-black-700" />
        {arg}
      </span>
    )
  if (kind === 'check')
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-4 bg-black-400">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="stroke-black-700">
          <path d="M2 5.2 4.2 7.3 8 2.8" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
    )
  if (kind === 'avatar')
    return (
      <span className="flex size-7 shrink-0 items-end justify-center overflow-hidden rounded-full bg-black-400">
        <span className="h-3 w-5 rounded-t-full bg-black-600" />
      </span>
    )
  if (kind === 'cube')
    return (
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-black-500">
        <svg width="14" height="14" viewBox="0 0 14 14" className="fill-black-700">
          <path d="M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2z" />
        </svg>
      </span>
    )
  if (kind === 'letter') return <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-black-400 font-display text-base font-semibold text-black-700">Q</span>
  if (kind === 'link') return <span className="shrink-0 text-sm text-black-700 underline decoration-black-600 underline-offset-2">{arg}</span>
  return (
    <span className="flex h-5 shrink-0 items-center gap-1 rounded-6 bg-black-200 px-1.5 text-xs text-black-600">
      <span className="size-1.5 rounded-full bg-black-600" />
      {arg}
    </span>
  )
}

export function AgentFlowArt() {
  return (
    <svg viewBox="0 0 491 357" width="100%" height="100%" fill="none" aria-hidden="true">
      <Dash d="M20 168h450" />
      <Dash d="M230 182v52M268 182v88" />
      <rect x="28.5" y="157.5" width="92" height="22" rx="6" className="fill-black-100 stroke-black-400" />
      <Glyph name="clock" cx={42} cy={168.5} s={0.85} />
      <text x="54" y="172" {...mono} className="font-mono fill-black-700">Daily 8AM</text>
      {[150, 330].map((x) => (
        <g key={x}>
          <circle cx={x} cy="168" r="8.5" className="fill-black-100 stroke-black-400" />
          <path d={`M${x - 3} 168h6M${x} 165v6`} strokeLinecap="round" className="stroke-black-700" />
        </g>
      ))}
      <rect x="196.5" y="153.5" width="104" height="30" rx="7" className="fill-black-200 stroke-black-600" />
      <circle cx="196.5" cy="168.5" r="3" className="fill-primary-background stroke-black-600" />
      <circle cx="300.5" cy="168.5" r="3" className="fill-primary-background stroke-black-600" />
      <text x="248.5" y="173.5" textAnchor="middle" fontSize="13.5" className="fill-white-400">Agent</text>
      <rect x="360.5" y="156.5" width="118" height="24" rx="6" className="fill-black-100 stroke-black-300" />
      <Glyph name="grid" cx={374} cy={168.5} s={0.85} />
      <text x="386" y="172.5" fontSize="11" className="fill-black-800">Post update</text>
      <Chip x={230} y={226} parts="Model" anchor="middle" />
      <Chip x={268} y={262} parts="MCP client" anchor="middle" />
    </svg>
  )
}

export function TableAgentsArt() {
  const rows = ['Northwind', 'Larkspur', 'Bellhaven', 'Corbel', 'Avenmore']
  return (
    <svg viewBox="0 0 415 335" width="100%" height="100%" fill="none" aria-hidden="true">
      <rect x="0.5" y="80.5" width="396" height="300" rx="8" className="stroke-black-400" />
      <path d="M120.5 80.5v260M258.5 80.5v260" className="stroke-black-400" />
      <text x="14" y="98" fontSize="10" className="fill-black-600">Accounts</text>
      <text x="134" y="98" fontSize="10" className="fill-black-800">Stage</text>
      <text x="272" y="98" fontSize="10" className="fill-black-800">Owner</text>
      {rows.map((r, i) => {
        const y = 108 + i * 28.5
        return (
          <g key={r}>
            <path d={`M0.5 ${y}h396`} className="stroke-black-300" />
            <text x="14" y={y + 18} fontSize="10" className={i === 1 ? 'fill-black-800' : 'fill-black-600'}>{r}</text>
            {i === 1 ? (
              <>
                <circle cx="137" cy={y + 14.5} r="2" className="fill-black-700" />
                <text x="144" y={y + 18} fontSize="10" className="fill-white-900">Lead</text>
                <rect x="272" y={y + 9} width="10" height="10" rx="2" className="fill-black-500" />
                <text x="287" y={y + 18} fontSize="10" className="fill-white-400">Noor Halden</text>
              </>
            ) : (
              <>
                <rect x="134.5" y={y + 9.5} width="30" height="10" rx="3" className="stroke-black-400" />
                <rect x="272" y={y + 11} width="54" height="6" rx="3" className="fill-black-400" />
              </>
            )}
          </g>
        )
      })}
      <AgentTag x={78} y={190} label="Prospect Agent" />
      <AgentTag x={300} y={160} label="Data Agent" />
    </svg>
  )
}

/** Agent cursor + label (sampled offsets on live were small framer drifts; static here). */
function AgentTag({ x, y, label }) {
  const w = label.length * 7.4 + 16
  return (
    <g>
      <path d={`M${x} ${y}l12 5-5.4 1.6-1.6 5.4z`} strokeLinejoin="round" className="fill-black-200 stroke-black-700" />
      <rect x={x + 0.5} y={y + 16.5} width={w} height="22" rx="6" className="fill-black-100 stroke-black-500" />
      <text x={x + 8} y={y + 31.5} fontSize="13" className="fill-white-400">{label}</text>
    </g>
  )
}

export function ToolCallsArt() {
  const bars = Array.from({ length: 48 }, (_, i) => 18 + Math.round(10 * Math.abs(Math.sin(i * 0.35)) + (i % 7 === 0 ? 8 : 0)))
  return (
    <svg viewBox="0 0 306 254" width="100%" height="100%" fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <path key={i} d={`M${12 + i * 6} ${222 - h}v${h + 30}`} className="stroke-black-300" />
      ))}
      <Dash d="M59 76v120M152 124v72M226 52v144" className="stroke-black-400" />
      <Chip x={20} y={64} parts="updating deals" pad={7} h={20} />
      <Chip x={105} y={112} parts="searching notes" pad={7} h={20} />
      <Chip x={176} y={40} parts="creating tasks" pad={7} h={20} />
    </svg>
  )
}

export function OAuthRingsArt() {
  return (
    <svg viewBox="0 0 306 254" width="100%" height="100%" fill="none" aria-hidden="true">
      <Rings cx={153} cy={110} radii={[94, 70, 47]} />
      <Node cx={153} cy={110} glyph="shield" />
      <Chip x={153} y={168} parts="OAuth" anchor="middle" h={22} />
    </svg>
  )
}

export function McpClientArt() {
  return (
    <svg viewBox="0 0 306 254" width="100%" height="100%" fill="none" aria-hidden="true">
      <Dash d="M60 110h70M176 110h70v64h40M153 20v66M153 134v80M153 20h140" className="stroke-black-500" />
      {[[99, 110], [153, 162], [246, 174]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4" className="fill-primary-background stroke-black-600" />
      ))}
      <circle cx="153" cy="110" r="42" className="stroke-black-300" />
      <circle cx="153" cy="110" r="33" className="fill-black-100 stroke-black-400" />
      <circle cx="153" cy="110" r="22" className="fill-dev-well stroke-black-500" />
      <Glyph name="mark" cx={153} cy={110} s={1.1} />
    </svg>
  )
}

/* ---------------------------------------------------------------- */
/* Hero line art (579x579 box): isometric wireframe blocks            */
/* ---------------------------------------------------------------- */
export function HeroArt() {
  const uid = useId().replace(/:/g, '')
  // isometric basis: x -> (cos30, sin30), y -> (-cos30, sin30), z up
  const s = 58
  const c = 0.866
  const P = (x, y, z) => [289.5 + (x - y) * c * s, 300 + (x + y) * 0.5 * s - z * s]
  const pt = (p) => p.map((v) => v.toFixed(1)).join(' ')
  const box = (x, y, z, w, d, h) => {
    const v = {
      a: P(x, y, z + h), b: P(x + w, y, z + h), c: P(x + w, y + d, z + h), d: P(x, y + d, z + h),
      e: P(x + w, y, z), f: P(x + w, y + d, z), g: P(x, y + d, z),
    }
    return v
  }
  const blocks = [box(-1.6, -1.6, 0, 1.2, 3.2, 2.2), box(0.2, -1.6, 0, 1.4, 1.2, 1.2), box(0.2, 0.4, 0, 1.4, 1.2, 0.6)]
  const hatch = (pts, id) => (
    <g clipPath={`url(#${id})`}>
      <clipPath id={id}>
        <path d={`M${pts.map(pt).join('L')}Z`} />
      </clipPath>
      {Array.from({ length: 70 }, (_, i) => (
        <path key={i} d={`M0 ${120 + i * 4}h579`} className="stroke-black-400" strokeWidth="0.6" />
      ))}
    </g>
  )
  return (
    <svg viewBox="0 0 579 579" width="100%" height="100%" fill="none" aria-hidden="true">
      {/* construction lines */}
      {[
        'M0 0 579 579', 'M579 0 0 579', 'M0 289.5 289.5 0 579 289.5 289.5 579Z', 'M72 0v579', 'M507 0v579',
      ].map((d) => (
        <path key={d} d={d} strokeDasharray="5 5" className="stroke-black-300" />
      ))}
      {blocks.map((v, i) => (
        <g key={i}>
          {hatch([v.d, v.c, v.f, v.g], `dev-hh-${uid}-${i}`)}
          <path
            d={`M${pt(v.a)}L${pt(v.b)}L${pt(v.c)}L${pt(v.d)}ZM${pt(v.b)}L${pt(v.e)}L${pt(v.f)}L${pt(v.c)}M${pt(v.d)}L${pt(v.g)}L${pt(v.f)}`}
            className="fill-transparent stroke-black-700"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {[v.a, v.b, v.c, v.d, v.e, v.f, v.g].map((p, j) => (
            <rect key={j} x={p[0] - 2} y={p[1] - 2} width="4" height="4" className="fill-black-600" />
          ))}
        </g>
      ))}
    </svg>
  )
}

/* ---------------------------------------------------------------- */
/* D-CTA floating mock windows (viewBox = desktop cell size)          */
/* ---------------------------------------------------------------- */
const Panel = ({ x = 14, y = 14, w, h }) => <rect x={x + 0.5} y={y + 0.5} width={w} height={h} rx="10" className="fill-black-100 stroke-black-400" />

export function CalendarMock() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1)
  return (
    <svg viewBox="0 0 232 232" width="100%" height="100%" fill="none" aria-hidden="true">
      <Panel w={204} h={212} />
      <path d="m33 40-3 3 3 3M45 40l3 3-3 3" strokeLinecap="round" className="stroke-black-700" />
      <text x="58" y="47" fontSize="12" className="fill-black-900">March</text>
      <text x="204" y="47" fontSize="12" textAnchor="end" className="fill-black-900">2028</text>
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
        <text key={i} x={36 + i * 26} y="80" fontSize="9.5" textAnchor="middle" className="fill-black-700">{d}</text>
      ))}
      {days.map((d, i) => (
        <text key={d} x={36 + (i % 7) * 26} y={104 + Math.floor(i / 7) * 23} fontSize="9.5" textAnchor="middle" className={d === 17 ? 'fill-white-400' : 'fill-black-600'}>
          {d}
        </text>
      ))}
      <circle cx={36 + 2 * 26} cy="154" r="1.2" className="fill-black-700" />
      <rect x="24.5" y="184.5" width="102" height="24" rx="6" className="stroke-black-400" />
      <text x="34" y="200" fontSize="10" className="fill-black-600">dd / mm / yyyy</text>
      <rect x="134.5" y="184.5" width="72" height="24" rx="6" className="stroke-black-400" />
      <text x="144" y="200" fontSize="10" className="fill-black-600">-- : -- PM</text>
    </svg>
  )
}

export function InputMock() {
  return (
    <svg viewBox="0 0 174 58" width="100%" height="100%" fill="none" aria-hidden="true">
      <text x="12" y="13" fontSize="8.5" className="fill-black-600">Label</text>
      <rect x="9.5" y="18.5" width="154" height="32" rx="8" className="fill-black-100 stroke-black-400" />
      <text x="19" y="39" fontSize="14" className="fill-black-700">Your text</text>
    </svg>
  )
}

export function TogglesMock() {
  return (
    <svg viewBox="0 0 174 58" width="100%" height="100%" fill="none" aria-hidden="true">
      <rect x="11" y="9" width="24" height="13" rx="6.5" className="fill-black-400" />
      <circle cx="17.5" cy="15.5" r="4.5" className="fill-black-600" />
      <text x="42" y="20" fontSize="14" className="fill-black-700">#2F7BD9</text>
      <rect x="11" y="34" width="24" height="13" rx="6.5" className="fill-black-500" />
      <circle cx="28.5" cy="40.5" r="4.5" className="fill-white-900" />
      <text x="42" y="45" fontSize="14" className="fill-black-700">Switch</text>
    </svg>
  )
}

export function SelectMock() {
  const people = [['Ines Marlow', 'ines@marlow.io'], ['Teo Varga', 'teo@varga.dev'], ['Fernhill', 'fernhill.co']]
  return (
    <svg viewBox="0 0 290 174" width="100%" height="100%" fill="none" aria-hidden="true">
      <text x="12" y="13" fontSize="8.5" className="fill-black-600">Label</text>
      <rect x="9.5" y="18.5" width="270" height="26" rx="7" className="fill-black-100 stroke-black-400" />
      <text x="18" y="35" fontSize="11" className="fill-black-800">Pick an option</text>
      <path d="m263 30 3 3 3-3" strokeLinecap="round" className="stroke-black-700" />
      <rect x="9.5" y="50.5" width="270" height="114" rx="7" className="fill-black-100 stroke-black-400" />
      <text x="18" y="68" fontSize="11" className="fill-black-600">Search…</text>
      <path d="M9.5 78.5h270" className="stroke-black-400" />
      {people.map(([n, e], i) => (
        <g key={n}>
          <Glyph name={i === 2 ? 'grid' : 'user'} cx={22} cy={94 + i * 26} s={0.7} />
          <text x="32" y={98 + i * 26} fontSize="10.5" className="fill-black-900">{n}</text>
          <text x={32 + n.length * 6.1} y={98 + i * 26} fontSize="9" className="fill-black-600">{e}</text>
          <rect x="257" y={87 + i * 26} width="14" height="14" rx="3" className="fill-black-400" />
        </g>
      ))}
    </svg>
  )
}

export function ChecksMock() {
  return (
    <svg viewBox="0 0 116 58" width="100%" height="100%" fill="none" aria-hidden="true">
      <rect x="7" y="9" width="13" height="13" rx="3" className="fill-black-500" />
      <path d="m10 15.6 2.4 2.2 4.2-4.8" strokeLinecap="round" className="stroke-black-800" />
      <text x="28" y="20" fontSize="14" className="fill-black-700">Option A</text>
      <rect x="7.5" y="34.5" width="12" height="12" rx="3" className="fill-black-200 stroke-black-400" />
      <text x="28" y="45" fontSize="14" className="fill-black-700">Option B</text>
    </svg>
  )
}

export function ListMock() {
  return (
    <svg viewBox="0 0 290 116" width="100%" height="100%" fill="none" aria-hidden="true">
      <text x="14" y="12" fontSize="8.5" className="fill-black-600">Label</text>
      <rect x="11.5" y="18.5" width="266" height="84" rx="7" className="fill-black-100 stroke-black-400" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Glyph name="spark" cx={28} cy={36 + i * 23} s={0.7} />
          <text x="37" y={39.5 + i * 23} fontSize="10" className="fill-black-700">Field</text>
          {i < 2 ? (
            <text x="98" y={39.5 + i * 23} fontSize="10" className="fill-black-800">Short description goes here.</text>
          ) : (
            ['Tag 1', 'Tag 2', 'Tag 3'].map((t, j) => (
              <g key={t}>
                <rect x={98 + j * 46} y={i * 23 + 27} width="42" height="17" rx="5" className="fill-black-400" />
                <text x={119 + j * 46} y={i * 23 + 39} fontSize="9" textAnchor="middle" className="fill-black-800">{t}</text>
              </g>
            ))
          )}
        </g>
      ))}
    </svg>
  )
}

export function ActionsMock() {
  const items = ['Run automation', 'Sync ledger', 'Export summary', 'Archive entry']
  return (
    <svg viewBox="0 0 232 174" width="100%" height="100%" fill="none" aria-hidden="true">
      <Panel x={12} y={10} w={206} h={158} />
      <Glyph name="spark" cx={34} cy={30} s={0.95} />
      <text x="48" y="34.5" fontSize="12" className="fill-black-700">Command menu</text>
      {items.map((t, i) => (
        <g key={t}>
          <rect x="27" y={47 + i * 30} width="18" height="18" rx="4" className="fill-black-400" />
          <Glyph name="grid" cx={36} cy={56 + i * 30} s={0.7} />
          <text x="54" y={60.5 + i * 30} fontSize="12" className="fill-black-700">{t}</text>
        </g>
      ))}
    </svg>
  )
}

export function AvatarMock({ kind }) {
  return (
    <svg viewBox="0 0 58 58" width="100%" height="100%" fill="none" aria-hidden="true">
      <circle cx="29" cy="29" r="18" className={kind === 'cube' ? 'fill-black-500' : 'fill-black-400'} />
      {kind === 'person' && <path d="M29 20a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM17.5 40c2.4-4.6 6.4-6.8 11.5-6.8S38.1 35.4 40.5 40" className="fill-black-600" />}
      {kind === 'letter' && (
        <text x="29" y="35.5" fontSize="18" fontWeight="600" textAnchor="middle" className="fill-black-700">
          Q
        </text>
      )}
      {kind === 'cube' && <path d="M29 19 38 24v10l-9 5-9-5V24z" className="fill-black-700" />}
    </svg>
  )
}

export function ButtonMock() {
  return (
    <svg viewBox="0 0 116 58" width="100%" height="100%" fill="none" aria-hidden="true">
      <rect x="9.5" y="13.5" width="97" height="31" rx="8" className="fill-black-200 stroke-black-400" />
      <circle cx="25" cy="29" r="4.6" strokeWidth="2" className="stroke-black-700" />
      <text x="36" y="34" fontSize="15" className="fill-black-700">Action</text>
    </svg>
  )
}
