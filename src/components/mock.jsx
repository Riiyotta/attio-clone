// Shared primitives for the original product artwork (fictional CRM "Corvale").
// Everything here is invented UI: initials avatars, status chips, small stroke icons and
// geometric company glyphs for made-up companies. Colours come from tailwind tokens only.

const TONES = {
  blue: { soft: 'bg-blue-100 text-blue-600', dot: 'bg-blue-500', solid: 'bg-blue-500 text-white-100' },
  green: { soft: 'bg-traffic-green/10 text-traffic-green', dot: 'bg-traffic-green', solid: 'bg-traffic-green text-white-100' },
  amber: { soft: 'bg-traffic-yellow/20 text-black-500', dot: 'bg-traffic-yellow', solid: 'bg-traffic-yellow text-black-100' },
  red: { soft: 'bg-traffic-red/10 text-traffic-red', dot: 'bg-traffic-red', solid: 'bg-traffic-red text-white-100' },
  teal: { soft: 'bg-art-teal/20 text-art-navy', dot: 'bg-art-teal', solid: 'bg-art-teal text-white-100' },
  iris: { soft: 'bg-art-haze text-art-navy', dot: 'bg-art-iris', solid: 'bg-art-iris text-white-100' },
  grey: { soft: 'bg-white-300 text-black-600', dot: 'bg-black-900', solid: 'bg-black-600 text-white-100' },
  dark: { soft: 'bg-black-100 text-white-200', dot: 'bg-black-100', solid: 'bg-black-100 text-white-200' },
}
export const toneOf = (t) => TONES[t] ?? TONES.grey

/** Initials avatar (invented people). size in px; tone picks a palette pairing. */
export function Initials({ name, size = 20, tone = 'blue', ring = false, className = '' }) {
  const letters = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
  const fs = Math.max(7, Math.round(size * 0.42))
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${toneOf(tone).soft} ${
        ring ? 'ring-2 ring-white-100' : ''
      } ${className}`}
      style={{ width: size, height: size, fontSize: fs, lineHeight: 1, letterSpacing: 0 }}
    >
      {letters}
    </span>
  )
}

/** Overlapping avatar stack. */
export function AvatarStack({ people, size = 18 }) {
  return (
    <span className="flex items-center">
      {people.map(([n, t], i) => (
        <Initials key={n} name={n} tone={t} size={size} ring className={i ? '-ml-1' : ''} />
      ))}
    </span>
  )
}

/** Status chip: tinted pill with a dot, or plain tag. */
export function Chip({ tone = 'grey', dot = true, children, className = '' }) {
  return (
    <span
      className={`inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded-6 px-1.5 text-mock-sm font-medium ${toneOf(tone).soft} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${toneOf(tone).dot}`} />}
      {children}
    </span>
  )
}

/** Outline tag used for neutral properties. */
export function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex h-5 shrink-0 items-center whitespace-nowrap rounded-6 border border-solid border-white-500 bg-white-100 px-1.5 text-mock-sm text-black-500 ${className}`}
    >
      {children}
    </span>
  )
}

/* ---------- Company glyphs (original geometric marks for invented companies) ---------- */

const GLYPH_SHAPES = {
  // each draws in a 16x16 box, white on the tile colour
  orbit: (
    <>
      <circle cx="8" cy="8" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12.6" cy="4.2" r="1.6" fill="currentColor" />
    </>
  ),
  stack: (
    <>
      <rect x="3" y="3.5" width="10" height="3" rx="1.5" fill="currentColor" />
      <rect x="3" y="9.5" width="6.5" height="3" rx="1.5" fill="currentColor" opacity=".7" />
    </>
  ),
  peak: <path d="M2.5 12.5 6.5 5l2.6 4.4L10.6 7l2.9 5.5z" fill="currentColor" />,
  wave: <path d="M2.5 9.5c1.8-3 3.6-3 5.5 0s3.7 3 5.5 0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />,
  split: (
    <>
      <path d="M3 3h5v10H3z" fill="currentColor" />
      <circle cx="11" cy="8" r="3" fill="currentColor" opacity=".7" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="9" y="3" width="4" height="4" rx="2" fill="currentColor" opacity=".7" />
      <rect x="3" y="9" width="4" height="4" rx="2" fill="currentColor" opacity=".7" />
      <rect x="9" y="9" width="4" height="4" rx="1" fill="currentColor" />
    </>
  ),
  arc: <path d="M3 13A10 10 0 0 1 13 3v4.5A5.5 5.5 0 0 0 7.5 13z" fill="currentColor" />,
  spark: <path d="M8 2.5 9.4 6.6 13.5 8 9.4 9.4 8 13.5 6.6 9.4 2.5 8l4.1-1.4z" fill="currentColor" />,
  ring: (
    <>
      <circle cx="6.2" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9.8" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity=".7" />
    </>
  ),
  slash: (
    <>
      <path d="m4 13 5-10h3L7 13z" fill="currentColor" />
      <circle cx="11.5" cy="11.5" r="1.6" fill="currentColor" opacity=".7" />
    </>
  ),
}

