import React from 'react';
import FormField from './FormField';
import { CAMPAIGN_TYPES } from '../../data/siteContent';
import { Sparkles, Heart, X } from 'lucide-react';

export default function CampaignStep({
  formData,
  onChange,
  errors = {},
  shortlist = [],
  onRemoveFromShortlist,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--tx)]">
          What is your campaign objective?
        </h3>
        <p className="text-xs sm:text-sm text-[var(--tx2)] mt-1">
          Select the engagement model that aligns with your brand goals.
        </p>
      </div>

      <FormField
        label="Campaign Type"
        id="campaign-type"
        error={errors.goal}
        required
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {CAMPAIGN_TYPES.map((type) => {
            const isSelected = formData.goal === type.title;
            return (
              <div
                key={type.id}
                onClick={() => onChange('goal', type.title)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[var(--or)] bg-[var(--or)]/10 text-[var(--tx)] shadow-sm'
                    : 'border-[var(--bd)] bg-[var(--bg)] text-[var(--tx2)] hover:border-[var(--or)]/60 hover:text-[var(--tx)]'
                }`}
              >
                <div className="flex items-center justify-between font-semibold text-sm text-[var(--tx)]">
                  <span>{type.title}</span>
                  {isSelected && <Sparkles className="w-4 h-4 text-[var(--or)]" />}
                </div>
                <p className="text-xs text-[var(--tx2)] mt-1.5 leading-relaxed">
                  {type.desc}
                </p>
              </div>
            );
          })}
        </div>
      </FormField>

      {/* Shortlisted Artists Box */}
      <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--bd)]">
        {shortlist.length > 0 ? (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Heart className="w-4 h-4 text-[var(--or)] fill-[var(--or)]" />
              <span className="text-xs sm:text-sm font-bold text-[var(--tx)]">
                Attached to this brief ({shortlist.length}):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {shortlist.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surf)] border border-[var(--bd)] text-[var(--tx)]"
                >
                  <span>{name}</span>
                  {onRemoveFromShortlist && (
                    <button
                      type="button"
                      onClick={() => onRemoveFromShortlist(name)}
                      className="text-[var(--tx2)] hover:text-[var(--or)]"
                      aria-label={`Remove ${name} from brief`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 text-xs text-[var(--tx2)] leading-relaxed">
            <Heart className="w-4 h-4 text-[var(--tx2)] shrink-0 mt-0.5" />
            <span>
              <strong>Tip:</strong> You can shortlist specific artists in the roster section above, and they will automatically be included in your enquiry package.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
