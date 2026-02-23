'use client';

import Link from 'next/link';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

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

const CONVERSATION_PHRASES = [
  'Ready to listen.',
  'Ask me anything about mental wellness.',
  "I'm here 24/7.",
  'Tell me how you\'re feeling.',
  'Your conversations stay private.',
  'Let\'s talk — no judgment.',
];

const WAVE_BARS = [0.4, 0.7, 1, 0.85, 0.5, 0.9, 0.6, 0.75, 0.45];

function SiriOrb({ mouseX = 0, mouseY = 0, isHovering = false }: { mouseX?: number; mouseY?: number; isHovering?: boolean }) {
  const tiltX = useSpring(0, { stiffness: 80, damping: 20 });
  const tiltY = useSpring(0, { stiffness: 80, damping: 20 });
  const glowX = useSpring(0, { stiffness: 40, damping: 25 });
  const glowY = useSpring(0, { stiffness: 40, damping: 25 });
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const tx = Math.max(-12, Math.min(12, mouseY * 14));
    const ty = Math.max(-12, Math.min(12, -mouseX * 14));
    tiltX.set(tx);
    tiltY.set(ty);
    glowX.set(mouseX * 18);
    glowY.set(mouseY * 18);
  }, [mouseX, mouseY, tiltX, tiltY, glowX, glowY]);

  useEffect(() => {
    const t = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % CONVERSATION_PHRASES.length);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center py-10 lg:py-14">
      {/* Conversation strip — rotating phrase, talking-assistant feel */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-4"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div
          className="flex items-center justify-center gap-3 py-3 px-5 rounded-2xl min-h-[52px]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          }}
        >
          <div className="flex items-center justify-center gap-0.5 h-4">
            {WAVE_BARS.map((h, i) => (
              <motion.span
                key={i}
                className="w-0.5 rounded-full bg-cyan-400/70 origin-center"
                animate={{ scaleY: [0.5, 0.5 + h * 0.5, 0.5] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.06,
                }}
                style={{ height: 14 }}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              className="text-white/80 text-sm font-medium tracking-tight"
            >
              {CONVERSATION_PHRASES[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

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

      {/* Listening arc — rotating sweep, unique "active" indicator */}
      <svg
        className="absolute pointer-events-none"
        style={{
          width: 'clamp(200px, 28vw, 290px)',
          height: 'clamp(200px, 28vw, 290px)',
        }}
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,212,212,0)" />
            <stop offset="50%" stopColor="rgba(0,212,212,0.5)" />
            <stop offset="100%" stopColor="rgba(0,212,212,0)" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="20 120"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(240,70,160,0.15)"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeDasharray="15 80"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
        />
      </svg>

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

      {/* Status pill — professional identity + listening state */}
      <motion.div
        className="absolute -bottom-8 sm:-bottom-4 lg:bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div
          className="flex flex-col items-center gap-1.5 py-3 px-8 min-w-[280px] sm:min-w-[320px] rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <motion.span
              className="relative flex h-2 w-2"
              aria-hidden
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </motion.span>
            <span className="text-white/90 text-xs font-semibold tracking-[0.2em] uppercase">
              Swasthya AI
            </span>
          </div>
          <span className="text-white/40 text-[10px] font-medium tracking-wider">
            Your AI companion · Always here to listen
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
      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft teal glow — top-left, calm */}
        <div
          className="absolute top-[8%] left-[5%] w-[min(55vw,480px)] h-[min(55vw,480px)] rounded-full blur-[80px] opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.22) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
          }}
        />
        {/* Violet / indigo — right side */}
        <div
          className="absolute top-[35%] right-[2%] w-[min(45vw,380px)] h-[min(45vw,380px)] rounded-full blur-[72px] opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.2) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)',
          }}
        />
        {/* Warm rose accent — bottom, subtle "care" feel */}
        <div
          className="absolute bottom-[15%] left-[15%] w-[min(40vw,320px)] h-[min(40vw,320px)] rounded-full blur-[70px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(244, 114, 182, 0.12) 0%, rgba(219, 39, 119, 0.04) 50%, transparent 70%)',
          }}
        />
        {/* Center glow that ties into the orb */}
        <div
          className="absolute top-1/2 right-[8%] w-[min(50vw,420px)] h-[min(50vw,420px)] rounded-full blur-[90px] opacity-50 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)',
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

            <h1 className="mobile-hero-title text-3xl sm:text-4xl lg:text-[3.1rem] font-bold mb-4 slide-in tracking-tight leading-[1.1]">
              Care that <span className="bg-gradient-to-r from-blue-200 via-violet-200 to-cyan-200 bg-clip-text text-transparent">understands</span>
            </h1>

            <p
              className="text-white/70 font-semibold text-sm sm:text-base mb-6 max-w-md mx-auto lg:mx-0 slide-in leading-relaxed"
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
