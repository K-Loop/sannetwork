import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  icon: Icon,
  disabled = false,
  loading = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-2 focus-visible:outline-[var(--go)] focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-3 text-sm md:text-base',
    lg: 'px-7 py-3.5 text-base md:text-lg',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] shadow-md hover:shadow-lg hover:shadow-[var(--or)]/30 hover:-translate-y-0.5 active:scale-98',
    ghost:
      'bg-transparent text-[var(--tx)] border-1.5 border-[var(--or)] hover:bg-[var(--or)]/15 active:scale-98',
    subtle:
      'bg-[var(--surf)] text-[var(--tx)] border border-[var(--bd)] hover:border-[var(--or)] active:scale-98',
    chip:
      'border-1.5 border-[var(--bd)] text-[var(--tx)] hover:border-[var(--or)] rounded-full px-4 py-1.5 text-sm',
    activeChip:
      'bg-[var(--or)] text-[#0f0e0d] border-1.5 border-[var(--or)] font-bold rounded-full px-4 py-1.5 text-sm shadow-sm',
  };

  return (
    <Component
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </Component>
  );
}
