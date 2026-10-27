import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageShell from '../marketing/PageShell.jsx'
import { Icon } from '../mock.jsx'
import { MenuIcon, MenuCloseIcon } from '../ui.jsx'
import { SearchDialog, SearchTrigger, useSearchHotkey } from '../marketing/SearchDialog.jsx'
import { HELP_NAV, HELP_SEARCH } from '../../data/help.js'

// T9 docs shell: SiteHeader + 24-col container (58px cols at 1440) with a sticky sidebar
// (col 1-5) and the main column (cols 8-22, x430 w870); light footer. Below 992 the sidebar
// hides and a 63px docs bar (menu trigger + breadcrumb, 14/20 #2e3238) sits under the header.

function Caret({ open, onClick, label }) {
  return (
    <button type="button" aria-label={label} aria-expanded={open} onClick={onClick} className="group/caret absolute left-0 top-0 z-[1] flex size-8 items-center justify-center">
      <span className="flex size-6 items-center justify-center rounded-8 transition-colors duration-150 group-hover/caret:bg-white-500">
        <Icon name="chevronRight" size={14} className={`text-sidebar-text transition-transform duration-300 ease-in-out-cubic ${open ? 'rotate-90' : ''}`} />
      </span>
    </button>
  )
}

function NavItem({ item, active, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="relative">
      <Caret open={open} onClick={() => setOpen((o) => !o)} label={`Toggle ${item.label}`} />
      <Link
        to={item.to ?? '/help'}
        aria-current={active ? 'page' : undefined}
        className={`block w-full truncate rounded-10 p-1.5 pl-8 pr-2.5 text-left text-sm transition-colors duration-150 hover:bg-hover-row ${active ? 'text-black-300' : 'text-sidebar-text'}`}
      >
        {item.label}
      </Link>
      <div data-motion="docs-panel" data-open={open || undefined} aria-hidden={!open} inert={open ? undefined : ''}>
        <div>
          <div className="relative ml-[18.5px] py-0.5 before:absolute before:inset-y-0 before:-left-[3px] before:w-px before:bg-white-400 before:content-['']">
            {item.children.map((c) => (
              <Link key={c} to={item.to ?? '/help'} className="block rounded-10 py-1.5 pl-[5px] pr-2 text-sm text-black-800 transition-colors duration-150 hover:bg-white-300/80">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarNav() {
  const { pathname } = useLocation()
  return (
    <nav aria-label="Help" className="flex flex-col gap-6">
      {HELP_NAV.map((g) => (
        <div key={g.label}>
          <Link to={g.to} className="flex items-center gap-[9px] rounded-10 py-[9px] pl-[9px] transition-colors duration-150 hover:bg-white-300/80">
            <Icon name={g.icon} size={14} className="text-black-100" />
            <span className="text-overline uppercase text-black-100">{g.label}</span>
          </Link>
          <div className="flex flex-col">
            {g.items.map((it) => (
              <NavItem key={it.label} item={it} active={!!it.to && it.to === pathname} defaultOpen={false} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

export function useHelpSearch() {
  const [open, setOpen] = useState(false)
  const openSearch = useCallback(() => setOpen(true), [])
  useSearchHotkey(openSearch)
  const dialog = <SearchDialog open={open} onClose={() => setOpen(false)} placeholder="Search help…" items={HELP_SEARCH} emptyLabel="No articles found." />
  return { openSearch, dialog }
}

/** Breadcrumb (14/20: link #a4adba, "/" 11px #d3d8df, current #1c1d1f). */
export function Crumbs({ items }) {
  return (
    <ul className="relative flex">
      {items.map(([label, to], i) => (
        <li key={label} className="flex items-center">
          {i > 0 && <span className="mx-0.5 text-[11px] font-medium leading-5 text-white-700">/</span>}
          {to ? (
            <Link to={to} className={`rounded-2 text-sm text-black-900 transition-colors duration-150 hover:text-black-600 ${i ? 'px-1.5' : 'pr-1.5'}`}>
              {label}
            </Link>
          ) : (
            <p className="truncate pl-1.5 text-sm text-black-100">{label}</p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function DocsShell({ title, crumb, children }) {
  const { openSearch, dialog } = useHelpSearch()
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenu(false), [pathname])
  return (
    <PageShell title={title} footerVariant="light">
      {/* < lg docs bar (63px under the header) */}
      <div className="sticky top-[var(--site-header-height)] z-40 border-b border-solid border-white-500 bg-white-100 lg:hidden">
        <div className="container flex h-[62px] items-center gap-2 text-sm text-black-400">
          <button type="button" aria-expanded={menu} aria-label={menu ? 'Close help menu' : 'Open help menu'} onClick={() => setMenu((m) => !m)} className="-ml-2 flex size-9 items-center justify-center rounded-10 hover:bg-white-300">
            {menu ? <MenuCloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
          <span className="truncate">{crumb}</span>
        </div>
        {menu && (
          <div className="container max-h-[calc(100vh-var(--site-header-height)-63px)] overflow-y-auto border-t border-solid border-white-500 pb-8 pt-4">
            <SidebarNav />
          </div>
        )}
      </div>
      <div className="container">
        <div className="grid grid-cols-12 lg:grid-cols-24">
          <aside className="col-[1/6] hidden lg:block">
            <div className="sticky top-[var(--site-header-height)] flex h-[calc(100vh-var(--site-header-height))] flex-col pt-10">
              <div className="pr-6">
                <SearchTrigger size="sm" placeholder="Search..." onOpen={openSearch} />
              </div>
              <div className="docs-scroll min-h-0 flex-1 overflow-y-scroll pb-8 pr-6 pt-[39px]">
                <SidebarNav />
              </div>
            </div>
          </aside>
          <div className="col-span-full pb-20 pt-10 lg:col-[8/23]">{typeof children === 'function' ? children({ openSearch }) : children}</div>
        </div>
      </div>
      {dialog}
    </PageShell>
  )
}
