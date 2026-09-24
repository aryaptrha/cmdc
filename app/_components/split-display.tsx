"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType } from "react";

gsap.registerPlugin(ScrollTrigger);

type SplitDisplayProps = {
  /** Use \n to force an editorial line break and avoid widow lines. */
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on load rather than on scroll — for above-the-fold content. */
  immediate?: boolean;
};

/**
 * Word-level reveal. Deliberately not line-level: line splitting needs text
 * measurement and re-splitting on resize, which breaks more often than it's
 * worth. Words are atomic and reflow safely.
 */
export function SplitDisplay({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  immediate = true,
}: SplitDisplayProps) {
  const ref = useRef<HTMLElement>(null);
  const lines = text.split("\n");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = Array.from(
        el.querySelectorAll<HTMLElement>("[data-word]")
      );
      if (targets.length === 0) return;

      const clear = () =>
        targets.forEach((target) => target.removeAttribute("data-motion"));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        clear();
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, yPercent: 45 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.15,
          delay,
          ease: "expo.out",
          stagger: 0.07,
          onComplete: clear,
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                },
              }),
        }
      );
    },
    { scope: ref, dependencies: [text, delay, immediate] }
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");

        return (
          <Fragment key={`line-${lineIndex}`}>
            {lineIndex > 0 ? <br /> : null}
            {words.map((word, wordIndex) => (
              <Fragment key={`${word}-${wordIndex}`}>
                <span className="split-word" data-word data-motion="pending">
                  {word}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </Tag>
  );
}
