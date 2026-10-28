import React from 'react';
import ShortlistButton from './ShortlistButton';
import { formatReach, formatEngagement, getInitials } from '../../utils/formatters';

export default function ArtistCard({
  artist,
  isShortlisted,
  onToggleShortlist,
  onSelectArtist,
}) {
  const initial = getInitials(artist.name);

  return (
    <article
      onClick={() => onSelectArtist && onSelectArtist(artist)}
      className="group relative bg-[var(--surf)] border border-[var(--bd)] hover:border-[var(--or)] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--or)]/15 flex flex-col cursor-pointer"
    >
      {/* Shortlist heart button */}
      <ShortlistButton
        isShortlisted={isShortlisted}
        onClick={onToggleShortlist}
        artistName={artist.name}
      />

      {/* Visual Portrait Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--par)] flex items-end justify-start p-3 sm:p-4 select-none">
        {/* Organic diagonal gradient accent background */}
        <div className="absolute -left-[15%] -right-[15%] top-[25%] h-[55%] bg-gradient-to-br from-[var(--go)] via-[var(--or)] to-[var(--am)] -rotate-7 rounded-[40%_8%_36%_6%/14%_30%_12%_26%] opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-9" />

        {/* Large artistic cursive initial */}
        <div className="absolute inset-0 flex items-center justify-center font-['Caveat_Brush'] text-[clamp(75px,11vw,120px)] leading-none text-[var(--ink)] opacity-95 group-hover:scale-110 transition-transform duration-300">
          {initial}
        </div>

        {/* Category tag pill */}
        <span className="relative z-10 px-3 py-1 rounded-full text-xs font-bold font-sans bg-[var(--ink)] text-[var(--par)] shadow-sm">
          {artist.category}
        </span>
      </div>

      {/* Info & Metrics */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--tx)] leading-snug group-hover:text-[var(--or)] transition-colors">
            {artist.name}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--tx2)] mt-0.5">
            {artist.language} · {artist.city}
          </p>
        </div>

        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold font-sans bg-[var(--go)]/15 text-[var(--go)] border border-[var(--go)]/25">
            <span>{formatReach(artist.reach)} reach</span>
            <span className="opacity-60">•</span>
            <span>{formatEngagement(artist.engagementRate)} ER</span>
          </div>
        </div>
      </div>
    </article>
  );
}
