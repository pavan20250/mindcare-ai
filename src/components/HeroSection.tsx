'use client';

import Link from 'next/link';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Canvas-rendered Siri orb with true additive (screen) blending.     */
/*  globalCompositeOperation='screen' guarantees luminous overlaps —   */
/*  something CSS mix-blend-mode can't reliably deliver with filters.  */
/* ------------------------------------------------------------------ */

interface ColorBlob {
  cx: number;
  cy: number;
  radius: number;
  color: [number, number, number];
  color2: [number, number, number];
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  ampX: number;
  ampY: number;
  scaleSpeed: number;
  scaleAmp: number;
}

const blobs: ColorBlob[] = [
  {
    cx: -0.14,
    cy: -0.04,
    radius: 0.42,
    color: [0, 230, 230],
    color2: [0, 200, 255],
    phaseX: 0,
    phaseY: 0.5,
    speedX: 0.32,
    speedY: 0.25,
    ampX: 18,
    ampY: 15,
    scaleSpeed: 0.28,
    scaleAmp: 0.06,
  },
  {
    cx: 0.06,
    cy: 0.16,
    radius: 0.38,
    color: [245, 60, 155],
    color2: [230, 40, 120],
    phaseX: 1.3,
    phaseY: 0.8,
    speedX: 0.24,
    speedY: 0.3,
    ampX: 15,
    ampY: 18,
    scaleSpeed: 0.22,
    scaleAmp: 0.05,
  },
  {
    cx: 0.14,
    cy: -0.1,
    radius: 0.4,
    color: [60, 60, 245],
    color2: [80, 40, 220],
    phaseX: 2.5,
    phaseY: 1.7,
    speedX: 0.28,
    speedY: 0.2,
    ampX: 16,
    ampY: 14,
    scaleSpeed: 0.32,
    scaleAmp: 0.07,
  },
  {
    cx: 0.18,
    cy: -0.2,
    radius: 0.28,
    color: [140, 55, 245],
    color2: [115, 40, 220],
    phaseX: 3.8,
    phaseY: 2.6,
    speedX: 0.2,
    speedY: 0.26,
    ampX: 13,
    ampY: 16,
    scaleSpeed: 0.18,
    scaleAmp: 0.04,
  },
];

function SiriCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let displaySize = 0;
    let frameId: number;

    const resize = () => {
      displaySize = canvas.clientWidth || 300;
      canvas.width = displaySize * dpr;
      canvas.height = displaySize * dpr;
    };
    resize();

    const draw = (time: number) => {
      const s = displaySize;
      const c = s / 2;
      const t = time * 0.001;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, s, s);

      // Dark sphere background
      ctx.beginPath();
      ctx.arc(c, c, c, 0, Math.PI * 2);
      ctx.fillStyle = '#080818';
      ctx.fill();

      // Clip to sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(c, c, c - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // Additive light blending
      ctx.globalCompositeOperation = 'screen';

      // Draw color blobs
      for (const b of blobs) {
        const ox =
          Math.sin(t * b.speedX + b.phaseX) * b.ampX +
          Math.cos(t * b.speedY * 0.7 + b.phaseY) * b.ampX * 0.4;
        const oy =
          Math.cos(t * b.speedY + b.phaseY) * b.ampY +
          Math.sin(t * b.speedX * 0.6 + b.phaseX) * b.ampY * 0.4;

        const bx = c + b.cx * s + ox;
        const by = c + b.cy * s + oy;
        const sc = 1 + Math.sin(t * b.scaleSpeed) * b.scaleAmp;
        const r = b.radius * s * sc;

        // Interpolate color
        const ct = (Math.sin(t * 0.18 + b.phaseX) + 1) / 2;
        const cr = Math.round(b.color[0] + (b.color2[0] - b.color[0]) * ct);
        const cg = Math.round(b.color[1] + (b.color2[1] - b.color[1]) * ct);
        const cb = Math.round(b.color[2] + (b.color2[2] - b.color[2]) * ct);

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},0.94)`);
        grad.addColorStop(0.2, `rgba(${cr},${cg},${cb},0.7)`);
        grad.addColorStop(0.42, `rgba(${cr},${cg},${cb},0.35)`);
        grad.addColorStop(0.68, `rgba(${cr},${cg},${cb},0.08)`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);

        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // White center convergence
      const coreR = s * 0.19;
      const corePulse = 1 + Math.sin(t * 0.6) * 0.08;
      const coreGrad = ctx.createRadialGradient(c, c, 0, c, c, coreR * corePulse);
      coreGrad.addColorStop(0, 'rgba(255,255,255,0.92)');
      coreGrad.addColorStop(0.22, 'rgba(255,255,255,0.45)');
      coreGrad.addColorStop(0.5, 'rgba(255,255,255,0.1)');
      coreGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(c, c, coreR * corePulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Reset for vignette (normal compositing paints on top)
      ctx.globalCompositeOperation = 'source-over';

      // Vignette
      const vig = ctx.createRadialGradient(c, c, s * 0.12, c, c, c);
      vig.addColorStop(0, 'rgba(8,8,24,0)');
      vig.addColorStop(0.32, 'rgba(8,8,24,0.12)');
      vig.addColorStop(0.5, 'rgba(8,8,24,0.4)');
      vig.addColorStop(0.65, 'rgba(8,8,24,0.7)');
      vig.addColorStop(0.8, 'rgba(8,8,24,0.92)');
      vig.addColorStop(1, 'rgba(8,8,24,1)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, s, s);

      // Glass specular (upper-left highlight)
      const specX = c * 0.52;
      const specY = c * 0.4;
      const specR = s * 0.28;
      const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
      spec.addColorStop(0, 'rgba(255,255,255,0.07)');
      spec.addColorStop(0.5, 'rgba(255,255,255,0.02)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(specX, specY, specR, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{
        borderRadius: '50%',
        filter: 'blur(3px) saturate(1.35)',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Orb wrapper: blends with hero bg + mouse-reactive tilt & glow       */
/* ------------------------------------------------------------------ */

const orbitData = [
  { r: 215, size: 3, alpha: 0.4, dur: 20, dir: 1 },
  { r: 268, size: 2.5, alpha: 0.25, dur: 26, dir: -1 },
];

function SiriOrb({ mouseX = 0, mouseY = 0, isHovering = false }: { mouseX?: number; mouseY?: number; isHovering?: boolean }) {
  const tiltX = useSpring(0, { stiffness: 80, damping: 20 });
  const tiltY = useSpring(0, { stiffness: 80, damping: 20 });
  const glowX = useSpring(0, { stiffness: 40, damping: 25 });
  const glowY = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const tx = Math.max(-12, Math.min(12, mouseY * 14));
    const ty = Math.max(-12, Math.min(12, -mouseX * 14));
    tiltX.set(tx);
    tiltY.set(ty);
    glowX.set(mouseX * 18);
    glowY.set(mouseY * 18);
  }, [mouseX, mouseY, tiltX, tiltY, glowX, glowY]);

  return (
    <div className="relative flex items-center justify-center py-10 lg:py-14">
      {/* Blended ambient glow — extends into hero bg, cursor-follow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(380px, 50vw, 580px)',
          height: 'clamp(380px, 50vw, 580px)',
          background:
            'radial-gradient(circle, rgba(0,180,200,0.22) 0%, rgba(100,60,230,0.12) 30%, rgba(240,70,160,0.08) 55%, transparent 72%)',
          filter: 'blur(70px)',
          mixBlendMode: 'screen',
          x: glowX,
          y: glowY,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* "Listening" ring — appears on hover, theme: ready to understand */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(220px, 32vw, 340px)',
          height: 'clamp(220px, 32vw, 340px)',
          border: '1px solid rgba(0, 212, 212, 0.25)',
          boxShadow: '0 0 24px rgba(0, 212, 212, 0.12)',
        }}
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: isHovering ? [1, 1.15, 1] : 1,
          opacity: isHovering ? [0.3, 0.6, 0.3] : 0,
        }}
        transition={{ duration: 2.5, repeat: isHovering ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Ripple rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={`rip-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'clamp(190px, 26vw, 270px)',
            height: 'clamp(190px, 26vw, 270px)',
            border: '1px solid rgba(255,255,255,0.035)',
          }}
          animate={{ scale: [1, 2.8], opacity: [0.1, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 2.5,
          }}
        />
      ))}

      {/* Orb (canvas) with 3D tilt — blends into bg via parent */}
      <motion.div
        className="relative cursor-default"
        style={{
          width: 'clamp(224px, 30vw, 310px)',
          height: 'clamp(224px, 30vw, 310px)',
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
          perspective: 800,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer halo — soft edge so orb melts into gradient */}
        <div
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0,200,215,0.08) 0%, rgba(120,50,240,0.05) 45%, rgba(240,60,150,0.03) 75%, transparent 100%)',
            filter: 'blur(24px)',
          }}
        />

        <div className="relative" style={{ transform: 'translateZ(20px)' }}>
          <SiriCanvas />
        </div>

        {/* Thin outer ring */}
        <div
          className="absolute -inset-px rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        />
      </motion.div>

      {/* Orbiting particles */}
      {orbitData.map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute pointer-events-none"
          style={{ width: o.r, height: o.r }}
          animate={{ rotate: 360 * o.dir }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: o.size,
              height: o.size,
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              background: `radial-gradient(circle, rgba(255,255,255,${o.alpha}), transparent)`,
              boxShadow: `0 0 ${o.size * 2.5}px rgba(255,255,255,${o.alpha * 0.35})`,
            }}
          />
        </motion.div>
      ))}

      {/* Status pill */}
      <motion.div
        className="absolute -bottom-4 sm:bottom-0 lg:bottom-3 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div
          className="flex items-center gap-2.5 px-5 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <motion.span
            className="w-[5px] h-[5px] rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-white/30 text-[10px] font-medium tracking-[0.18em] uppercase">
            Swasthya AI
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  Hero Section                                                       */
/* ================================================================== */
export default function HeroSection() {
  const orbRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, hover: false });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = orbRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (e.clientX - cx) / (rect.width / 2);
      const y = (e.clientY - cy) / (rect.height / 2);
      setMouse({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)), hover: true });
    },
    []
  );
  const handleMouseLeave = useCallback(() => setMouse((m) => ({ ...m, hover: false })), []);

  return (
    <section className="hero-gradient relative overflow-hidden min-h-screen flex items-center pt-[4.25rem]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        {/* Extra gradient blob near orb area so orb and bg feel one */}
        <div
          className="absolute top-1/2 right-[10%] w-[min(45vw,420px)] h-[min(45vw,420px)] rounded-full blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(30,64,175,0.2) 0%, rgba(55,48,163,0.12) 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left */}
          <div className="text-center lg:text-left text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-5 slide-in">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-blue-100 text-xs font-medium tracking-wide">
                AI-Powered Behavioral Health
              </span>
            </div>

            <h1 className="mobile-hero-title text-4xl sm:text-5xl lg:text-[3.5rem] font-bold mb-4 slide-in tracking-tight leading-[1.1]">
              Care that
              <span className="block bg-gradient-to-r from-blue-200 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                understands
              </span>
            </h1>

            <p
              className="text-white/70 text-sm sm:text-base mb-6 max-w-md mx-auto lg:mx-0 slide-in leading-relaxed"
              style={{ animationDelay: '0.15s' }}
            >
              Intelligent intake. Instant insights. Better outcomes.
            </p>

            <div
              className="mobile-btn-group justify-center lg:justify-start slide-in gap-3"
              style={{ animationDelay: '0.3s' }}
            >
              <a href="#contact" className="btn-primary rounded-xl">
                Get Started
              </a>
              <Link href="/demo" className="btn-ghost rounded-xl">
                Try Demo
              </Link>
            </div>

            <div
              className="flex items-center gap-5 mt-8 justify-center lg:justify-start slide-in"
              style={{ animationDelay: '0.45s' }}
            >
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white/50 text-xs">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white/50 text-xs">DSM-5 Aligned</span>
              </div>
            </div>
          </div>

          {/* Right: Siri-style orb — blends with hero bg, mouse-reactive */}
          <div
            ref={orbRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative fade-in hidden sm:flex items-center justify-center min-h-[320px] lg:min-h-[380px]"
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ mixBlendMode: 'screen' }}
              aria-hidden
            >
              <SiriOrb mouseX={mouse.x} mouseY={mouse.y} isHovering={mouse.hover} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
