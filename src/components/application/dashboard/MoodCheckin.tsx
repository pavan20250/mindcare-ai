'use client';

import { Sun, Smile, Meh, CloudRain, Frown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type MoodValue, type MoodEntry, MOOD_DOT_COLORS, todayStr, last7Days } from './Types';

const MOOD_OPTIONS = [
  { value: 'great' as MoodValue, label: 'Great', icon: Sun, accent: 'text-amber-500' },
  { value: 'good' as MoodValue, label: 'Good', icon: Smile, accent: 'text-emerald-500' },
  { value: 'okay' as MoodValue, label: 'Okay', icon: Meh, accent: 'text-sky-500' },
  { value: 'low' as MoodValue, label: 'Low', icon: CloudRain, accent: 'text-slate-500' },
  { value: 'struggling' as MoodValue, label: 'Hard', icon: Frown, accent: 'text-rose-500' },
];

interface MoodCheckinProps {
  todayMood: MoodValue | null;
  streak: number;
  moodHistory: MoodEntry[];
  onSelect: (v: MoodValue) => void;
  disabled: boolean;
}

export function MoodCheckin({ todayMood, streak, moodHistory, onSelect, disabled }: MoodCheckinProps) {
  const selected = MOOD_OPTIONS.find((m) => m.value === todayMood);
  const week = last7Days();
  const historyMap = new Map(moodHistory.map((e) => [e.date, e.value]));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">Daily check-in</h2>
        {streak > 0 && (
          <Badge
            variant="secondary"
            className="text-[9px] font-semibold bg-white/40 text-amber-700 border border-amber-200/60 gap-1 px-1.5 py-0"
          >
            <span className="inline-block size-1.5 rounded-full bg-amber-400" />
            {streak}d streak
          </Badge>
        )}
      </div>
      <Card>
        <CardContent className="p-4">
          {todayMood && selected ? (
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/30 border border-white/40">
                <selected.icon className={`size-5 ${selected.accent}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Feeling {selected.label.toLowerCase()}</p>
                <p className="text-[11px] text-slate-500">Logged today</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-700 mb-2.5">How are you feeling?</p>
              <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Select your mood">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => onSelect(mood.value)}
                    disabled={disabled}
                    role="radio"
                    aria-checked={false}
                    aria-label={`Feeling ${mood.label}`}
                    className="flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-150 hover:scale-[1.04] active:scale-[0.97] bg-white/30 border border-white/50 hover:bg-white/50 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none shadow-sm"
                  >
                    <mood.icon className={`size-5 ${mood.accent}`} />
                    <span className="text-[10px] font-semibold text-slate-600">{mood.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/30">
            <span className="text-[9px] text-slate-400 font-medium shrink-0">7 days</span>
            <div className="flex gap-1.5 items-center flex-1 justify-end">
              {week.map((day) => {
                const mood = historyMap.get(day) as MoodValue | undefined;
                const isToday = day === todayStr();
                return (
                  <div key={day} className="flex flex-col items-center gap-0.5">
                    <div
                      className={`size-2.5 rounded-full transition-colors ${mood ? MOOD_DOT_COLORS[mood] : 'bg-white/40'} ${isToday ? 'ring-[1.5px] ring-offset-1 ring-teal-400/70' : ''}`}
                      title={`${new Date(day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })}${mood ? ` — ${mood}` : ''}`}
                    />
                    <span className="text-[8px] text-slate-400 leading-none">
                      {new Date(day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'narrow' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}