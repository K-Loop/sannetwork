import React, { useEffect } from 'react';
import { X, Heart, ArrowUpRight, Play } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import ThemeSwitcher from './ThemeSwitcher';

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  theme,
  onCycleTheme,
  shortlistCount,
  onOpenShortlist,
  onReplayIntro,
}) {
  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div className="relative z-10 w-full bg-[var(--surf)] border-t border-[var(--bd)] rounded-t-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--bd)]">
          <div className="flex items-center gap-3">
            <img
              src="/san-logo.png"
              alt="South Artists Network logo"
              className="w-9 h-9 rounded-full border border-[var(--bd)]"
            />
            <div>
              <span className="font-serif font-bold text-base text-[var(--tx)] block leading-none">
                SAN
              </span>
              <span className="text-[11px] text-[var(--tx2)] font-medium">
                Talent Management
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[var(--bg)] border border-[var(--bd)] text-[var(--tx)] hover:border-[var(--or)] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-2 py-5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  onClose();
                  if (onNavigate) onNavigate(e, link.id);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl font-sans font-semibold text-base transition-colors ${
                  isActive
                    ? 'bg-[var(--or)] text-[#0f0e0d] font-bold shadow-md'
                    : 'text-[var(--tx)] hover:bg-[var(--bg)]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-[#0f0e0d]' : 'text-[var(--tx2)]'}`} />
              </a>
            );
          })}

          {/* Replay Intro Option */}
          {onReplayIntro && (
            <button
              onClick={() => {
                onClose();
                onReplayIntro();
              }}
              className="flex items-center justify-between px-4 py-3 rounded-2xl border border-[var(--bd)] bg-[var(--bg)] hover:border-[var(--or)] text-[var(--tx)] font-semibold text-sm transition-colors cursor-pointer mt-1"
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[var(--or)] fill-current" />
                <span>Watch Intro Reel</span>
              </span>
              <span className="text-[10px] text-[var(--or)] font-bold uppercase tracking-wider bg-[var(--or)]/15 px-2 py-0.5 rounded-full">
                Video
              </span>
            </button>
          )}
        </nav>

        {/* Shortlist status */}
        {shortlistCount > 0 && (
          <div className="mb-4 p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--bd)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[var(--tx)]">
              <Heart className="w-4 h-4 text-[var(--or)] fill-[var(--or)]" />
              <span>
                <strong>{shortlistCount}</strong> artist{shortlistCount > 1 ? 's' : ''} in shortlist
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenShortlist) onOpenShortlist();
              }}
              className="text-xs font-bold text-[var(--or)] underline cursor-pointer"
            >
              View shortlist
            </button>
          </div>
        )}

        {/* Actions footer */}
        <div className="pt-4 border-t border-[var(--bd)] flex items-center justify-between gap-3">
          <ThemeSwitcher theme={theme} onCycleTheme={onCycleTheme} />
          <a
            href="#brands"
            onClick={(e) => {
              onClose();
              if (onNavigate) onNavigate(e, 'brands');
            }}
            className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] font-bold text-sm shadow-md cursor-pointer"
          >
            Start a brief
          </a>
        </div>
      </div>
    </div>
  );
}
