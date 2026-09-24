import { Plate } from "./plate";
import type { PlateTone, PlateVariant } from "./plate";

type FigureProps = {
  number: string;
  /** What is shown. */
  description: string;
  /** Source, method, date, technical context. */
  source: string;
  variant?: PlateVariant;
  tone?: PlateTone;
  ratio?: string;
  label?: string;
  mark?: string;
  showCuts?: boolean;
  className?: string;
};

export function Figure({
  number,
  description,
  source,
  variant,
  tone,
  ratio,
  label,
  mark,
  showCuts,
  className,
}: FigureProps) {
  return (
    <figure className={`figure${className ? ` ${className}` : ""}`}>
      <Plate
        variant={variant}
        tone={tone}
        ratio={ratio}
        label={label}
        mark={mark}
        showCuts={showCuts}
      />
      <figcaption className="figure__caption">
        <strong>Figure {number}</strong> — {description} {source}
      </figcaption>
    </figure>
  );
}
