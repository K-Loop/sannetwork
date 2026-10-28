import React, { useMemo } from 'react';
import SectionHeading from '../ui/SectionHeading';
import ArtistCategoryChips from '../artists/ArtistCategoryChips';
import ArtistFilters from '../artists/ArtistFilters';
import ArtistGrid from '../artists/ArtistGrid';
import { ARTISTS } from '../../data/artists';

export default function ArtistsSection({
  shortlist = [],
  onToggleShortlist,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedLanguage,
  onLanguageChange,
  selectedSort,
  onSortChange,
  isShortlistOnly,
  onToggleShortlistOnly,
}) {
  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: ARTISTS.length };
    ARTISTS.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and sort roster
  const filteredArtists = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const matches = ARTISTS.filter((artist) => {
      // Category filter
      if (selectedCategory !== 'All' && artist.category !== selectedCategory) {
        return false;
      }
      // Language filter
      if (selectedLanguage && artist.language !== selectedLanguage) {
        return false;
      }
      // Search query filter (matches name, category, or city)
      if (q) {
        const inName = artist.name.toLowerCase().includes(q);
        const inCity = artist.city.toLowerCase().includes(q);
        const inLang = artist.language.toLowerCase().includes(q);
        if (!inName && !inCity && !inLang) return false;
      }
      // Shortlist only filter
      if (isShortlistOnly && !shortlist.includes(artist.name)) {
        return false;
      }
      return true;
    });

    // Sorting
    return matches.sort((a, b) => {
      if (selectedSort === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (selectedSort === 'er') {
        return b.engagementRate - a.engagementRate;
      }
      // default: reach
      return b.reach - a.reach;
    });
  }, [searchQuery, selectedCategory, selectedLanguage, selectedSort, isShortlistOnly, shortlist]);

  const handleResetFilters = () => {
    onSearchChange('');
    onSelectCategory('All');
    onLanguageChange('');
    onSortChange('reach');
    if (isShortlistOnly) onToggleShortlistOnly();
  };

  return (
    <section id="clients" className="py-20 lg:py-24 border-b border-[var(--bd)] scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <SectionHeading
          eyebrow="Roster & Representation"
          title="Our Talent Roster"
          subtitle="Explore actors, creators, models, and broadcast hosts across Tamil, Telugu, Malayalam, and Kannada audiences."
          className="mb-0"
        />
        <div className="text-xs font-semibold text-[var(--tx2)] shrink-0 pb-1">
          Showing <span className="text-[var(--tx)] font-bold">{filteredArtists.length}</span> of {ARTISTS.length} artists
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="space-y-4 mb-8">
        <ArtistFilters
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
          selectedSort={selectedSort}
          onSortChange={onSortChange}
          isShortlistOnly={isShortlistOnly}
          onToggleShortlistOnly={onToggleShortlistOnly}
          shortlistCount={shortlist.length}
        />

        <ArtistCategoryChips
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* Roster Grid */}
      <ArtistGrid
        artists={filteredArtists}
        shortlist={shortlist}
        onToggleShortlist={onToggleShortlist}
        onResetFilters={handleResetFilters}
      />
    </section>
  );
}
