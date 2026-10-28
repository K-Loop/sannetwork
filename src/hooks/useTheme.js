import { useState, useEffect, useCallback } from 'react';

export const THEMES = [
  { id: 'dark', label: 'Dark Cinematic', icon: 'Moon' },
  { id: 'light', label: 'Light Editorial', icon: 'Sun' },
  { id: 'temple', label: 'Terracotta Ochre', icon: 'Flame' },
];

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem('san-theme');
      if (saved && (saved === 'dark' || saved === 'light' || saved === 'temple')) {
        return saved;
      }
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const applyTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('san-theme', newTheme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage', e);
    }
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    root.style.colorScheme = newTheme === 'light' ? 'light' : 'dark';
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
  }, [theme]);

  const cycleTheme = useCallback(() => {
    const currentIndex = THEMES.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    applyTheme(THEMES[nextIndex].id);
  }, [theme, applyTheme]);

  return {
    theme,
    setTheme: applyTheme,
    cycleTheme,
    themes: THEMES,
    isDark: theme === 'dark' || theme === 'temple',
  };
}
