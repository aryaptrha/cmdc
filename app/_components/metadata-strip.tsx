import type { MetadataPair } from "@/lib/experiments";

type MetadataStripProps = {
  pairs: MetadataPair[];
  className?: string;
};

export function MetadataStrip({ pairs, className }: MetadataStripProps) {
  return (
    <dl className={className ? `metadata-strip ${className}` : "metadata-strip"}>
      {pairs.map((pair) => (
        <div className="metadata-strip__row" key={pair.label}>
          <dt className="metadata-strip__label">{pair.label}</dt>
          <dd className="metadata-strip__value">{pair.value}</dd>
        </div>
      ))}
    </dl>
  );
}
