// Original geometric app marks (no real logos). White tile, radius 30%, inset 1px ring
// rgba(29,29,29,.1) (spec T4 AppCard icon); a seeded shape + palette tone fills it.

const TONES = [
  'text-blue-500',
  'text-art-teal',
  'text-traffic-yellow',
  'text-art-ember',
  'text-art-iris',
  'text-black-100',
  'text-traffic-green',
  'text-art-navy',
  'text-blue-400',
  'text-traffic-red',
  'text-art-citron',
]

const SHAPES = [
  // each on a 40 grid, filled with currentColor
  () => <circle cx="20" cy="20" r="11" />,
  () => (
    <>
      <circle cx="16" cy="20" r="8.5" />
      <circle cx="24" cy="20" r="8.5" opacity=".55" />
    </>
  ),
  () => <rect x="12" y="12" width="16" height="16" rx="3.5" transform="rotate(45 20 20)" />,
  () => (
    <>
      <path d="M10 30V18a8 8 0 0 1 8-8h12v12a8 8 0 0 1-8 8z" />
    </>
  ),
  () => (
    <>
      <rect x="10" y="11" width="20" height="4.5" rx="2.25" />
      <rect x="10" y="17.75" width="14" height="4.5" rx="2.25" opacity=".7" />
      <rect x="10" y="24.5" width="9" height="4.5" rx="2.25" opacity=".45" />
    </>
  ),
  () => (
    <>
      <circle cx="19" cy="21" r="8" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="28" cy="12" r="3.2" />
    </>
  ),
  () => <path d="M20 9.5 31 29H9z" />,
  () => (
    <>
      <path d="M9 22a11 11 0 0 1 22 0z" />
      <rect x="9" y="25" width="22" height="4" rx="2" opacity=".6" />
    </>
  ),
  () => (
    <>
      <circle cx="14" cy="14" r="4" />
      <circle cx="26" cy="14" r="4" opacity=".6" />
      <circle cx="14" cy="26" r="4" opacity=".6" />
      <circle cx="26" cy="26" r="4" />
    </>
  ),
  () => <path d="M9 24c3.5-7 7.5-7 11 0s7.5 7 11 0v6H9z" />,
  () => (
    <>
      <path d="M12 10h7v20h-7z" />
      <path d="M22 10h6a6 6 0 0 1 0 12h-6z" opacity=".6" />
    </>
  ),
  () => <path d="M20 8.5 23 17l8.5 3-8.5 3-3 8.5-3-8.5-8.5-3 8.5-3z" />,
]

/** Tile with an original mark. `size` in px; radius 30% unless overridden; `crop` fills the box with the mark (hero band). */
export default function AppIcon({ seed = 0, size = 40, className = '', ring = true, rounded = 'rounded-[30%]', crop = false }) {
  const Shape = SHAPES[seed % SHAPES.length]
  const tone = TONES[(seed * 7 + 3) % TONES.length]
  return (
    <span
      className={`relative block shrink-0 overflow-hidden bg-white-100 ${rounded} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox={crop ? '8 8 24 24' : '0 0 40 40'} width="100%" height="100%" className={tone} fill="currentColor">
        <Shape />
      </svg>
      {ring && <span className="absolute inset-0 rounded-[inherit] shadow-media-ring" />}
    </span>
  )
}
