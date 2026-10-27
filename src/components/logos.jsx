// Original wordmarks and glyphs for invented companies (customer grid, story tabs) and
// original app-icon glyphs for the integration marquee. All shapes are drawn here from simple
// geometry; none trace or reference a real brand. Everything renders in currentColor.

const DISPLAY = "InterDisplay, 'interDisplay Fallback', sans-serif"
const TEXT = "Inter, 'inter Fallback', sans-serif"
const MONO = "'JetBrains Mono', 'JetBrains Mono Fallback', monospace"
const SERIF = "'Quote Serif', 'tiemposText Fallback', serif"

/* ---------- Glyphs: each draws inside a g x g square at the origin ---------- */
const glyphs = {
  petals: (g) => (
    <>
      <circle cx={g * 0.5} cy={g * 0.3} r={g * 0.24} />
      <circle cx={g * 0.29} cy={g * 0.66} r={g * 0.24} opacity=".75" />
      <circle cx={g * 0.71} cy={g * 0.66} r={g * 0.24} opacity=".5" />
    </>
  ),
  rings: (g) => (
    <g fill="none" stroke="currentColor" strokeWidth={g * 0.14}>
      <circle cx={g * 0.36} cy={g * 0.5} r={g * 0.27} />
      <circle cx={g * 0.64} cy={g * 0.5} r={g * 0.27} />
    </g>
  ),
  fold: (g) => (
    <>
      <path d={`M0 ${g * 0.15} L${g * 0.5} ${g * 0.45} L${g * 0.5} ${g} L0 ${g * 0.7}Z`} />
      <path d={`M${g} ${g * 0.15} L${g * 0.5} ${g * 0.45} L${g * 0.5} ${g} L${g} ${g * 0.7}Z`} opacity=".6" />
    </>
  ),
  hex: (g) => {
    const r = g * 0.48
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2
      return `${g / 2 + r * Math.cos(a)},${g / 2 + r * Math.sin(a)}`
    }).join(' ')
    return (
      <>
        <polygon points={pts} fill="none" stroke="currentColor" strokeWidth={g * 0.13} strokeLinejoin="round" />
        <circle cx={g / 2} cy={g / 2} r={g * 0.13} />
      </>
    )
  },
  tris: (g) => (
    <>
      <path d={`M0 0H${g * 0.48}L0 ${g * 0.48}Z`} />
      <path d={`M${g} 0V${g * 0.48}L${g * 0.52} 0Z`} opacity=".55" />
      <path d={`M0 ${g}V${g * 0.52}L${g * 0.48} ${g}Z`} opacity=".55" />
      <path d={`M${g} ${g}H${g * 0.52}L${g} ${g * 0.52}Z`} />
    </>
  ),
  sun: (g) => (
    <>
      <path d={`M${g * 0.12} ${g * 0.78}A${g * 0.38} ${g * 0.38} 0 0 1 ${g * 0.88} ${g * 0.78}Z`} />
      <rect x="0" y={g * 0.86} width={g} height={g * 0.12} rx={g * 0.06} />
      {[-60, -30, 0, 30, 60].map((a) => (
        <rect key={a} x={g * 0.47} y={g * 0.02} width={g * 0.06} height={g * 0.16} rx={g * 0.03} transform={`rotate(${a} ${g / 2} ${g * 0.78})`} />
      ))}
    </>
  ),
  slashes: (g) => (
    <>
      <path d={`M${g * 0.08} ${g} L${g * 0.4} 0 H${g * 0.62} L${g * 0.3} ${g}Z`} />
      <path d={`M${g * 0.46} ${g} L${g * 0.78} 0 H${g} L${g * 0.68} ${g}Z`} opacity=".55" />
    </>
  ),
  pill: (g) => (
    <>
      <rect x="0" y={g * 0.08} width={g * 0.42} height={g * 0.84} rx={g * 0.21} />
      <rect x={g * 0.55} y={g * 0.08} width={g * 0.42} height={g * 0.42} rx={g * 0.21} opacity=".6" />
      <rect x={g * 0.55} y={g * 0.58} width={g * 0.42} height={g * 0.34} rx={g * 0.12} />
    </>
  ),
  cross: (g) => (
    <path
      d={`M${g * 0.35} 0H${g * 0.65}V${g * 0.35}H${g}V${g * 0.65}H${g * 0.65}V${g}H${g * 0.35}V${g * 0.65}H0V${g * 0.35}H${g * 0.35}Z`}
    />
  ),
  keyhole: (g) => (
    <>
      <circle cx={g / 2} cy={g * 0.38} r={g * 0.36} />
      <path d={`M${g * 0.3} ${g * 0.55}H${g * 0.7}L${g * 0.62} ${g}H${g * 0.38}Z`} />
    </>
  ),
  bag: (g) => (
    <>
      <path
        d={`M${g * 0.3} ${g * 0.32}V${g * 0.22}a${g * 0.2} ${g * 0.2} 0 0 1 ${g * 0.4} 0V${g * 0.32}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={g * 0.1}
      />
      <rect x={g * 0.08} y={g * 0.3} width={g * 0.84} height={g * 0.68} rx={g * 0.14} />
    </>
  ),
  bars3: (g) => (
    <>
      <rect x="0" y={g * 0.5} width={g * 0.26} height={g * 0.5} rx={g * 0.06} />
      <rect x={g * 0.37} y={g * 0.25} width={g * 0.26} height={g * 0.75} rx={g * 0.06} />
      <rect x={g * 0.74} y="0" width={g * 0.26} height={g} rx={g * 0.06} />
    </>
  ),
  door: (g) => (
    <>
      <path d={`M${g * 0.12} ${g}V${g * 0.42}a${g * 0.38} ${g * 0.38} 0 0 1 ${g * 0.76} 0V${g}Z`} />
      <circle cx={g * 0.66} cy={g * 0.66} r={g * 0.07} className="fill-white-100" />
    </>
  ),
}

/**
 * Glyph + wordmark fitted to an exact box. `gs` = glyph size as a fraction of h, `fs` = font size
 * as a fraction of h, `base` = baseline as a fraction of h.
 */
function Wordmark({ w, h, glyph, gs = 1, gap = 0.32, text, font = DISPLAY, weight = 600, fs = 0.82, base = 0.79, italic, upper, label }) {
  const g = glyph ? h * gs : 0
  const tx = glyph ? g + h * gap : 0
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label ?? text} fill="currentColor" className="block max-w-full">
      {glyph && <g transform={`translate(0 ${(h - g) / 2})`}>{glyphs[glyph](g)}</g>}
      <text
        x={tx}
        y={h * base}
        fontFamily={font}
        fontWeight={weight}
        fontStyle={italic ? 'italic' : undefined}
        fontSize={h * fs}
        textLength={w - tx - 0.5}
        lengthAdjust="spacingAndGlyphs"
      >
        {upper ? text.toUpperCase() : text}
      </text>
    </svg>
  )
}

function GlyphOnly({ w, h, glyph, label }) {
  const g = Math.min(w, h)
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} fill="currentColor" className="block">
      <g transform={`translate(${(w - g) / 2} ${(h - g) / 2})`}>{glyphs[glyph](g)}</g>
    </svg>
  )
}

/* ---------- Section 3: ten invented customer wordmarks, in grid order ---------- */
export const CUSTOMER_LOGOS = [
  ({ w, h }) => <Wordmark w={w} h={h} glyph="petals" text="Pellora" fs={0.86} base={0.8} />,
  ({ w, h }) => <Wordmark w={w} h={h} text="Brindlecove" font={TEXT} weight={700} upper fs={0.98} base={0.86} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="rings" gs={0.9} text="oxmere" weight={700} fs={1.04} base={0.76} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="fold" gs={0.82} text="Quillfold" font={SERIF} weight={600} fs={0.86} base={0.76} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="hex" gs={0.95} text="Varnstead" font={TEXT} weight={600} fs={0.84} base={0.78} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="tris" gs={0.72} text="tesselio" weight={700} fs={0.9} base={0.74} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="sun" text="Lumiqa" weight={600} fs={0.88} base={0.8} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="slashes" gs={0.9} text="halverstone" font={MONO} weight={600} fs={0.95} base={0.8} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="pill" gs={0.82} gap={0.28} text="Ostra" weight={700} fs={0.8} base={0.76} />,
  ({ w, h }) => <Wordmark w={w} h={h} glyph="cross" gs={0.9} gap={0.5} text="Arkwoven" font={TEXT} weight={600} upper fs={0.92} base={0.83} />,
]
export const CUSTOMER_NAMES = ['Pellora', 'Brindlecove', 'Oxmere', 'Quillfold', 'Varnstead', 'Tesselio', 'Lumiqa', 'Halverstone', 'Ostra', 'Arkwoven']

/* ---------- Section 8: story tab wordmarks (>= md) and compact marks (< md) ---------- */
export const STORY_LOGOS = [
  {
    name: 'Mendora',
    Wordmark: ({ w, h }) => <Wordmark w={w} h={h} glyph="keyhole" gs={0.9} text="Mendora" weight={600} fs={0.86} base={0.79} />,
    Mark: ({ w, h }) => <GlyphOnly w={w} h={h} glyph="keyhole" label="Mendora" />,
  },
  {
    name: 'Cartlane',
    Wordmark: ({ w, h }) => <Wordmark w={w} h={h} glyph="bag" text="cartlane" weight={700} fs={0.84} base={0.74} />,
    Mark: ({ w, h }) => <GlyphOnly w={w} h={h} glyph="bag" label="Cartlane" />,
  },
  {
    name: 'Hostrine',
    Wordmark: ({ w, h }) => <Wordmark w={w} h={h} glyph="bars3" gs={0.72} text="Hostrine" font={TEXT} weight={600} fs={0.8} base={0.76} />,
    Mark: ({ w, h }) => (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Hostrine" fill="currentColor" className="block">
        <g transform={`translate(0 ${(h - h * 0.9) / 2})`}>{glyphs.bars3(h * 0.9)}</g>
        <rect x={h * 1.15} y={h * 0.05} width={w - h * 1.15} height={h * 0.9} rx={h * 0.2} opacity=".35" />
      </svg>
    ),
  },
  {
    name: 'Innsway',
    Wordmark: ({ w, h }) => <Wordmark w={w} h={h} text="Innsway" font={TEXT} weight={700} upper fs={1} base={0.86} />,
    Mark: ({ w, h }) => (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Innsway" fill="currentColor" className="block">
        <g transform={`translate(0 0)`}>{glyphs.door(h)}</g>
        <path d={`M${h * 1.05} ${h} L${w} ${h * 0.25} V${h} Z`} opacity=".45" />
      </svg>
    ),
  },
]

/* ---------- Section 6a: integration app-icon glyphs (white/grey on the dark tile) ---------- */
const ig = { width: 42, height: 42, viewBox: '0 0 42 42', 'aria-hidden': 'true', fill: 'none' }
export const INTEGRATION_GLYPHS = [
  // mail-like envelope fold
  () => (
    <svg {...ig}>
      <rect x="6" y="10" width="30" height="22" rx="5" className="fill-white-200" />
      <path d="m8 13 13 10 13-10" className="stroke-black-300" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  ),
  // calendar block with a highlighted day
  () => (
    <svg {...ig}>
      <rect x="7" y="9" width="28" height="26" rx="6" className="fill-white-200" />
      <rect x="7" y="9" width="28" height="7" rx="3" className="fill-white-900" />
      <rect x="22" y="23" width="7" height="6" rx="1.5" className="fill-black-300" />
    </svg>
  ),
  // chat bubbles
  () => (
    <svg {...ig}>
      <path d="M7 12a5 5 0 0 1 5-5h12a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5h-8l-6 5v-5.3A5 5 0 0 1 7 19z" className="fill-white-200" />
      <path d="M31 15h1a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4v4l-5-4h-6" className="stroke-white-900" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  ),
  // data warehouse: stacked discs
  () => (
    <svg {...ig}>
      <ellipse cx="21" cy="11" rx="13" ry="4.5" className="fill-white-200" />
      <path d="M8 16.5c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5v4c0 2.5-5.8 4.5-13 4.5s-13-2-13-4.5z" className="fill-white-900" />
      <path d="M8 26c0 2.5 5.8 4.5 13 4.5S34 28.5 34 26v4c0 2.5-5.8 4.5-13 4.5S8 32.5 8 30z" className="fill-white-200" />
    </svg>
  ),
  // issue tracker: checked square in a ring
  () => (
    <svg {...ig}>
      <circle cx="21" cy="21" r="14" className="stroke-white-900" strokeWidth="3" strokeDasharray="66 22" strokeLinecap="round" transform="rotate(-90 21 21)" />
      <path d="m15 21.5 4.2 4.2L27.5 17" className="stroke-white-200" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // docs: folded page with lines
  () => (
    <svg {...ig}>
      <path d="M11 6h14l8 8v20a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" className="fill-white-200" />
      <path d="M25 6v6a2 2 0 0 0 2 2h6" className="fill-white-900" />
      <path d="M13 20h14M13 25h14M13 30h8" className="stroke-black-500" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  // payments: card with chip
  () => (
    <svg {...ig}>
      <rect x="5" y="11" width="32" height="21" rx="4.5" className="fill-white-200" />
      <rect x="5" y="15" width="32" height="4" className="fill-black-400" />
      <rect x="9" y="24" width="7" height="4" rx="1" className="fill-white-900" />
    </svg>
  ),
  // analytics: rising bars with a dot
  () => (
    <svg {...ig}>
      <rect x="8" y="23" width="6" height="12" rx="2" className="fill-white-900" />
      <rect x="18" y="16" width="6" height="19" rx="2" className="fill-white-200" />
      <rect x="28" y="19" width="6" height="16" rx="2" className="fill-white-900" />
      <circle cx="31" cy="10" r="3.5" className="fill-white-200" />
    </svg>
  ),
  // phone / dialer
  () => (
    <svg {...ig}>
      <rect x="6" y="6" width="30" height="30" rx="9" className="fill-white-900" />
      <path d="M17 13h-3a1.5 1.5 0 0 0-1.5 1.6A16 16 0 0 0 27.4 29.5 1.5 1.5 0 0 0 29 28v-3l-4-1.7-2 2a11 11 0 0 1-5.3-5.3l2-2z" className="fill-black-300" />
    </svg>
  ),
  // forms: stacked inputs with toggle
  () => (
    <svg {...ig}>
      <rect x="6" y="8" width="30" height="8" rx="4" className="fill-white-200" />
      <rect x="6" y="20" width="20" height="8" rx="4" className="fill-white-900" />
      <rect x="28" y="20" width="8" height="8" rx="4" className="fill-white-200" />
      <rect x="6" y="32" width="14" height="4" rx="2" className="fill-white-900" />
    </svg>
  ),
  // automation: connected nodes
  () => (
    <svg {...ig}>
      <path d="M12 12h9a5 5 0 0 1 5 5v8a5 5 0 0 0 5 5" className="stroke-white-900" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="11" cy="12" r="5" className="fill-white-200" />
      <circle cx="31" cy="30" r="5" className="fill-white-200" />
      <rect x="22" y="17.5" width="8" height="8" rx="2" transform="rotate(45 26 21.5)" className="fill-white-200" />
    </svg>
  ),
  // video meetings: camera lens + tally
  () => (
    <svg {...ig}>
      <rect x="5" y="11" width="23" height="20" rx="6" className="fill-white-200" />
      <path d="m29 18 8-4.5v15L29 24z" className="fill-white-900" />
      <circle cx="16.5" cy="21" r="4.5" className="fill-black-300" />
    </svg>
  ),
]
