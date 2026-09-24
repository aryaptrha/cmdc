import { Chain } from "../_components/chain";
import { ExperimentHeader } from "../_components/experiment-header";
import { Figure } from "../_components/figure";
import { Log } from "../_components/log";
import { Masthead } from "../_components/masthead";
import { MetadataStrip } from "../_components/metadata-strip";
import { Notes } from "../_components/notes";
import { Reveal } from "../_components/reveal";
import { RuntimeGateway } from "../_components/runtime-gateway";
import { SectionIndex } from "../_components/section-index";
import { TextCta } from "../_components/text-cta";
import { getExperiment } from "@/lib/experiments";

const experiment = getExperiment("be-my-hands");

const process = [
  "Film",
  "Machine selection",
  "Fragment selection",
  "Physical cutting",
  "Photographic feedback",
  "Placement map",
  "Gluing",
];

const frame = [
  { label: "Timestamp", value: "00:06:52:11" },
  { label: "Frame", value: "0412" },
  { label: "Fragment", value: "F-019" },
  { label: "Position", value: "214 / 138 mm" },
  { label: "Decision", value: "Place, no rotation" },
  { label: "Action", value: "Cut, glued 41° to edge" },
];

const exceptions = [
  {
    reference: "F-006",
    status: "Torn on cut",
    note: "Film stock split along the perforation line. Placed anyway, rotated 6° to hide the tear. Visible in Figure 03.",
  },
  {
    reference: "F-022",
    status: "Machine instruction unreadable",
    note: "Coordinate string truncated in the export. Operator placed from the preview image instead. Divergence recorded.",
  },
  {
    reference: "F-031",
    status: "Refused",
    note: "Instruction required a 240 mm span; the sheet measured 210 mm. The fragment was skipped rather than scaled.",
  },
  {
    reference: "F-048",
    status: "Delaminated",
    note: "Glue failed after two days. Photographed before and after; the lifting corner was left unlifted.",
  },
];

export default function BeMyHandsPage() {
  return (
    <>
      <div className="container">
        <Masthead variant="experiment" />
        <ExperimentHeader
          experiment={experiment}
          eyebrow="A machine selects and places. A person cuts and glues. Neither sees the other's work, and every instruction is recorded."
        />
      </div>

      <section className="container section--tight">
        <Reveal>
          <RuntimeGateway runtimeHref={experiment.runtimeHref} />
        </Reveal>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="01" label="Process state" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Seven stages, two authors.</h2>
            <div className="prose">
              <p>
                The work moves between a machine and a pair of hands on a fixed
                schedule. The machine watches 16mm film, picks frames, selects a
                fragment inside the frame, and issues a position in
                millimetres. The hands cut what they are given and glue it where
                they are told.
              </p>
              <p>
                The constraint is deliberate: the machine never sees the
                physical result, and the operator never sees the source frame.
                The record below is the only place both halves exist together.
              </p>
            </div>
            <Chain steps={process} activeIndex={5} />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="02" label="The artifacts" />
          </div>
          <Reveal className="stack stack--8">
            <h2 className="title">One artifact, two authors.</h2>
            <Figure
              number="03"
              description="Primary physical artifact. Cut film and paper on a 210 × 297 mm sheet, 148 fragments placed over nine sessions. The tear at upper left is fragment F-006, kept in place."
              source="Medium: cut film, paper, glue. Photographed flat, 1:1, 2024."
              variant="collage"
              tone="ultramarine"
              ratio="4 / 3"
              label="Human-made artifact"
              mark="Sheet 02"
            />
            <div className="prose">
              <p>
                The counterpart is generated from the same instruction set,
                executed without hands. It is not a reproduction of the physical
                sheet — it is what the machine expected to see. The difference
                between them is the part worth keeping.
              </p>
            </div>
            <div className="pair">
              <Figure
                number="04"
                description="Machine-directed counterpart, rendered from the placement map alone, with no photographic feedback folded back in."
                source="Generated from instruction set 02. Date: 2024."
                variant="frame"
                tone="ink"
                ratio="4 / 3"
                label="Expected result"
                mark="Map 02"
                showCuts={false}
              />
              <Figure
                number="05"
                description="Photographic feedback captured immediately after gluing. Used to close the loop between instruction and result."
                source="Captured 40 minutes after session 9. Date: 2024."
                variant="columns"
                tone="paper"
                ratio="4 / 3"
                label="Feedback"
                mark="S-09"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="03" label="Evidence" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">The instruction, in full.</h2>
            <div className="prose">
              <p>
                One entry from the auditable record: what the machine decided,
                where it landed in millimetres, and what the hands did about it.
              </p>
            </div>
            <MetadataStrip pairs={frame} />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="04" label="Exceptions" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Twenty-two fragments failed.</h2>
            <div className="prose">
              <p>
                Of 148 instructions, 22 could not be carried out as written.
                None were corrected silently. Each failure is an observation
                about either the material or the instruction, and in four cases
                it changed the work.
              </p>
            </div>
            <Log rows={exceptions} />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="05" label="Open questions" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Still open.</h2>
            <Notes
              items={[
                "If the operator adjusts a placement to hide a tear, whose decision is on the sheet?",
                "The machine never sees the result. Does feeding photographs back make it a collaborator or just a better tool?",
                "Should skipped fragments leave a gap, or should the following fragment move up to close it?",
              ]}
            />
          </Reveal>
        </div>
      </section>

      <footer className="container section--tight">
        <hr className="hairline" />
        <div className="stack stack--3" style={{ paddingBlock: "var(--space-3)" }}>
          <TextCta href={experiment.hoodHref}>
            Look under the hood
          </TextCta>
          <p className="metadata">
            Process data, plates and transcripts written for this demonstration.
          </p>
        </div>
      </footer>
    </>
  );
}
