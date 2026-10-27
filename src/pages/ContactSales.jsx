import PageShell from '../components/marketing/PageShell.jsx'
import { LeadForm } from '../components/forms/Fields.jsx'
import { HeroBadge } from '../components/marketing/primitives.jsx'

// T3 Split hero + form (/contact/sales). >= lg: left copy (col 2-5) + right #fafafb panel
// (col 7/-1, bands 160/120/100, form col 2/-2 of a 6-col grid). < lg: stacked, centered copy,
// full-width panel, testimonial last (the live site renders two trees: max-lg:hidden / lg:hidden).

const ROWS = [
  [
    { name: 'firstName', label: 'First name', placeholder: 'First', error: 'Please enter your first name' }, // ph c5, err c28
    { name: 'lastName', label: 'Last name', placeholder: 'Last', error: 'Please enter your last name' }, // ph c4, err c27
  ],
  [{ name: 'email', kind: 'email', label: 'Company email', placeholder: 'Your work email', error: 'Please enter a valid address' }], // ph c15
  [
    { name: 'region', kind: 'select', label: 'Region', placeholder: 'Select', options: ['Americas', 'Europe', 'Middle East and Africa', 'Asia Pacific'], error: 'Please choose your region' },
    { name: 'size', kind: 'select', label: 'Number of employees', placeholder: 'Select', options: ['1-10', '11-50', '51-200', '201-1,000', '1,000+'], error: 'Please choose your team size' },
  ],
  [{ name: 'details', kind: 'textarea', label: 'Details', placeholder: 'Tell us a little about what you need', error: 'Please share a few more details' }], // ph c38
]

const SMALL_PRINT = (
  <p className="max-w-[36em] text-balance text-xs text-black-700">
    This form is protected by a spam filter, and its{' '}
    <a href="#" className="underline">
      privacy policy
    </a>{' '}
    and{' '}
    <a href="#" className="underline">
      terms of service
    </a>{' '}
    apply to your data.
  </p>
)

const QUOTE =
  'We looked at every tool on the market. This was the only one our whole team picked up on day one, and it still fits the way we sell two years later.'

function Header({ mobile }) {
  return (
    <header className={`flex w-full flex-col ${mobile ? 'items-center pb-[60px] pt-20' : 'pb-5 pt-[100px]'}`}>
      <HeroBadge className="mb-6">Contact our team</HeroBadge>
      <h2 className={`max-w-[15em] text-balance text-page-hero-sm lg:text-page-hero ${mobile ? 'text-center' : ''}`}>Get a live demo</h2>
      <p className={`mt-4 max-w-xl text-balance text-lg text-black-300 lg:text-xl ${mobile ? 'text-center' : ''}`}>
        Tell us about your team and we will show you a setup that fits.
      </p>
    </header>
  )
}

function Testimonial({ mobile }) {
  return (
    <div className={`flex w-full flex-col ${mobile ? 'items-center pb-[100px] pt-20' : 'pb-40'}`}>
      <p className={`relative w-full max-w-[384px] text-pretty font-quote text-serif-sm text-black-100 ${mobile ? 'text-center' : ''}`}>
        {!mobile && (
          <span aria-hidden="true" className="absolute -translate-x-full">
            “
          </span>
        )}
        {mobile ? `“${QUOTE}”` : `${QUOTE}”`}
      </p>
      <p className={`mt-4 w-full max-w-[384px] text-sm text-black-300 ${mobile ? 'text-center' : ''}`}>
        <span className="font-bold">Priya Castell</span>
        <br />
        VP of Sales, Lumiqa Robotics
      </p>
    </div>
  )
}

function Panel({ mobile }) {
  const band = 'col-[1/-1] h-[100px] lg:h-[120px] xl:h-40'
  return (
    <div className={`grid overflow-hidden bg-white-200 ${mobile ? 'col-[1/-1] my-px grid-cols-12' : 'col-[7/-1] grid-cols-6 border-l border-solid border-white-500'}`}>
      <div className={band} />
      <div className="col-[2/-2] py-1">
        <LeadForm id={mobile ? 'talk-to-sales-form-mobile' : 'talk-to-sales-form'} rows={ROWS} submitLabel="Submit" smallPrint={SMALL_PRINT} />
      </div>
      <div className={band} />
    </div>
  )
}

export default function ContactSales() {
  return (
    <PageShell title="Contact sales">
      <div className="container flex flex-1 flex-col max-lg:hidden">
        <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500">
          <div className="grid h-full grid-cols-12">
            <div className="col-[2/6] flex flex-col justify-between">
              <Header />
              <Testimonial />
            </div>
            <Panel />
          </div>
        </div>
      </div>
      <div className="container flex flex-1 flex-col lg:hidden">
        <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500">
          <div className="grid h-full grid-cols-12">
            <div className="col-[2/-2]">
              <Header mobile />
            </div>
            <Panel mobile />
            <div className="col-[2/-2]">
              <Testimonial mobile />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
