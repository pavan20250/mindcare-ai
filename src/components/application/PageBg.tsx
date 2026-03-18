import type { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function PageBackground({ children, className = '' }: PageBackgroundProps) {
  return (
    <div className={`relative min-h-full overflow-hidden bg-[#f2f2f7] ${className}`}>

      {/* ── Ambient iOS background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>

        {/* Base warm-white iOS canvas */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] via-[#eef2f7] to-[#e8f0f5]" />

        {/* Top-left teal orb */}
        <div
          className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(45,212,191,0.35) 0%, rgba(99,222,200,0.18) 40%, transparent 70%)',
            filter: 'blur(48px)',
          }}
        />

        {/* Top-right sky / periwinkle orb */}
        <div
          className="absolute -top-24 right-[-80px] w-[420px] h-[420px] rounded-full opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(125,173,255,0.38) 0%, rgba(147,197,253,0.18) 45%, transparent 70%)',
            filter: 'blur(52px)',
          }}
        />

        {/* Mid-left emerald accent */}
        <div
          className="absolute top-[35%] -left-20 w-[300px] h-[300px] rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Bottom-centre cool-mint orb */}
        <div
          className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[640px] h-[380px] rounded-full opacity-45"
          style={{
            background:
              'radial-gradient(ellipse, rgba(94,234,212,0.28) 0%, rgba(147,197,253,0.14) 50%, transparent 70%)',
            filter: 'blur(56px)',
          }}
        />

        {/* Bottom-right rose whisper */}
        <div
          className="absolute bottom-20 -right-32 w-[360px] h-[360px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(251,113,133,0.28) 0%, rgba(253,164,175,0.12) 45%, transparent 68%)',
            filter: 'blur(44px)',
          }}
        />

        {/* Subtle grain — gives iOS "frosted" depth */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '160px',
          }}
        />
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}