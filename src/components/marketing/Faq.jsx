import { useId, useState } from 'react'
import { Section } from './primitives.jsx'

// C4 FAQ (pricing 672 wide, others 695). Section padding 160/160 (>= lg); H2 then 24px to the
// first item; items border-b #edeff3, py 28 (79 tall closed). Panel height 300ms in-out-cubic (P9).

/** Bracketed plus icon, 19.2x12, stroke 1.5 (geometry from the spec / live SVG). */
function BracketPlus() {
  return (
    <svg width="19.2" height="12" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="faq-icon mt-[5px] shrink-0">
      <line x1="0" y1="0.75" x2="20%" y2="0.75" />
      <line x1="0.75" y1="0" x2="0.75" y2="100%" />
      <line x1="0" y1="11.25" x2="20%" y2="11.25" />
      <line x1="6" y1="50%" x2="13.2" y2="50%" />
      <line x1="50%" y1="2.4" x2="50%" y2="9.6" className="faq-icon-v" />
      <line x1="80%" y1="0.75" x2="100%" y2="0.75" />
      <line x1="18.45" y1="0" x2="18.45" y2="100%" />
      <line x1="80%" y1="11.25" x2="100%" y2="11.25" />
    </svg>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="relative border-b border-solid border-white-400 py-7 text-base" data-open={open || undefined}>
      <h3>
        <button
          type="button"
          id={`${id}-t`}
          aria-expanded={open}
          aria-controls={`${id}-p`}
          onClick={() => setOpen((o) => !o)}
          className="group -mx-2 -my-1.5 flex w-[calc(100%+12px)] cursor-pointer items-start justify-between gap-x-6 rounded-12 px-2 py-1.5 text-left outline-none focus-visible:shadow-focus-ring"
        >
          <span className="font-semibold text-black-300">{q}</span>
          <BracketPlus />
        </button>
      </h3>
      <div id={`${id}-p`} role="region" aria-labelledby={`${id}-t`} data-motion="faq-panel" data-open={open || undefined} inert={open ? undefined : ''}>
        <div className="pr-2 lg:pr-16">
          <div className="pt-3 text-body-400 text-black-600">
            {a.map((p, i) => (
              <p key={i} className={`text-pretty ${i ? 'mt-5' : ''}`}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * items: [{ q, a: [paragraph, ...] }] where a paragraph may be a string or JSX (for inline links).
 * width: 'pricing' (672, x384) | 'default' (695, x372.5).
 */
export default function Faq({ title, items, width = 'default', bordered = true, className = '', padClass = 'py-[100px] lg:py-40' }) {
  const w = width === 'pricing' ? 'lg:max-w-[672px]' : 'lg:max-w-[695px]'
  const Wrap = bordered ? Section : 'section'
  return (
    <Wrap {...(bordered ? { as: 'section' } : {})} className={`${bordered ? '' : 'container'} ${className}`}>
      <div className={`grid grid-cols-12 ${padClass}`}>
        <div className={`${bordered ? 'col-[2/-2]' : 'col-[1/-1]'} w-full lg:col-[1/-1] lg:mx-auto ${w}`}>
          <h2 className="pr-6 text-heading-md-sm text-black-300 lg:text-heading-md">{title}</h2>
          <div className="mt-6">
            {items.map((it, i) => (
              <FaqItem key={i} q={it.q} a={it.a} />
            ))}
          </div>
        </div>
      </div>
    </Wrap>
  )
}

/** Inline link inside answers (#266df0 w400 underline). */
export function InlineLink({ children, href = '#' }) {
  return (
    <a href={href} className="inline-link">
      {children}
    </a>
  )
}
