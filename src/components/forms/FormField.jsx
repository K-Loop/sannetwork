import React from 'react';

export default function FormField({
  label,
  id,
  error,
  helperText,
  required = false,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="font-sans font-semibold text-sm text-[var(--tx)] flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-[var(--or)]">*</span>}
          </span>
          {helperText && (
            <span className="text-xs font-normal text-[var(--tx2)]">
              {helperText}
            </span>
          )}
        </label>
      )}
      {children}
      {error && (
        <span className="text-xs font-medium text-[var(--or)]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
