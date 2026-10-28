/**
 * Form validation utilities for the enquiry wizard
 */

export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validateStep(step, data) {
  const errors = {};

  if (step === 0) {
    if (!data.goal || !data.goal.trim()) {
      errors.goal = 'Please select a campaign or engagement objective.';
    }
  } else if (step === 1) {
    if (!data.budget || !data.budget.trim()) {
      errors.budget = 'Please select an estimated budget range.';
    }
  } else if (step === 2) {
    if (!data.name || !data.name.trim()) {
      errors.name = 'Please provide your name or brand representative name.';
    }
    if (!data.email || !data.email.trim()) {
      errors.email = 'Please provide a valid contact email.';
    } else if (!validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address (e.g., name@brand.com).';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
