import { useState, useCallback } from 'react';

const STORAGE_KEY = 'san-sl';

export function useShortlist(onToast) {
  const [shortlist, setShortlist] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to parse shortlist from localStorage', e);
      return [];
    }
  });

  const save = useCallback((newList) => {
    setShortlist(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.warn('Failed to save shortlist to localStorage', e);
    }
  }, []);

  const toggleShortlist = useCallback((artistName) => {
    setShortlist((prev) => {
      const exists = prev.includes(artistName);
      let updated;
      if (exists) {
        updated = prev.filter((name) => name !== artistName);
        if (onToast) onToast(`${artistName} removed from shortlist`);
      } else {
        updated = [...prev, artistName];
        if (onToast) onToast(`${artistName} added to shortlist`);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save shortlist to localStorage', e);
      }
      return updated;
    });
  }, [onToast]);

  const isInShortlist = useCallback((artistName) => {
    return shortlist.includes(artistName);
  }, [shortlist]);

  const clearShortlist = useCallback(() => {
    save([]);
    if (onToast) onToast('Shortlist cleared');
  }, [save, onToast]);

  return {
    shortlist,
    toggleShortlist,
    isInShortlist,
    clearShortlist,
    count: shortlist.length,
  };
}
