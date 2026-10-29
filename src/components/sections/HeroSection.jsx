import React, { useRef, useEffect, useState, useMemo } from 'react';
import { HERO_SERVICE_CARDS } from '../../data/services';
import { BRAND } from '../../data/siteContent';
import { gsap } from '../../animations/gsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../ui/Button';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({
  onNavigate,
  isIntroActive = false,
}) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const fanRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Active center card index among the 8 services (default: 0 = Talent Management)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const totalCards = HERO_SERVICE_CARDS.length;

  // The 5 visible cards in the fan centered around activeServiceIndex
  const visibleCards = useMemo(() => {
    const offsets = [-2, -1, 0, 1, 2];
    return offsets.map((offset, slotIndex) => {
      const cardIndex = (activeServiceIndex + offset + totalCards) % totalCards;
      return {
        card: HERO_SERVICE_CARDS[cardIndex],
        cardIndex,
        slotIndex,
        k: offset,
      };
    });
  }, [activeServiceIndex, totalCards]);

  const rotations = [-14, -7, 0, 7, 14];
  const yOffsets = [34, 10, 0, 10, 34];
  const zIndices = [1, 2, 4, 3, 2];

  const handlePrev = () => {
    setActiveServiceIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleNext = () => {
    setActiveServiceIndex((prev) => (prev + 1) % totalCards);
  };

  useEffect(() => {
    if (prefersReducedMotion || isIntroActive) return;

    const ctx = gsap.context(() => {
      // Staggered reveal of hero content
      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // Fan cards entering with dynamic spread
      gsap.fromTo(
        '.fan-card',
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          delay: 0.25,
          ease: 'back.out(1.4)',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isIntroActive]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[82vh] py-12 lg:py-20 flex items-center overflow-hidden scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-8 items-center w-full">
        {/* Left Editorial Copy */}
        <div className="flex flex-col items-start z-10">
          <div className="hero-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--or)]/15 border border-[var(--or)]/30 text-[var(--or)] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrity & Influencer Management · Est. 2023</span>
          </div>

          <p className="hero-reveal font-['Caveat_Brush'] text-[var(--or)] text-3xl sm:text-4xl mb-1 select-none">
            {BRAND.name}
          </p>

          <h1
            ref={headlineRef}
            className="hero-reveal font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--tx)] leading-[1.06] tracking-tight mb-5"
          >
            {BRAND.headline}
          </h1>

          <p className="hero-reveal text-[var(--tx2)] text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-8">
            {BRAND.subheadline}
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              as="a"
              href="#clients"
              onClick={(e) => onNavigate && onNavigate(e, 'clients')}
              variant="primary"
              size="lg"
            >
              <span>Explore Roster</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <Button
              as="a"
              href="#brands"
              onClick={(e) => onNavigate && onNavigate(e, 'brands')}
              variant="ghost"
              size="lg"
            >
              Start a Brief
            </Button>
          </div>

          <div className="hero-reveal flex items-center gap-6 mt-10 pt-6 border-t border-[var(--bd)] text-xs text-[var(--tx2)]">
            <div>
              <strong className="text-[var(--tx)] block text-sm">50+ Talents</strong>
              <span>Actors · Musicians · Dancers · Influencers</span>
            </div>
            <div className="w-[1px] h-8 bg-[var(--bd)]" />
            <div>
              <strong className="text-[var(--tx)] block text-sm">5 South States</strong>
              <span>TN · AP · TS · KA · KL</span>
            </div>
            <div className="w-[1px] h-8 bg-[var(--bd)]" />
            <div>
              <strong className="text-[var(--tx)] block text-sm">HQ Chennai</strong>
              <span>Founded 2023 · Self-Owned</span>
            </div>
          </div>
        </div>

        {/* Right 8-Discipline Interactive Card Fan */}
        <div className="relative w-full flex flex-col items-center justify-center">
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center">
            {/* Organic background gradient splash */}
            <div className="absolute -left-[6%] -right-[6%] top-[28%] h-[48%] bg-gradient-to-br from-[var(--go)] via-[var(--or)] to-[var(--am)] -rotate-6 rounded-[38%_8%_34%_6%/16%_30%_14%_26%] opacity-90 blur-[1px] shadow-2xl" />

            {/* Cards container */}
            <div ref={fanRef} className="relative w-full h-full">
              {visibleCards.map(({ card, cardIndex, slotIndex, k }) => {
                const r = rotations[slotIndex];
                const y = yOffsets[slotIndex];
                const z = zIndices[slotIndex];
                const isCenter = k === 0;

                return (
                  <button
                    key={card.id}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveServiceIndex(cardIndex);
                      } else if (onNavigate) {
                        onNavigate(null, 'services');
                      }
                    }}
                    className={`fan-card absolute left-1/2 top-[8%] w-[clamp(135px,27vw,195px)] p-0 overflow-hidden cursor-pointer text-left bg-[var(--surf)] border rounded-2xl shadow-2xl transition-all duration-300 ease-out group focus-visible:outline-2 focus-visible:outline-[var(--go)] ${
                      isCenter
                        ? 'border-[var(--or)] shadow-[0_0_30px_rgba(232,114,12,0.45)]'
                        : 'border-[var(--bd)]'
                    }`}
                    style={{
                      transform: `translateX(calc(-50% + 46% * ${k})) translateY(${y}px) rotate(${r}deg)`,
                      zIndex: z,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `translateX(calc(-50% + 46% * ${k})) translateY(-20px) rotate(0deg)`;
                      e.currentTarget.style.zIndex = '20';
                      e.currentTarget.style.boxShadow = '0 0 35px rgba(232, 114, 12, 0.55)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `translateX(calc(-50% + 46% * ${k})) translateY(${y}px) rotate(${r}deg)`;
                      e.currentTarget.style.zIndex = z.toString();
                      e.currentTarget.style.boxShadow = isCenter
                        ? '0 0 30px rgba(232,114,12,0.45)'
                        : '';
                    }}
                    aria-label={`View ${card.name} service`}
                    title={`Click to view ${card.name}`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--par)] flex items-end justify-start p-2.5 sm:p-3 select-none">
                      <div className="absolute -left-[10%] -right-[10%] top-[30%] h-[48%] bg-gradient-to-br from-[var(--go)] via-[var(--or)] to-[var(--am)] -rotate-7 rounded-[40%_8%_36%_6%/14%_30%_12%_26%]" />
                      <b className="absolute inset-0 flex items-center justify-center font-['Caveat_Brush'] text-[clamp(52px,8vw,78px)] leading-none text-[var(--ink)] tracking-tight">
                        {card.initial}
                      </b>
                      <span className="relative z-10 px-2 py-0.5 rounded-full text-[10px] font-bold font-sans bg-[var(--ink)] text-[var(--par)]">
                        {card.badge}
                      </span>
                    </div>

                    <div className="p-3 bg-[var(--surf)] border-t border-[var(--bd)]">
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[var(--tx)] truncate group-hover:text-[var(--or)] transition-colors">
                        {card.name}
                      </h3>
                      <small className="text-[var(--tx2)] text-[11px] block truncate">
                        {card.tagline}
                      </small>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Discipline Switcher Bar with Left/Right Controls */}
          <div className="relative z-20 w-full mt-2 flex flex-col items-center gap-2.5">
            {/* Quick Keyword Pills for all 8 Services */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xl px-2">
              {HERO_SERVICE_CARDS.map((item, idx) => {
                const isSelected = activeServiceIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveServiceIndex(idx)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--or)] text-[#0f0e0d] font-bold shadow-md scale-105'
                        : 'bg-[var(--surf)] border border-[var(--bd)] text-[var(--tx2)] hover:text-[var(--tx)] hover:border-[var(--or)]/60'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Subtle Prev / Next Buttons */}
            <div className="flex items-center gap-3 text-xs text-[var(--tx2)]">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full bg-[var(--surf)] border border-[var(--bd)] hover:border-[var(--or)] hover:text-[var(--or)] transition-colors cursor-pointer"
                aria-label="Previous discipline card"
                title="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-medium text-[11px]">
                {activeServiceIndex + 1} of {totalCards} · Click card or pill to explore
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full bg-[var(--surf)] border border-[var(--bd)] hover:border-[var(--or)] hover:text-[var(--or)] transition-colors cursor-pointer"
                aria-label="Next discipline card"
                title="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
