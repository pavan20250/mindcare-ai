'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function HeroVideo() {
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

        // Start loading slightly before it fully enters the viewport.
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

    // Attempt autoplay as soon as we decide to load; muted + playsInline
    // is required for iOS/Android autoplay.
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof (p as Promise<void>).catch === 'function') {
        (p as Promise<void>).catch(() => {
          // Autoplay may be blocked in rare cases; keep poster visible.
        });
      }
    };

    // If enough data is already available, play immediately.
    if (v.readyState >= 2) {
      tryPlay();
      return;
    }

    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, [shouldLoad]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-full max-w-xl mx-auto"
      ref={wrapperRef}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-teal-500/20 rounded-2xl blur-xl" />
      <div className="relative rounded-2xl overflow-hidden bg-black/60 backdrop-blur-sm shadow-2xl shadow-teal-900/20 ring-1 ring-white/10">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Demo
        </div>
        {/* Poster overlay while video is loading/initializing (prevents "black flash" on iOS). */}
        <div
          className={[
            'absolute inset-0 z-[1] transition-opacity duration-300',
            isReady ? 'opacity-0 pointer-events-none' : 'opacity-100',
          ].join(' ')}
          aria-hidden="true"
          style={{
            backgroundImage: 'url(/website_logo.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <video
          ref={videoRef}
          className="relative z-0 w-full aspect-video object-cover"
          src={shouldLoad ? '/NeuralCare_AI_Intro.mp4' : undefined}
          poster="/website_logo.png"
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
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-[4.25rem] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center gap-0">

          {/* Text content */}
          <div className="text-center lg:text-left w-full order-1">

            {/* Hero label — primary identity statement */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 sm:mb-9"
            >
              <div className="flex flex-col items-center lg:items-start gap-2">
                {/* Category label */}
                <span
                  className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(94,234,212,0.5)' }}
                >
                  Platform
                </span>

                {/* Main title with ruled underline */}
                <div className="relative">
                  <span
                    className="text-xl sm:text-2xl font-bold tracking-[-0.02em] leading-none"
                    style={{
                      background: 'linear-gradient(100deg, #ffffff 30%, rgba(94,234,212,0.85) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    AI-Powered Behavioral Health
                  </span>
                  {/* Animated underline rule */}
                  <motion.span
                    className="absolute -bottom-1.5 left-0 right-0 h-px block"
                    style={{ background: 'linear-gradient(90deg, rgba(45,212,191,0.5), rgba(103,232,249,0.2), transparent)' }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[1.6rem] sm:text-[2rem] lg:text-[2.4rem] font-bold tracking-[-0.025em] leading-[1.15] text-white mb-4 sm:mb-5"
            >
              Care that{' '}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #5eead4, #67e8f9 50%, #2dd4bf)' }}
                >
                  understands
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(94,234,212,0.45), transparent)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.65 }}
                />
              </span>
            </motion.h1>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-7 sm:mb-8"
            >
              {[
                { icon: '⚡', label: 'Intelligent intake' },
                { icon: '◎', label: 'Instant insights' },
                { icon: '↗', label: 'Better outcomes' },
              ].map((item, i) => (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 + i * 0.07 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.72rem] font-medium text-slate-300 border border-white/[0.08] bg-white/[0.04]"
                >
                  <span className="text-teal-400 text-[0.7rem]">{item.icon}</span>
                  {item.label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-row items-center justify-center lg:justify-start gap-3 mb-7 sm:mb-9"
            >
              <a
                href="#contact"
                className="group relative rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center justify-center overflow-hidden whitespace-nowrap"
              >
                <span
                  className="absolute inset-0 transition-all duration-300 group-hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}
                />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
                <span className="relative text-white flex items-center gap-1.5 z-10">
                  Get Started
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>

              <Link
                href="/login?next=/dashboard"
                className="group rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center justify-center border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.07] hover:border-white/[0.18] transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Try Demo
                </span>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              {[{ label: 'HIPAA Compliant' }, { label: 'DSM-5 Aligned' }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-slate-400">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md border border-teal-500/25 bg-teal-500/[0.08] shrink-0">
                    <svg className="h-3 w-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-slate-400 font-medium tracking-wide text-xs sm:text-[0.8rem]">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Video — below text on mobile, right column on desktop */}
          <div className="relative order-2 w-full mt-10 sm:mt-12 lg:mt-0 flex items-center justify-center">
            <HeroVideo />
          </div>

        </div>
      </div>
    </section>
  );
}