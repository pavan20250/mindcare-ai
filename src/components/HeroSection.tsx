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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        className="w-full h-full rounded-[50%] bg-[#080818]"
        style={{ borderRadius: '50%', filter: 'blur(3px) saturate(1.35)' }}
        aria-hidden
      />
    );
  }

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

const CONVERSATION_PHRASES = [
  'Ready to listen.',
  'Ask me anything about mental wellness.',
  "I'm here 24/7.",
  'Tell me how you\'re feeling.',
  'Your conversations stay private.',
  'Let\'s talk — no judgment.',
];

const WAVE_BARS = [0.4, 0.7, 1, 0.85, 0.5, 0.9, 0.6, 0.75, 0.45];

/* Atom-like particles inside the orb (x%, y%, size px, color 0=cyan 1=violet 2=white) — deterministic */
const ORB_INNER_ATOMS: { x: number; y: number; size: number; c: number }[] = [
  { x: 38, y: 42, size: 2, c: 0 }, { x: 62, y: 38, size: 1.5, c: 1 }, { x: 48, y: 58, size: 2.5, c: 2 },
  { x: 72, y: 48, size: 1.5, c: 0 }, { x: 28, y: 52, size: 2, c: 1 }, { x: 52, y: 28, size: 1.5, c: 0 },
  { x: 65, y: 62, size: 2, c: 2 }, { x: 35, y: 68, size: 1.5, c: 1 }, { x: 58, y: 45, size: 2, c: 0 },
  { x: 42, y: 32, size: 2.5, c: 1 }, { x: 78, y: 55, size: 1.5, c: 2 }, { x: 32, y: 45, size: 2, c: 0 },
  { x: 55, y: 65, size: 1.5, c: 1 }, { x: 45, y: 48, size: 2, c: 2 }, { x: 68, y: 35, size: 2, c: 0 },
];

