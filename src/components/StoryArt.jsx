import { useId } from 'react'

// Section 8 story images: four original abstract/illustrated compositions drawn at the 696x435
// slot (object-fit: cover equivalent via preserveAspectRatio slice). No photos, no real people.
// Colours are palette tokens only (spec 0.2 raw palette + hero glow / planet rim aliases).

const W = 696
const H = 435

function Stop({ offset, tone, opacity }) {
  return <stop offset={offset} className={tone} stopColor="currentColor" stopOpacity={opacity} />
}

export default function StoryArt({ variant = 0 }) {
  const uid = useId().replace(/:/g, '')
  const Art = [HealthArt, RetailArt, CloudArt, HospitalityArt][variant % 4]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Art id={uid} />
    </svg>
  )
}

/* 0: health tech. Morning sky, layered hills and a pulse line crossing the valley. */
function HealthArt({ id }) {
  const hill = (y, amp, ph) =>
    `M0 ${y} ` +
    Array.from({ length: 9 }, (_, i) => {
      const x = (i + 1) * 87
      return `Q${x - 43.5} ${y - amp * Math.sin(i + ph)} ${x} ${y}`
    }).join(' ') +
    ` V${H} H0Z`
  const pulse = 'M0 300 H210 l14 -10 l12 22 l18 -92 l20 134 l16 -70 l12 16 H420 l10 -6 l10 6 H696'
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" tone="text-art-iris" />
          <Stop offset=".55" tone="text-art-periwinkle" />
          <Stop offset="1" tone="text-art-haze" />
        </linearGradient>
        <radialGradient id={`${id}sun`} cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" tone="text-white-100" />
          <Stop offset=".6" tone="text-white-100" opacity=".7" />
          <Stop offset="1" tone="text-white-100" opacity="0" />
        </radialGradient>
        <linearGradient id={`${id}h1`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" tone="text-art-teal" opacity=".55" />
          <Stop offset="1" tone="text-art-teal" opacity=".25" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <circle cx="470" cy="150" r="120" fill={`url(#${id}sun)`} />
      <circle cx="470" cy="150" r="52" className="fill-white-100" opacity=".9" />
      <path d={hill(250, 26, 0.4)} className="fill-white-100" opacity=".35" />
      <path d={hill(290, 30, 1.7)} fill={`url(#${id}h1)`} />
      <path d={hill(340, 22, 3.1)} className="fill-art-teal" opacity=".55" />
      <path d={hill(385, 18, 4.4)} className="fill-art-navy" opacity=".55" />
      <path d={pulse} fill="none" className="stroke-white-100" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity=".95" />
      <circle cx="254" cy="220" r="6" className="fill-white-100" />
      <circle cx="254" cy="220" r="14" className="fill-white-100" opacity=".25" />
    </>
  )
}

