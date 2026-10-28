import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ToastNotification({ message, isVisible }) {
  if (!isVisible && !message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-1/2 bottom-[calc(90px+env(safe-area-inset-bottom,0px))] md:bottom-12 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ease-out flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--surf)] border border-[var(--or)] text-[var(--tx)] shadow-2xl backdrop-blur-md text-sm font-semibold ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95'
      }`}
    >
      <span className="w-2 h-2 rounded-full bg-[var(--or)] animate-ping" />
      <Sparkles className="w-4 h-4 text-[var(--go)] shrink-0" />
      <span>{message}</span>
    </div>
  );
}
