import { useEffect, useMemo, useRef } from 'react'
import { observeInView, reducedMotion } from '../../../motion/index.js'
import { rng } from '../../../data/copy.js'
import { Block, Corners, Edges, Guides, RowLine, u } from './Blueprint.jsx'
import { SectionHeader } from './CardSection.jsx'

// Measured cell shades (live pixels): #202124 / #505967 / #6f7988 / #8f99a8 / #a4adba — the same
// five palette steps the engineering-blog heatmap uses.
const SHADES = ['bg-black-200', 'bg-black-600', 'bg-black-700', 'bg-black-800', 'bg-black-900']
const COUNT = 359 // 51 full weeks + 2 days, grid-flow-col, 7 rows

/**
 * Contribution grid. Cells start hidden and get inline opacity 1 in view; each cell transitions
 * opacity 150ms (.2,0,0,1) (measured). The per-cell stagger was not captured: random 0-600ms
 * (same assumption as the engineering blog heatmap).
 */
function Cells({ cell }) {
  const ref = useRef(null)
  const cells = useMemo(() => {
    const r = rng(1203)
    return Array.from({ length: COUNT }, (_, i) => {
      const weekend = i % 7 === 0 || i % 7 === 6 // live: first/last rows run darker
      const v = r()
      if (weekend) return v < 0.45 ? 0 : v < 0.8 ? 1 : 2
      return v < 0.08 ? 0 : v < 0.3 ? 1 : v < 0.55 ? 2 : v < 0.8 ? 3 : 4
    })
  }, [])
  const delays = useMemo(() => {
    const r = rng(77)
    return cells.map(() => Math.round(r() * 600))
  }, [cells])
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => el.querySelectorAll('.dev-heat-cell').forEach((c) => (c.style.opacity = '1'))
    if (reducedMotion()) return show()
    const off = observeInView(
      el,
      (vis) => {
        if (vis) {
          show()
          off()
        }
      },
      { threshold: 0.4 }
    )
    return () => off()
  }, [])
  return (
    <div
      ref={ref}
      className="grid w-max grid-flow-col"
      style={{ gridTemplateRows: `repeat(7, ${cell})`, gridAutoColumns: cell }}
    >
      {cells.map((v, i) => (
        <div key={i} className="dev-heat-cell p-px" style={{ opacity: 0, transitionDelay: `${delays[i]}ms` }}>
          <div className={`aspect-square rounded-[30%] ${SHADES[v]}`} />
        </div>
      ))}
    </div>
  )
}

/**
 * D-HEATMAP (B5). Desktop: header, then a 4u lined box at col 3/-3; scroll area from half-row 2
 * with 1/48-of-box side padding; mono caption bottom-right in the last half-rows. Then 3u tail.
 * Mobile: box col 2/-2 x 5u (cell size not measured below lg; scrolls horizontally).
 */
export default function Heatmap({ data }) {
  return (
    <Block innerClassName="[--hx:var(--u)] lg:[--hx:calc(var(--u)*2.5)]">
      <SectionHeader lead={data.lead} cont={data.cont} button={data.button} />
      <div className="relative max-lg:hidden" style={{ height: u(4) }}>
        <RowLine top={0} />
        <RowLine top="calc(100% - 1px)" />
        <div className="absolute inset-y-0 bg-primary-background" style={{ left: u(2), right: u(2) }}>
          <Edges sides="tb" />
          <Corners />
          <div className="dev-scroll-x absolute inset-x-0 bottom-0 overflow-x-auto" style={{ top: u(0.5), paddingInline: u(20 / 48) }}>
            <Cells cell={`calc(var(--u) * 20 / 52 * 46 / 48)`} />
          </div>
          <div className="pointer-events-none absolute bottom-0 flex items-center justify-end" style={{ left: u(0.5), right: u(0.5), height: u(1) }}>
            <p className="text-pretty font-mono text-xs uppercase text-black-800">{data.caption}</p>
          </div>
        </div>
      </div>
      <div className="relative max-lg:hidden" style={{ height: u(3) }}>
        <Guides xs={[u(2), u(22)]} />
      </div>
      <div className="lg:hidden">
        <div className="relative bg-primary-background" style={{ marginInline: u(1), height: u(5) }}>
          <Edges sides="tb" />
          <Corners />
          <div className="dev-scroll-x overflow-x-auto" style={{ padding: `${u(0.5)} ${u(0.25)} 0` }}>
            <Cells cell="calc(var(--u) * 0.42)" />
          </div>
          <p className="absolute bottom-0 text-pretty font-mono text-xs uppercase text-black-800" style={{ left: u(0.25), right: u(0.25) }}>
            {data.caption}
          </p>
        </div>
        <div style={{ height: u(1.5) }} />
      </div>
    </Block>
  )
}
