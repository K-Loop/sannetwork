/**
 * Utility formatters for artist metrics and display text
 */

export function formatReach(k) {
  if (typeof k !== 'number' || isNaN(k)) return '0K';
  if (k >= 1000) {
    const m = (k / 1000).toFixed(1);
    return `${m.endsWith('.0') ? m.slice(0, -2) : m}M`;
  }
  return `${k}K`;
}

export function formatEngagement(er) {
  if (typeof er !== 'number' || isNaN(er)) return '0%';
  return `${er}%`;
}

export function getInitials(name) {
  if (!name || typeof name !== 'string') return 'SAN';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function formatDuration(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

