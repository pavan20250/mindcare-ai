'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { root: null, rootMargin: '200px 0px', threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof (p as Promise<void>).catch === 'function') {
        (p as Promise<void>).catch(() => {
          // Autoplay may be blocked; keep poster visible.
        });
      }
    };

    if (v.readyState >= 2) {
      tryPlay();
      return;
    }

    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, [shouldLoad]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-xl mx-auto transition-transform duration-700 ease-out"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-teal-500/20 rounded-2xl blur-xl" />
      <div className="relative rounded-2xl overflow-hidden bg-black/60 backdrop-blur-sm shadow-2xl shadow-teal-900/20 ring-1 ring-white/10">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Demo
        </div>
        <div
          className={[
            'absolute inset-0 z-[1] transition-opacity duration-300',
            isReady ? 'opacity-0 pointer-events-none' : 'opacity-100',
          ].join(' ')}
          aria-hidden="true"
          style={{
            backgroundImage: 'url(/NeuralCare_logo/website_logo.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <video
          ref={videoRef}
          className="relative z-0 w-full aspect-video object-cover"
          src={shouldLoad ? '/NeuralCare_AI_Intro.mp4' : undefined}
          poster="/NeuralCare_logo/website_logo.png"
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
          aria-label="NeuralCare AI patient journey demo"
          onLoadedData={() => setIsReady(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>
      <p className="mt-3 text-center text-sm text-slate-400 tracking-wide">
        Intake to care matching
      </p>
    </div>
  );
}