/* 1: retail apps. Warm mosaic of storefront tiles, awnings and parcels. */
function RetailArt({ id }) {
  const tiles = []
  const tones = ['fill-art-citron', 'fill-white-100', 'fill-art-ember', 'fill-art-mist', 'fill-art-periwinkle', 'fill-black-100']
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 8; c++) {
      const k = (r * 3 + c * 5) % 11
      tiles.push({ x: c * 92 - 20 + (r % 2) * 46, y: r * 92 - 20, k })
    }
  }
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" tone="text-art-mist" />
          <Stop offset="1" tone="text-art-citron" opacity=".55" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}bg)`} />
      {tiles.map(({ x, y, k }, i) => {
        const tone = tones[k % tones.length]
        if (k < 3) return <rect key={i} x={x} y={y} width="80" height="80" rx="18" className={tone} opacity=".85" />
        if (k < 5)
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect width="80" height="80" rx="18" className="fill-white-100" opacity=".7" />
              {/* awning */}
              <path d="M10 22h60v10a7.5 7.5 0 0 1-15 0 7.5 7.5 0 0 1-15 0 7.5 7.5 0 0 1-15 0 7.5 7.5 0 0 1-15 0z" className="fill-art-ember" opacity=".8" />
              <rect x="22" y="44" width="36" height="26" rx="4" className="fill-art-citron" opacity=".7" />
            </g>
          )
        if (k < 7)
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle cx="40" cy="40" r="40" className={tone} opacity=".75" />
              <circle cx="40" cy="40" r="16" className="fill-white-100" opacity=".6" />
            </g>
          )
        if (k < 9)
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              {/* parcel */}
              <rect x="8" y="16" width="64" height="56" rx="8" className="fill-art-citron" opacity=".9" />
              <path d="M8 34h64M40 16v56" className="stroke-black-100" strokeWidth="2" opacity=".25" />
            </g>
          )
        return <path key={i} d={`M${x} ${y + 80}L${x + 40} ${y}L${x + 80} ${y + 80}Z`} className="fill-black-100" opacity=".14" />
      })}
      <rect width={W} height={H} className="fill-white-100" opacity=".08" />
    </>
  )
}

/* 2: cloud infra. Night grid, soft cloud forms and a constellation of linked nodes. */
function CloudArt({ id }) {
  const nodes = [
    [96, 300], [170, 210], [268, 262], [330, 150], [420, 214], [500, 120], [584, 196], [640, 96], [380, 330], [540, 310],
  ]
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [2, 8], [4, 8], [8, 9], [6, 9], [1, 3]]
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" tone="text-art-navy" />
          <Stop offset="1" tone="text-black-100" />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx=".7" cy=".35" r=".6">
          <Stop offset="0" tone="text-blue-500" opacity=".55" />
          <Stop offset="1" tone="text-blue-500" opacity="0" />
        </radialGradient>
        <pattern id={`${id}grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" className="stroke-white-100" strokeWidth=".6" opacity=".08" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}bg)`} />
      <rect width={W} height={H} fill={`url(#${id}grid)`} />
      <rect width={W} height={H} fill={`url(#${id}glow)`} />
      {/* cloud forms */}
      <g className="fill-art-periwinkle" opacity=".18">
        <path d="M-20 435v-70a50 50 0 0 1 80-40 70 70 0 0 1 130 10 45 45 0 0 1 70 30v70z" />
        <path d="M380 435v-50a40 40 0 0 1 64-30 60 60 0 0 1 110 6 40 40 0 0 1 62 24 36 36 0 0 1 100 0v50z" />
      </g>
      <g className="stroke-art-periwinkle" strokeWidth="1.2" opacity=".55">
        {links.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 3 === 0 ? 14 : 9} className="fill-blue-400" opacity=".18" />
          <circle cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5} className={i === 5 ? 'fill-art-teal' : 'fill-white-100'} />
        </g>
      ))}
      {/* server racks */}
      <g transform="translate(70 70)">
        {[0, 1, 2].map((r) => (
          <g key={r} transform={`translate(0 ${r * 26})`}>
            <rect width="132" height="20" rx="5" className="fill-white-100" opacity=".1" />
            <circle cx="14" cy="10" r="3" className={r === 1 ? 'fill-traffic-yellow' : 'fill-traffic-green'} />
            <rect x="28" y="8" width="64" height="4" rx="2" className="fill-white-100" opacity=".3" />
          </g>
        ))}
      </g>
    </>
  )
}

/* 3: hospitality. Dusk gradient, a colonnade of arches receding to a horizon, a low sun. */
function HospitalityArt({ id }) {
  const arches = Array.from({ length: 7 }, (_, i) => {
    const s = Math.pow(0.8, i)
    const w = 150 * s
    const h = 260 * s
    const x = 60 + (1 - s) * 360 + i * 8
    return { x, w, h, i }
  })
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" tone="text-art-iris" />
          <Stop offset=".6" tone="text-art-periwinkle" />
          <Stop offset="1" tone="text-art-citron" opacity=".7" />
        </linearGradient>
        <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" tone="text-art-ember" opacity=".55" />
          <Stop offset="1" tone="text-art-ember" opacity=".85" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <circle cx="560" cy="300" r="64" className="fill-art-citron" opacity=".75" />
      <circle cx="560" cy="300" r="96" className="fill-art-citron" opacity=".2" />
      <rect y="320" width={W} height="115" fill={`url(#${id}floor)`} />
      {/* floor tiles converging */}
      <g className="stroke-white-100" strokeWidth="1" opacity=".25">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={520} y1={320} x2={-200 + i * 110} y2={H} />
        ))}
        {[340, 365, 398].map((y) => (
          <line key={y} x1="0" y1={y} x2={W} y2={y} />
        ))}
      </g>
      {arches.reverse().map(({ x, w, h, i }) => (
        <path
          key={i}
          d={`M${x} 320 V${320 - h + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V320 h${w * 0.16} V${320 - h - w * 0.1} H${x - w * 0.16} V320Z`}
          className="fill-art-ember"
          opacity={0.5 + i * 0.07}
          fillRule="evenodd"
        />
      ))}
      <rect width={W} height={H} className="fill-art-navy" opacity=".06" />
    </>
  )
}
