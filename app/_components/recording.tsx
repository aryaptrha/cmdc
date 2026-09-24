export type Turn = {
  speaker: "USER" | "MACHINE";
  text: string;
};

type RecordingProps = {
  label: string;
  turns: Turn[];
};

/**
 * A recorded transcript. Deliberately primitive — no bubbles, no avatars, no
 * typing indicator. The mechanism stays visible.
 */
export function Recording({ label, turns }: RecordingProps) {
  return (
    <div className="stack stack--3">
      <p className="eyebrow">{label}</p>
      <div className="record">
        {turns.map((turn, index) => (
          <div
            className={
              turn.speaker === "MACHINE"
                ? "record__row record__row--machine"
                : "record__row"
            }
            key={index}
          >
            <span className="record__speaker">{turn.speaker}</span>
            <span>{turn.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
