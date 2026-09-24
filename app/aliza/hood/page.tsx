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

const experiment = getExperiment("aliza");

const credits = [
  { label: "Creator", value: experiment.maker },
  { label: "Machine", value: experiment.machine },
  { label: "Source", value: "ELIZA script, 1966 transcription" },
  { label: "Method", value: "Keyword ranking with rank-weighted transforms" },
  { label: "Date", value: "2024" },
  { label: "Runtime", value: experiment.runtime },
];

const mechanism = [
  "Tokenise the input on whitespace and punctuation.",
  "Rank every keyword found in the sentence, highest rank first.",
  "Pick a transformation from that keyword's list, cycling the list on repeat.",
  "Substitute pronouns and possessives so the sentence returns to the speaker.",
  "Fall back to a generic prompt when no keyword matches at all.",
];

const constraints = [
  {
    reference: "R-014",
    status: "No keyword matched",
    note: "Sentence quoted a film title. Script contains no proper nouns; the generic fallback answered instead. Kept as evidence.",
  },
  {
    reference: "R-031",
    status: "Wrong subject",
    note: "Reflection swapped 'I' for 'you' inside a subordinate clause, producing a misreading. Unfixable without parsing.",
  },
  {
    reference: "R-077",
    status: "Repeat",
    note: "Transform list exhausted after four passes and cycled, repeating an earlier reply verbatim. Recorded rather than hidden.",
  },
  {
    reference: "R-102",
    status: "Buffer overflow",
    note: "Earlier script versions retained one prior sentence. Longer exchanges demonstrated the limit of that memory.",
  },
];

export default function AlizaHoodPage() {
  return (
    <>
      <div className="container">
        <Masthead variant="experiment" />
        <header className="experiment-header">
          <p className="eyebrow">Look under the hood / {experiment.number}</p>
          <SplitDisplay as="h1" className="display" text="ALIZA" />
          <p className="subhead reading">
            How the matcher works, what it structurally cannot do, and which
            parts were left unresolved on purpose.
          </p>
          <MetadataStrip pairs={credits} />
        </header>
      </div>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="01" label="Concept" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">An instrument, not a chatbot.</h2>
            <div className="prose">
              <p>
                The interface stays deliberately primitive. There are no message
                bubbles, no avatars, no typing indicator, because every one of
                those is a claim that something is thinking. A transcript in
                monospace makes a weaker claim and holds up better.
              </p>
              <p>
                The other reason is historical. The original ELIZA ran on a
                teletype. Restoring the plainness is closer to the subject than
                modernising it would be.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="02" label="Origin" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Rebuilding a script from its behaviour.</h2>
            <div className="prose">
              <p>
                The starting point was not source code but transcript: published
                exchanges, and the descriptions Weizenbaum wrote of what the
                script did. The keyword table was rebuilt to reproduce observed
                behaviour rather than to match an original file, so it is an
                interpretation at the level of rules.
              </p>
              <p>
                Where the transcript was ambiguous, the behaviour was preferred
                over elegance. Several rules are structurally clumsy because the
                recordings say they behaved clumsily.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="split">
          <div>
            <SectionIndex number="03" label="Mechanism" />
          </div>
          <Reveal className="stack stack--6">
            <h2 className="title">Five steps, no understanding.</h2>
            <Chain
              steps={[
                "Tokenise",
                "Rank keywords",
                "Select transform",
                "Reflect",
                "Fallback",
              ]}
              activeIndex={3}
            />
            <Notes items={mechanism} />
            <Figure
              number="07"
              description="Keyword ranking for the sentence “He says I'm depressed much of the time.” Two keywords matched; 'depressed' outranked 'I'm' and selected the transformation used in the recorded reply."
              source="Method: rank-weighted match table, 41 keywords. Date: 2024."
              variant="columns"
              tone="paper"
              ratio="16 / 6"
              label="Match table"
              mark="R-014"
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
            <h2 className="title">Four failures, kept.</h2>
            <div className="prose">
              <p>
                These are not defects to be patched. Each one shows the exact
                point where matching stops being conversation.
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
                "A rebuilt rule table reproduces behaviour, not history. Is that a reconstruction or a new script wearing the same name?",
                "The second persona changes tone without changing the engine. Should it be documented as a separate machine or as a costume?",
                "Should the failure log be visible during the conversation, or only in the record afterwards?",
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
                { label: "Tool", value: "Hand-written rule tables" },
                { label: "Source", value: "Published 1966 transcripts" },
                { label: "Date", value: "2024" },
                { label: "Licence", value: "Demonstration content" },
              ]}
            />
            <TextCta href={experiment.href}>
              Open the experiment
            </TextCta>
          </Reveal>
        </div>
      </section>

      <footer className="container section--tight">
        <hr className="hairline" />
        <div className="stack stack--3" style={{ paddingBlock: "var(--space-3)" }}>
          <TextCta href="/">
            Back to the catalogue
          </TextCta>
          <p className="metadata">
            Script, transcript and process data written for this demonstration.
          </p>
        </div>
      </footer>
    </>
  );
}
