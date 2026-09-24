import { ExperimentRow } from "./_components/experiment-row";
import { Masthead } from "./_components/masthead";
import { MetadataStrip } from "./_components/metadata-strip";
import { Reveal } from "./_components/reveal";
import { SectionIndex } from "./_components/section-index";
import { SplitDisplay } from "./_components/split-display";
import { colophon, experiments } from "@/lib/experiments";

export default function Home() {
  return (
    <>
      <div className="container">
        <Masthead />
      </div>

      <main>
        <section className="container section">
          <div className="stack stack--6">
            <SplitDisplay
              as="h1"
              className="display"
              text={"The portfolio is the catalogue.\nEach experiment is its own artwork."}
            />
            <Reveal immediate delay={0.35}>
              <p className="prose">
                Two experiments made with machines. Neither is fully automated
                and neither is fully handmade — the part worth looking at is
                always the seam between the two.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container section">
          <div className="split">
            <div>
              <SectionIndex number="01" label="What this is" />
            </div>
            <Reveal className="stack stack--6">
              <h2 className="title">A catalogue, not a portfolio.</h2>
              <div className="prose">
                <p>
                  Most portfolios compress work into a card, a thumbnail and a
                  list of technologies. This one does the opposite. Every entry
                  keeps its own typeface, its own palette and its own way of
                  being used, and the shell stays quiet enough to let that
                  happen.
                </p>
                <p>
                  Provenance is not an appendix here. Dates, source material,
                  measurements, machine decisions and the things that went wrong
                  are part of the experience rather than documentation of it.
                </p>
                <p>
                  Where a machine made a choice, you can inspect the choice.
                  Where the work failed, the failure is still on the page.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="container section">
          <div className="split">
            <div>
              <SectionIndex number="02" label="The experiments" />
            </div>
            <Reveal className="stack stack--4">
              <h2 className="title">Two exhibits.</h2>
              <p className="prose">
                Each opens into its own interface, and each has a page
                explaining how it was made and where it broke.
              </p>
            </Reveal>
          </div>

          <div>
            {experiments.map((experiment) => (
              <ExperimentRow key={experiment.slug} experiment={experiment} />
            ))}
          </div>
        </section>

        <section className="container section" id="about">
          <div className="stack stack--8">
            <div className="split">
              <div>
                <SectionIndex number="03" label="About" />
              </div>
              <Reveal className="prose">
                <p>
                  The Robot and Me is a record of work made with machines — not
                  generated wholesale, and not untouched by hand. The interesting
                  part is always the seam: what the machine decided, what the
                  person did about it, and what neither of them expected.
                </p>
                <p>
                  Two experiments are published here. Both are desktop
                  experiences, both keep their own design language, and neither
                  is a demonstration of a technology.
                </p>
                <p>
                  This build is itself a demonstration. The exhibits, the
                  recorded conversations and the process data are written to
                  exercise the design system, and no real recordings are
                  reproduced.
                </p>
              </Reveal>
            </div>

            <Reveal className="colophon">
              <p className="eyebrow">Colophon</p>
              <MetadataStrip pairs={colophon} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="container section--tight">
        <hr className="hairline" />
        <div
          className="stack"
          style={{ paddingBlock: "var(--space-3)" }}
        >
          <p className="metadata">
            The Robot and Me — demonstration build, 2024
          </p>
        </div>
      </footer>
    </>
  );
}
