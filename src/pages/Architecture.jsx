import PageShell from '../components/marketing/PageShell.jsx'
import { ArchHero, Box, Bullet, Chapter, Closing, CodeBand, DarkScene, LitWords, body, grid2, monoLabel } from '../components/architecture/Sections.jsx'
import FiveReasons from '../components/architecture/FiveReasons.jsx'
import { FlowFigure, LaunchDiagram, RingRow } from '../components/architecture/Diagrams.jsx'
import { ARCH, CLOSING, LAUNCH, PROBLEM, STORY, STORY_TAIL } from '../data/architecture.js'

const serifH3 = 'font-serif text-serif-h3-sm lg:text-serif-h3 text-black-100'
const serifPull = 'font-serif text-serif-pull-sm lg:text-serif-pull text-black-100'

// T8 /architecture: Hero -> Story (chapter, body, five reasons, problem) -> Architecture (chapter,
// rings, sticky dark scene, pillars) -> Launch (chapter, 3 features, beta, code band) -> Closing.
// Header without banner (68 / 52), hero pulled up under it.
export default function Architecture() {
  return (
    <PageShell title="Architecture">
      <ArchHero />

      {/* ---------------- The story ---------------- */}
      <section id="story" className="relative isolate scroll-mt-[var(--site-header-height)] bg-white-100">
        <Chapter id="story" />
        <Box>
          <div className={`${grid2} py-10 lg:py-20`}>
            <Bullet className={body}>{STORY.introLabel}</Bullet>
            <div className="flex max-w-[522px] flex-col gap-10 lg:gap-20">
              <div className={`flex flex-col gap-5 lg:gap-6 ${body}`}>
                {STORY.intro.map((p) => (
                  <p key={p.slice(0, 12)}>{p}</p>
                ))}
              </div>
              <p className={serifPull}>{STORY.pull}</p>
            </div>
          </div>
        </Box>
        <Box>
          <div className={`${grid2} pb-10 pt-10 lg:gap-y-20 lg:pb-[240px] lg:pt-20`}>
            <h3 className={`max-w-[552px] ${serifH3}`}>{STORY.h3}</h3>
            <div className="max-lg:hidden" />
            <FlowFigure chips={STORY.chips} caption="Signals from people and tools flow into a single live record." seed={0} />
            <div className={`flex max-w-[464px] flex-col gap-10 ${body}`}>
              <p>{STORY.body1}</p>
              <p>{STORY.body2}</p>
            </div>
          </div>
          <div className={`${grid2} pt-10 lg:pt-[84px]`}>
            <h3 className="max-w-[373px] font-sans text-statement text-black-100 lg:sticky lg:top-[calc(var(--site-header-height)+24px)] lg:self-start">{STORY.statement}</h3>
            <div className={`flex max-w-[457px] flex-col gap-10 ${body}`}>
              {STORY.statementBody.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          </div>
          <FiveReasons label={STORY.reasonsLabel} reasons={STORY.reasons} />
        </Box>
        <section className="dark relative bg-black-50">
          <Box dark>
            <div className={`${grid2} content-between py-16 lg:min-h-[100svh] lg:grid-rows-[auto_1fr] lg:py-20`}>
              <Bullet className="font-sans text-arch-body text-white-900 [&>span]:bg-white-100">{PROBLEM.label}</Bullet>
              <LitWords text={PROBLEM.words} className="font-sans text-statement" />
              <LitWords text={PROBLEM.big} className="self-end font-serif text-serif-problem-sm lg:text-serif-problem" />
            </div>
          </Box>
        </section>
        <Box>
          <div className={`${grid2} pt-10 lg:pt-20`}>
            <h3 className={`max-w-[464px] ${serifPull}`}>{STORY_TAIL.h3}</h3>
            <ul className={`flex max-w-[484px] flex-col gap-4 ${body}`}>
              {STORY_TAIL.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[7px] block size-2 shrink-0 bg-black-50" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-[calc(100%/12)] pb-20 pt-[80px] lg:px-[58px]">
            <FlowFigure
              chips={STORY_TAIL.chips}
              caption="The signal graph keeps every record in the shared model up to date."
              seed={4}
              height={679}
              layout={[[335, 64], [610, 316]]}
              avatars={[[150, 30], [150, 250], [150, 470]]}
            />
          </div>
        </Box>
      </section>

      {/* ---------------- The architecture ---------------- */}
      <section id="architecture" className="relative isolate scroll-mt-[var(--site-header-height)] bg-white-100">
        <Chapter id="architecture" />
        <Box>
          <div className={`${grid2} pt-10 lg:pt-20`}>
            <h3 className={`max-w-[464px] ${serifPull}`}>{ARCH.h3}</h3>
            <div className={`flex max-w-[464px] flex-col gap-10 ${body}`}>
              {ARCH.body.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="px-[calc(100%/12)] pb-20 pt-16 lg:pb-[260px] lg:pt-[112px]">
            <RingRow labels={ARCH.rings} caption="Four layers: capture, connect, reason and act." />
          </div>
        </Box>
        <DarkScene tags={ARCH.tags}>
          <div className="h-[719svh] px-[calc(100%/12)] lg:h-[550svh] lg:px-[57px]">
            <h3 className="pt-[165svh] text-balance text-center font-serif text-[28px] leading-[22px] text-white-100 lg:text-serif-statement">{ARCH.statement}</h3>
            {ARCH.pillars.map(([name, text], i) => (
              <div key={name} className={`flex h-0 flex-col gap-6 ${i === 0 ? 'mt-[54svh]' : 'mt-[170svh] lg:mt-[120svh]'}`}>
                <h4 className="flex items-start gap-2.5 font-serif text-[40px] leading-[1.1] text-white-100 lg:whitespace-nowrap lg:text-serif-pillar">
                  {name}
                  <span className={`${monoLabel} block shrink-0 text-white-100 lg:-translate-y-6`}>[0{i + 1}]</span>
                </h4>
                <LitWords text={text} duration={300} className="mt-12 max-w-[580px] font-sans text-statement" />
              </div>
            ))}
          </div>
        </DarkScene>
      </section>

      {/* ---------------- The launch ---------------- */}
      <section id="launch" className="relative isolate scroll-mt-[var(--site-header-height)] bg-white-100">
        <Chapter id="launch" />
        <Box>
          {LAUNCH.features.map((f, i) => (
            <div key={f.h3} className={`${grid2} items-center pb-20 pt-10 lg:min-h-[930px] lg:py-24`}>
              <div className={`flex justify-center ${i === 1 ? 'lg:order-2' : ''}`}>
                <LaunchDiagram variant={i} caption={`${f.h3}: ${f.overline}.`} />
              </div>
              <div className={`flex max-w-[468px] flex-col ${i === 1 ? 'lg:order-1' : ''}`}>
                <h3 className={serifH3}>{f.h3}</h3>
                <p className="mt-3 font-mono text-mono-label font-normal uppercase text-black-100">{f.overline}</p>
                <div className={`mt-10 flex flex-col gap-5 ${body}`}>
                  {f.body.map((p) => (
                    <p key={p.slice(0, 12)}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className={`${grid2} items-center bg-white-200 py-10 lg:py-[120px]`}>
            <div className="flex flex-col gap-3">
              <h3 className={serifH3}>{LAUNCH.beta.h3}</h3>
              <p className="font-mono text-mono-label font-normal uppercase text-black-100">{LAUNCH.beta.overline}</p>
            </div>
            <div className={`flex max-w-[464px] flex-col gap-5 ${body}`}>
              {LAUNCH.beta.body.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          </div>
        </Box>
        <CodeBand title={LAUNCH.codeH3} />
      </section>

      <Closing line={CLOSING.line} nav={CLOSING.nav} />
    </PageShell>
  )
}
