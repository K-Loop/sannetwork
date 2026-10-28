import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { PROCESS_STEPS } from '../../data/services';

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-24 border-b border-[var(--bd)] scroll-mt-24">
      <SectionHeading
        eyebrow="Our Methodology"
        title="From Regional Brief to Cultural Resonance"
        subtitle="A disciplined, four-phase execution framework tailored for South Indian entertainment and brand collaborations."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.number}
            className="group relative border-l-4 border-[var(--or)] pl-5 py-2 transition-all duration-300 hover:pl-6"
          >
            <span className="font-['Archivo_Black'] text-xs text-[var(--or)] tracking-widest block uppercase mb-1">
              Step {step.number}
            </span>
            <h3 className="font-serif font-extrabold text-2xl text-[var(--tx)] mb-2 group-hover:text-[var(--or)] transition-colors">
              {step.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[var(--tx2)] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
