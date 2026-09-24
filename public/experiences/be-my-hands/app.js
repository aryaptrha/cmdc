/* Be My Hands runtime.
   Deterministic frame data, a scroll-driven placement map, and a process rail.
   Placement is irreversible: once a fragment lands it stays, exactly as it does
   on the physical sheet. */

(function () {
  "use strict";

  var STAGES = [
    "Film",
    "Machine selection",
    "Fragment selection",
    "Physical cutting",
    "Photographic feedback",
    "Placement map",
    "Gluing"
  ];

  /* Coordinates are percentages of the 210 x 297 mm sheet, taken from the
     instruction record. Fixed values only — the map must render identically
     on every load. */
  var FRAGMENTS = [
    { x: 7, y: 5, w: 20, h: 24, r: -3, stage: 1 },
    { x: 34, y: 8, w: 24, h: 17, r: 5, stage: 1 },
    { x: 64, y: 6, w: 24, h: 28, r: 12, stage: 1 },
    { x: 10, y: 34, w: 26, h: 20, r: 2, stage: 2 },
    { x: 42, y: 30, w: 20, h: 26, r: -6, stage: 2 },
    { x: 68, y: 40, w: 22, h: 18, r: 8, stage: 2 },
    { x: 46, y: 50, w: 13, h: 11, r: 22, stage: 3 },
    { x: 6, y: 60, w: 24, h: 22, r: 3, stage: 3 },
    { x: 36, y: 62, w: 28, h: 16, r: -4, stage: 3 },
    { x: 70, y: 64, w: 22, h: 24, r: 15, stage: 4 },
    { x: 22, y: 46, w: 11, h: 9, r: -14, stage: 4 },
    { x: 12, y: 86, w: 22, h: 12, r: -2, stage: 5 },
    { x: 40, y: 84, w: 26, h: 14, r: 6, stage: 5 },
    { x: 68, y: 92, w: 20, h: 7, r: 0, stage: 5 },
    { x: 84, y: 26, w: 10, h: 9, r: 0, stage: 6, skipped: true },
    { x: 3, y: 22, w: 9, h: 7, r: 0, stage: 6, skipped: true }
  ];

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  var rail = document.getElementById("rail");
  var railValue = document.getElementById("rail-value");
  var map = document.getElementById("map");

  var placed = 0;

  /* ------------------------------------------------------------- rail */

  STAGES.forEach(function (name, index) {
    var item = document.createElement("li");
    item.className = "rail__item";
    item.dataset.index = String(index);

    var number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");

    var label = document.createElement("span");
    label.textContent = name;

    item.appendChild(number);
    item.appendChild(label);
    rail.appendChild(item);
  });

  var railItems = Array.prototype.slice.call(
    rail.querySelectorAll(".rail__item")
  );

  /* --------------------------------------------------------- fragments */

  FRAGMENTS.forEach(function (fragment) {
    var el = document.createElement("span");
    el.className =
      "map__frag" + (fragment.skipped ? " map__frag--skipped" : "");
    el.dataset.stage = String(fragment.stage);
    el.dataset.shown = "0";
    el.style.left = fragment.x + "%";
    el.style.top = fragment.y + "%";
    el.style.width = fragment.w + "%";
    el.style.height = fragment.h + "%";
    el.style.transform = "rotate(" + fragment.r + "deg)";
    map.appendChild(el);
  });

  var fragments = Array.prototype.slice.call(
    map.querySelectorAll(".map__frag")
  );

  /* Placement is one-way: a fragment that has landed is never removed. */
  function placeUpTo(stageIndex) {
    fragments.forEach(function (el) {
      if (el.dataset.shown === "1") return;
      if (Number(el.dataset.stage) > stageIndex) return;

      el.dataset.shown = "1";
      placed += 1;

      if (gsap && !reduced) {
        gsap.to(el, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: placed * 0.03
        });
      } else {
        el.style.opacity = "1";
      }
    });
  }

  function setActive(stageIndex) {
    railItems.forEach(function (item) {
      item.classList.toggle(
        "is-active",
        Number(item.dataset.index) === stageIndex
      );
    });

    railValue.textContent = STAGES[stageIndex] || STAGES[0];
    placeUpTo(stageIndex);
  }

  setActive(0);

  /* IntersectionObserver rather than ScrollTrigger: the rail must keep working
     even if the animation layer never loads. */
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          setActive(Number(entry.target.dataset.stage));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    document.querySelectorAll(".stage").forEach(function (stage) {
      observer.observe(stage);
    });
  } else {
    placeUpTo(STAGES.length - 1);
  }

  /* --------------------------------------------------------------- motion */

  if (!gsap || reduced) return;

  gsap.from(".tech__pair", {
    opacity: 0,
    y: 10,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.05
  });

  gsap.utils.toArray(".stage, .band").forEach(function (block) {
    gsap.from(block, {
      opacity: 0,
      y: 26,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: {
        trigger: block,
        start: "top 88%",
        once: true
      }
    });
  });

  if (ScrollTrigger) {
    ScrollTrigger.refresh();
  }
})();
