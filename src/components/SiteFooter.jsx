import { Link } from 'react-router-dom'
import { assets } from '../assets.js'
import SectionDivider from './SectionDivider.jsx'
import { ArrowUpRightIcon, BrandMark } from './ui.jsx'

// Section 12. Neutral placeholder labels matched to the measured char counts.
// Link: [label, flag] where flag = 'new' (blue pill) | 'ext' (arrow-up-right) | undefined.
const GROUPS = [
  { title: 'Products', links: [['Invite peers', 'new'], ['Overviews'], ['Browser plug-in', 'ext'], ['Mac app', 'ext'], ['Windows app', 'ext']] }, // c8
  { title: 'Company', links: [['Our story'], ['Press release'], ['Research journal', 'new'], ['Careers'], ['Our ethos'], ['Media'], ['Partner programs']] }, // c7
  { title: 'Migrate off', links: [['Legacy CRM'], ['Notepad'], ['Databases'], ['Docs'], ['Email'], ['CSV']] }, // c11
  { title: 'Built for', links: [['Founders'], ['Investors']] }, // c9
  { title: 'Sync', links: [['Inbox'], ['Meeting'], ['Storage'], ['Analytics'], ['Forms'], ['Payments'], ['Phones'], ['Webhooks'], ['Tables']] }, // c4
  { title: 'Help desk', links: [['Founders scheme'], ['Guide index'], ['API portal', 'ext'], ['Service state', 'ext'], ['Book an expert'], ['Downloads'], ['Trust portal', 'ext']] }, // c9
]
// Built routes reachable from the footer (react-router <Link>); others stay plain anchors.
const ROUTE_FOR = {
  Careers: '/careers',
  'Our story': '/architecture',
  'Press release': '/blog',
  'Research journal': '/engineering/blog',
  'Guide index': '/help',
  Webhooks: '/apps',
  'Partner programs': '/partners/app-partners',
  'Founders scheme': '/startups',
  'Book an expert': '/partners/expert-partners',
}
const COPYRIGHT = '© 2026 Sample Co. All rights reserved.' // c38
const LEGAL = ['Privacy guidelines', 'Terms of usage', 'GDPR'] // c18 / c14 / c4

const si = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }
const SOCIAL = [
  ['Newsletter', () => (<svg {...si}><rect x="2" y="3.5" width="12" height="9" rx="2" /><path d="M2.5 4.5 8 9l5.5-4.5" /></svg>)],
  ['Video channel', () => (<svg {...si}><rect x="1.5" y="3.5" width="13" height="9" rx="2.5" /><path d="M7 6.2v3.6L10 8z" /></svg>)],
  ['Community chat', () => (<svg {...si}><path d="M3 3.5h10a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H7l-3 2.5V11H3A1.5 1.5 0 0 1 1.5 9.5V5A1.5 1.5 0 0 1 3 3.5" /></svg>)],
  ['Feed', () => (<svg {...si}><path d="M3 3a10 10 0 0 1 10 10M3 7a6 6 0 0 1 6 6" /><circle cx="3.5" cy="12.5" r="0.75" /></svg>)],
]

