import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets.js'
import { reducedMotion } from '../motion/index.js'
import { ArrowRightIcon, BrandMark, Button, ChevronDownIcon, CloseIcon, MenuIcon, MenuCloseIcon } from './ui.jsx'

// Placeholder copy sized to the spec's character counts (section 1).
const BANNER_TEXT = 'Explore the latest release notes from our spring' // c48 w8

// 1c dropdown content. Menu 1 counts are measured; menu 2 contents were not measured, so it
// reuses the same panel structure with its own placeholder rows.
const MENUS = {
  products: {
    label: 'Products', // c8
    columns: [
      {
        label: 'Core UI', // c7
        items: [
          ['Custom data model', 'Store details safely'], // c17 / c20
          ['List views', 'Organize work into pipelines'], // c10 / c28
          ['Dashboards', 'Track your numbers daily'], // c10 / c24
          ['Mail and calendar', 'Sync inboxes and all events'], // c17 / c27
          ['Permissions and roles', 'Control who sees what'], // c21 / c21
        ],
      },
      {
        label: 'Data handling', // c13
        items: [
          ['Importing', 'Bring in your spreadsheets'], // c9 / c26
          ['Exporting', 'Send data out to other systems'], // c9 / c30
          ['Data cleaning', 'Fill gaps in each profile'], // c13 / c25
          ['Templates', 'Start from a proven structure'], // c9 / c29
          ['Analytics', 'Measure the trends that count.'], // c9 / c30
        ],
      },
      {
        label: 'Automated', // c9
        items: [
          ['Workflows', 'Run steps without lifting a finger'],
          ['Sequences', 'Follow up on a steady rhythm'],
          ['Assistants and helpers', 'Draft notes and summaries fast'],
        ],
      },
    ],
    aside: [
      { label: 'Get started', links: ['Guides', 'Release notes', 'Developer portal'] },
      { label: 'Popular', links: ['Pricing plans', 'Security', 'System status'] },
    ],
  },
  solutions: {
    label: 'Solutions', // c9
    columns: [
      {
        label: 'By team',
        items: [
          ['Sales teams', 'Close more of the pipeline'],
          ['Customer success', 'Keep every account healthy'],
          ['Operations', 'Connect tools and processes'],
          ['Founders', 'Run the company from one hub'],
          ['Partnerships', 'Track every shared opportunity'],
        ],
      },
      {
        label: 'By company size',
        items: [
          ['Startups', 'Move quickly from day one'],
          ['Growing teams', 'Scale process with headcount'],
          ['Enterprise', 'Controls for complex setups'],
          ['Agencies', 'Manage many client books'],
          ['Nonprofits', 'Keep supporters engaged'],
        ],
      },
      {
        label: 'Learn',
        items: [
          ['Academy', 'Short lessons for new users'],
          ['Community', 'Swap ideas with other teams'],
          ['Events', 'Join an upcoming session'],
        ],
      },
    ],
    aside: [
      { label: 'Featured', links: ['Case studies', 'Webinars', 'Templates'] },
      { label: 'Support', links: ['Help center', 'Contact us', 'Status'] },
    ],
  },
}

const PLAIN_LINKS = ['Highlights', 'Showcases', 'Support'] // c10, c9, c7

// Built routes reachable from the nav (react-router <Link>); everything else stays a plain anchor.
const ROUTE_FOR = {
  Showcases: '/customers',
  Support: '/contact/sales',
  'Pricing plans': '/pricing',
  Startups: '/startups',
  'Case studies': '/customers',
  'Contact us': '/contact/sales',
  Highlights: '/blog',
  'Release notes': '/changelog',
  Guides: '/help',
  'Help center': '/help',
  Academy: '/help/academy',
  'Developer portal': '/apps',
  Templates: '/apps',
}
/** <Link> for built routes, plain <a href="#"> otherwise (same markup/classes either way). */
function NavAnchor({ label, children, ...rest }) {
  const to = ROUTE_FOR[label]
  return to ? (
    <Link to={to} {...rest}>
      {children}
    </Link>
  ) : (
    <a href="#" {...rest}>
      {children}
    </a>
  )
}

