import { assets } from '../assets.js'
import { CUSTOMER_LOGOS, CUSTOMER_NAMES } from './logos.jsx'

// Section 3. 10 cells in grid order; 4 are links (row 1 cols 1 & 4, row 2 cols 1 & 3).
const CELLS = [
  { key: 'customerLogo01', link: true },
  { key: 'customerLogo02' },
  { key: 'customerLogo03' },
  { key: 'customerLogo04', link: true },
  { key: 'customerLogo05' },
  { key: 'customerLogo06', link: true },
  { key: 'customerLogo07' },
  { key: 'customerLogo08', link: true },
  { key: 'customerLogo09' },
  { key: 'customerLogo10' },
]

function CornerArrow() {
  // 20px arrow rotated -45deg, top 12 right 12, #a4adba -> #505967 on hover
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="absolute right-3 top-3 -rotate-45 text-black-900 transition-colors duration-200 ease-out group-hover:text-black-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 10h10M11 6l4 4-4 4" />
    </svg>
  )
}

export default function CustomerLogos() {
  return (
    <section className="border-b border-solid border-white-500 bg-white-200" data-section="customer-logos">
      <div className="lg-container flex flex-col">
        <div className="grid grid-cols-2 gap-px bg-white-500 md:grid-cols-5 lg:border-x lg:border-solid lg:border-white-500">
          {CELLS.map(({ key, link }, i) => {
            const asset = assets[key]
            const Tag = link ? 'a' : 'div'
            // At < md only 6 cells fit (section measured 291 tall = 3 rows). Which cells hide was not measured.
            const hideSmall = i >= 6 ? 'max-md:hidden' : ''
            return (
              <Tag
                key={key}
                {...(link ? { href: '#' } : {})}
                className={`group relative flex h-24 items-center justify-center bg-white-200 px-6 transition-colors duration-200 ease-out ${
                  link ? 'hover:bg-white-300' : ''
                } ${hideSmall}`}
              >
                {/* data-motion="logo-in": keyframe opacity 0 + blur 3px -> 1 + blur 0 (duration not captured) */}
                <span
                  data-motion="logo-in"
                  role="img"
                  aria-label={asset.src ? asset.alt : CUSTOMER_NAMES[i]}
                  className={`block max-w-full ${asset.src ? 'logo-mask' : 'text-black-300'}`}
                  style={{
                    width: asset.width,
                    height: asset.height,
                    ...(asset.src ? { '--logo-mask': `url(${asset.src})` } : {}),
                  }}
                >
                  {/* Original invented wordmark (inline SVG in #232529, same box as the mask slot) */}
                  {!asset.src && (() => {
                    const Logo = CUSTOMER_LOGOS[i]
                    return <Logo w={asset.width} h={asset.height} />
                  })()}
                </span>
                {link && <CornerArrow />}
              </Tag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
