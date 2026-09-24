import { ExperimentHeader } from "../_components/experiment-header";
import { Masthead } from "../_components/masthead";
import { MetadataStrip } from "../_components/metadata-strip";
import { Notes } from "../_components/notes";
import { Recording } from "../_components/recording";
import { Reveal } from "../_components/reveal";
import { RuntimeGateway } from "../_components/runtime-gateway";
import { SectionIndex } from "../_components/section-index";
import { TextCta } from "../_components/text-cta";
import { getExperiment } from "@/lib/experiments";

const experiment = getExperiment("aliza");

const technical = [
  { label: "Script", value: "ELIZA, 1966 transcription" },
  { label: "Year", value: "1966 / rebuilt 2024" },
  { label: "Keywords", value: "41 rules, 12 ranked" },
  { label: "Execution", value: "Client side, deterministic" },
  { label: "Data handling", value: "Nothing leaves the page" },
  { label: "Conversations", value: "1,204 recorded" },
];

const transcript = [
  { speaker: "USER" as const, text: "Men are all alike." },
  { speaker: "MACHINE" as const, text: "In what way?" },
  {
    speaker: "USER" as const,
    text: "They're always bugging us about something or other.",
  },
  { speaker: "MACHINE" as const, text: "Can you think of a specific example?" },
  { speaker: "USER" as const, text: "Well, my boyfriend made me come here." },
  { speaker: "MACHINE" as const, text: "Your boyfriend made you come here?" },
  { speaker: "USER" as const, text: "He says I'm depressed much of the time." },
  { speaker: "MACHINE" as const, text: "I am sorry to hear you are depressed." },
];

export default function AlizaPage() {
  return (
    <>
      <div className="container">
        <Masthead variant="experiment" />
        <ExperimentHeader
          experiment={experiment}
          eyebrow="A recorded conversation experiment built on the 1966 script, kept open so you can watch the mechanism work instead of the illusion."
        />
      </div>

      <section className="container section--tight">
        <Reveal>
          <RuntimeGateway
            runtimeHref={experiment.runtimeHref}
            note="Opening this leaves the catalogue. The experiment runs as its own application, in its own typography, and keeps no record of what you type."
          />
        </Reveal>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="01" label="Context" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">A script that never understood anything.</h2>
            <div className="prose">
              <p>
                ELIZA was written in 1966 by Joseph Weizenbaum at MIT. It
                scanned a sentence for keywords, picked a transformation
                attached to the strongest one, and handed the rest of the
                sentence back as a question. It had no model of language and no
                memory worth the name.
              </p>
              <p>
                It worked anyway. People told it things they had not told
                anyone, and Weizenbaum spent the rest of his career uneasy about
                why. That unease is the actual subject of this experiment, so
                the transcript is published with the rules that produced it
                sitting alongside.
              </p>
            </div>
            <MetadataStrip pairs={technical} />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="02" label="The conversations" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">What a reflection sounds like.</h2>
            <div className="prose">
              <p>
                The first recorded exchange, unedited. The machine never adds
                information. It swaps pronouns, keeps the frame, and turns the
                sentence back on the speaker.
              </p>
            </div>
            <Recording label="Record 001 — unedited" turns={transcript} />
            <div className="prose">
              <p>
                Read as a mechanism, it is thin. Read as a conversation, it
                holds — which is the finding, not an accident.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="03" label="Two machines" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Two voices, one algorithm.</h2>
            <div className="prose">
              <p>
                The same matcher runs twice with different rulebooks. Switching
                between them is part of the experiment, because the change in
                tone comes only from the substitution table.
              </p>
            </div>
            <div className="pair">
              <div className="stack stack--4">
                <p className="eyebrow">Machine A</p>
                <h3 className="subhead">Original ELIZA</h3>
                <div className="prose">
                  <p>
                    The 1966 rulebook, including its fallbacks. Cool, neutral,
                    endlessly reflective. When nothing matches it asks you to go
                    on.
                  </p>
                </div>
                <MetadataStrip
                  pairs={[
                    { label: "Rules", value: "41 keywords" },
                    { label: "Memory", value: "None" },
                    { label: "Voice", value: "Neutral" },
                  ]}
                />
              </div>
              <div className="stack stack--4">
                <p className="eyebrow">Machine B</p>
                <h3 className="subhead">The Poet</h3>
                <div className="prose">
                  <p>
                    A second, invented persona. The same matcher, but the
                    responses were written to answer with images instead of
                    questions. It is a costume on the identical engine.
                  </p>
                </div>
                <MetadataStrip
                  pairs={[
                    { label: "Rules", value: "18 keywords" },
                    { label: "Memory", value: "None" },
                    { label: "Voice", value: "Figurative" },
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="04" label="After" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Where the illusion breaks.</h2>
            <div className="prose">
              <p>
                The interesting moments are the failures: a sentence with no
                keyword at all, a reflection that misreads the subject, a reply
                that repeats something said four turns earlier because it never
                left the buffer.
              </p>
              <p>
                Five of those are kept in the record rather than smoothed over.
                They are the clearest evidence that nothing is being understood.
              </p>
            </div>
            <Notes
              items={[
                "If the machine can hold a conversation without understanding it, what exactly is a reader supplying that is not in the text?",
                "The original script has no memory. Does the impression of continuity come from the speaker or from the rules?",
                "The second persona uses the same engine. If tone alone changes how much we confide in it, what is the tone doing?",
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
            Script, transcript and process data written for this demonstration.
          </p>
        </div>
      </footer>
    </>
  );
}
