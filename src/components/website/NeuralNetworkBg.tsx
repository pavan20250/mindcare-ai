'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface NeuralNetworkBgProps {
  nodeCount?: number;
  connectionDist?: number;
  className?: string;
}

export default function NeuralNetworkBg({
  nodeCount = 80,
  connectionDist = 180,
  className = '',
}: NeuralNetworkBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Helpers ────────────────────────────────────────────────────────────
    const isMobileNow = () => window.innerWidth < 768;

    const getConfig = () => {
      const mobile = isMobileNow();
      return {
        effectiveNodeCount: mobile ? Math.round(nodeCount * 0.4) : nodeCount,
        effectiveConnectionDist: mobile
          ? Math.round(connectionDist * 0.7)
          : connectionDist,
        MOUSE_RADIUS: mobile ? 120 : 200,
      };
    };

    const initNodes = (w: number, h: number, count: number): Node[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }));

    // ── Resize ─────────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Always re-init nodes on resize so they stay within new bounds
      const { effectiveNodeCount } = getConfig();
      nodesRef.current = initNodes(w, h, effectiveNodeCount);
    };

    // ── Mouse (desktop only — no pointer capture on mobile) ───────────────
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // ── Draw loop ──────────────────────────────────────────────────────────
    const draw = () => {
      const { w, h } = sizeRef.current;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const { effectiveConnectionDist, MOUSE_RADIUS } = getConfig();

      ctx.clearRect(0, 0, w, h);

      // Update positions & draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        a.pulsePhase += a.pulseSpeed;

        if (a.x < 0 || a.x > w) { a.vx *= -1; a.x = Math.max(0, Math.min(w, a.x)); }
        if (a.y < 0 || a.y > h) { a.vy *= -1; a.y = Math.max(0, Math.min(h, a.y)); }

        const dxM = a.x - mouse.x;
        const dyM = a.y - mouse.y;
        const distMouse = Math.sqrt(dxM * dxM + dyM * dyM);
        const mouseInfluence = distMouse < MOUSE_RADIUS ? 1 - distMouse / MOUSE_RADIUS : 0;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > effectiveConnectionDist) continue;

          const alpha = (1 - dist / effectiveConnectionDist) * 0.25;
          const boost = mouseInfluence * 0.6;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(45, 212, 191, ${alpha + boost})`;
          ctx.lineWidth = 0.6 + boost * 1.2;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        const dxM = node.x - mouse.x;
        const dyM = node.y - mouse.y;
        const distMouse = Math.sqrt(dxM * dxM + dyM * dyM);
        const mouseGlow = distMouse < MOUSE_RADIUS ? 1 - distMouse / MOUSE_RADIUS : 0;

        const r = node.radius + mouseGlow * 2;
        const alpha = node.opacity * pulse + mouseGlow * 0.4;

        // Glow halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha * 0.15})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // ── Init ───────────────────────────────────────────────────────────────
    resize();

    // Use passive listeners throughout — never block scroll
    window.addEventListener('resize', resize, { passive: true });
    // Mouse events only on the canvas wrapper, not window
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount, connectionDist]); // only re-mount if base props change

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      // pointer-events: none → canvas never intercepts clicks, taps, or scroll
      style={{ pointerEvents: 'none' }}
    />
  );
}