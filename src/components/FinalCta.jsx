import { ArrowRightIcon, Button, Streaks } from './ui.jsx'

// Section 11. Placeholder copy matched to spec counts.
const TITLE = 'Your next quarter starts here.' // c30 w5, 2 lines at 1440 (max 672)
const OUTLINE = 'Get in touch.' // c13
const PRIMARY = 'Start it today' // c14

// M16 streaks: 6 divs, x positions from the 1440 dump (relative to the bordered box).
const CTA_STREAKS = [
  [1311, 1],
  [1167, 2],
  [87, 1],
  [1351, 2],
  [983, 2],
  [151, 2],
]

export default function FinalCta() {
  return (
    <section className="dark border-t border-solid border-black-400 bg-black-50" data-section="final-cta">
      <div className="lg-container">
        <div className="relative border-solid border-black-400 lg:border-x">
          {/* Live: stripes span the full 1392 box and are masked by --cta-pattern-mask */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden lg:-inset-x-px [mask-image:theme(backgroundImage.cta-pattern-mask)] [-webkit-mask-image:theme(backgroundImage.cta-pattern-mask)]">
            <div className="absolute inset-0 bg-dark-stripes" />
          </div>
          <Streaks xs={CTA_STREAKS} variant="cta" />
          <div className="relative flex flex-col items-center justify-center gap-9 px-4 py-20 md:px-8 lg:px-0 md:gap-7 lg:py-[120px]">
            <h2 className="max-w-[12em] text-balance text-center font-display text-final-cta-sm text-white-100 md:text-final-cta-md xl:text-final-cta">
              {TITLE}
            </h2>
            {/* >= md: two buttons. < md: stacked email form + inline link (hero mobile pattern). */}
            <div className="hidden flex-wrap items-center justify-center gap-x-2.5 gap-y-2 md:flex">
              <Button variant="outline">{OUTLINE}</Button>
              <Button variant="primary">{PRIMARY}</Button>
            </div>
            <div className="flex w-full flex-col items-center gap-y-2 md:hidden">
              <form className="grid w-[320px] max-w-full grid-cols-1 gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="you@company.com" aria-label="Work email" className="form-input" />
                <Button as="button" type="submit" variant="primary" className="h-10 w-full gap-1.5">
                  <span>{PRIMARY}</span>
                </Button>
              </form>
              <Button variant="ghost" className="gap-1.5 pl-3 pr-2 text-white-500 hover:bg-surface-subtle hover:text-secondary-foreground">
                <span>{OUTLINE}</span>
                <ArrowRightIcon size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
