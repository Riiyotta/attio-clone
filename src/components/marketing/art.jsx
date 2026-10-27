import { useId } from 'react'
import { CUSTOMER_LOGOS, STORY_LOGOS } from '../logos.jsx'

// Original artwork for the secondary pages: abstract portrait cut-outs, gradient avatars and the
// 12 invented logo marks used by LogoGrid. No photos, no real people, no real brands.

/** 12 invented wordmarks (10 homepage customer marks + 2 story marks). Render fn ({w,h}). */
export const LOGO_MARKS = [...CUSTOMER_LOGOS, STORY_LOGOS[0].Wordmark, STORY_LOGOS[1].Wordmark]
export const LOGO_SIZES = [
  [92, 20], [104, 15], [100, 16], [102, 22], [108, 18], [96, 22],
  [80, 18], [110, 14], [64, 20], [106, 13], [98, 20], [90, 19],
]

/** One logo in its media box (contain), monochrome #232529. */
export function LogoMark({ i, scale = 1, className = '' }) {
  const Mark = LOGO_MARKS[i % LOGO_MARKS.length]
  const [w, h] = LOGO_SIZES[i % LOGO_SIZES.length]
  return (
    <span className={`flex h-full w-full items-center justify-center text-black-300 ${className}`}>
      <Mark w={Math.round(w * scale)} h={Math.round(h * scale)} />
    </span>
  )
}

// Palette pairs for abstract avatars (palette tokens only, rendered via currentColor stops).
const AVATAR_TONES = [
  ['text-art-iris', 'text-art-haze'],
  ['text-art-teal', 'text-art-mist'],
  ['text-blue-400', 'text-blue-100'],
  ['text-art-periwinkle', 'text-white-300'],
  ['text-traffic-yellow', 'text-white-300'],
  ['text-black-700', 'text-white-500'],
  ['text-art-ember', 'text-art-haze'],
  ['text-art-navy', 'text-art-periwinkle'],
]

/**
 * Abstract avatar: soft two-stop gradient disc/tile with a simple head-and-shoulders silhouette.
 * `seed` picks the palette and the silhouette offset.
 */
export function AbstractAvatar({ size = 24, seed = 0, radius = '50%', className = '', ring = false }) {
  const id = useId().replace(/:/g, '')
  const [a, b] = AVATAR_TONES[seed % AVATAR_TONES.length]
  const dx = ((seed * 7) % 5) - 2
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={`block shrink-0 ${className}`} style={{ borderRadius: radius }}>
      <defs>
        <linearGradient id={`av${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className={b} stopColor="currentColor" />
          <stop offset="1" className={a} stopColor="currentColor" />
        </linearGradient>
        <clipPath id={`avc${id}`}>
          <rect width="24" height="24" rx={radius === '50%' ? 12 : (parseFloat(radius) / size) * 24} />
        </clipPath>
      </defs>
      <g clipPath={`url(#avc${id})`}>
        <rect width="24" height="24" fill={`url(#av${id})`} />
        <circle cx={12 + dx * 0.4} cy="10" r="4.4" className="text-white-100" fill="currentColor" opacity=".55" />
        <path d={`M${3 + dx * 0.3} 25c0-5 4-8.4 9-8.4s9 3.4 9 8.4z`} className="text-white-100" fill="currentColor" opacity=".45" />
      </g>
      {ring && <rect x=".5" y=".5" width="23" height="23" rx={radius === '50%' ? 11.5 : 6.5} fill="none" stroke="rgba(29,29,29,.1)" />}
    </svg>
  )
}

/**
 * Portrait "cut-out" stand-in (240x240 media box, transparent bg): an original geometric bust
 * built from palette gradients. `variant` changes the palette and pose.
 */
export function PortraitArt({ size = 240, variant = 0, className = '' }) {
  const id = useId().replace(/:/g, '')
  const tones = [
    ['text-art-iris', 'text-art-haze', 'text-art-navy'],
    ['text-art-teal', 'text-art-mist', 'text-black-500'],
    ['text-blue-400', 'text-blue-100', 'text-black-400'],
  ][variant % 3]
  const tilt = [0, -4, 3][variant % 3]
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" role="img" aria-label="Portrait illustration" className={`block ${className}`}>
      <defs>
        <linearGradient id={`pg${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={tones[1]} stopColor="currentColor" />
          <stop offset="1" className={tones[0]} stopColor="currentColor" />
        </linearGradient>
        <linearGradient id={`pb${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className={tones[0]} stopColor="currentColor" />
          <stop offset="1" className={tones[2]} stopColor="currentColor" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${tilt} 120 140)`}>
        <path d="M44 240c4-52 36-82 76-82s72 30 76 82z" fill={`url(#pb${id})`} />
        <rect x="104" y="128" width="32" height="34" rx="14" fill={`url(#pg${id})`} />
        <ellipse cx="120" cy="96" rx="40" ry="46" fill={`url(#pg${id})`} />
        <path d="M80 92c0-30 18-48 42-48 22 0 38 14 40 40-10-12-28-18-46-16-14 2-26 10-36 24z" className={tones[2]} fill="currentColor" opacity=".85" />
      </g>
    </svg>
  )
}
