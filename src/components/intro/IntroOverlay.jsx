import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, RotateCcw, Sparkles, Film } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';

export default function IntroOverlay({
  isOpen = true,
  onComplete,
  initialMuted = true,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const fadeOutTimeoutRef = useRef(null);

  // Transition into website
  const handleEnterWebsite = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    // Gently fade out audio if playing
    if (videoRef.current && !videoRef.current.muted) {
      try {
        const fadeInterval = setInterval(() => {
          if (videoRef.current && videoRef.current.volume > 0.1) {
            videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.2);
          } else {
            clearInterval(fadeInterval);
            if (videoRef.current) videoRef.current.pause();
          }
        }, 50);
      } catch {
        if (videoRef.current) videoRef.current.pause();
      }
    }

    // Allow 700ms for smooth cinematic fade/scale exit animation
    fadeOutTimeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsExiting(false);
      if (onComplete) {
        onComplete();
      }
    }, 700);
  }, [isExiting, onComplete]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  // Lock body scroll while intro is visible
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Autoplay video when overlay is opened
  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = isMuted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy blocked audio, guarantee muted autoplay
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }

    return () => {
      if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);
    };
  }, [isOpen, isMuted]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        handleEnterWebsite();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleEnterWebsite, togglePlay, toggleMute]);

  const handleRestart = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!isOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0c0b0a] flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting
          ? 'opacity-0 scale-[1.03] blur-sm pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      aria-label="South Artists Network Introduction Video"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--or)]/15 via-black to-[var(--go)]/15 pointer-events-none -z-10" />

      {/* Main Video Viewport */}
      <div
        className="relative w-full h-full flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="w-full h-full object-cover sm:object-contain bg-black shadow-2xl"
          playsInline
          autoPlay
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnterWebsite}
        />

        {/* Center Play Indicator when Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] flex items-center justify-center shadow-[0_0_50px_rgba(232,114,12,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Play Intro Video"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* Top Header Controls Bar */}
      <div className="absolute top-0 inset-x-0 z-30 p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between pointer-events-auto">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/20 shadow-lg">
            <img
              src="/san-logo.png"
              alt="South Artists Network"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-extrabold text-base sm:text-lg text-white tracking-tight">
                South Artists Network
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--or)]/20 border border-[var(--or)]/40 text-[var(--or)] text-[10px] font-bold uppercase tracking-wider">
                <Film className="w-2.5 h-2.5" />
                <span>Intro Reel</span>
              </span>
            </div>
            <span className="text-[11px] font-sans text-white/70 font-medium tracking-wide">
              Premier South Indian Talent Management
            </span>
          </div>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Sound Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold backdrop-blur-md transition-all duration-200 cursor-pointer ${
              isMuted
                ? 'bg-[var(--or)] text-[#0f0e0d] shadow-[0_0_20px_rgba(232,114,12,0.5)] animate-pulse hover:scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
            }`}
            aria-label={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            title={isMuted ? 'Click for Sound' : 'Mute'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Tap for Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[var(--or)]" />
                <span>Sound On</span>
              </>
            )}
          </button>

          {/* Enter Website / Skip Intro CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEnterWebsite();
            }}
            className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] font-bold text-xs sm:text-sm shadow-xl hover:shadow-[var(--or)]/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Skip intro and enter South Artists Network website"
          >
            <span>Enter Website</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Timeline and Playback Controls */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-3 pointer-events-auto">
        {/* Progress Bar Scrubber */}
        <div className="relative w-full group/timeline">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.05"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-[var(--or)] focus:outline-none transition-all"
            style={{
              background: `linear-gradient(to right, #f2b134 0%, #e8720c ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
            }}
            aria-label="Video scrubber"
          />
        </div>

        {/* Control items */}
        <div className="flex items-center justify-between text-white text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1.5 text-white hover:text-[var(--or)] transition-colors focus:outline-none cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              )}
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 text-white hover:text-[var(--or)] transition-colors focus:outline-none cursor-pointer"
              aria-label="Replay intro video from beginning"
              title="Replay from start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <span className="text-white/70 font-mono text-[11px] sm:text-xs">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/60 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--go)]" />
              <span>Auto-entering website after intro</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEnterWebsite();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--or)] hover:text-white font-bold transition-colors cursor-pointer"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
