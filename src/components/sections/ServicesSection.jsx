import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { SERVICES } from '../../data/services';
import { Users, Sparkles, TrendingUp, Camera, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Users,
  Sparkles,
  TrendingUp,
  Camera,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-24 border-b border-[var(--bd)] scroll-mt-24">
      <SectionHeading
        eyebrow="What We Do"
        title="Four Services. One Unified Agency."
        subtitle="Each practice is engineered around the artist's integrity first and brand effectiveness second."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {SERVICES.map((service) => {
          const Icon = iconMap[service.icon] || Sparkles;

          return (
            <div
              key={service.id}
              className="group relative bg-[var(--par)] text-[var(--ink)] rounded-t-lg rounded-b-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[var(--or)]/20"
            >
              {/* Paper header */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--ink)]/10 text-[var(--ink)] flex items-center justify-center transition-colors group-hover:bg-[var(--or)] group-hover:text-[#0f0e0d]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--ink)]/40 group-hover:text-[var(--or)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="font-serif font-bold text-xl text-[var(--ink)] mb-3 leading-snug">
                  {service.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[var(--ink)]/80 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom highlight pill */}
              <div className="mt-6 pt-4 border-t border-[var(--ink)]/15">
                <p className="font-sans text-xs font-bold text-[var(--ink)]">
                  {service.highlight}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
