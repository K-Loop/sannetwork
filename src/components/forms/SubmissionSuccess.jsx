import React, { useState } from 'react';
import { CheckCircle2, Mail, Copy, Check, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import { BRAND } from '../../data/siteContent';

export default function SubmissionSuccess({
  formData,
  shortlist = [],
  onReset,
}) {
  const [copied, setCopied] = useState(false);

  const briefSummaryText = `SOUTH ARTISTS NETWORK — BRAND BRIEF
------------------------------------------------
Contact: ${formData.name} (${formData.email})
Objective: ${formData.goal}
Budget: ${formData.budget}
Timeline: ${formData.timeline || 'Flexible'}
Shortlisted Talent: ${shortlist.length ? shortlist.join(', ') : 'None specified'}
Notes: ${formData.notes || 'None'}
------------------------------------------------
Generated via South Artists Network Demo Portal`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoLink = `mailto:${BRAND.email}?subject=${encodeURIComponent(
    `Campaign Brief: ${formData.goal} (${formData.name})`
  )}&body=${encodeURIComponent(briefSummaryText)}`;

  return (
    <div className="py-2 text-left space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--or)]/20 text-[var(--or)] mb-1">
            Demo Portal · Brief Generated
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--tx)]">
            Brief Ready for SAN Agency
          </h3>
        </div>
      </div>

      <p className="text-sm text-[var(--tx2)] leading-relaxed">
        Thank you, <strong>{formData.name}</strong>. Your campaign parameters have been compiled. In production, this delivers directly into SAN’s artist coordination desk at{' '}
        <span className="text-[var(--or)]">{BRAND.email}</span>.
      </p>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--bd)] space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between py-1 border-b border-[var(--bd)]/60">
          <span className="text-[var(--tx2)]">Campaign Type:</span>
          <span className="font-semibold text-[var(--tx)]">{formData.goal}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[var(--bd)]/60">
          <span className="text-[var(--tx2)]">Budget Bracket:</span>
          <span className="font-semibold text-[var(--tx)]">{formData.budget}</span>
        </div>
        {formData.timeline && (
          <div className="flex justify-between py-1 border-b border-[var(--bd)]/60">
            <span className="text-[var(--tx2)]">Launch Timeline:</span>
            <span className="font-semibold text-[var(--tx)]">{formData.timeline}</span>
          </div>
        )}
        <div className="flex justify-between py-1 border-b border-[var(--bd)]/60">
          <span className="text-[var(--tx2)]">Contact Email:</span>
          <span className="font-semibold text-[var(--tx)]">{formData.email}</span>
        </div>
        {shortlist.length > 0 && (
          <div className="py-1">
            <span className="text-[var(--tx2)] block mb-1">Shortlisted Artists:</span>
            <div className="flex flex-wrap gap-1.5">
              {shortlist.map((n) => (
                <span
                  key={n}
                  className="px-2 py-0.5 rounded bg-[var(--surf)] border border-[var(--bd)] text-xs font-medium text-[var(--tx)]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Action buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={mailtoLink}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] font-bold text-xs sm:text-sm shadow-md"
        >
          <Mail className="w-4 h-4" />
          <span>Send via Email Client</span>
        </a>

        <Button
          variant="subtle"
          size="sm"
          onClick={handleCopy}
          className="text-xs sm:text-sm"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Brief' : 'Copy Brief Summary'}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs sm:text-sm ml-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>New Brief</span>
        </Button>
      </div>
    </div>
  );
}
