import type { Experiment } from "@/lib/experiments";
import { MetadataStrip } from "./metadata-strip";
import { Reveal } from "./reveal";
import { TextCta } from "./text-cta";

type ExperimentRowProps = {
  experiment: Experiment;
};

export function ExperimentRow({ experiment }: ExperimentRowProps) {
  return (
    <Reveal as="article" className="experiment-row split">
      <div className="experiment-row__meta-col">
        <p className="experiment-row__index">
          {experiment.number} / {experiment.category}
        </p>
        <MetadataStrip pairs={experiment.metadata} />
      </div>
      <div className="experiment-row__body">
        <h3 className="experiment-row__title">{experiment.title}</h3>
        <p className="experiment-row__premise">{experiment.premise}</p>
        <div className="experiment-row__links">
          <TextCta href={experiment.href}>Open the experiment</TextCta>
          <TextCta href={experiment.hoodHref}>Look under the hood</TextCta>
        </div>
      </div>
    </Reveal>
  );
}
