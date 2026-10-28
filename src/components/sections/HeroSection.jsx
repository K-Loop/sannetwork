import React, { useRef, useEffect } from 'react';
import { ARTISTS } from '../../data/artists';
import { BRAND } from '../../data/siteContent';
import { getInitials } from '../../utils/formatters';
import { gsap } from '../../animations/gsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../ui/Button';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

export default function HeroSection({
  onSelectArtistFromFan,
  onOpenVideoModal,
  onNavigate,
  isIntroActive = false,
}) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const fanRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Top 5 featured artists for the fan
  const fanArtists = ARTISTS.slice(0, 5);
  const rotations = [-14, -7, 0, 7, 14];
  const yOffsets = [34, 10, 0, 10, 34];
  const zIndices = [1, 2, 4, 3, 2];

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

            <button
              type="button"
              onClick={onOpenVideoModal}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-bold bg-[var(--surf)] border border-[var(--bd)] text-[var(--tx)] hover:border-[var(--or)] hover:text-[var(--or)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
              aria-label="Watch South Artists Network Intro Video Reel"
            >
              <span className="w-6 h-6 rounded-full bg-[var(--or)]/15 text-[var(--or)] flex items-center justify-center group-hover:bg-[var(--or)] group-hover:text-[#0f0e0d] transition-colors">
                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
              </span>
              <span>Watch Intro Reel</span>
            </button>

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

        {/* Right 5-Card Interactive Fan */}
        <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
          {/* Organic background gradient splash */}
          <div className="absolute -left-[6%] -right-[6%] top-[28%] h-[48%] bg-gradient-to-br from-[var(--go)] via-[var(--or)] to-[var(--am)] -rotate-6 rounded-[38%_8%_34%_6%/16%_30%_14%_26%] opacity-90 blur-[1px] shadow-2xl" />

          {/* Cards container */}
          <div ref={fanRef} className="relative w-full h-full">
            {fanArtists.map((artist, idx) => {
              const k = idx - 2;
              const r = rotations[idx];
              const y = yOffsets[idx];
              const z = zIndices[idx];
              const initial = getInitials(artist.name);

              return (
                <button
                  key={artist.id}
                  onClick={() => onSelectArtistFromFan && onSelectArtistFromFan(artist)}
                  className="fan-card absolute left-1/2 top-[8%] w-[clamp(130px,28vw,200px)] p-0 overflow-hidden cursor-pointer text-left bg-[var(--surf)] border border-[var(--bd)] rounded-2xl shadow-2xl transition-all duration-300 ease-out group focus-visible:outline-2 focus-visible:outline-[var(--go)]"
                  style={{
                    transform: `translateX(calc(-50% + 46% * ${k})) translateY(${y}px) rotate(${r}deg)`,
                    zIndex: z,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `translateX(calc(-50% + 46% * ${k})) translateY(-22px) rotate(0deg)`;
                    e.currentTarget.style.zIndex = '20';
                    e.currentTarget.style.boxShadow = '0 0 35px rgba(232, 114, 12, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translateX(calc(-50% + 46% * ${k})) translateY(${y}px) rotate(${r}deg)`;
                    e.currentTarget.style.zIndex = z.toString();
                    e.currentTarget.style.boxShadow = '';
                  }}
                  aria-label={`View ${artist.name} (${artist.category}) in talent roster`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--par)] flex items-end justify-start p-2.5 sm:p-3 select-none">
                    <div className="absolute -left-[10%] -right-[10%] top-[30%] h-[48%] bg-gradient-to-br from-[var(--go)] via-[var(--or)] to-[var(--am)] -rotate-7 rounded-[40%_8%_36%_6%/14%_30%_12%_26%]" />
                    <b className="absolute inset-0 flex items-center justify-center font-['Caveat_Brush'] text-[clamp(60px,10vw,90px)] leading-none text-[var(--ink)]">
                      {initial}
                    </b>
                    <span className="relative z-10 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-sans bg-[var(--ink)] text-[var(--par)]">
                      {artist.category}
                    </span>
                  </div>

                  <div className="p-3 bg-[var(--surf)] border-t border-[var(--bd)]">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[var(--tx)] truncate group-hover:text-[var(--or)] transition-colors">
                      {artist.name}
                    </h3>
                    <small className="text-[var(--tx2)] text-xs block">
                      {artist.language} · {artist.city}
                    </small>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
