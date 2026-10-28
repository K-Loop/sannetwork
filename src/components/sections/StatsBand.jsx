import React, { useRef, useEffect } from 'react';
import { STATS } from '../../data/siteContent';
import { gsap, ScrollTrigger } from '../../animations/gsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function StatsBand() {
  const bandRef = useRef(null);
  const numbersRef = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // For year-type stats, display immediately (counting from 0 to 2023 looks wrong)
    numbersRef.current.forEach((el, index) => {
      if (!el) return;
      const stat = STATS[index];
      if (stat.isYear) {
        el.textContent = stat.value + stat.suffix;
      }
    });

    if (prefersReducedMotion) {
      numbersRef.current.forEach((el, index) => {
        if (el) el.textContent = STATS[index].value + STATS[index].suffix;
      });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: bandRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          numbersRef.current.forEach((el, index) => {
            if (!el) return;
            const targetStat = STATS[index];
            // Skip year stats — they're already displayed
            if (targetStat.isYear) return;
            const targetNumber = targetStat.value;
            const counterObj = { val: 0 };

            gsap.to(counterObj, {
              val: targetNumber,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(counterObj.val) + targetStat.suffix;
              },
            });
          });
        },
      });
    }, bandRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={bandRef}
      className="w-full py-10 md:py-14 border-y border-[var(--bd)] transition-colors duration-200"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {STATS.map((stat, idx) => (
          <div key={stat.label} className="flex flex-col space-y-1">
            <div
              ref={(el) => (numbersRef.current[idx] = el)}
              className="font-['Archivo_Black'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--go)] leading-none tracking-tight select-none"
            >
              0
            </div>
            <p className="font-sans font-bold text-sm sm:text-base text-[var(--tx)] pt-1">
              {stat.label}
            </p>
            <p className="font-sans text-xs text-[var(--tx2)] leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
