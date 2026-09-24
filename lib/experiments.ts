export type ExperimentIdentity = "be-my-hands" | "aliza";

/** Local accent and plate treatment, per DESIGN.md §02 (experiment palettes). */
export type ExperimentAccent = "ochre" | "carmine";

export type MetadataPair = {
  label: string;
  value: string;
};

export type Experiment = {
  slug: string;
  number: string;
  category: string;
  title: string;
  premise: string;
  identity: ExperimentIdentity;
  accent: ExperimentAccent;
  accentPlate: "collage" | "columns";
  href: string;
  hoodHref: string;
  runtimeHref: string;
  maker: string;
  machine: string;
  runtime: string;
  metadata: MetadataPair[];
};

export const experiments: Experiment[] = [
  {
    slug: "be-my-hands",
    number: "01",
    category: "Physical / AI-directed",
    title: "Be My Hands",
    premise:
      "A machine selects and composes fragments of 16mm film. A person cuts, places and glues them by hand. Neither half can see what the other is doing.",
    identity: "be-my-hands",
    accent: "ochre",
    accentPlate: "collage",
    href: "/be-my-hands",
    hoodHref: "/be-my-hands/hood",
    runtimeHref: "/experiences/be-my-hands/index.html",
    maker: "Studio Undertow",
    machine: "Frame selector v0.4",
    runtime: "Browser, desktop only",
    metadata: [
      { label: "Built", value: "2024" },
      { label: "Messages", value: "3,512" },
      { label: "Medium", value: "Cut film, paper, glue" },
      { label: "Machine", value: "Frame selector v0.4" },
      { label: "Fragments", value: "148 placed / 22 failed" },
    ],
  },
  {
    slug: "aliza",
    number: "02",
    category: "Conversation / Historical",
    title: "ALIZA",
    premise:
      "A recorded conversation experiment built on the 1966 ELIZA script, annotated so the mechanism stays visible instead of disappearing behind the reply.",
    identity: "aliza",
    accent: "carmine",
    accentPlate: "columns",
    href: "/aliza",
    hoodHref: "/aliza/hood",
    runtimeHref: "/experiences/aliza/index.html",
    maker: "Studio Undertow",
    machine: "ELIZA (1966)",
    runtime: "Browser, desktop only",
    metadata: [
      { label: "Built", value: "2024" },
      { label: "Messages", value: "1,204" },
      { label: "Medium", value: "Text, recorded" },
      { label: "Machine", value: "ELIZA (1966)" },
      { label: "Keywords", value: "41 rules" },
    ],
  },
];

export function getExperiment(slug: ExperimentIdentity): Experiment {
  const found = experiments.find((experiment) => experiment.slug === slug);

  if (!found) {
    throw new Error(`Unknown experiment: ${slug}`);
  }

  return found;
}

export const colophon: MetadataPair[] = [
  { label: "Palette", value: "Ultramarine #2B2BCE on paper #F2EDE2" },
  { label: "Typography", value: "Helvetica, JetBrains Mono, Source Serif 4" },
  { label: "Motion", value: "Lenis, GSAP ScrollTrigger, word-level splitting" },
  { label: "Numbers", value: "Two experiments, seven surfaces" },
  { label: "Content", value: "Written for this demonstration" },
];
