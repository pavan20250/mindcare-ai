'use client';

import { Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RingProps {
  pct: number;
  label: string;
  size?: number;
  stroke?: number;
  color?: string;
}

function Ring({ pct, label, size = 72, stroke = 7, color = '#0d9488' }: RingProps) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(255,255,255,0.3)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-slate-800">{pct}%</span>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 font-medium text-center leading-tight">{label}</p>
    </div>
  );
}

export function FocusMetrics() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex size-6 items-center justify-center rounded-lg bg-teal-50/80 border border-white/50">
            <Target className="size-3 text-teal-600" />
          </div>
          <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">Focus Metrics</h2>
        </div>

        <div className="flex items-center justify-around">
          <Ring pct={72} label="Deep Work" color="#0d9488" />
          <Ring pct={85} label="Distraction Avoidance" color="#0f766e" />
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/30 flex items-center justify-between">
          <p className="text-[10px] text-slate-400">Weekly focus sessions</p>
          <div className="flex gap-1">
            {[1,1,1,0,1,1,0].map((active, i) => (
              <div
                key={i}
                className={`w-4 h-1.5 rounded-full ${active ? 'bg-teal-500' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}