// T1.1 BillingToggle. Track radius 12 bg #f3f4f6 p2; grid 1fr 1fr gap 2; buttons padding 8 20
// radius 10 14/20; active #2e3238 (disabled), inactive #6f7988; colour 500ms ease-in-out (P5).
// Thumb: absolute, width calc((100% - 2px)/2), radius 10, white, translate-x 500ms ease-in-out.
// Default = Annual (thumb on the right).

export default function BillingToggle({ annual, onChange, compact = false, className = '' }) {
  const opts = [
    ['Monthly', false],
    ['Annual', true],
  ]
  return (
    <div className={`rounded-12 bg-white-300 p-0.5 ${compact ? 'w-full' : 'w-fit'} ${className}`}>
      <div className="relative grid grid-cols-[1fr_1fr] gap-x-0.5" role="group" aria-label="Billing period">
        <div
          aria-hidden="true"
          data-motion="billing-thumb"
          className={`absolute left-0 top-0 h-full w-[calc((100%-2px)/2)] rounded-10 bg-white-100 shadow-toggle-thumb transition-transform duration-500 ease-in-out ${
            annual ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
          }`}
        />
        {opts.map(([label, value]) => {
          const active = annual === value
          return (
            <button
              key={label}
              type="button"
              disabled={active}
              aria-pressed={active}
              onClick={() => onChange(value)}
              className={`isolate rounded-10 px-5 py-2 text-sm transition-colors duration-500 ease-in-out ${
                active ? 'text-black-400' : 'cursor-pointer text-black-700'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Two stacked words crossfading (opacity 150ms ease-in-out, P8). */
export function Crossfade({ a, b, showB }) {
  return (
    <span className="inline-grid">
      <span className={`col-start-1 row-start-1 transition-opacity duration-150 ease-in-out ${showB ? 'opacity-0' : 'opacity-100'}`} aria-hidden={showB}>
        {a}
      </span>
      <span className={`col-start-1 row-start-1 transition-opacity duration-150 ease-in-out ${showB ? 'opacity-100' : 'opacity-0'}`} aria-hidden={!showB}>
        {b}
      </span>
    </span>
  )
}
