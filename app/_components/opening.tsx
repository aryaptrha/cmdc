"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { opening } from "@/lib/opening";

const { contentDelay, veilDelay, liftDuration } = opening;

/**
 * Minimalist opening curtain. A paper panel over an ultramarine veil lifts to
 * reveal the page. Purely decorative: it is aria-hidden, mounts in the initial
 * HTML so nothing flashes, and removes itself once the timeline ends.
 *
 * Hidden by CSS for no-JS and reduced-motion visitors (see globals.css), so no
 * one is ever left staring at an overlay that never lifts.
 */
export function Opening() {
  const panelRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const veil = veilRef.current;
      if (!panel || !veil) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDone(true);
        return;
      }

      const q = gsap.utils.selector(panel);
      const meta = q('[data-opening="meta"]');
      const rule = q('[data-opening="rule"]');
      const line = q('[data-opening="line"]');
      const sub = q('[data-opening="sub"]');
      const progress = q('[data-opening="progress"]');
      const groups = q('[data-opening="group"]');

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        meta,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
        0.15
      )
        .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0.3)
        .fromTo(
          line,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.1 },
          0.45
        )
        .fromTo(sub, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.95)
        .fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: contentDelay, ease: "none" }, 0)
        .to(
          groups,
          { autoAlpha: 0, y: -16, duration: 0.5, ease: "power2.in", stagger: 0.04 },
          contentDelay - 0.5
        )
        .to(panel, { yPercent: -100, duration: liftDuration, ease: "power4.inOut" }, contentDelay)
        .to(
          veil,
          { yPercent: -100, duration: liftDuration, ease: "power4.inOut" },
          contentDelay + veilDelay
        );
    },
    { scope: panelRef, dependencies: [] }
  );

  if (done) return null;

  return (
    <>
      <div className="opening__veil" ref={veilRef} aria-hidden="true" />

      <div className="opening" ref={panelRef} aria-hidden="true">
        <div className="container opening__top" data-opening="group">
          <div className="opening__row">
            <span className="opening__eyebrow" data-opening="meta">
              The Robot and Me
            </span>
            <span className="section-index" data-opening="meta">
              <span className="section-index__number">01</span>
              <span className="section-index__label">Catalogue</span>
            </span>
          </div>
          <hr className="opening__rule" data-opening="rule" />
        </div>

        <div className="container opening__center" data-opening="group">
          <p className="opening__statement">
            <span className="opening__line">
              <span className="opening__line-inner" data-opening="line">
                The portfolio is
              </span>
            </span>
            <span className="opening__line">
              <span className="opening__line-inner" data-opening="line">
                the catalogue.
              </span>
            </span>
          </p>
          <p className="opening__sub" data-opening="sub">
            Two experiments made with machines.
          </p>
        </div>

        <div className="container opening__bottom" data-opening="group">
          <div className="opening__row">
            <span className="opening__eyebrow" data-opening="meta">
              Ultramarine #2B2BCE
            </span>
            <span className="opening__eyebrow" data-opening="meta">
              Paper #F2EDE2
            </span>
          </div>
        </div>

        <div className="opening__progress">
          <span className="opening__progress-fill" data-opening="progress" />
        </div>
      </div>
    </>
  );
}
