import React from 'react';

export default function LoadingState({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[var(--surf)] border border-[var(--bd)] rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="aspect-[4/5] bg-[var(--bd)]/40" />
          <div className="p-3.5 space-y-2.5">
            <div className="h-4 bg-[var(--bd)]/60 rounded w-3/4" />
            <div className="h-3 bg-[var(--bd)]/40 rounded w-1/2" />
            <div className="h-5 bg-[var(--bd)]/30 rounded-full w-4/5 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