const GLYPH_BG = {
  blue: 'bg-blue-500 text-white-100',
  dark: 'bg-black-100 text-white-100',
  green: 'bg-traffic-green text-white-100',
  amber: 'bg-traffic-yellow text-white-100',
  red: 'bg-traffic-red text-white-100',
  teal: 'bg-art-teal text-white-100',
  navy: 'bg-art-navy text-white-100',
  iris: 'bg-art-iris text-white-100',
  ember: 'bg-art-ember text-white-100',
  light: 'bg-white-300 text-black-500',
}

export function CompanyGlyph({ shape = 'orbit', tone = 'blue', size = 18, radius = 'rounded-6', className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${radius} ${GLYPH_BG[tone]} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 16 16" width={size * 0.72} height={size * 0.72} aria-hidden="true">
        {GLYPH_SHAPES[shape]}
      </svg>
    </span>
  )
}

/* Invented companies used across the mocks: [name, domain, shape, tone] */
export const COMPANIES = {
  halcyon: ['Halcyon Freight', 'halcyonfreight.io', 'wave', 'blue'],
  brightwater: ['Brightwater Labs', 'brightwater.dev', 'orbit', 'teal'],
  kettle: ['Kettle & Kiln', 'kettlekiln.co', 'arc', 'ember'],
  pinecrest: ['Pinecrest Health', 'pinecrest.health', 'peak', 'green'],
  lumenaut: ['Lumenaut', 'lumenaut.ai', 'spark', 'dark'],
  orchard: ['Orchardly', 'orchardly.com', 'grid', 'iris'],
  tidewell: ['Tidewell Bank', 'tidewell.fi', 'stack', 'navy'],
  marigold: ['Marigold Studio', 'marigold.studio', 'ring', 'amber'],
  quarry: ['Quarrystone', 'quarrystone.io', 'split', 'dark'],
  vesper: ['Vesper Mobility', 'vesper.app', 'slash', 'red'],
}

export function Company({ id, size = 18, className = '', textClass = 'text-mock-base text-black-100' }) {
  const [name, , shape, tone] = COMPANIES[id]
  return (
    <span className={`flex min-w-0 items-center gap-1.5 ${className}`}>
      <CompanyGlyph shape={shape} tone={tone} size={size} radius={size > 24 ? 'rounded-8' : 'rounded-4'} />
      <span className={`truncate ${textClass}`}>{name}</span>
    </span>
  )
}

/* ---------- Small stroke icons (generic UI glyphs) ---------- */

