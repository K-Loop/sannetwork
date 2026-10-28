import { gsap } from './gsapContext';

export const animationPresets = {
  /**
   * Fade in and slide up elements in stagger
   */
  staggerFadeUp: (targets, options = {}) => {
    if (!targets) return null;
    return gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: options.y || 28,
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.7,
        stagger: options.stagger || 0.08,
        ease: options.ease || 'power2.out',
        delay: options.delay || 0,
        scrollTrigger: options.scrollTrigger || undefined,
      }
    );
  },

  /**
   * Cinematic counter animation for statistics
   */
  animateCounter: (target, targetNumber, suffix = '', duration = 1.6) => {
    if (!target) return null;
    const obj = { val: 0 };
    return gsap.to(obj, {
      val: targetNumber,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        target.textContent = Math.round(obj.val) + suffix;
      },
    });
  },

  /**
   * Subtle floating animation for background decorative motifs
   */
  floatSubtle: (target, distance = 8, duration = 3.5) => {
    if (!target) return null;
    return gsap.to(target, {
      y: -distance,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  },
};
