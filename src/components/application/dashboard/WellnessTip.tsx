'use client';

import { Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WELLNESS_TIPS } from './Types';

interface WellnessTipProps {
  tip: (typeof WELLNESS_TIPS)[number];
}

export function WellnessTip({ tip }: WellnessTipProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      
      <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">
        Wellness tip
      </h2>
      <Card className="flex-1 min-h-[140px]">
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2.5">
        
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 shrink-0">
              <Lightbulb className="size-4 text-amber-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                Wellness tip
              </p>
              <p className="text-[11px] text-slate-500">
                {tip.category}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="text-[9px] font-semibold bg-white/40 text-slate-500 border border-white/60 px-1.5 py-0 shrink-0"
            >
              {tip.category}
            </Badge>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed mt-3">
            {tip.text}
          </p>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/30">
            <span className="text-[9px] text-slate-400 font-medium">
              Daily suggestion
            </span>

            <div className="flex items-center gap-1">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="size-2 rounded-full bg-amber-100/60 border border-amber-200/40"
                />
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}