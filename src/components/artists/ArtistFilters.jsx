import React from 'react';
import { Search, X, Heart, SlidersHorizontal } from 'lucide-react';
import { LANGUAGES, SORT_OPTIONS } from '../../data/artists';

export default function ArtistFilters({
  searchQuery,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  selectedSort,
  onSortChange,
  isShortlistOnly,
  onToggleShortlistOnly,
  shortlistCount,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--tx2)] pointer-events-none" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by artist or creator name..."
          aria-label="Search artists by name"
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--surf)] text-[var(--tx)] text-sm placeholder:text-[var(--tx2)]/70 focus:outline-none focus:border-[var(--or)] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tx2)] hover:text-[var(--tx)]"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Language Select */}
      <div className="relative min-w-[150px]">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          aria-label="Filter by South Indian language"
          className="w-full appearance-none px-4 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--surf)] text-[var(--tx)] text-sm focus:outline-none focus:border-[var(--or)] transition-colors cursor-pointer pr-9"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tx2)]">
          <SlidersHorizontal className="w-3.5 h-3.5 opacity-60" />
        </div>
      </div>

      {/* Sort Select */}
      <div className="relative min-w-[150px]">
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort artists by reach, engagement or name"
          className="w-full appearance-none px-4 py-2.5 rounded-xl border border-[var(--bd)] bg-[var(--surf)] text-[var(--tx)] text-sm focus:outline-none focus:border-[var(--or)] transition-colors cursor-pointer pr-9"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tx2)]">
          <SlidersHorizontal className="w-3.5 h-3.5 opacity-60" />
        </div>
      </div>

      {/* Shortlist Filter Toggle */}
      <button
        onClick={onToggleShortlistOnly}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
          isShortlistOnly
            ? 'bg-[var(--or)] text-[#0f0e0d] border-[var(--or)] font-bold shadow-md'
            : 'border-[var(--bd)] bg-[var(--surf)] text-[var(--tx)] hover:border-[var(--or)]'
        }`}
        aria-pressed={isShortlistOnly}
        aria-label={`Toggle shortlist view (${shortlistCount} shortlisted)`}
      >
        <Heart
          className={`w-4 h-4 ${
            isShortlistOnly ? 'fill-current text-[#0f0e0d]' : 'text-[var(--or)]'
          }`}
        />
        <span>Shortlist ({shortlistCount})</span>
      </button>
    </div>
  );
}
