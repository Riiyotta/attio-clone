import { useId } from 'react'
import { rng } from '../../data/copy.js'

/**
 * Original editorial artwork for the blog hero media box (16:9). Seeded composition of soft
 * palette gradients, concentric arcs and floating "card" slabs. No photos or third-party art.
 */
export default function BlogArt({ seed = 1, className = '' }) {
  const id = useId().replace(/:/g, '')
  const r = rng(seed)
  const arcs = Array.from({ length: 9 }, (_, i) => 120 + i * 58)
  const slabs = Array.from({ length: 5 }, (_, i) => ({
    x: 980 + r() * 520 - i * 70,
    y: 170 + i * 120 + r() * 30,
    w: 260 + r() * 160,
    h: 56 + r() * 30,
  }))
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract illustration" className={`block h-full w-full ${className}`}>
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="text-art-haze" stopColor="currentColor" />
          <stop offset=".55" className="text-white-200" stopColor="currentColor" />
          <stop offset="1" className="text-art-mist" stopColor="currentColor" />
        </linearGradient>
        <radialGradient id={`glow${id}`} cx="0.32" cy="0.62" r="0.55">
          <stop offset="0" className="text-art-periwinkle" stopColor="currentColor" stopOpacity=".9" />
          <stop offset="1" className="text-art-periwinkle" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <pattern id={`dots${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.4" className="text-white-800" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="1600" height="900" fill={`url(#bg${id})`} />
      <rect width="1600" height="900" fill={`url(#dots${id})`} opacity=".55" />
      <rect width="1600" height="900" fill={`url(#glow${id})`} />
      <g fill="none" className="text-art-iris" stroke="currentColor">
        {arcs.map((rad, i) => (
          <circle key={rad} cx="520" cy="560" r={rad} strokeWidth={i % 3 === 0 ? 2 : 1} opacity={0.5 - i * 0.045} />
        ))}
      </g>
      <circle cx="520" cy="560" r="86" className="text-art-navy" fill="currentColor" opacity=".9" />
      <circle cx="562" cy="520" r="18" className="text-art-teal" fill="currentColor" />
      {slabs.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="14" className="text-white-100" fill="currentColor" />
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="14" fill="none" className="text-white-500" stroke="currentColor" />
          <circle cx={s.x + 30} cy={s.y + s.h / 2} r="10" className={['text-blue-400', 'text-art-teal', 'text-traffic-yellow', 'text-art-ember', 'text-art-iris'][i]} fill="currentColor" />
          <rect x={s.x + 52} y={s.y + s.h / 2 - 5} width={s.w * 0.45} height="10" rx="5" className="text-white-500" fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}
