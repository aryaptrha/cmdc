export type LogRow = {
  /** Frame, fragment or record the entry belongs to. */
  reference: string;
  status: string;
  note: string;
};

type LogProps = {
  rows: LogRow[];
};

/**
 * Failures are evidence, not errors — failure → observation → evidence →
 * part of the work.
 */
export function Log({ rows }: LogProps) {
  return (
    <div className="log">
      {rows.map((row) => (
        <div className="log__row" key={row.reference}>
          <span className="log__status">{row.reference}</span>
          <span>{row.status}</span>
          <span>{row.note}</span>
        </div>
      ))}
    </div>
  );
}
