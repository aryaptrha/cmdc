/**
 * Timing for the opening page sequence, in seconds.
 *
 * Shared with the home page so the above-the-fold reveals underneath start as
 * the curtain lifts, instead of animating unseen behind the overlay.
 */
export const opening = {
  /** How long the opening panel holds before it starts to lift. */
  contentDelay: 3.2,
  /** Extra offset before the ultramarine veil follows the paper panel. */
  veilDelay: 0.12,
  /** Duration of each lifting panel. */
  liftDuration: 0.9,
} as const;