/** `forceDark`: dark header state from load (engineering blog, every section is dark). */
export default function SiteHeader({ forceDark = false }) {
  const headerRef = useRef(null)
  const [bannerVisible, setBannerVisible] = useState(true)
  const [openMenu, setOpenMenu] = useState(null)
  const [observedDark, setDark] = useState(false)
  const dark = observedDark || forceDark
  const [drawerOpen, setDrawerOpen] = useState(false)
  // M5: when the pointer moves from one open menu to another, the live popup stays open (no
  // fade) and the new content enters from the right/left (navigation-enter-from-*, 200ms).
  const [activation, setActivation] = useState(null)
  const menuIds = Object.keys(MENUS)
  const switchMenu = (id) => {
    if (openMenu && id && openMenu !== id) {
      setActivation({ id, prev: openMenu, dir: menuIds.indexOf(id) > menuIds.indexOf(openMenu) ? 'right' : 'left' })
    } else if (id !== openMenu) {
      setActivation(null)
    }
    setOpenMenu(id)
  }
  // Live (Base UI navigation menu): the outgoing content plays navigation-exit-to-{left|right}
  // (200ms in-out-cubic) inside the still-visible popup while the new content enters.
  const [exiting, setExiting] = useState(null)
  useEffect(() => {
    if (!activation?.prev || reducedMotion()) return setExiting(null)
    setExiting({ id: activation.prev, dir: activation.dir === 'right' ? 'left' : 'right' })
    const t = setTimeout(() => setExiting(null), 200)
    return () => clearTimeout(t)
  }, [activation])

  // Mobile drawer: body scroll lock while open (measured: body overflow hidden); close at >= lg.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    if (!drawerOpen) return
    const mq = window.matchMedia('(min-width: 992px)')
    const onChange = () => mq.matches && setDrawerOpen(false)
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false)
    mq.addEventListener('change', onChange)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      mq.removeEventListener('change', onChange)
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  // 1a: dismissing collapses the banner; header height var drops to the nav row only.
  useEffect(() => {
    const root = document.documentElement
    if (bannerVisible) delete root.dataset.bannerHidden
    else root.dataset.bannerHidden = ''
  }, [bannerVisible])

  // 1: switch to the dark theme while the header's bottom line overlaps a `.dark` section.
  // Sections are added by the next build pass (universal-context, sdk, final-cta, footer).
  useEffect(() => {
    let observer
    const active = new Set()
    const setup = () => {
      observer?.disconnect()
      active.clear()
      const h = headerRef.current?.getBoundingClientRect().height ?? 116
      const targets = document.querySelectorAll('section.dark, footer.dark')
      if (!targets.length) {
        setDark(false)
        return
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? active.add(e.target) : active.delete(e.target)))
          setDark(active.size > 0)
        },
        // A 1px band at the header's bottom edge.
        { rootMargin: `-${Math.max(h - 1, 0)}px 0px -${Math.max(window.innerHeight - h, 0)}px 0px` }
      )
      targets.forEach((t) => observer.observe(t))
    }
    setup()
    window.addEventListener('resize', setup)
    return () => {
      window.removeEventListener('resize', setup)
      observer?.disconnect()
    }
  }, [bannerVisible])

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActivation(null)
        setOpenMenu(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openMenu])

  return (
    <div className="sticky top-0 z-header" data-site-header>
      <header
        ref={headerRef}
        data-motion="header-theme"
        data-theme={dark ? 'dark' : 'light'}
        // relative z-header: the nav row (incl. the drawer toggle) stays above the drawer overlay (z-90), as live
        className={`relative z-header border-b border-solid transition-colors duration-[250ms] ease-header ${
          dark ? 'dark border-black-400 bg-black-50' : 'border-white-500 bg-header-glass'
        }`}
      >
        {bannerVisible && (
          <div className="h-12 bg-black-0 shadow-attio-3" data-banner>
            <div className="container relative h-full">
              <div className="flex h-full justify-center pr-12 md:px-12">
                <a href="#" className="group flex min-w-0 items-center gap-1.5 text-white-100">
                  <span className="underline-anim truncate text-banner">{BANNER_TEXT}</span>
                  {/* Live: translate 1px on hover (150ms in, 400ms out), ease-in-out */}
                  <ArrowRightIcon
                    size={14}
                    className="shrink-0 transition-transform duration-[400ms] ease-in-out group-hover:translate-x-px group-hover:duration-150 group-active:translate-x-px group-active:duration-[50ms] motion-reduce:transition-none"
                  />
                </a>
              </div>
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={() => setBannerVisible(false)}
                className="absolute right-6 top-2 flex h-8 w-8 items-center justify-center rounded-10 border border-solid border-transparent text-white-400 transition-colors duration-300 ease-in-out hover:border-white-900 hover:duration-[50ms]"
              >
                <CloseIcon size={18} />
              </button>
            </div>
          </div>
        )}

        <nav className="container pb-[7px] pt-2 lg:pb-[15px] lg:pt-4" aria-label="Main">
          <div className="flex h-9 items-center justify-between">
            <div className="flex items-center gap-9">
              <Link
                to="/"
                className="-mx-1 block px-1 py-2 text-black-100 transition-colors duration-[250ms] ease-header dark:text-white-100"
              >
                <BrandMark asset={assets.brandMark} />
              </Link>

              <div className="relative hidden lg:block" onMouseLeave={() => switchMenu(null)}>
                <ul className="flex items-center gap-1.5">
                  {Object.entries(MENUS).map(([id, menu]) => (
                    <li key={id}>
                      <Button
                        as="button"
                        type="button"
                        variant="ghost"
                        aria-expanded={openMenu === id}
                        data-state={openMenu === id ? 'open' : 'closed'}
                        onMouseEnter={() => switchMenu(id)}
                        onClick={() => switchMenu(openMenu === id ? null : id)}
                        className="gap-1.5 pl-3 pr-2 text-nav dark:text-white-500 dark:hover:bg-black-400 dark:hover:text-white-100"
                      >
                        <span>{menu.label}</span>
                        <ChevronDownIcon size={18} />
                      </Button>
                    </li>
                  ))}
                  {PLAIN_LINKS.map((label) => (
                    <li key={label} onMouseEnter={() => switchMenu(null)}>
                      <Button
                        variant="ghost"
                        {...(ROUTE_FOR[label] ? { as: Link, to: ROUTE_FOR[label] } : {})}
                        className="text-nav dark:text-white-500 dark:hover:bg-black-400 dark:hover:text-white-100"
                      >
                        {label}
                      </Button>
                    </li>
                  ))}
                </ul>

                {Object.entries(MENUS).map(([id, menu]) => (
                  <DropdownPanel
                    key={id}
                    menu={menu}
                    open={openMenu === id}
                    instant={!!activation && (activation.id === id || activation.prev === id)}
                    direction={activation?.id === id ? activation.dir : undefined}
                    exitTo={openMenu && exiting?.id === id && openMenu !== id ? exiting.dir : undefined}
                  />
                ))}
              </div>
            </div>

            <div className="hidden gap-2.5 lg:flex">
              <Button variant="outline">Sign in</Button>
              <Button variant="primary">Start it today</Button>
            </div>

            {/* Below lg: 36x36 hamburger (icon black-500 / dark white-500) toggling the drawer. */}
            <Button
              as="button"
              type="button"
              variant="ghost"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              data-state={drawerOpen ? 'open' : 'closed'}
              onClick={() => setDrawerOpen((o) => !o)}
              className="h-9 w-9 px-0 text-black-500 lg:hidden dark:text-white-500"
            >
              {drawerOpen ? <MenuCloseIcon size={24} /> : <MenuIcon size={24} />}
            </Button>
          </div>
        </nav>
      </header>
      <MobileDrawer open={drawerOpen} />
    </div>
  )
}

