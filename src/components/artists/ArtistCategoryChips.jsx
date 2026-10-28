import React from 'react';
import { CATEGORIES } from '../../data/artists';

export default function ArtistCategoryChips({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
}) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none"
      role="tablist"
      aria-label="Filter artists by category"
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        const count = categoryCounts[cat];

        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--go)] ${
              isSelected
                ? 'bg-[var(--or)] text-[#0f0e0d] font-bold shadow-md shadow-[var(--or)]/20 scale-102'
                : 'border border-[var(--bd)] bg-[var(--surf)] text-[var(--tx)] hover:border-[var(--or)]'
            }`}
          >
            {cat}
            {typeof count === 'number' && (
              <span
                className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-black/20 text-[#0f0e0d]' : 'bg-[var(--bd)] text-[var(--tx2)]'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
