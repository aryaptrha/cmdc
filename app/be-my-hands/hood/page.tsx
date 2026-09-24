import { Chain } from "../../_components/chain";
import { Figure } from "../../_components/figure";
import { Log } from "../../_components/log";
import { Masthead } from "../../_components/masthead";
import { MetadataStrip } from "../../_components/metadata-strip";
import { Notes } from "../../_components/notes";
import { Reveal } from "../../_components/reveal";
import { SectionIndex } from "../../_components/section-index";
import { SplitDisplay } from "../../_components/split-display";
import { TextCta } from "../../_components/text-cta";
import { getExperiment } from "@/lib/experiments";

const experiment = getExperiment("be-my-hands");

const credits = [
  { label: "Creator", value: experiment.maker },
  { label: "Machine", value: experiment.machine },
  { label: "Source", value: "16mm educational film, 1961" },
  { label: "Method", value: "Frame selection with millimetre placement" },
  { label: "Date", value: "2024" },
  { label: "Runtime", value: experiment.runtime },
];

const constraints = [
  {
    reference: "C-01",
    status: "Machine cannot see",
    note: "No camera in the loop. The selector works from frames only and never receives the glued sheet.",
  },
  {
    reference: "C-02",
    status: "Instruction is final",
    note: "Once a position was issued it was not revised, even when the fragment no longer fitted the space.",
  },
  {
    reference: "C-03",
    status: "No rescaling",
    note: "Fragments are used at printed size. A fragment too large for the remaining sheet is skipped, never reduced.",
  },
  {
    reference: "C-04",
    status: "One sheet per session",
    note: "Sessions were capped at one sheet and roughly sixteen fragments to keep the record readable.",
  },
];

export default function BeMyHandsHoodPage() {
  return (
    <>
      <div className="container">
        <Masthead variant="experiment" />
      </div>

      <section className="band band--accent">
        <div className="container">
          <header className="experiment-header">
            <p className="eyebrow">Look under the hood / {experiment.number}</p>
            <SplitDisplay as="h1" className="display" text="Be My Hands" />
            <p className="subhead reading">
              How the selection works, how instructions reached the hands, and
              what the twenty-two failures revealed.
            </p>
            <MetadataStrip pairs={credits} />
          </header>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="01" label="Concept" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">A division of labour that never closes.</h2>
            <div className="prose">
              <p>
                The machine handles seeing and deciding. The person handles
                cutting and placing. Neither can do the other’s half, and
                neither is allowed to look at it. That asymmetry is the whole
                experiment; the collage is the residue.
              </p>
              <p>
                The design follows from the concept. Photographs are evidence
                rather than illustration, measurements sit next to the thing
                they measure, and nothing is cropped to look better than it did
                on the table.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="02" label="Process" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">How an instruction travels.</h2>
            <Chain steps={["Select", "Issue", "Print", "Cut", "Photograph", "Log"]} activeIndex={3} />
            <div className="prose">
              <p>
                Each instruction was printed before cutting started, so the
                operator could not re-read it after seeing the fragment. The
                printout carried a timestamp, a frame number, a fragment
                identifier and a position in millimetres — nothing else, and no
                preview of the source frame.
              </p>
              <p>
                After gluing, the sheet was photographed flat and the photograph
                filed against the instruction that produced it. That pair of
                documents is what makes the record auditable.
              </p>
            </div>
            <Figure
              number="11"
              description="A printed instruction as it reached the operator. The position is given in millimetres from the sheet origin; no source frame is shown."
              source="Method: instruction printout, session 9. Date: 2024."
              variant="columns"
              tone="ochre"
              ratio="16 / 6"
              label="Instruction"
              mark="F-048"
            />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="03" label="Mechanism" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Selecting a fragment.</h2>
            <div className="prose">
              <p>
                The selector scores frames on contrast and edge density, then
                picks the densest region of the winning frame and draws a
                rectangle inside it. That rectangle is the fragment. The position
                it is given on the sheet comes from a packing pass that avoids
                earlier fragments, which is why placements cluster and sometimes
                crowd an edge.
              </p>
              <p>
                The scoring is not tuned for beauty. It is tuned so that two
                different sessions on the same reel produce visibly different
                sheets, which is what makes the machine’s contribution legible.
              </p>
            </div>
            <Notes
              items={[
                "Score each frame on contrast and edge density.",
                "Take the densest region of the winning frame as the fragment.",
                "Pack against previously placed fragments; avoid overlap.",
                "Emit a position in millimetres and stop. No feedback is accepted.",
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="04" label="Constraints" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">What the system refuses to do.</h2>
            <div className="prose">
              <p>
                These constraints were fixed before the first session and were
                not relaxed afterwards, including when breaking one would have
                produced a tidier sheet.
              </p>
            </div>
            <Log rows={constraints} />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="05" label="Open questions" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">What is still unresolved.</h2>
            <Notes
              items={[
                "The machine's decisions are recorded but never evaluated. Should a rejected instruction count against it?",
                "Skips and tears change the composition. Are the failures part of the artwork or commentary on it?",
                "If the selector could see the sheet, would the work become collaborative or merely efficient?",
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="06" label="Provenance" />
          </div>
          <Reveal className="stack stack--6">
            <MetadataStrip
              pairs={[
                { label: "Creator", value: experiment.maker },
                { label: "Machine", value: experiment.machine },
                { label: "Tool", value: "Hand steel, cutting mat, archival glue" },
                { label: "Source", value: "16mm educational film, 1961" },
                { label: "Method", value: "Frame selection, manual cutting" },
                { label: "Date", value: "2024" },
              ]}
            />
            <TextCta href={experiment.href}>Open the experiment</TextCta>
          </Reveal>
        </div>
      </section>

      <footer className="container section--tight">
        <hr className="hairline" />
        <div className="stack stack--3" style={{ paddingBlock: "var(--space-3)" }}>
          <TextCta href="/">Back to the catalogue</TextCta>
          <p className="metadata">
            Process data, plates and transcripts written for this demonstration.
          </p>
        </div>
      </footer>
    </>
  );
}
