import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';

export default function VideoModal({ isOpen, onClose, videoSrc = '/intro.mp4' }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
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
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Lock body scroll and handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset & autoplay when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If browser blocks unmuted autoplay, mute and try again
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
      }
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

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

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  if (!isOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="South Artists Network Showreel"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Blurred Cinema Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

      {/* Modal Dialog Content Container */}
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--or)]/30 shadow-[0_0_80px_rgba(232,114,12,0.25)] flex flex-col justify-between group"
      >
        {/* Top Header Bar */}
        <div
          className={`absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src="/san-logo.png"
              alt="SAN"
              className="w-8 h-8 rounded-full border border-white/20"
            />
            <div>
              <h3 className="text-white text-sm sm:text-base font-bold font-serif tracking-wide drop-shadow-md">
                South Artists Network — Official Reel
              </h3>
              <p className="text-white/60 text-xs">
                Talent Management · South Indian Creators & Cinema
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[var(--or)] text-white hover:text-[#0f0e0d] backdrop-blur-md transition-all duration-200 cursor-pointer focus:outline-none"
            aria-label="Close video modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />

        {/* Big Center Play/Pause indicator when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] text-[#0f0e0d] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-10"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
          </button>
        )}

        {/* Bottom Control Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Timeline Slider */}
          <div className="relative flex items-center group/timeline">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-[var(--or)] focus:outline-none"
              style={{
                background: `linear-gradient(to right, var(--or) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
              }}
              aria-label="Video scrubber"
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            {/* Left Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={togglePlay}
                className="p-1.5 hover:text-[var(--or)] transition-colors focus:outline-none"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={restartVideo}
                className="p-1.5 hover:text-[var(--or)] transition-colors focus:outline-none"
                aria-label="Replay from start"
                title="Replay"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:text-[var(--or)] transition-colors focus:outline-none"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-[var(--or)]"
                  aria-label="Volume slider"
                />
              </div>

              <span className="text-white/70 font-mono text-xs">
                {formatDuration(currentTime)} / {formatDuration(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-1.5 hover:text-[var(--or)] transition-colors focus:outline-none"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
