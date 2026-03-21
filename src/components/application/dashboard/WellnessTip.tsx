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
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-amber-100/60 border border-amber-200/50">
            <Lightbulb className="size-3 text-amber-500" />
          </div>
          <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">Wellness tip</h2>
          <Badge
            variant="secondary"
            className="ml-auto text-[9px] font-semibold bg-white/40 text-slate-500 border border-white/60 px-1.5 py-0"
          >
            {tip.category}
          </Badge>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{tip.text}</p>
      </CardContent>
    </Card>
  );
}