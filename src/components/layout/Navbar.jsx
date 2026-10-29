import React, { useState } from 'react';
import { Menu, Heart } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import MobileMenu from './MobileMenu';

export default function Navbar({
  activeSection,
  onNavigate,
  theme,
  onCycleTheme,
  shortlistCount,
  onOpenShortlist,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg)]/90 border-b border-[var(--bd)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <a
          href="#home"
          onClick={(e) => onNavigate && onNavigate(e, 'home')}
          className="flex items-center gap-3.5 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--go)] rounded-full p-1"
          aria-label="South Artists Network home"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--bd)] group-hover:border-[var(--or)] transition-colors shadow-sm">
            <img
              src="/san-logo.png"
              alt="South Artists Network"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-extrabold text-lg sm:text-xl text-[var(--tx)] tracking-tight leading-none">
              South Artists Network
            </span>
            <span className="text-[11px] font-sans text-[var(--tx2)] font-medium tracking-wide uppercase mt-1">
              Talent Management · Exclusively South
            </span>
          </div>
        </a>

        {/* Desktop navigation tabs */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => onNavigate && onNavigate(e, link.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[var(--tx)] bg-[var(--surf)] shadow-sm'
                    : 'text-[var(--tx2)] hover:text-[var(--tx)] hover:bg-[var(--surf)]/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[var(--or)] rounded-full shadow-[0_0_8px_rgba(232,114,12,0.8)] transition-all duration-300" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right action group */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Shortlist button */}
          <button
            onClick={onOpenShortlist}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              shortlistCount > 0
                ? 'bg-[var(--or)]/15 border-[var(--or)] text-[var(--tx)] shadow-sm'
                : 'border-[var(--bd)] bg-[var(--surf)] text-[var(--tx2)] hover:text-[var(--tx)] hover:border-[var(--or)]'
            }`}
            aria-label={`Shortlist: ${shortlistCount} artists selected`}
            title="View shortlisted talent"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                shortlistCount > 0
                  ? 'text-[var(--or)] fill-[var(--or)]'
                  : 'text-[var(--tx2)]'
              }`}
            />
            <span className="hidden sm:inline">Shortlist</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
                shortlistCount > 0
                  ? 'bg-[var(--or)] text-[#0f0e0d]'
                  : 'bg-[var(--bd)] text-[var(--tx2)]'
              }`}
            >
              {shortlistCount}
            </span>
          </button>

          {/* Theme switcher */}
          <div className="hidden sm:block">
            <ThemeSwitcher theme={theme} onCycleTheme={onCycleTheme} />
          </div>

          {/* CTA Button */}
          <a
            href="#brands"
            onClick={(e) => onNavigate && onNavigate(e, 'brands')}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] shadow-sm hover:shadow-md hover:shadow-[var(--or)]/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Start a brief
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-[var(--surf)] border border-[var(--bd)] text-[var(--tx)] hover:border-[var(--or)] focus-visible:outline-2 focus-visible:outline-[var(--go)] cursor-pointer"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={onNavigate}
        theme={theme}
        onCycleTheme={onCycleTheme}
        shortlistCount={shortlistCount}
        onOpenShortlist={onOpenShortlist}
      />
    </header>
  );
}
