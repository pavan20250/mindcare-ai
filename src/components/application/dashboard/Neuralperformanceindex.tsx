'use client';

import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const POINTS = [62, 58, 65, 70, 68, 74, 78, 80, 76, 82, 85, 88];
const LABELS = ['Mar 1','Mar 5','Mar 9','Mar 13','Mar 17','Mar 21'];

export function NeuralPerformanceIndex() {
  const W = 340, H = 100, PAD = 8;

  const pts = useMemo(() => {
    const min = Math.min(...POINTS) - 4;
    const max = Math.max(...POINTS) + 4;
    return POINTS.map((v, i) => ({
      x: PAD + (i / (POINTS.length - 1)) * (W - PAD * 2),
      y: H - PAD - ((v - min) / (max - min)) * (H - PAD * 2),
    }));
  }, []);

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${H} L ${pts[0].x.toFixed(1)} ${H} Z`;
  const score = POINTS[POINTS.length - 1];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex size-6 items-center justify-center rounded-lg bg-teal-50/80 border border-white/50">
            <TrendingUp className="size-3 text-teal-600" />
          </div>
          <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">Neural Performance Index</h2>
        </div>

        <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
          <defs>
            <linearGradient id="npi-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#npi-area)" />
          <path d={linePath} fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => i === pts.length - 1 && (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0d9488" stroke="white" strokeWidth="1.5" />
          ))}
        </svg>

        <div className="flex items-end justify-between mt-1">
          <div>
            <p className="text-[11px] text-slate-400">Performance trend (last 30 days):</p>
            <p className="text-[11px] font-semibold text-teal-600">Positive {score}/100</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-800 leading-none">{score}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">/ 100</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}