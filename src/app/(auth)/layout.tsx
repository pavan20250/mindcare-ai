import Link from 'next/link';
import NeuralNetworkBg from '@/components/website/NeuralNetworkBg';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NeuralNetworkBg nodeCount={60} />
      </div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/[0.035] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.025] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors backdrop-blur-xl"
          aria-label="Go to home"
        >
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Home
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center relative z-10 py-4">
        {children}
      </main>
    </div>
  );
}
