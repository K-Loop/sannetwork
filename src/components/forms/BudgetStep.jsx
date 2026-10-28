import React from 'react';
import FormField from './FormField';
import { BUDGET_TIERS } from '../../data/siteContent';

export default function BudgetStep({ formData, onChange, errors = {} }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--tx)]">
          Budget & Timeline Details
        </h3>
        <p className="text-xs sm:text-sm text-[var(--tx2)] mt-1">
          Helps our talent directors prepare customized artist rosters and rate cards.
        </p>
      </div>

      <FormField
        label="Estimated Budget Bracket"
        id="budget-bracket"
        error={errors.budget}
        required
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {BUDGET_TIERS.map((tier) => {
            const isSelected = formData.budget === tier.label;
            return (
              <div
                key={tier.id}
                onClick={() => onChange('budget', tier.label)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[var(--or)] bg-[var(--or)]/10 text-[var(--tx)] shadow-sm'
                    : 'border-[var(--bd)] bg-[var(--bg)] text-[var(--tx2)] hover:border-[var(--or)]/60 hover:text-[var(--tx)]'
                }`}
              >
                <span className="font-semibold text-sm text-[var(--tx)]">
                  {tier.label}
                </span>
                <p className="text-xs text-[var(--tx2)] mt-1 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            );
          })}
        </div>
      </FormField>

      <FormField
        label="Projected Launch Timeline"
        id="timeline"
        helperText="Optional"
      >
        <input
          id="timeline"
          type="text"
          value={formData.timeline || ''}
          onChange={(e) => onChange('timeline', e.target.value)}
          placeholder="e.g. Next month, Festive season, or Immediate"
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--bg)] text-[var(--tx)] text-sm focus:outline-none focus:border-[var(--or)] transition-colors placeholder:text-[var(--tx2)]/60"
        />
      </FormField>
    </div>
  );
}
