import Link from 'next/link';
import HeroVideo from './HeroVideo';

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
            <div className="mb-7 sm:mb-9">
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
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-px block"
                    style={{ background: 'linear-gradient(90deg, rgba(45,212,191,0.5), rgba(103,232,249,0.2), transparent)' }}
                  />
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.4rem] font-bold tracking-[-0.025em] leading-[1.15] text-white mb-4 sm:mb-5">
              Care that{' '}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #5eead4, #67e8f9 50%, #2dd4bf)' }}
                >
                  understands
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(94,234,212,0.45), transparent)' }}
                />
              </span>
            </h1>

            {/* Feature pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-7 sm:mb-8">
              {[
                { icon: '⚡', label: 'Intelligent intake' },
                { icon: '◎', label: 'Instant insights' },
                { icon: '↗', label: 'Better outcomes' },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.72rem] font-medium text-slate-300 border border-white/[0.08] bg-white/[0.04]"
                >
                  <span className="text-teal-400 text-[0.7rem]">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mb-7 sm:mb-9">
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
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
              {[{ label: 'HIPAA Compliant' }, { label: 'DSM-5 Aligned' }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-slate-400">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md border border-teal-500/25 bg-teal-500/[0.08] shrink-0">
                    <svg className="h-3 w-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-slate-400 font-medium tracking-wide text-xs sm:text-[0.8rem]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
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