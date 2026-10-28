import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[var(--go)] via-[var(--or)] to-[var(--am)] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