function FooterAnchor({ label, children, ...rest }) {
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

// Class sets: dark (default, every marketing page) and the light docs variant (§1 shell matrix:
// bg #fff, headings #a4adba, links #505967 -> hover #232529, legal #a4adba, bottom bar #fafafb).
// Light values are the site's semantic tokens outside `.dark` (caption / tertiary / secondary).
const TONE = {
  dark: {
    footer: 'dark flex min-h-[40svh] flex-col justify-between bg-black-50',
    brand: 'text-white-100',
    heading: 'py-1 text-sm text-black-600',
    link: 'group -mx-1 flex w-fit items-center rounded-8 p-1 text-footer-link text-white-900 transition-colors duration-150 ease-out hover:text-white-400 focus-visible:text-white-400 active:text-white-100 active:duration-[50ms]',
    ext: 'ml-0.5 text-black-600 transition-colors duration-200 ease-in-out-cubic group-hover:text-white-400 group-hover:delay-[50ms] group-focus:text-white-400 group-active:text-white-100 group-active:duration-[50ms]',
    social: 'flex size-7 shrink-0 items-center justify-center rounded-8 text-black-600 transition-colors duration-[400ms] ease-in-out hover:text-white-900 hover:duration-150',
    copy: 'text-legal text-black-600',
    legal: '-mx-1 rounded-8 p-1 text-legal text-black-600 transition-colors duration-[400ms] ease-in-out hover:text-white-900 hover:duration-150 active:text-white-400 active:duration-[50ms]',
  },
  light: {
    footer: 'flex min-h-[40svh] flex-col justify-between bg-white-100',
    brand: 'text-black-100',
    heading: 'py-1 text-sm text-black-900',
    link: 'group -mx-1 flex w-fit items-center rounded-8 p-1 text-footer-link text-black-600 transition-colors duration-150 ease-out hover:text-black-300 focus-visible:text-black-300 active:text-black-100 active:duration-[50ms]',
    ext: 'ml-0.5 text-black-900 transition-colors duration-200 ease-in-out-cubic group-hover:text-black-300 group-hover:delay-[50ms] group-focus:text-black-300 group-active:text-black-100 group-active:duration-[50ms]',
    social: 'flex size-7 shrink-0 items-center justify-center rounded-8 text-black-900 transition-colors duration-[400ms] ease-in-out hover:text-black-600 hover:duration-150',
    copy: 'text-legal text-black-900',
    legal: '-mx-1 rounded-8 p-1 text-legal text-black-900 transition-colors duration-[400ms] ease-in-out hover:text-black-600 hover:duration-150 active:text-black-300 active:duration-[50ms]',
  },
}

export default function SiteFooter({ variant = 'dark' }) {
  const c = TONE[variant]
  const light = variant === 'light'
  const bottomBar = (
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6 px-px py-10">
          <div className="-ml-1 flex items-center gap-1">
            {SOCIAL.map(([label, Icon]) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className={c.social}
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <p className={c.copy}>{COPYRIGHT}</p>
            <div className="flex items-center gap-x-6">
              {LEGAL.map((l) => (
                <a
                  key={l}
                  href="#"
                  className={c.legal}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
  return (
    <footer className={c.footer} data-section="site-footer">
      <SectionDivider dark={!light} />
      <div className="container">
        <div className="grid grid-cols-12 gap-y-12 px-px pb-12 pt-20">
          {/* Live logo cell is 31.5 tall (inline-block link, -m-1.5 p-1.5): it sets the row height < lg */}
          <div className="col-[1/5] h-[31.5px] xs:col-[1/4] md:col-[1/3] lg:col-[1/2]">
            <BrandMark asset={assets.brandMarkFooter} className={c.brand} />
          </div>
          <div className="col-[1/-1] columns-1 gap-0 xs:columns-2 lg:col-[4/-1] lg:columns-3 xl:col-[5/-1] xl:columns-4">
            {GROUPS.map((g) => (
              <div key={g.title} className="break-inside-avoid pb-7">
                <h2 className={c.heading}>{g.title}</h2>
                <ul className="m-0 flex list-none flex-col p-0">
                  {g.links.map(([label, flag]) => (
                    <li key={label}>
                      <FooterAnchor
                        label={label}
                        className={c.link}
                      >
                        <span className="underline-anim">{label}</span>
                        {flag === 'new' && (
                          <span className="ml-1.5 rounded-10 bg-blue-450 px-1.5 py-1 text-badge-new text-white-100">New</span>
                        )}
                        {flag === 'ext' && (
                          <ArrowUpRightIcon size={20} className={c.ext} />
                        )}
                      </FooterAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar (108 tall); light variant sits on a full-width #fafafb band */}
      {light ? <div className="w-full bg-white-200">{bottomBar}</div> : bottomBar}
    </footer>
  )
}