/* Horizontal voice waveform: thin + bulk lines, peaks & valleys (deterministic for hydration) */
const ORB_WAVEFORM_BARS: { w: number; peak: number }[] = [
  { w: 2, peak: 0.25 }, { w: 2, peak: 0.5 }, { w: 3, peak: 0.9 }, { w: 4, peak: 1 }, { w: 3, peak: 0.85 },
  { w: 2, peak: 0.45 }, { w: 2, peak: 0.2 }, { w: 2, peak: 0.55 }, { w: 3, peak: 0.75 }, { w: 4, peak: 1 },
  { w: 3, peak: 0.7 }, { w: 2, peak: 0.35 }, { w: 2, peak: 0.2 }, { w: 3, peak: 0.8 }, { w: 4, peak: 0.95 },
  { w: 2, peak: 0.5 }, { w: 2, peak: 0.3 }, { w: 2, peak: 0.65 }, { w: 3, peak: 0.9 }, { w: 4, peak: 1 },
  { w: 2, peak: 0.4 }, { w: 2, peak: 0.25 }, { w: 2, peak: 0.6 }, { w: 3, peak: 0.85 }, { w: 2, peak: 0.35 },
];

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
    <div className="relative w-full flex items-center justify-center py-8 lg:py-10">
      {/* Fixed-size stage so all absolute positions are consistent */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 'clamp(320px, 42vw, 420px)',
          height: 'clamp(340px, 44vw, 440px)',
        }}
      >
      {/* Floating badges — minimal pill style */}
      {[
        { label: '24/7', top: '8%', left: '0%', delay: 0 },
        { label: 'Private', top: '10%', right: '0%', left: 'auto', delay: 0.15 },
        { label: 'Secure', bottom: '30%', left: '0%', top: 'auto', delay: 0.3 },
        { label: 'Listen', bottom: '28%', right: '0%', left: 'auto', top: 'auto', delay: 0.05 },
      ].map((badge) => (
        <motion.div
          key={badge.label}
          className="absolute flex items-center gap-2 py-1.5 px-3 rounded-full pointer-events-none border border-white/10 bg-white/5 backdrop-blur-sm"
          style={{ top: badge.top, bottom: badge.bottom, left: badge.left, right: badge.right }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 + badge.delay, duration: 0.4 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400/90" aria-hidden />
          <span className="text-white/60 text-[10px] font-medium tracking-wide">{badge.label}</span>
        </motion.div>
      ))}

      {/* Single outer ring — teal dashed, unique frame */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border border-dashed border-teal-400/20"
        style={{
          width: 'clamp(220px, 32vw, 320px)',
          height: 'clamp(220px, 32vw, 320px)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
        }}
      />

      {/* Conversation strip — unique left-accent pill */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-full max-w-md px-4"
        style={{ top: 'calc(50% - min(12rem, 24vw) - 4rem)' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div
          className="flex items-center justify-center gap-4 py-3.5 pl-5 pr-5 rounded-2xl min-h-[56px] border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-teal-400/70 to-violet-400/50" aria-hidden />
          <div className="flex items-center justify-center gap-0.5 h-5 shrink-0" aria-hidden>
            {WAVE_BARS.map((h, i) => (
              <motion.span
                key={i}
                className="w-0.5 rounded-full bg-teal-400/70 origin-bottom"
                animate={{ scaleY: [0.4, 0.4 + h * 0.6, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.07 }}
                style={{ height: 16 }}
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
              className="text-white/90 text-sm font-medium tracking-tight text-center"
            >
              {CONVERSATION_PHRASES[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Ambient glow — teal/violet, cursor-follow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 'clamp(260px, 38vw, 380px)',
          height: 'clamp(260px, 38vw, 380px)',
          background: 'radial-gradient(circle, rgba(34, 197, 194, 0.14) 0%, rgba(99, 102, 241, 0.06) 45%, transparent 70%)',
          filter: 'blur(48px)',
          mixBlendMode: 'screen',
          x: glowX,
          y: glowY,
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Single soft ring — appears on hover */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 'clamp(170px, 25vw, 260px)',
          height: 'clamp(170px, 25vw, 260px)',
          border: '1px solid rgba(34, 197, 194, 0.2)',
          boxShadow: '0 0 24px rgba(34, 197, 194, 0.06)',
        }}
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: isHovering ? [1, 1.06, 1] : 1,
          opacity: isHovering ? [0.3, 0.5, 0.3] : 0,
        }}
        transition={{ duration: 2.5, repeat: isHovering ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* One subtle ripple */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 'clamp(150px, 21vw, 210px)',
          height: 'clamp(150px, 21vw, 210px)',
          border: '1px solid rgba(255,255,255,0.04)',
        }}
        animate={{ scale: [1, 2.6], opacity: [0.08, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Single rotating arc — teal accent */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 'clamp(155px, 21vw, 220px)', height: 'clamp(155px, 21vw, 220px)' }}
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="heroArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34,197,194,0)" />
            <stop offset="50%" stopColor="rgba(34,197,194,0.4)" />
            <stop offset="100%" stopColor="rgba(34,197,194,0)" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#heroArcGrad)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="16 110"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
        />
      </svg>

      {/* Orb (canvas) with 3D tilt — aligned below bg outer circle so arc sits on top */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-2"
      >
      <motion.div
        className="relative cursor-default"
        style={{
          width: 'clamp(140px, 20vw, 200px)',
          height: 'clamp(140px, 20vw, 200px)',
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
          perspective: 800,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer halo — teal/violet blend */}
        <div
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,194,0.08) 0%, rgba(99,102,241,0.04) 45%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="relative rounded-full overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
          <SiriCanvas />
        </div>

        {/* Refined outer ring */}
        <div
          className="absolute -inset-px rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        />

        {/* Horizontal voice waveform — subtle sound visualization */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none flex items-center justify-center"
          style={{ zIndex: 10, transform: 'translateZ(24px)' }}
          aria-hidden
        >
          <div className="flex items-center justify-center gap-0.5 w-[65%]">
            {ORB_WAVEFORM_BARS.map((bar, i) => (
              <motion.span
                key={i}
                className="rounded-full origin-center"
                style={{
                  width: `${bar.w}px`,
                  height: '28px',
                  opacity: 0.85,
                  background: 'linear-gradient(180deg, rgba(34,197,194,0.9) 0%, rgba(99,102,241,0.8) 50%, rgba(168,85,247,0.8) 100%)',
                  boxShadow: bar.w >= 4
                    ? '0 0 10px rgba(34,197,194,0.35), 0 0 6px rgba(99,102,241,0.2)'
                    : '0 0 6px rgba(34,197,194,0.3), 0 0 3px rgba(99,102,241,0.15)',
                }}
                animate={{
                  scaleY: [0.3, 0.3 + bar.peak * 0.65, 0.3],
                }}
                transition={{
                  duration: 1.8 + (i % 3) * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (i * 0.05) % 0.6,
                }}
              />
            ))}
          </div>
        </div>

        {/* Atom-like particles inside the orb — clipped to circle, moving/drifting */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none flex items-center justify-center"
          style={{ zIndex: 12, transform: 'translateZ(26px)' }}
          aria-hidden
        >
          <div className="relative w-full h-full">
            {ORB_INNER_ATOMS.map((a, i) => {
              const leftPct = `${Number(a.x).toFixed(2)}%`;
              const topPct = `${Number(a.y).toFixed(2)}%`;
              const bg =
                a.c === 0
                  ? 'rgba(0,212,212,0.9)'
                  : a.c === 1
                    ? 'rgba(139,92,246,0.85)'
                    : 'rgba(255,255,255,0.9)';
              const glow =
                a.c === 0
                  ? 'rgba(0,212,212,0.5)'
                  : a.c === 1
                    ? 'rgba(139,92,246,0.4)'
                    : 'rgba(255,255,255,0.4)';
              const dx = 4 + (i % 5);
              const dy = 3 + (i % 4);
              return (
                <motion.span
                  key={i}
                  className="absolute rounded-full origin-center"
                  style={{
                    left: leftPct,
                    top: topPct,
                    width: `${a.size}px`,
                    height: `${a.size}px`,
                    marginLeft: `-${a.size / 2}px`,
                    marginTop: `-${a.size / 2}px`,
                    background: bg,
                    boxShadow: `0 0 ${a.size * 3}px ${glow}`,
                  }}
                  animate={{
                    x: [0, dx, -dx * 0.7, 0],
                    y: [0, -dy * 0.8, dy, 0],
                    scale: [1, 1.25, 1],
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 3 + (i % 4) * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (i * 0.15) % 1.5,
                  }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
      </div>

      {/* Status pill — teal accent, minimal */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-1.5 py-3 px-6 min-w-[280px] sm:min-w-[320px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
          <div className="flex items-center gap-2.5">
            <motion.span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400/50 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400 ring-2 ring-teal-400/30" />
            </motion.span>
            <span className="text-white/95 text-xs font-semibold tracking-[0.2em] uppercase">Swasthya AI</span>
          </div>
          <span className="text-white/50 text-[10px] font-medium tracking-widest">Your AI companion · Always here to listen</span>
        </div>
      </motion.div>
      </div>
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
    <section className="relative overflow-hidden min-h-screen flex items-center pt-[4.25rem]">
      {/* Unique hero bg: deep base + single soft focal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(165deg, #0c1222 0%, #0f1729 35%, #0d1324 70%, #0a0f1a 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 70% 40%, rgba(34, 197, 194, 0.12) 0%, rgba(99, 102, 241, 0.06) 40%, transparent 70%)',
        }}
      />
      {/* Subtle dot grid for depth — no noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Copy — unique vertical accent + headline */}
          <div className="text-center lg:text-left text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 slide-in">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                AI-Powered Behavioral Health
              </span>
            </div>

            <div className="relative space-y-1">
              {/* Vertical accent bar — desktop only */}
              <div className="hidden lg:block absolute -left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-teal-400/50 to-transparent" />
              <h1 className="mobile-hero-title text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.25rem] font-bold slide-in tracking-tight leading-[1.12] text-white">
                Care that{' '}
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                  understands
                </span>
              </h1>
              <p
                className="text-slate-400 text-base sm:text-lg max-w-md mx-auto lg:mx-0 slide-in leading-relaxed"
                style={{ animationDelay: '0.1s' }}
              >
                Intelligent intake. Instant insights. Better outcomes.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 slide-in"
              style={{ animationDelay: '0.2s' }}
            >
              <a
                href="#contact"
                className="btn-primary rounded-xl px-6 py-3.5 text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center"
              >
                Get Started
              </a>
              <Link
                href="/demo"
                className="btn-ghost rounded-xl px-6 py-3.5 text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center border border-white/20"
              >
                Try Demo
              </Link>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 slide-in"
              style={{ animationDelay: '0.35s' }}
            >
              <div className="flex items-center gap-2 text-slate-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-teal-400/30 bg-teal-400/5">
                  <svg className="h-3 w-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-xs font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-teal-400/30 bg-teal-400/5">
                  <svg className="h-3 w-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-xs font-medium">DSM-5 Aligned</span>
              </div>
            </div>
          </div>

          {/* Right: Siri-style orb — blends with hero bg, mouse-reactive */}
          <div
            ref={orbRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative fade-in hidden sm:flex items-center justify-center min-h-[300px] lg:min-h-[360px]"
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
