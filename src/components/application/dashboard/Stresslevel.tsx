'use client';

import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type StressLevel = 'Low' | 'Medium' | 'High';

// Semicircle gauge — arc spans 180°→360° (upper half of the circle)
// cx=80, cy=72, r=52  →  left=(28,72), top=(80,20), right=(132,72)
// Three equal 60° coloured segments, sweep-flag=1 (clockwise in SVG = upward)
// Needle angles: Low=210°, Medium=270°, High=330°
function Gauge({ level }: { level: StressLevel }) {
  const cx = 80, cy = 72, r = 52;

  const pt = (deg: number) => ({
    x: +(cx + r * Math.cos((deg * Math.PI) / 180)).toFixed(2),
    y: +(cy + r * Math.sin((deg * Math.PI) / 180)).toFixed(2),
  });

  const arc = (s: number, e: number) => {
    const sp = pt(s), ep = pt(e);
    return `M ${sp.x} ${sp.y} A ${r} ${r} 0 0 1 ${ep.x} ${ep.y}`;
  };

  // Background track
  const trackStart = pt(180), trackEnd = pt(360);

  // Needle
  const needleDeg: Record<StressLevel, number> = { Low: 210, Medium: 270, High: 330 };
  const nd = needleDeg[level];
  const tipR = r - 10;
  const tx = +(cx + tipR * Math.cos((nd * Math.PI) / 180)).toFixed(2);
  const ty = +(cy + tipR * Math.sin((nd * Math.PI) / 180)).toFixed(2);

  return (
    <div className="flex justify-center">
      <svg width="160" height="82" viewBox="0 0 160 82">
        {/* Background track */}
        <path
          d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 1 1 ${trackEnd.x} ${trackEnd.y}`}
          fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="butt"
        />

        {/* Green segment: 180°→240° */}
        <path d={arc(180, 240)} fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="butt" />
        {/* Amber segment: 240°→300° */}
        <path d={arc(240, 300)} fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="butt" />
        {/* Red segment: 300°→360° */}
        <path d={arc(300, 360)} fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="butt" />

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={tx} y2={ty}
          stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"
        />
        {/* Pivot */}
        <circle cx={cx} cy={cy} r="4.5" fill="#1e293b" />
        <circle cx={cx} cy={cy} r="2"   fill="white" />

        {/* Zone labels */}
        <text x="14"  y="79" textAnchor="middle" fontSize="8" fill="#22c55e"  fontFamily="system-ui,sans-serif" fontWeight="600">Low</text>
        <text x="80"  y="14" textAnchor="middle" fontSize="8" fill="#f59e0b"  fontFamily="system-ui,sans-serif" fontWeight="600">Medium</text>
        <text x="146" y="79" textAnchor="middle" fontSize="8" fill="#ef4444"  fontFamily="system-ui,sans-serif" fontWeight="600">High</text>
      </svg>
    </div>
  );
}

export function StressLevel({ level = 'Low' }: { level?: StressLevel }) {
  const colorMap: Record<StressLevel, string> = {
    Low:    'text-emerald-600',
    Medium: 'text-amber-500',
    High:   'text-rose-600',
  };
  const msgMap: Record<StressLevel, string> = {
    Low:    'Keep up the mindfulness!',
    Medium: 'Try a breathing exercise.',
    High:   'Take a short break now.',
  };
  const statusMap: Record<StressLevel, string> = {
    Low:    'Calm',
    Medium: 'Moderate',
    High:   'Elevated',
  };

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex size-6 items-center justify-center rounded-lg bg-rose-50/80 border border-white/50">
            <Heart className="size-3 text-rose-500" />
          </div>
          <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">
            Stress Level
          </h2>
        </div>

        <Gauge level={level} />

        <div className="text-center mt-1 space-y-0.5">
          <p className="text-[11px] text-slate-500">{msgMap[level]}</p>
          <p className="text-[11px] font-semibold text-slate-600">
            Current status:{' '}
            <span className={colorMap[level]}>{statusMap[level]}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}