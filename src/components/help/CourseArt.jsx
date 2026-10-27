import { useId } from 'react'
import MiniMock from '../marketing/MiniMock.jsx'
import { FitBox } from '../apps/AppScreen.jsx'

const PAIRS = [
  ['text-art-haze', 'text-art-periwinkle'],
  ['text-art-mist', 'text-art-teal'],
  ['text-white-300', 'text-blue-200'],
  ['text-art-haze', 'text-art-iris'],
  ['text-white-200', 'text-white-700'],
]

/**
 * Original course / lesson media (5:3 course cards, ~2.1:1 lesson rows): a soft two-tone
 * gradient field with faint rings and one of the shared product mini-scenes. No photos.
 */
export default function CourseArt({ seed = 0, wide = false }) {
  const id = useId().replace(/:/g, '')
  const [a, b] = PAIRS[seed % PAIRS.length]
  return (
    <div className="relative h-full w-full">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 60">
        <defs>
          <linearGradient id={`c${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className={a} stopColor="currentColor" />
            <stop offset="1" className={b} stopColor="currentColor" />
          </linearGradient>
        </defs>
        <rect width="100" height="60" fill={`url(#c${id})`} />
        {[14, 24, 34, 44].map((r) => (
          <circle key={r} cx={seed % 2 ? 84 : 16} cy="52" r={r} fill="none" className="text-white-100" stroke="currentColor" strokeWidth=".3" opacity=".7" />
        ))}
      </svg>
      <FitBox w={wide ? 380 : 400} h={wide ? 180 : 240} className="absolute inset-0">
        <MiniMock variant={seed % 6} className="h-full w-full" />
      </FitBox>
    </div>
  )
}
