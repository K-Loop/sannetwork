import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import ToastNotification from './components/ui/ToastNotification';
import HeroSection from './components/sections/HeroSection';
import StatsBand from './components/sections/StatsBand';
import ArtistsSection from './components/sections/ArtistsSection';
import ServicesSection from './components/sections/ServicesSection';
import ProcessSection from './components/sections/ProcessSection';
import EnquirySection from './components/sections/EnquirySection';
import VideoModal from './components/ui/VideoModal';
import IntroOverlay from './components/intro/IntroOverlay';
import { useTheme } from './hooks/useTheme';
import { useShortlist } from './hooks/useShortlist';
import { ArrowUpRight } from 'lucide-react';

const SECTION_IDS = ['home', 'clients', 'services', 'process', 'brands'];

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2400);
  }, []);

  const { theme, cycleTheme } = useTheme();
  const { shortlist, toggleShortlist } = useShortlist(showToast);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSort, setSelectedSort] = useState('reach');
  const [isShortlistOnly, setIsShortlistOnly] = useState(false);

  // Intro video transition state
  const [showIntroOverlay, setShowIntroOverlay] = useState(true);

  // Video cinema modal state (for on-demand watching)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Active section tracking for navbar and floating CTA
  const [activeSection, setActiveSection] = useState('home');
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef(null);

  // Complete intro and transition into the website
  const handleCompleteIntro = useCallback(() => {
    setShowIntroOverlay(false);
  }, []);

  // Replay intro video transition on demand
  const handleReplayIntro = useCallback(() => {
    setShowIntroOverlay(true);
  }, []);

  // Programmatic smooth navigation with offset and immediate active tab feedback
  const handleNavigate = useCallback((e, sectionId) => {
    if (e && e.preventDefault) e.preventDefault();
    setActiveSection(sectionId);
    isNavigatingRef.current = true;
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);

    const el = document.getElementById(sectionId);
    if (el) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: 'smooth',
        });
      }
      try {
        window.history.pushState(null, '', `#${sectionId}`);
      } catch {
        // Ignore history pushState restrictions if any
      }
    }
  }, []);

  // Precision scroll spy using getBoundingClientRect() to accurately track active sections
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. If near top of page, home is active
      if (scrollY < 100) {
        setActiveSection('home');
        setShowFloatingPill(false);
        return;
      }

      // 2. If reached bottom of page, brands/contact is active
      if (scrollY + windowHeight >= docHeight - 70) {
        setActiveSection('brands');
        setShowFloatingPill(false);
        return;
      }

      // 3. For each section, find active one using getBoundingClientRect
      const headerThreshold = 140;
      let current = 'home';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerThreshold) {
            current = id;
          }
        }
      }

      setActiveSection(current);
      setShowFloatingPill(current !== 'brands' && scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  // When clicking an artist from the hero fan
  const handleSelectArtistFromFan = useCallback((artist) => {
    setSearchQuery(artist.name);
    setSelectedCategory('All');
    setIsShortlistOnly(false);

    const rosterEl = document.getElementById('clients');
    if (rosterEl) {
      const top = rosterEl.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, []);

  // When clicking View Shortlist from navbar or mobile drawer
  const handleOpenShortlist = useCallback(() => {
    setIsShortlistOnly(true);
    const rosterEl = document.getElementById('clients');
    if (rosterEl) {
      const top = rosterEl.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] font-sans flex flex-col transition-colors duration-200">
      {/* Top Reading/Scroll Progress */}
      <ScrollProgress />

      {/* Main Global Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        theme={theme}
        onCycleTheme={cycleTheme}
        shortlistCount={shortlist.length}
        onOpenShortlist={handleOpenShortlist}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Content Sections (No intro page in home page body) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <HeroSection
          onSelectArtistFromFan={handleSelectArtistFromFan}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onNavigate={handleNavigate}
          isIntroActive={showIntroOverlay}
        />

        <StatsBand />

        <ArtistsSection
          shortlist={shortlist}
          onToggleShortlist={toggleShortlist}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          isShortlistOnly={isShortlistOnly}
          onToggleShortlistOnly={() => setIsShortlistOnly((prev) => !prev)}
        />

        <ServicesSection />

        <ProcessSection />

        <EnquirySection
          shortlist={shortlist}
          onRemoveFromShortlist={toggleShortlist}
          onSubmissionSuccess={() => {
            showToast('Brief generated successfully!');
          }}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onReplayIntro={handleReplayIntro} />

      {/* Floating CTA Pill */}
      {showFloatingPill && (
        <a
          href="#brands"
          onClick={(e) => handleNavigate(e, 'brands')}
          className="fixed right-4 sm:right-6 bottom-[calc(18px+env(safe-area-inset-bottom,0px))] z-30 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] shadow-2xl hover:shadow-[var(--or)]/40 hover:-translate-y-1 transition-all duration-300 animate-fadeIn cursor-pointer"
          aria-label="Start a campaign brief"
        >
          <span>Start a brief</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      )}

      {/* Toast Notification Container */}
      <ToastNotification message={toastMessage} isVisible={toastVisible} />

      {/* Cinema Video Modal (for on-demand viewing) */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/intro.mp4"
      />

      {/* First Intro Video Experience with Cinematic Website Transition */}
      <IntroOverlay
        isOpen={showIntroOverlay}
        onComplete={handleCompleteIntro}
      />
    </div>
  );
}
