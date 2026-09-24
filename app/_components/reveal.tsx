"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  distance?: number;
  /** Animate on load rather than on scroll — for above-the-fold content. */
  immediate?: boolean;
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  distance = 28,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const clear = () => el.removeAttribute("data-motion");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        clear();
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "expo.out",
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
    { scope: ref, dependencies: [delay, distance, immediate] }
  );

  return (
    <Tag ref={ref} className={className} data-motion="pending">
      {children}
    </Tag>
  );
}
