import React from 'react';
import { Heart } from 'lucide-react';

export default function ShortlistButton({
  isShortlisted,
  onClick,
  artistName,
  className = '',
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick(artistName);
      }}
      className={`absolute top-3 right-3 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-[var(--go)] ${
        isShortlisted
          ? 'bg-[var(--or)] text-[#0f0e0d] scale-105 shadow-[var(--or)]/40'
          : 'bg-[#0f0e0d]/75 backdrop-blur-sm text-white/90 hover:text-[var(--or)] hover:scale-105'
      } ${className}`}
      aria-label={`${isShortlisted ? 'Remove from' : 'Add to'} shortlist: ${artistName}`}
      aria-pressed={isShortlisted}
      title={isShortlisted ? 'Remove from shortlist' : 'Add to brief shortlist'}
    >
      <Heart
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-150 ${
          isShortlisted ? 'fill-current scale-110' : ''
        }`}
      />
    </button>
  );
}
