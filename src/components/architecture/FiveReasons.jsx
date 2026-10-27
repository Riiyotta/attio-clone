import { useRef, useState } from 'react'
import { Bullet, monoLabel } from './Sections.jsx'

// T8 "Five reasons" index (P30). Words: serif 8.62cqi (119.8 at 1440), ls -0.03em, mono "[0N]"
// index. 35 vertical hairlines lean toward the pointer (translate 500ms cubic-bezier(.23,1,.32,1));
// other words dim (opacity 200ms ease-out); a 329x121.5 #101010 preview card follows the pointer.
// Rows are 171.7 tall (word line + the description slot). Lean magnitude was not measured (max 14px).
const LINES = 35

export default function FiveReasons({ label, reasons }) {
  const box = useRef(null)
  const [hover, setHover] = useState(null)
  const [pt, setPt] = useState(null)
  const onMove = (e) => {
    const r = box.current.getBoundingClientRect()
    setPt({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width })
  }
  const rows = [reasons.slice(0, 2), reasons.slice(2, 4), reasons.slice(4)]
  return (
    <div className="relative pb-[231px] pt-40">
      <Bullet className="justify-center font-sans text-arch-body text-black-100">{label}</Bullet>
      <div
        ref={box}
        onPointerMove={onMove}
        onPointerLeave={() => {
          setPt(null)
          setHover(null)
        }}
        className="reasons relative mt-[50px] overflow-x-clip [container-type:inline-size]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-between px-[calc(100%/12)]">
          {Array.from({ length: LINES }, (_, i) => {
            const x = ((i + 0.5) / LINES) * (pt?.w ?? 1)
            const d = pt ? (pt.x - x) / 120 : 0
            const lean = pt ? Math.max(-1, Math.min(1, d)) * 14 * Math.exp(-Math.abs(d) * 0.6) : 0
            return <span key={i} className="reason-line block h-full w-px bg-white-400" style={{ transform: `translateX(${lean.toFixed(2)}px)` }} />
          })}
        </div>
        {rows.map((row, ri) => (
          <div key={ri} className="relative flex flex-wrap border-b border-solid border-white-500">
            {row.map(([word, desc], k) => {
              const idx = ri * 2 + k
              return (
                <div key={word} className="relative h-[171.7px]">
                  <button
                    type="button"
                    onMouseEnter={() => setHover(idx)}
                    onFocus={() => setHover(idx)}
                    onBlur={() => setHover(null)}
                    aria-describedby={`reason-${idx}`}
                    data-dim={hover !== null && hover !== idx ? '' : undefined}
                    className="reason-word relative flex w-full cursor-pointer items-start gap-[0.72cqi] rounded-2 px-[8.333cqi] text-left"
                  >
                    <span className="font-serif text-[min(3rem,12.5vw)] leading-none tracking-[-0.03em] text-black-100 md:text-[8.62cqi]">{word}</span>
                    <span className={`${monoLabel} text-black-100`}>[0{idx + 1}]</span>
                  </button>
                  <p id={`reason-${idx}`} className={`reason-desc absolute left-0 w-[min(28rem,100cqi)] px-[8.333cqi] pb-4 pt-6 text-arch-body text-black-600 ${hover === idx ? 'opacity-100' : 'opacity-0'}`}>
                    {desc}
                  </p>
                </div>
              )
            })}
          </div>
        ))}
        {pt && hover !== null && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 flex h-[121.5px] w-[329px] flex-col gap-1 rounded-4 bg-black-50 p-3 font-mono max-md:hidden"
            style={{ transform: `translate(${pt.x + 16}px, ${pt.y + 16}px)` }}
          >
            <span className="text-mono-chip text-white-100">{reasons[hover][0]}</span>
            <span className="line-clamp-4 text-xs text-black-700">{reasons[hover][1]}</span>
          </div>
        )}
      </div>
    </div>
  )
}
