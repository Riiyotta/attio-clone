import { Link } from 'react-router-dom'
import { HoverWash, Arrow } from '../marketing/primitives.jsx'
import AppIcon from './AppIcon.jsx'

/** 12-14px check-badge (#0db472, opacity .8 -> 1 on card hover) with a hover tooltip. */
export function VerifiedBadge({ size = 14 }) {
  return (
    <span className="group/badge relative inline-flex">
      <svg width={size} height={size} viewBox="0 0 16 16" aria-label="Official app" role="img" className="verified-badge text-green-600">
        <path
          fill="currentColor"
          d="M8 1.2 9.6 2.4l2-.1.6 1.9 1.7 1.1-.6 1.9.6 1.9-1.7 1.1-.6 1.9-2 -.1L8 14.8 6.4 13.6l-2 .1-.6-1.9-1.7-1.1.6-1.9-.6-1.9 1.7-1.1.6-1.9 2 .1z"
        />
        <path d="m5.6 8.1 1.7 1.7 3.2-3.5" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* C11 tooltip: bg #232529, radius 6, padding 8 (text colour not captured: #edeff3 14/20) */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-6 bg-black-300 p-2 text-sm text-white-400 opacity-0 shadow-tooltip transition-opacity duration-150 group-hover/badge:opacity-100 group-hover/badge:delay-300"
      >
        Official app
      </span>
    </span>
  )
}

/** T4 AppCard: radius 16, 1px #e4e7ec -> hover #cad0d9, padding 20 (16 < lg), gap 14 (12 < lg). */
export default function AppCard({ app }) {
  return (
    <Link
      to={`/apps/${app.slug}`}
      className="app-card group relative flex flex-col gap-3 overflow-hidden rounded-16 border border-solid border-white-500 p-4 lg:gap-3.5 lg:p-5"
    >
      <HoverWash />
      <div className="relative flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2 xl:gap-2.5">
          <AppIcon seed={app.seed} size={40} />
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-0.5">
              <h4 className="truncate text-base font-semibold text-black-300">{app.name}</h4>
              {app.verified && (
                <span className="ml-1 inline-flex">
                  <VerifiedBadge size={14} />
                </span>
              )}
            </div>
            <p className="shrink truncate text-xs text-black-700 lg:text-sm">{app.by}</p>
          </div>
        </div>
        <Arrow className="app-card-arrow text-black-900" />
      </div>
      <p className="relative line-clamp-2 text-pretty pr-2 text-sm text-black-700">{app.desc}</p>
    </Link>
  )
}
