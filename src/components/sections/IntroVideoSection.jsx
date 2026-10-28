import React, { useRef, useState, useEffect } from 'react';
import SectionHeading from '../ui/SectionHeading';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Film, Sparkles, ExternalLink, RotateCcw } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';

export default function IntroVideoSection({ onOpenVideoModal }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-play muted video when scrolled into view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Autoplay muted preview
            video.muted = true;
            setIsMuted(true);
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    setHasInteracted(true);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    setHasInteracted(true);
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
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
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    videoRef.current.muted = newVolume === 0;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="showreel" className="py-16 lg:py-24 relative">
      <SectionHeading
        kicker="OFFICIAL SHOWREEL · SOUTH ARTISTS NETWORK"
        title="SAN in Motion"
        description="Experience the vibrancy, cultural resonance, and storytelling powerhouse of South India's top actors, musicians, creators, and dancers."
      />

      {/* Video Container with Dynamic Ambient Backlight Glow */}
      <div className="relative max-w-5xl mx-auto mt-10">
        {/* Cinematic ambient colorful glow */}
        <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-[var(--go)]/25 via-[var(--or)]/35 to-[var(--am)]/25 rounded-3xl blur-3xl opacity-70 pointer-events-none -z-10" />

        <div
          ref={containerRef}
          className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-[var(--bd)] shadow-2xl group transition-all duration-300"
        >
          {/* Top Floating Badges */}
          <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold pointer-events-auto">
              <Film className="w-3.5 h-3.5 text-[var(--or)]" />
              <span>Agency Reel</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Unmute quick prompt if currently muted */}
              {isMuted && (
                <button
                  onClick={toggleMute}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--or)] text-[#0f0e0d] text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer animate-bounce"
                  aria-label="Unmute audio"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Tap for Sound</span>
                </button>
              )}

              {onOpenVideoModal && (
                <button
                  onClick={onOpenVideoModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md border border-white/15 hover:border-[var(--or)] transition-all cursor-pointer"
                  title="Expand to Cinema Mode"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--or)]" />
                  <span className="hidden sm:inline">Cinema Mode</span>
                </button>
              )}
            </div>
          </div>

          {/* HTML5 Video */}
          <video
            ref={videoRef}
            src="/intro.mp4"
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            loop
            playsInline
            muted={isMuted}
            preload="metadata"
          />

          {/* Center Play Button Overlay (when paused) */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
              onClick={togglePlay}
            >
              <button
                type="button"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
                aria-label="Play Intro Video"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
              </button>
            </div>
          )}

          {/* Bottom Integrated Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
            {/* Scrubber Timeline */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[var(--or)] focus:outline-none"
              style={{
                background: `linear-gradient(to right, var(--or) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
              }}
              aria-label="Video seek slider"
            />

            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1 text-white hover:text-[var(--or)] transition-colors focus:outline-none cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  )}
                </button>

                <button
                  onClick={restartVideo}
                  className="p-1 text-white hover:text-[var(--or)] transition-colors focus:outline-none cursor-pointer"
                  aria-label="Replay video"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="p-1 text-white hover:text-[var(--or)] transition-colors focus:outline-none cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-18 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-[var(--or)] hidden sm:inline-block"
                    aria-label="Volume slider"
                  />
                </div>

                <span className="text-white/70 font-mono text-[11px] sm:text-xs">
                  {formatDuration(currentTime)} / {formatDuration(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-1 text-white hover:text-[var(--or)] transition-colors focus:outline-none cursor-pointer"
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Value Proposition Cards under video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          <div className="p-5 rounded-2xl bg-[var(--surf)] border border-[var(--bd)] hover:border-[var(--or)]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-[var(--or)]/15 text-[var(--or)] flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--tx)] mb-1">
              50+ Verified Talents
            </h4>
            <p className="text-xs text-[var(--tx2)] leading-relaxed">
              Curated representation across cinema actors, indie musicians, classical dancers, and viral influencers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surf)] border border-[var(--bd)] hover:border-[var(--or)]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-[var(--or)]/15 text-[var(--or)] flex items-center justify-center mb-3">
              <Film className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--tx)] mb-1">
              TVC & DVC Production
            </h4>
            <p className="text-xs text-[var(--tx2)] leading-relaxed">
              High-production-value video commercials, digital-first campaign creative, and movie marketing tie-ins.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surf)] border border-[var(--bd)] hover:border-[var(--or)]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-[var(--or)]/15 text-[var(--or)] flex items-center justify-center mb-3">
              <span className="font-serif font-black text-sm">5★</span>
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--tx)] mb-1">
              5 Southern States
            </h4>
            <p className="text-xs text-[var(--tx2)] leading-relaxed">
              Native cultural fluency across Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, and Kerala markets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