const PATHS = {
  search: <><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></>,
  inbox: <><path d="M2.5 9.5h3l1 2h3l1-2h3" /><path d="M3.5 4h9l1 5.5V12a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V9.5z" /></>,
  check: <path d="m3.5 8.5 3 3 6-7" />,
  checkCircle: <><circle cx="8" cy="8" r="5.5" /><path d="m5.8 8.2 1.6 1.6 3-3.4" /></>,
  calendar: <><rect x="2.5" y="3.5" width="11" height="10" rx="2" /><path d="M2.5 7h11M5.5 2v3M10.5 2v3" /></>,
  chart: <><path d="M3 13V3M3 13h10" /><path d="M6 10V8M9 10V5.5M12 10V7" /></>,
  bolt: <path d="M9 2 4 9h4l-1 5 5-7H8z" />,
  users: <><circle cx="6" cy="6" r="2.5" /><path d="M2 13c.5-2.2 2-3.3 4-3.3s3.5 1.1 4 3.3" /><path d="M10.5 3.8a2.3 2.3 0 0 1 0 4.4M12 9.9c1 .5 1.7 1.5 2 3.1" /></>,
  building: <><rect x="3" y="2.5" width="7" height="11" rx="1" /><path d="M10 6.5h2a1 1 0 0 1 1 1v6H3M5.5 5h2M5.5 7.5h2M5.5 10h2" /></>,
  coin: <><circle cx="8" cy="8" r="5.5" /><path d="M9.8 6.2c-.3-.6-1-.9-1.8-.9-1 0-1.8.5-1.8 1.3 0 1.9 3.7.9 3.7 2.8 0 .8-.8 1.3-1.9 1.3-.8 0-1.6-.3-1.9-1M8 4.2v1.1M8 10.7v1.1" /></>,
  list: <path d="M5.5 4.5h8M5.5 8h8M5.5 11.5h8M2.5 4.5h.01M2.5 8h.01M2.5 11.5h.01" />,
  board: <><rect x="2.5" y="2.5" width="11" height="11" rx="2" /><path d="M6.2 2.5v11M9.8 2.5v11" /></>,
  plus: <path d="M8 3.5v9M3.5 8h9" />,
  filter: <path d="M2.5 4h11M4.5 8h7M6.5 12h3" />,
  sort: <path d="M5 3v10M2.5 10.5 5 13l2.5-2.5M11 13V3M8.5 5.5 11 3l2.5 2.5" />,
  mail: <><rect x="2" y="3.5" width="12" height="9" rx="2" /><path d="m2.5 5 5.5 4 5.5-4" /></>,
  phone: <path d="M5.2 2.5H3.5a1 1 0 0 0-1 1.1A10.5 10.5 0 0 0 12.4 13.5a1 1 0 0 0 1.1-1v-1.7l-2.6-1.1-1.3 1.3a7.6 7.6 0 0 1-3.6-3.6l1.3-1.3z" />,
  sparkle: <path d="M8 2.5c.4 2.7 1.8 4.1 4.5 4.5-2.7.4-4.1 1.8-4.5 4.5-.4-2.7-1.8-4.1-4.5-4.5 2.7-.4 4.1-1.8 4.5-4.5zM12.5 10.5c.15 1 .65 1.5 1.5 1.5-.85.15-1.35.65-1.5 1.5-.15-.85-.65-1.35-1.5-1.5.85 0 1.35-.5 1.5-1.5z" />,
  chevronDown: <path d="m4.5 6.5 3.5 3.5 3.5-3.5" />,
  chevronRight: <path d="m6.5 4.5 3.5 3.5-3.5 3.5" />,
  dots: <path d="M4 8h.01M8 8h.01M12 8h.01" />,
  clock: <><circle cx="8" cy="8" r="5.5" /><path d="M8 5v3l2 1.5" /></>,
  mic: <><rect x="6" y="2.5" width="4" height="7" rx="2" /><path d="M3.8 8a4.2 4.2 0 0 0 8.4 0M8 12.2v1.8" /></>,
  video: <><rect x="2" y="4" width="8.5" height="8" rx="2" /><path d="m10.5 7 3.5-2v6l-3.5-2" /></>,
  star: <path d="m8 2.8 1.6 3.3 3.6.5-2.6 2.5.6 3.6L8 11l-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" />,
  note: <><path d="M4 2.5h5.5L12.5 5.5v8H4z" /><path d="M9.5 2.5v3h3M6 8.5h4.5M6 11h3" /></>,
  task: <><rect x="2.5" y="2.5" width="11" height="11" rx="3" /><path d="m5.5 8 1.8 1.8 3.3-3.6" /></>,
  flow: <><rect x="2" y="2.5" width="5" height="4" rx="1" /><rect x="9" y="9.5" width="5" height="4" rx="1" /><path d="M4.5 6.5v3.5a1.5 1.5 0 0 0 1.5 1.5h3" /></>,
  globe: <><circle cx="8" cy="8" r="5.5" /><path d="M2.5 8h11M8 2.5c1.8 1.8 1.8 9.2 0 11M8 2.5c-1.8 1.8-1.8 9.2 0 11" /></>,
  pin: <><path d="M8 13.5S3.5 9.6 3.5 6.5a4.5 4.5 0 0 1 9 0c0 3.1-4.5 7-4.5 7z" /><circle cx="8" cy="6.5" r="1.5" /></>,
  link: <path d="M7 9a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 9 3.5l-.7.7M9 7a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 7 12.5l.7-.7" />,
  tag: <><path d="M2.5 3.5v4l6 6 5-5-6-6h-4a1 1 0 0 0-1 1z" /><circle cx="5.5" cy="5.5" r=".8" /></>,
  hash: <path d="M6 2.5 5 13.5M11 2.5l-1 11M3 6h10.5M2.5 10H13" />,
  settings: <><circle cx="8" cy="8" r="2" /><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.8 3.8l1 1M11.2 11.2l1 1M3.8 12.2l1-1M11.2 4.8l1-1" /></>,
  arrowUp: <path d="M8 13V3M4 7l4-4 4 4" />,
  arrowRight: <path d="M3 8h10M9 4l4 4-4 4" />,
  trend: <path d="M2.5 11.5 6 8l2.5 2.5 5-5M10 5.5h3.5V9" />,
  alert: <><path d="M8 2.5 14 13H2z" /><path d="M8 6.5v3M8 11.2h.01" /></>,
  heart: <path d="M8 13s-5-3-5-6.8A2.7 2.7 0 0 1 8 4.6a2.7 2.7 0 0 1 5 1.6C13 10 8 13 8 13z" />,
  send: <path d="M13.5 2.5 7 9M13.5 2.5 9.5 13.5 7 9 2.5 6.5z" />,
  at: <><circle cx="8" cy="8" r="2.5" /><path d="M10.5 8v1a1.8 1.8 0 0 0 3.5 0V8a6 6 0 1 0-2.4 4.8" /></>,
  paperclip: <path d="m12.5 7.5-4.8 4.8a2.9 2.9 0 0 1-4.1-4.1l5-5a1.9 1.9 0 0 1 2.7 2.7l-5 5a.95.95 0 0 1-1.3-1.3L9.4 5" />,
  home: <path d="M2.5 7.5 8 3l5.5 4.5V13a.5.5 0 0 1-.5.5H9.5V10h-3v3.5H3a.5.5 0 0 1-.5-.5z" />,
  bell: <><path d="M4 11V7.5a4 4 0 0 1 8 0V11l1 1.5H3z" /><path d="M6.8 13.8a1.4 1.4 0 0 0 2.4 0" /></>,
  sidebar: <><rect x="2.5" y="3" width="11" height="10" rx="2" /><path d="M6.5 3v10" /></>,
  expand: <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" />,
  terminal: <><rect x="2" y="3" width="12" height="10" rx="2" /><path d="m4.8 6.5 2 1.5-2 1.5M8.5 10h3" /></>,
}

export function Icon({ name, size = 14, className = '', strokeWidth = 1.3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  )
}

/** Tiny sparkline (values 0..1) for mock cards. */
export function Sparkline({ values, width = 80, height = 24, className = 'text-blue-500', fill = true }) {
  const step = width / (values.length - 1)
  const pts = values.map((v, i) => [i * step, height - 2 - v * (height - 4)])
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className={className} aria-hidden="true" fill="none">
      {fill && <path d={`${d} L${width} ${height} L0 ${height}Z`} fill="currentColor" opacity=".1" />}
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Simple horizontal progress meter. */
export function Meter({ value, tone = 'blue', className = 'h-1 w-full' }) {
  return (
    <span className={`relative block overflow-hidden rounded-full bg-white-400 ${className}`}>
      <span className={`absolute inset-y-0 left-0 rounded-full ${toneOf(tone).dot}`} style={{ width: `${value * 100}%` }} />
    </span>
  )
}
