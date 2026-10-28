import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import EnquiryWizard from '../forms/EnquiryWizard';

export default function EnquirySection({
  shortlist = [],
  onRemoveFromShortlist,
  onSubmissionSuccess,
}) {
  return (
    <section id="brands" className="py-20 lg:py-28 scroll-mt-24">
      <SectionHeading
        eyebrow="Initiate Collaboration"
        title="Start a Campaign Brief"
        subtitle="Outline your campaign objective, target languages, and timeline. Our talent directors reply with tailored roster availability within 24 hours."
        align="center"
      />

      <div className="mt-8">
        <EnquiryWizard
          shortlist={shortlist}
          onRemoveFromShortlist={onRemoveFromShortlist}
          onSubmissionSuccess={onSubmissionSuccess}
        />
      </div>
    </section>
  );
}
