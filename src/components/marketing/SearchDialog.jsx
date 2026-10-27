import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { reducedMotion } from '../../motion/index.js'

// C10 CmdkSearchDialog: trigger button + centred command dialog (apps directory, help docs).

export function SearchIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="5.25" />
      <path d="m12 12 3.5 3.5" />
    </svg>
  )
}

/**
 * Trigger. `lg`: 320x46, radius 12, 14px text, padding 0 14 0 12 (apps, help landing).
 * `sm`: 265x36, radius 10, 13px text, padding 0 12 0 8 (help sidebar).
 */
export function SearchTrigger({ placeholder, onOpen, size = 'lg', className = '' }) {
  const lg = size === 'lg'
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex items-center border border-solid border-white-800 bg-white-100 shadow-attio-3 transition-colors duration-300 ease-in-out hover:border-black-700 hover:duration-150 ${
        lg ? 'h-[46px] w-full max-w-[320px] gap-2 rounded-12 pl-3 pr-3.5' : 'h-9 w-full gap-1.5 rounded-10 pl-2 pr-3'
      } ${className}`}
    >
      <SearchIcon size={18} className="text-black-700" />
      <p className={`w-full truncate text-left text-black-700 ${lg ? 'text-sm' : 'text-[13px] leading-[13px]'}`}>{placeholder}</p>
      <p className="text-search-hint text-black-900">⌘K</p>
    </button>
  )
}

/** ⌘K / Ctrl+K opens the dialog. */
export function useSearchHotkey(open) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        open()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
}

/**
 * Dialog. items: [{ id, label, sub, group, to, icon }]. Filtering is a case-insensitive match on
 * label/sub/group. Enter (P18): opacity 0, scale .96 -> 1, 200ms in-out-quad; exit reverses.
 * Result rows were not captured live: 36px rows, radius 10, selected bg #f3f4f6 (spec default).
 */
export function SearchDialog({ open, onClose, placeholder, items, emptyLabel = 'No results found.' }) {
  const [phase, setPhase] = useState('closed')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setPhase('open')
      setQuery('')
      setActive(0)
      return
    }
    setPhase((p) => (p === 'closed' ? p : 'closing'))
    const t = setTimeout(() => setPhase('closed'), reducedMotion() ? 0 : 200)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (phase !== 'open') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) => `${it.label} ${it.sub ?? ''} ${it.group ?? ''}`.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => setActive(0), [query])
  useEffect(() => {
    listRef.current?.querySelector('[data-selected]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (phase === 'closed') return null

  const choose = (it) => {
    if (!it) return
    onClose()
    if (it.to) navigate(it.to)
  }
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(results[active])
    }
  }

  let lastGroup = null
  const state = phase === 'open' ? 'open' : 'closed'
  return createPortal(
    <div role="presentation" onKeyDown={onKeyDown}>
      <div data-motion="dialog-overlay" data-state={state} className="fixed inset-0 z-[100] bg-dialog-overlay backdrop-blur-[4px]" onClick={onClose} />
      <div className="pointer-events-none fixed inset-x-0 top-[180px] z-[101] flex justify-center px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={placeholder}
        data-motion="dialog-content"
        data-state={state}
        className="pointer-events-auto w-[600px] max-w-full rounded-16 bg-frost p-[3px] backdrop-blur-[4px]"
      >
        <div className="flex h-[62dvh] max-h-[576px] min-h-[256px] w-full max-w-[592px] flex-col overflow-hidden rounded-13 border border-solid border-white-500 bg-white-100 shadow-attio-5">
          <div className="flex items-center gap-2 border-b border-solid border-white-500 pb-3 pl-4 pr-2.5 pt-3.5">
            <SearchIcon size={18} className="text-black-700" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-black-300 outline-none placeholder:text-black-700"
            />
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              tabIndex={query ? 0 : -1}
              className={`rounded-8 px-1.5 text-xs text-black-700 transition-opacity duration-150 hover:text-black-300 ${query ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              Clear
            </button>
          </div>
          <div ref={listRef} role="listbox" className="min-h-0 flex-1 overflow-y-auto p-1.5">
            {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-black-700">{emptyLabel}</p>}
            {results.map((it, i) => {
              const head = it.group && it.group !== lastGroup ? it.group : null
              lastGroup = it.group
              return (
                <div key={it.id}>
                  {head && <p className="px-2.5 pb-1.5 pt-3 text-overline uppercase text-black-700">{head}</p>}
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    data-selected={i === active || undefined}
                    onMouseMove={() => setActive(i)}
                    onClick={() => choose(it)}
                    className={`flex h-9 w-full items-center gap-2.5 rounded-10 px-2.5 text-left text-sm text-black-300 ${i === active ? 'bg-white-300' : ''}`}
                  >
                    {it.icon}
                    <span className="truncate">{it.label}</span>
                    {it.sub && <span className="ml-auto truncate pl-3 text-xs text-black-900">{it.sub}</span>}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </div>
    </div>,
    document.body
  )
}
