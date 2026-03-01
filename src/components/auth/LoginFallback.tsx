import { Card, CardContent } from '@/components/ui/card';

export default function LoginFallback() {
  return (
    <div className="w-full max-w-[420px] mx-auto px-4">
      <Card className="border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl rounded-2xl">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16">
          <div className="size-8 border-[2.5px] border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium">Loading…</p>
        </CardContent>
      </Card>
    </div>
  );
}
