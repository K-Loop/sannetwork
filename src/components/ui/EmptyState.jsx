import React from 'react';
import { SearchX } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No clients match your filter',
  message = 'Try clearing your search query or language filter to explore our full South Indian talent roster.',
  onReset,
}) {
  return (
    <div className="col-span-full py-16 px-6 text-center flex flex-col items-center justify-center bg-[var(--surf)] border border-dashed border-[var(--bd)] rounded-3xl">
      <div className="w-14 h-14 rounded-full bg-[var(--or)]/10 text-[var(--or)] flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-xl font-bold text-[var(--tx)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--tx2)] text-sm md:text-base max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset all filters
        </Button>
      )}
    </div>
  );
}
