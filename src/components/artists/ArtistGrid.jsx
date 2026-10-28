import React from 'react';
import ArtistCard from './ArtistCard';
import EmptyState from '../ui/EmptyState';

export default function ArtistGrid({
  artists = [],
  shortlist = [],
  onToggleShortlist,
  onSelectArtist,
  onResetFilters,
}) {
  if (artists.length === 0) {
    return (
      <EmptyState
        title="No artists match your criteria"
        message="We couldn't find any artists matching the current category, search, or language filter. Try clearing or expanding your selection."
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div
      id="artist-grid-container"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5"
    >
      {artists.map((artist) => (
        <ArtistCard
          key={artist.id || artist.name}
          artist={artist}
          isShortlisted={shortlist.includes(artist.name)}
          onToggleShortlist={onToggleShortlist}
          onSelectArtist={onSelectArtist}
        />
      ))}
    </div>
  );
}
