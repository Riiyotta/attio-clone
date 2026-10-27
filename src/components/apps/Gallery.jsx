import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { reducedMotion } from '../../motion/index.js'
import AppScreen, { FitBox } from './AppScreen.jsx'

// T5 Gallery: main 695x434.4 (8:5) zoom-in button + 3 thumbnails (133.8x83.6) + lightbox.

function Shot({ seed, i }) {
  return (
    <FitBox w={640} h={400}>
      <div className="h-full w-full bg-white-200 p-5">
        <AppScreen seed={seed} variant={i * 2} />
      </div>
    </FitBox>
  )
}

const ChevronL = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3.5 5.5 8l4.5 4.5" />
  </svg>
)
const ChevronR = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3.5 10.5 8 6 12.5" />
  </svg>
)

export default function Gallery({ seed, name }) {
  const [sel, setSel] = useState(0)
  const [box, setBox] = useState(null) // lightbox state: { from: DOMRect }
  const mainRef = useRef(null)
  const count = 3

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-10 lg:gap-0">
      <button
        ref={mainRef}
        type="button"
        aria-label={`Open ${name} screenshot ${sel + 1} of ${count}`}
        onClick={() => setBox({ from: mainRef.current.getBoundingClientRect() })}
        className={`relative flex aspect-[8/5] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-12 bg-white-200 shadow-gallery lg:col-span-8 lg:rounded-16 ${box ? 'invisible' : ''}`}
      >
        <Shot seed={seed} i={sel} />
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-media-ring" />
      </button>
      <div className="grid max-h-[434px] grid-cols-3 gap-4 overflow-y-auto lg:col-span-2 lg:flex lg:flex-col lg:px-5">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={sel === i}
            aria-label={`Show screenshot ${i + 1}`}
            onClick={() => setSel(i)}
            className="gallery-thumb aspect-[8/5] w-full shrink-0 rounded-12 border border-solid p-0.5"
          >
            <span className="gallery-thumb-inner relative flex h-full w-full items-center justify-center overflow-hidden rounded-10 bg-white-200">
              <Shot seed={seed} i={i} />
            </span>
          </button>
        ))}
      </div>
      {box && (
        <Lightbox
          from={box.from}
          index={sel}
          count={count}
          onIndex={setSel}
          onClose={() => setBox(null)}
          getReturnRect={() => mainRef.current.getBoundingClientRect()}
          render={(i) => <Shot seed={seed} i={i} />}
        />
      )}
    </div>
  )
}

/**
 * Lightbox (P24). Overlay rgba(202,207,217,.4) + blur 4px. The image grows from the clicked frame
 * (FLIP translate + scale -> identity). The live site uses a framer shared-layout animation whose
 * timing was not captured: framer's default layout transition (450ms cubic-bezier(.4,0,.1,1)) is
 * used. Frame 936x584 (max-height 100vh - 4rem), radius 16 (12 < lg). Prev/next: 36px outline icon
 * buttons (48 / radius 12 < lg) in a grid `auto 1fr auto` gap 16, fading in.
 */
function Lightbox({ from, index, count, onIndex, onClose, getReturnRect, render }) {
  const frame = useRef(null)
  const [closing, setClosing] = useState(false)
  const DUR = reducedMotion() ? 0 : 450
  const EASE = 'cubic-bezier(.4,0,.1,1)'

  const flip = (el, rect) => {
    const to = el.getBoundingClientRect()
    const sx = rect.width / to.width
    const sy = rect.height / to.height
    const dx = rect.left - to.left
    const dy = rect.top - to.top
    return `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
  }

  useLayoutEffect(() => {
    const el = frame.current
    if (!el || !DUR) return
    el.animate([{ transform: flip(el, from), transformOrigin: '0 0' }, { transform: 'none', transformOrigin: '0 0' }], { duration: DUR, easing: EASE })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => {
    if (closing) return
    setClosing(true)
    const el = frame.current
    if (!el || !DUR) return onClose()
    const anim = el.animate([{ transform: 'none', transformOrigin: '0 0' }, { transform: flip(el, getReturnRect()), transformOrigin: '0 0' }], { duration: DUR, easing: EASE, fill: 'forwards' })
    anim.onfinish = onClose
  }, [closing, DUR, getReturnRect, onClose])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') onIndex((index + 1) % count)
      if (e.key === 'ArrowLeft') onIndex((index + count - 1) % count)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [close, count, index, onIndex])

  const navBtn = 'lightbox-nav flex size-12 items-center justify-center rounded-12 border border-solid border-white-800 bg-white-100 text-black-400 transition-colors duration-300 ease-in-out hover:border-black-700 lg:size-9 lg:rounded-10'
  return createPortal(
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Screenshot viewer">
      <div data-motion="lightbox-overlay" data-state={closing ? 'closed' : 'open'} className="absolute inset-0 bg-lightbox-overlay backdrop-blur-[4px]" onClick={close} />
      <div className="pointer-events-none relative flex h-full items-center justify-center px-4">
        <div className="pointer-events-auto grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <button type="button" aria-label="Previous screenshot" data-state={closing ? 'closed' : 'open'} onClick={() => onIndex((index + count - 1) % count)} className={navBtn}>
            <ChevronL />
          </button>
          <div
            ref={frame}
            className="relative aspect-[8/5] w-[min(936px,calc(100vw-160px),calc((100vh-4rem)*1.6))] overflow-hidden rounded-12 bg-white-200 shadow-gallery lg:rounded-16"
            onClick={close}
          >
            {render(index)}
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-media-ring" />
          </div>
          <button type="button" aria-label="Next screenshot" data-state={closing ? 'closed' : 'open'} onClick={() => onIndex((index + 1) % count)} className={navBtn}>
            <ChevronR />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
