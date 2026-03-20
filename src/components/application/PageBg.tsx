import type { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function PageBackground({ children, className = '' }: PageBackgroundProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>

      {/* ─── Layer 0: Fixed canvas ─── */}
      <div
        aria-hidden="true"
        className="fixed inset-0"
        style={{
          zIndex: 0,
          /* Luminous near-white base — cooler than #fff, warmer than grey */
          backgroundColor: '#f8f9fd',
        }}
      >

        {/* ─── Layer 1: Chromatic bloom mesh ─── */}
        {/*
         *  Six large orbs arranged like an iOS wallpaper:
         *  soft enough to never overpower content, vivid enough
         *  to feel alive. Each uses a radial gradient with three stops
         *  so the colour feathers smoothly into the base.
         */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `
              /* Cobalt — top-left anchor, dominant cool tone */
              radial-gradient(
                ellipse 70% 60% at 10% 5%,
                rgba(147, 197, 253, 0.28) 0%,
                rgba(147, 197, 253, 0.10) 40%,
                transparent 68%
              ),
              /* Periwinkle — top-centre bridge */
              radial-gradient(
                ellipse 50% 45% at 52% 0%,
                rgba(196, 181, 253, 0.18) 0%,
                rgba(196, 181, 253, 0.06) 48%,
                transparent 70%
              ),
              /* Azure — top-right */
              radial-gradient(
                ellipse 55% 48% at 94% 6%,
                rgba(125, 211, 252, 0.22) 0%,
                rgba(125, 211, 252, 0.07) 48%,
                transparent 70%
              ),
              /* Rose quartz — bottom-right */
              radial-gradient(
                ellipse 55% 50% at 92% 96%,
                rgba(251, 207, 232, 0.22) 0%,
                rgba(251, 207, 232, 0.07) 48%,
                transparent 68%
              ),
              /* Sage — bottom-left */
              radial-gradient(
                ellipse 52% 48% at 6% 96%,
                rgba(167, 243, 208, 0.18) 0%,
                rgba(167, 243, 208, 0.05) 48%,
                transparent 68%
              ),
              /* Warm champagne — centre fill to prevent dead zones */
              radial-gradient(
                ellipse 80% 70% at 50% 50%,
                rgba(254, 243, 199, 0.08) 0%,
                transparent 70%
              )
            `,
            backgroundSize: '100% 100%',
          }}
        />

        {/* ─── Layer 2: Ultra-fine dot grid ─── */}
        {/*
         *  Dot grid (not lines) — far more refined than line grids.
         *  Single radial-gradient dot, 1 px radius.
         *  Opacity dialled down so it only reads at close proximity.
         */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(
              circle,
              rgba(99, 102, 241, 0.12) 1px,
              transparent 1px
            )`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* ─── Layer 3: Noise grain ─── */}
        {/*
         *  SVG turbulence grain for tactile "frosted glass" texture.
         *  Keeps background from feeling flat on hi-DPI screens.
         */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
            mixBlendMode: 'multiply',
          }}
        />

        {/* ─── Layer 4: Depth vignette ─── */}
        {/*
         *  Subtle inward radial shadow — optically lifts the centre
         *  and keeps edge glow from bleeding into content.
         */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(203,213,225,0.18) 100%)',
          }}
        />

        {/* ─── Layer 5: Specular top-edge catch-light ─── */}
        {/*
         *  1 px white hairline at the very top — mimics the physical
         *  polished-glass edge of an iOS device display.
         */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 5%, rgba(255,255,255,0.90) 30%, white 50%, rgba(255,255,255,0.90) 70%, rgba(255,255,255,0.0) 95%, transparent 100%)',
          }}
        />

        {/* ─── Layer 6: Soft top luminance wash ─── */}
        {/*
         *  Short linear gradient from near-white fading down —
         *  like reflected sky light coming through a glass ceiling.
         */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '120px',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ─── Content layer ─── */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>

    </div>
  );
}