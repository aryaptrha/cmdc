type NotesProps = {
  items: string[];
};

export function Notes({ items }: NotesProps) {
  return (
    <ol className="notes">
      {items.map((item, index) => (
        <li className="stack stack--2" key={index}>
          <span className="note__index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="note__body">{item}</span>
        </li>
      ))}
    </ol>
  );
}
