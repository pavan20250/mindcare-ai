'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

function HeroVideo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-full max-w-xl mx-auto"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-teal-500/20 rounded-2xl blur-xl" />
      <div className="relative rounded-2xl overflow-hidden bg-black/60 backdrop-blur-sm shadow-2xl shadow-teal-900/20 ring-1 ring-white/10">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Demo
        </div>
        <video
          className="w-full aspect-video object-cover"
          src="/NeuralCare_AI_Intro.mp4"
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          aria-label="NeuralCare AI patient journey demo"
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md mb-6 sm:mb-7"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
              </span>
              <span className="text-teal-300/90 text-[10px] font-semibold tracking-[0.12em] uppercase">
                AI-Powered Behavioral Health
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] text-white mb-3 sm:mb-4"
            >
              Care that{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  understands
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-slate-300/80 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-7 leading-relaxed font-medium"
            >
              Intelligent intake. Instant insights. Better outcomes.
            </motion.p>

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
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:from-teal-400 group-hover:to-teal-500" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
                <span className="relative text-white flex items-center gap-1.5">
                  Get Started
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <Link
                href="/login?next=/dashboard"
                className="group rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center justify-center border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Try Demo
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              {[{ label: 'HIPAA Compliant' }, { label: 'DSM-5 Aligned' }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-slate-400">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10 shrink-0">
                    <svg className="h-3 w-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="font-medium tracking-wide text-xs sm:text-sm">{item.label}</span>
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