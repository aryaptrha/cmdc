type SectionIndexProps = {
  number: string;
  label: string;
};

export function SectionIndex({ number, label }: SectionIndexProps) {
  return (
    <p className="section-index">
      <span className="section-index__number">{number}</span>
      <span aria-hidden="true">/</span>
      <span className="section-index__label">{label}</span>
    </p>
  );
}
