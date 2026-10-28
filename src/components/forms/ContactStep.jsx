import React from 'react';
import FormField from './FormField';

export default function ContactStep({ formData, onChange, errors = {} }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--tx)]">
          Contact Information & Brief Notes
        </h3>
        <p className="text-xs sm:text-sm text-[var(--tx2)] mt-1">
          Our talent management team replies with a verified proposal within one working day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Your Name or Organization"
          id="contact-name"
          error={errors.name}
          required
        >
          <input
            id="contact-name"
            type="text"
            value={formData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="e.g. Ananya Rao / Brand Marketing"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-none focus:border-[var(--or)] transition-colors placeholder:text-[var(--tx2)]/60"
          />
        </FormField>

        <FormField
          label="Official Email Address"
          id="contact-email"
          error={errors.email}
          required
        >
          <input
            id="contact-email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="name@company.com"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-none focus:border-[var(--or)] transition-colors placeholder:text-[var(--tx2)]/60"
          />
        </FormField>
      </div>

      <FormField
        label="Campaign Notes or Deliverable Requirements"
        id="contact-notes"
        helperText="Optional"
      >
        <textarea
          id="contact-notes"
          rows={3}
          value={formData.notes || ''}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Specify desired deliverables (e.g. 2 Reels, 1 static post, launch event appearance, or specific language focus)..."
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-none focus:border-[var(--or)] transition-colors placeholder:text-[var(--tx2)]/60 resize-none"
        />
      </FormField>

      <div className="text-xs text-[var(--tx2)]/80 flex items-center justify-between pt-1 border-t border-[var(--bd)]">
        <span>🔒 Confidential brand enquiry</span>
        <span>Agency SLA: Response in &lt; 24h</span>
      </div>
    </div>
  );
}
