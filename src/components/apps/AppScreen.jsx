import { useEffect, useRef, useState } from 'react'
import { Bar } from '../ui.jsx'
import { Icon } from '../mock.jsx'
import MiniMock from '../marketing/MiniMock.jsx'
import AppIcon from './AppIcon.jsx'

/**
 * Original "app screenshot" artwork for media boxes (featured panel 624x413, gallery 960x599
 * displayed 695x434, thumbnails). A neutral product window with the app's own mark, a sidebar
 * and one of the shared MiniMock scenes. `seed` / `variant` pick the scene.
 */
export default function AppScreen({ seed = 0, variant = 0, className = '' }) {
  return (
    <div role="img" aria-label="App screenshot" className={`flex h-full w-full items-center justify-center ${className}`}>
      <div className="flex aspect-[960/599] max-h-full w-full max-w-full flex-col overflow-hidden rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card">
        <div className={`flex shrink-0 items-center gap-1.5 border-b border-solid border-white-400 h-[9%] px-[2.5%]`}>
          {['bg-traffic-red', 'bg-traffic-yellow', 'bg-traffic-green'].map((c) => (
            <span key={c} className={`block rounded-full ${c} size-[7px]`} />
          ))}
          {(
            <span className="ml-3 flex items-center gap-1.5">
              <AppIcon seed={seed} size={14} />
              <Bar w={64} h={6} className="bg-white-500" />
            </span>
          )}
        </div>
        <div className="flex min-h-0 flex-1">
          <div className={`flex shrink-0 flex-col gap-2 border-r border-solid border-white-400 bg-mock-surface w-[20%] p-[2%]`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="flex items-center gap-1.5">
                {<Icon name={['home', 'inbox', 'list', 'chart', 'settings'][i]} size={12} className="text-black-800" />}
                <Bar w={`${70 - i * 8}%`} h={6} className={i === 1 ? 'bg-blue-200' : 'bg-white-500'} />
              </span>
            ))}
          </div>
          <MiniMock variant={(seed + variant) % 6} className="min-w-0 flex-1" />
        </div>
      </div>
    </div>
  )
}

/**
 * Renders children at a fixed design size (w x h) and scales them to fit the parent box
 * (object-fit: contain), so the same artwork serves the 695 gallery, 133 thumbnails and lightbox.
 */
export function FitBox({ w, h, children, className = '' }) {
  const ref = useRef(null)
  const [k, setK] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setK(Math.round(Math.min(el.clientWidth / w, el.clientHeight / h) * 1000) / 1000)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w, h])
  return (
    <div ref={ref} className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute left-1/2 top-1/2" style={{ width: w, height: h, transform: `translate(-50%, -50%) scale(${k})`, opacity: k ? 1 : 0 }}>
        {children}
      </div>
    </div>
  )
}
