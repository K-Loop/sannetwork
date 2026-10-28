import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col mb-8 md:mb-12 ${alignStyles[align] || alignStyles.left} ${className}`}>
      {eyebrow && (
        <span className="font-['Caveat_Brush'] text-[var(--or)] text-2xl md:text-3xl tracking-wide mb-1 font-normal select-none">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--tx)] leading-[1.1] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--tx2)] text-base sm:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