/**
 * Mobile nav drawer (< lg), measured on the live site at 390:
 * overlay fixed inset-0 z-90 white; panel fixed from top: --site-header-height, z-91, white,
 * border-b, `transform 500ms cubic-bezier(.32,.72,0,1)`. Rows: border-b, pt-10 pb-9, 44px hit
 * target (px-8 py-8, radius 12, 16/22). Accordion triggers are primary-foreground with a 20px
 * black-500 chevron (rotate 180 when open); links are secondary-foreground. Expanded group:
 * label 12/18 accent-foreground (mt-14 mb-8 px-8), items 58 tall (pad 8/7, 14/20 title + desc).
 * Static open/closed states only; the slide timing is the Animation pass's hook
 * (data-motion="mobile-drawer", data-state).
 */
function MobileDrawer({ open }) {
  const [expanded, setExpanded] = useState(null)
  // Live (Radix dialog): open = slideFromTop + overlay fadeIn, close = slideToTop + fadeOut, both
  // 500ms cubic-bezier(.32,.72,0,1). Keep the drawer mounted for the 500ms exit.
  const [phase, setPhase] = useState(open ? 'open' : 'closed')
  useEffect(() => {
    if (open) {
      setPhase('open')
      return
    }
    setExpanded(null)
    setPhase((p) => (p === 'closed' ? p : 'closing'))
    const t = setTimeout(() => setPhase('closed'), reducedMotion() ? 0 : 500)
    return () => clearTimeout(t)
  }, [open])
  const shown = phase !== 'closed'
  return (
    <div className="lg:hidden" data-motion="mobile-drawer" data-state={phase} aria-hidden={!open}>
      <div data-motion="mobile-drawer-overlay" className={`fixed inset-0 z-drawer-overlay bg-white-100 ${shown ? '' : 'hidden'}`} />
      <div
        data-motion="mobile-drawer-content"
        className={`fixed inset-x-0 bottom-0 top-[var(--site-header-height)] z-drawer flex flex-col overflow-hidden border-b border-solid border-white-500 bg-white-100 ${
          shown ? '' : 'invisible -translate-y-full'
        } ${open ? '' : 'pointer-events-none'}`}
      >
        <nav aria-label="Mobile" className="absolute inset-0 overflow-y-auto pb-20">
          <h2 className="sr-only">Menu</h2>
          <div className="container">
            {Object.entries(MENUS).map(([id, menu]) => {
              const isOpen = expanded === id
              return (
                <div key={id} className="border-b border-solid border-white-500 pb-[9px] pt-2.5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    data-open={isOpen || undefined}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setExpanded(isOpen ? null : id)}
                    className="group flex min-h-11 w-full items-center justify-between rounded-12 p-2 outline-none"
                  >
                    <span className="text-base text-black-100">{menu.label}</span>
                    <ChevronDownIcon
                      size={20}
                      className={`text-black-500 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div data-motion="mobile-drawer-panel" data-open={isOpen || undefined} aria-hidden={!isOpen} inert={isOpen ? undefined : ''}>
                    <div>
                      {menu.columns.map((col) => (
                        <div key={col.label}>
                          <p className="mb-2 mt-3.5 px-2 text-xs text-black-700">{col.label}</p>
                          <ul className="flex flex-col gap-0.5">
                            {col.items.map(([title, desc]) => (
                              <li key={title}>
                                <NavAnchor
                                  label={title}
                                  className="flex h-[58px] flex-col justify-center rounded-12 border border-solid border-transparent px-[7px] py-2 transition-colors duration-[50ms] ease-in-out hover:bg-white-300"
                                >
                                  <span className="truncate text-sm text-black-100">{title}</span>
                                  <span className="truncate text-sm text-black-700">{desc}</span>
                                </NavAnchor>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
            {PLAIN_LINKS.map((label) => (
              <div key={label} className="border-b border-solid border-white-500 pb-[9px] pt-2.5">
                <NavAnchor label={label} tabIndex={open ? 0 : -1} className="flex min-h-11 w-full items-center rounded-12 p-2 text-base text-black-300 outline-none">
                  {label}
                </NavAnchor>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

function DropdownPanel({ menu, open, instant, direction, exitTo }) {
  const shown = open || !!exitTo
  // Static start state (closed) = translateY(-4px) + opacity 0, per 1c. Transitions are left to the
  // Animation pass (hook: data-motion="nav-dropdown", data-state).
  return (
    <div
      data-motion="nav-dropdown"
      data-state={open ? 'open' : 'closed'}
      data-instant={instant || undefined}
      data-activation-direction={open ? direction : undefined}
      data-exit-to={exitTo}
      aria-hidden={!open}
      className={`absolute left-0 top-[calc(100%+6px)] flex gap-2 rounded-16 before:absolute before:inset-x-0 before:-top-1.5 before:h-1.5 before:content-[''] bg-header-glass text-black-100 shadow-dropdown backdrop-blur-[24px] ${
        shown ? `visible translate-y-0 opacity-100 ${open ? '' : 'pointer-events-none'}` : 'pointer-events-none invisible -translate-y-1 opacity-0'
      }`}
    >
      <div className="flex" data-motion="nav-dropdown-content">
        {menu.columns.map((col) => (
          <div key={col.label} className="w-[264px] px-3 pb-3 pt-[18px]">
            <p className="h-[18px] px-2 text-dropdown-label text-black-700">{col.label}</p>
            <ul className="mt-1.5 flex flex-col gap-0.5">
              {col.items.map(([title, desc]) => (
                <li key={title}>
                  <NavAnchor
                    label={title}
                    tabIndex={open ? 0 : -1}
                    className="block h-[58px] w-[240px] rounded-12 border border-solid border-transparent p-2 transition-colors duration-[50ms] ease-in-out hover:bg-white-300"
                  >
                    <span className="block truncate text-dropdown text-black-100">{title}</span>
                    <span className="block truncate text-dropdown text-black-700">{desc}</span>
                  </NavAnchor>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-[264px] py-2 pr-2">
        <div className="flex h-[336px] w-[256px] flex-col gap-4 rounded-12 bg-white-200 px-2.5 py-2">
          {menu.aside.map((group) => (
            <div key={group.label}>
              <p className="h-[18px] px-2 text-dropdown-label text-black-700">{group.label}</p>
              <ul className="mt-1.5 flex flex-col">
                {group.links.map((l) => (
                  <li key={l}>
                    <NavAnchor
                      label={l}
                      tabIndex={open ? 0 : -1}
                      className="flex h-8 w-[236px] items-center rounded-10 pl-2.5 pr-1.5 text-dropdown text-black-400 transition-colors duration-[50ms] ease-in-out hover:bg-white-300"
                    >
                      {l}
                    </NavAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
