import React from 'react';
import { Moon, Sun, Flame } from 'lucide-react';

export default function ThemeSwitcher({ theme, onCycleTheme, className = '' }) {
  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4 text-[var(--or)]" />;
      case 'temple':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'dark':
      default:
        return <Moon className="w-4 h-4 text-[var(--go)]" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Editorial';
      case 'temple':
        return 'Terracotta';
      case 'dark':
      default:
        return 'Cinematic Dark';
    }
  };

  return (
    <button
      onClick={onCycleTheme}
      type="button"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--bd)] bg-[var(--surf)] hover:border-[var(--or)] text-[var(--tx)] text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--go)] ${className}`}
      aria-label={`Switch theme (currently ${getLabel()})`}
      title={`Current: ${getLabel()} — Click to cycle themes`}
    >
      {getIcon()}
      <span className="hidden sm:inline capitalize">{getLabel()}</span>
    </button>
  );
}
