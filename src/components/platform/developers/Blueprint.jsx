// T3 blueprint primitives (CLONE_SPEC_PLATFORM section 4 / 0.4 P8).
// Geometry is expressed in grid units: `u(n)` = n squares of the block's unit grid
// (24 cols >= lg, 12 cols below; --u is set by .dev-u inside a .dev-cq container).
import SectionDivider from '../../SectionDivider.jsx'

export const u = (n) => `calc(${n} * var(--u))`

/** Bordered block box: `.container` -> border-x subtle-stroke (#2e3238) -> unit-grid container. */
export function Block({ className = '', innerClassName = '', children, divider = true }) {
  return (
    <>
      <div className={`container isolate ${className}`}>
        <div className="dev-cq border-x border-solid border-subtle-stroke">
          <div className={`dev-u relative ${innerClassName}`}>{children}</div>
        </div>
      </div>
      {divider && <SectionDivider dark />}
    </>
  )
}

/**
 * Full blueprint line grid: one vertical per column and one horizontal per row, 1px weak-stroke
 * (#232529). Measured on live: lines on even indices are solid, odd indices dashed.
 */
export function GridLines({ cols, rows, className = '' }) {
  const v = Array.from({ length: cols - 1 }, (_, i) => i + 1)
  const h = Array.from({ length: rows - 1 }, (_, i) => i + 1)
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 text-black-300 ${className}`}>
      {v.map((k) => (
        <span
          key={`v${k}`}
          className={`absolute inset-y-0 w-px ${k % 2 ? 'dev-dash-v' : 'bg-black-300'}`}
          style={{ left: `calc(${k} * 100% / ${cols})` }}
        />
      ))}
      {h.map((k) => (
        <span key={`h${k}`} className={`absolute inset-x-0 h-px ${k % 2 ? 'dev-dash-h' : 'bg-black-300'}`} style={{ top: u(k) }} />
      ))}
    </div>
  )
}

/** Full-width dashed row line (card row top/bottom), weak-stroke. */
export function RowLine({ top }) {
  return <span aria-hidden="true" className="dev-dash-h pointer-events-none absolute inset-x-0 h-px text-black-300" style={{ top }} />
}

/**
 * Faint dashed vertical guides (section header region and trailing spacer). Live renders them as
 * half-pixel #232529 dashes (~20/255 per pixel on #101010); approximated as weak-stroke at 40%.
 */
export function Guides({ xs, top = 0, bottom = 0 }) {
  return xs.map((x, i) => (
    <span
      key={i}
      aria-hidden="true"
      className="dev-dash-v pointer-events-none absolute w-px text-black-300/40"
      style={{ left: x, top, bottom }}
    />
  ))
}

/** 4x4 default-stroke squares centred on the four corners of the parent box. */
export function Corners() {
  return ['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map((p) => (
    <span
      key={p}
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 size-1 bg-default-stroke ${p} ${p.includes('left') ? '-translate-x-1/2' : 'translate-x-1/2'} ${
        p.includes('top') ? '-translate-y-1/2' : 'translate-y-1/2'
      }`}
    />
  ))
}

/** 1px weak-stroke edges on all four sides of the parent box. */
export function Edges({ sides = 'tblr' }) {
  return (
    <>
      {sides.includes('t') && <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black-300" />}
      {sides.includes('b') && <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black-300" />}
      {sides.includes('l') && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-px bg-black-300" />}
      {sides.includes('r') && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-px bg-black-300" />}
    </>
  )
}

/** Opaque lined box placed in unit coordinates (x, y, w, h in units). */
export function UBox({ x, y, w, h, className = '', style, children, edges = 'tblr', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`absolute bg-primary-background ${className}`}
      style={{ left: u(x), top: u(y), width: u(w), height: u(h), ...style }}
      {...rest}
    >
      {children}
      <Edges sides={edges} />
      <Corners />
    </Tag>
  )
}

/** Dark outline / primary buttons: h36 14/20 r10 (desktop), h46 16/22 r12 below lg (measured). */
export function DevButton({ variant = 'outline', children, href = '#' }) {
  return (
    <a
      href={href}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-outline'} max-lg:h-[46px] max-lg:rounded-12 max-lg:px-3.5 max-lg:text-base`}
    >
      {children}
    </a>
  )
}

/** `[ 01 ]` overline: interDisplay 12/14 w600 +0.72 uppercase. */
export function Overline({ children, className = '' }) {
  return <p className={`font-display text-overline uppercase tabular-nums ${className}`}>{children}</p>
}
