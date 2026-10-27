import { useEffect, useId, useRef, useState } from 'react'
import { SpinnerIcon } from '../ui.jsx'

// C9 form controls (CLONE_SPEC_PAGES.md). Input h46 / radius 10 / 1px #d3d8df, 16/24 text,
// placeholder 14px #6f7988; hover shadow; focus-visible blue border + 3px #94b9ff ring; invalid
// border #ff5b59 with a 12/18 #f65351 message 6px below (fade-in 300ms).

function FieldShell({ id, label, error, children }) {
  return (
    <div className="flex min-w-0 flex-col gap-y-1.5">
      <label htmlFor={id} className="truncate text-xs text-black-700">
        {label}
      </label>
      <div>{children}</div>
      {error && (
        <p id={`${id}-message`} data-motion="field-error" className="text-error text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextField({ label, error, textarea = false, className = '', ...rest }) {
  const id = useId()
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <FieldShell id={id} label={label} error={error}>
      <Tag
        id={id}
        type={textarea ? undefined : 'text'}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-message` : undefined}
        className={`field ${textarea ? 'h-[94px] resize-none' : 'h-[46px]'} ${className}`}
        {...rest}
      />
    </FieldShell>
  )
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0 text-black-700" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 5.5 3.5 3.5 3.5-3.5" />
    </svg>
  )
}

/**
 * Radix-style select: trigger (same box as inputs, padding 10 12 10 13), popup same width 4px
 * below (bg #fff, radius 10, no border, shadow 0 4px 8px rgba(56,64,72,.25), p 4), options h32
 * radius 6 padding 6 0 6 10 14/20 #6f7988, highlighted bg #edeff3. Keyboard: arrows/Enter/Esc.
 */
export function SelectField({ label, placeholder, options, value, onChange, error, compact = false, hideLabel = false, name }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(-1)
  const wrap = useRef(null)
  const trigger = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !wrap.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const pick = (opt) => {
    onChange?.(opt)
    setOpen(false)
    trigger.current?.focus()
  }
  const onKey = (e) => {
    if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      setOpen(true)
      setHi(Math.max(0, options.indexOf(value)))
      return
    }
    if (!open) return
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHi((h) => Math.min(options.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHi((h) => Math.max(0, h - 1))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (hi >= 0) pick(options[hi])
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  const box = compact ? 'h-[42px]' : 'h-[46px]'
  const valueText = compact ? 'text-sm text-black-300' : 'text-input text-black-300'
  const control = (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        name={name}
        aria-label={hideLabel ? label : undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-invalid={error ? 'true' : undefined}
        data-state={open ? 'open' : 'closed'}
        data-placeholder={value ? undefined : ''}
        onClick={() => {
          setOpen((o) => !o)
          setHi(Math.max(0, options.indexOf(value)))
        }}
        onKeyDown={onKey}
        className={`field-select ${box}`}
      >
        <span className={`truncate ${value ? valueText : 'text-sm leading-6 text-black-700'}`}>{value || placeholder}</span>
        <Chevron />
      </button>
      {open && (
        <div
          id={`${id}-list`}
          role="listbox"
          data-motion="select-popup"
          className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded-10 bg-white-100 p-1 shadow-select-popup"
        >
          {options.map((opt, i) => (
            <div
              key={opt}
              role="option"
              aria-selected={opt === value}
              data-highlighted={i === hi || undefined}
              onPointerEnter={() => setHi(i)}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => pick(opt)}
              className={`flex h-8 cursor-pointer items-center rounded-6 py-1.5 pl-2.5 text-sm text-black-700 ${i === hi ? 'bg-white-400' : ''}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
  if (hideLabel) return control
  return (
    <FieldShell id={id} label={label} error={error}>
      {control}
    </FieldShell>
  )
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * LeadForm. `rows`: array of rows; each row is an array of field defs
 * { name, label, kind: 'text'|'email'|'textarea'|'select', placeholder, options, error }.
 * Rows with 2 fields render as a 2-col grid (gap-x 20; gap-y 12 for inputs / 20 for selects),
 * 1 col below md. Submit full width h46 radius 12, 16/22.
 */
export function LeadForm({ id, rows, submitLabel, smallPrint }) {
  const fields = rows.flat()
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ''])))
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const validate = (vals) => {
    const next = {}
    fields.forEach((f) => {
      if (f.optional) return
      const v = vals[f.name]?.trim?.() ?? ''
      if (!v || (f.kind === 'email' && !EMAIL.test(v))) next[f.name] = f.error
    })
    return next
  }
  const set = (name, v) => {
    const vals = { ...values, [name]: v }
    setValues(vals)
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validate(vals)[name] }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setSent(Object.keys(errs).length === 0)
  }

  const render = (f) => {
    if (f.kind === 'select')
      return <SelectField key={f.name} name={f.name} label={f.label} placeholder={f.placeholder} options={f.options} value={values[f.name]} onChange={(v) => set(f.name, v)} error={errors[f.name]} />
    return (
      <TextField
        key={f.name}
        name={f.name}
        label={f.label}
        placeholder={f.placeholder}
        textarea={f.kind === 'textarea'}
        value={values[f.name]}
        onChange={(e) => set(f.name, e.target.value)}
        error={errors[f.name]}
      />
    )
  }

  return (
    <form id={id} noValidate onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-5">
        {rows.map((row, i) =>
          row.length === 1 ? (
            render(row[0])
          ) : (
            <div key={i} className={`grid grid-cols-1 gap-x-5 md:grid-cols-2 ${row.some((f) => f.kind === 'select') ? 'gap-y-5' : 'gap-y-3'}`}>
              {row.map(render)}
            </div>
          )
        )}
      </div>
      <button type="submit" className="btn btn-primary mt-7 h-[46px] w-full rounded-12 px-3.5 text-base">
        {submitLabel}
      </button>
      <p role="status" className="sr-only">
        {sent ? 'Thanks, your details were sent.' : ''}
      </p>
      {smallPrint && <div className="mt-6">{smallPrint}</div>}
    </form>
  )
}

/** Inline subscribe form: grid 270px 106px gap 8, input h40, button h40 radius 12 (C9). */
export function SubscribeForm({ placeholder, buttonLabel, className = '' }) {
  const [state, setState] = useState('idle')
  const [value, setValue] = useState('')
  const [invalid, setInvalid] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL.test(value.trim())) {
      setInvalid(true)
      return
    }
    setInvalid(false)
    setState('submitting')
    setTimeout(() => setState('done'), 900)
  }
  return (
    <form noValidate onSubmit={onSubmit} className={`grid grid-cols-1 gap-2 sm:grid-cols-[270px_106px] ${className}`}>
      <input
        type="email"
        aria-label="Email address"
        placeholder={placeholder}
        value={value}
        aria-invalid={invalid ? 'true' : 'false'}
        onChange={(e) => setValue(e.target.value)}
        className="field h-10 py-2"
      />
      <button type="submit" className="btn btn-primary relative h-10 rounded-12 text-base" disabled={state === 'submitting'}>
        <span className={state === 'submitting' ? 'opacity-0' : ''}>{buttonLabel}</span>
        {state === 'submitting' && (
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-150">
            <SpinnerIcon size={21.6} className="motion-safe:animate-[spin_1s_linear_infinite]" />
          </span>
        )}
      </button>
    </form>
  )
}
