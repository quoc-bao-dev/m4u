// Centralized animation configuration for the landing page
// Adjust values here to tune animation speeds and easing globally

export const ANIMATION = {
  // Global multipliers to scale all durations at once
  // Increase to slow down, decrease to speed up (e.g., 0.9 is 10% faster)
  multiplier: 1.0,

  // Easing presets used across components
  ease: {
    inOut: 'easeInOut' as const,
    out: 'easeOut' as const,
    in: 'easeIn' as const,
    linear: 'linear' as const,
    gsap: {
      softOut: 'power3.out',
      quickOut: 'power2.out',
    },
  },

  // Hero background timings
  hero: {
    containerEnter: 0.55, // motion.div fade/scale in
    svgEnter: { duration: 0.7, delay: 0.12 },
    blobEnter: { duration: 0.9, delay: 0.2 },
    pathDraw: { duration: 1, delay: 0.32 },
    gradientLoop: 1, // linearGradient animation loop duration
    colorLoop: { duration: 1, delayOffsets: [0, 0.4, 0.8, 1] },
  },

  // Reviewer carousel timings
  carousel: {
    fadeDuration: 0.75, // fade in/out for avatars
    intervalMs: 2200, // switch interval between avatar sets
    ease: 'linear' as const,
  },

  // component-specific configs should live within their components
} as const

export type AnimationConfig = typeof ANIMATION
