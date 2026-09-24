import type { CSSProperties } from "react";

export type PlateTone = "paper" | "ultramarine" | "ink";
export type PlateVariant = "collage" | "frame" | "columns" | "pair";

type Shape = {
  top: string;
  left: string;
  width: string;
  height: string;
  opacity: number;
  rotate?: number;
};

/**
 * Fixed geometry per composition. Literal values only — no randomness, so the
 * server and client render identically and nothing shifts on hydration.
 */
const COMPOSITIONS: Record<PlateVariant, Shape[]> = {
  collage: [
    { top: "14%", left: "6%", width: "23%", height: "46%", opacity: 0.9, rotate: -1.5 },
    { top: "31%", left: "24%", width: "17%", height: "52%", opacity: 0.5 },
    { top: "9%", left: "45%", width: "29%", height: "29%", opacity: 0.75, rotate: 0.8 },
    { top: "45%", left: "41%", width: "21%", height: "41%", opacity: 0.35 },
    { top: "19%", left: "68%", width: "23%", height: "58%", opacity: 0.6, rotate: -0.6 },
  ],
  frame: [
    { top: "19%", left: "21%", width: "58%", height: "62%", opacity: 0.82 },
    { top: "13%", left: "23%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "13%", left: "33%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "13%", left: "43%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "13%", left: "53%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "13%", left: "63%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "84%", left: "23%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "84%", left: "33%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "84%", left: "43%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "84%", left: "53%", width: "4%", height: "3%", opacity: 0.7 },
    { top: "84%", left: "63%", width: "4%", height: "3%", opacity: 0.7 },
  ],
  columns: [
    { top: "10%", left: "8%", width: "24%", height: "78%", opacity: 0.7 },
    { top: "22%", left: "36%", width: "24%", height: "54%", opacity: 0.35 },
    { top: "6%", left: "64%", width: "24%", height: "86%", opacity: 0.55 },
  ],
  pair: [
    { top: "16%", left: "7%", width: "40%", height: "66%", opacity: 0.72 },
    { top: "16%", left: "53%", width: "40%", height: "66%", opacity: 0.4 },
  ],
};

/** Thin rotated bars standing in for cut marks. */
const CUTS: Shape[] = [
  { top: "62%", left: "10%", width: "34%", height: "1px", opacity: 0.85, rotate: -7 },
  { top: "27%", left: "52%", width: "28%", height: "1px", opacity: 0.6, rotate: 12 },
];

type PlateProps = {
  variant?: PlateVariant;
  tone?: PlateTone;
  ratio?: string;
  label?: string;
  mark?: string;
  showCuts?: boolean;
  className?: string;
};

export function Plate({
  variant = "collage",
  tone = "ultramarine",
  ratio = "16 / 9",
  label,
  mark,
  showCuts = true,
  className,
}: PlateProps) {
  const shapes = COMPOSITIONS[variant];

  return (
    <div
      aria-hidden="true"
      className={`plate plate--${tone} crop-marks grain${
        className ? ` ${className}` : ""
      }`}
      style={{ aspectRatio: ratio } as CSSProperties}
    >
      <span className="plate__grid" />
      {shapes.map((shape, index) => (
        <span
          className="plate__shape"
          key={index}
          style={
            {
              top: shape.top,
              left: shape.left,
              width: shape.width,
              height: shape.height,
              opacity: shape.opacity,
              transform:
                shape.rotate === undefined
                  ? undefined
                  : `rotate(${shape.rotate}deg)`,
            } as CSSProperties
          }
        />
      ))}
      {showCuts
        ? CUTS.map((cut, index) => (
            <span
              className="plate__cut"
              key={`cut-${index}`}
              style={
                {
                  top: cut.top,
                  left: cut.left,
                  width: cut.width,
                  height: cut.height,
                  opacity: cut.opacity,
                  transform: `rotate(${cut.rotate ?? 0}deg)`,
                } as CSSProperties
              }
            />
          ))
        : null}
      {label ? <span className="plate__label">{label}</span> : null}
      {mark ? <span className="plate__mark">{mark}</span> : null}
    </div>
  );
}
