// `section-divider`: full-width 1px SVG hairline between sections. Stroke = subtle-stroke
// (#e4e7ec on light; #2e3238 next to dark sections -> pass `dark`).
export default function SectionDivider({ dark = false, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="1"
      preserveAspectRatio="none"
      className={`block h-px w-full ${dark ? 'text-black-400' : 'text-white-500'} ${className}`}
    >
      <rect width="100%" height="1" fill="currentColor" />
    </svg>
  )
}
