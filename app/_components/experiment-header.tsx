import type { Experiment } from "@/lib/experiments";
import { MetadataStrip } from "./metadata-strip";
import { SplitDisplay } from "./split-display";

type ExperimentHeaderProps = {
  experiment: Experiment;
  /** Optional sentence-case eyebrow shown above the title. */
  eyebrow?: string;
};

export function ExperimentHeader({ experiment, eyebrow }: ExperimentHeaderProps) {
  return (
    <header className="experiment-header">
      <p className="eyebrow">
        {experiment.number} / {experiment.category}
      </p>
      <SplitDisplay as="h1" className="display" text={experiment.title} />
      <p className="subhead reading">{eyebrow ?? experiment.premise}</p>
      <MetadataStrip pairs={experiment.metadata} />
    </header>
  );
}
