import React from 'react';
import { ArrowUp, Mail, MapPin, Globe, Calendar, User } from 'lucide-react';
import { BRAND } from '../../data/siteContent';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  const scrollToTop = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onNavigate) {
      onNavigate(e, 'home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full border-t border-[var(--bd)] bg-[var(--surf)]/60 text-[var(--tx2)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[var(--bd)]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/san-logo.png"
                alt="South Artists Network"
                className="w-10 h-10 rounded-full border border-[var(--bd)]"
              />
              <div>
                <span className="font-serif font-extrabold text-xl text-[var(--tx)] tracking-tight block">
                  {BRAND.name}
                </span>
                <span className="text-[10px] text-[var(--tx2)] font-medium uppercase tracking-wider">
                  Talent Management Company
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-md text-[var(--tx2)]">
              {BRAND.description}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[var(--tx2)]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--tx)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--or)]" />
                {BRAND.headquarters}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[var(--or)]" />
                Founded {BRAND.founded}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3 h-3 text-[var(--or)]" />
                {BRAND.founder}
              </span>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[var(--tx)]">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2 hover:text-[var(--or)] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--or)] shrink-0" />
                  <span>{BRAND.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--or)] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[var(--or)] shrink-0" />
                  <span>{BRAND.website}</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--or)] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[var(--or)] shrink-0" />
                  <span>{BRAND.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--or)] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-[var(--or)] shrink-0" />
                  <span>LinkedIn · 1,300+ followers</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-serif font-bold text-base text-[var(--tx)] mb-3">
                Quick Navigation
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="#home"
                  onClick={(e) => onNavigate && onNavigate(e, 'home')}
                  className="px-3 py-1.5 rounded-full border border-[var(--bd)] bg-[var(--bg)] hover:border-[var(--or)] text-[var(--tx)] transition-colors cursor-pointer"
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={(e) => onNavigate && onNavigate(e, 'services')}
                  className="px-3 py-1.5 rounded-full border border-[var(--bd)] bg-[var(--bg)] hover:border-[var(--or)] text-[var(--tx)] transition-colors cursor-pointer"
                >
                  Services
                </a>
                <a
                  href="#process"
                  onClick={(e) => onNavigate && onNavigate(e, 'process')}
                  className="px-3 py-1.5 rounded-full border border-[var(--bd)] bg-[var(--bg)] hover:border-[var(--or)] text-[var(--tx)] transition-colors cursor-pointer"
                >
                  Process
                </a>
                <a
                  href="#clients"
                  onClick={(e) => onNavigate && onNavigate(e, 'clients')}
                  className="px-3 py-1.5 rounded-full border border-[var(--bd)] bg-[var(--bg)] hover:border-[var(--or)] text-[var(--tx)] transition-colors cursor-pointer"
                >
                  Roster
                </a>
                <a
                  href="#brands"
                  onClick={(e) => onNavigate && onNavigate(e, 'brands')}
                  className="px-3 py-1.5 rounded-full border border-[var(--bd)] bg-[var(--bg)] hover:border-[var(--or)] text-[var(--tx)] transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 self-start text-xs font-bold text-[var(--tx)] hover:text-[var(--or)] transition-colors pt-4 group cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {CURRENT_YEAR} South Artists Network (SAN). All rights reserved.</p>
          <p className="text-[var(--tx2)]/80 text-center sm:text-right">
            Curated talent management · Exclusively South Indian entertainment & creator ecosystems
          </p>
        </div>
      </div>
    </footer>
  );
}
