import React, { useState } from 'react';
import CampaignStep from './CampaignStep';
import BudgetStep from './BudgetStep';
import ContactStep from './ContactStep';
import SubmissionSuccess from './SubmissionSuccess';
import Button from '../ui/Button';
import { validateStep } from '../../utils/validation';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

const INITIAL_FORM = {
  goal: 'Influencer Campaign',
  budget: 'Under ₹1 Lakh',
  timeline: '',
  name: '',
  email: '',
  notes: '',
};

export default function EnquiryWizard({
  shortlist = [],
  onRemoveFromShortlist,
  onSubmissionSuccess,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleNext = () => {
    const { isValid, errors: stepErrors } = validateStep(currentStep, formData);
    if (!isValid) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep === 2) {
      // Simulate submission
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setCurrentStep(3);
        if (onSubmissionSuccess) {
          onSubmissionSuccess(formData);
        }
      }, 700);
    } else {
      setErrors({});
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setCurrentStep(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[var(--surf)] border border-[var(--bd)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl transition-all duration-300">
      {/* 3 Step progress bars */}
      {currentStep < 3 && (
        <div className="flex gap-2 mb-8" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={3}>
          {[0, 1, 2].map((stepIdx) => {
            const isCompletedOrActive = stepIdx <= currentStep;
            return (
              <div
                key={stepIdx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  isCompletedOrActive
                    ? 'bg-gradient-to-r from-[var(--go)] to-[var(--or)]'
                    : 'bg-[var(--bd)]'
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Step Content */}
      <div className="min-h-[300px]">
        {currentStep === 0 && (
          <CampaignStep
            formData={formData}
            onChange={handleFieldChange}
            errors={errors}
            shortlist={shortlist}
            onRemoveFromShortlist={onRemoveFromShortlist}
          />
        )}

        {currentStep === 1 && (
          <BudgetStep
            formData={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <ContactStep
            formData={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <SubmissionSuccess
            formData={formData}
            shortlist={shortlist}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 3 && (
        <div className="flex items-center justify-between gap-3 pt-8 mt-8 border-t border-[var(--bd)]">
          {currentStep > 0 ? (
            <Button
              variant="ghost"
              size="md"
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={handleNext}
            loading={isSubmitting}
          >
            {currentStep === 2 ? (
              <>
                <span>Send Brief</span>
                <Send className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
