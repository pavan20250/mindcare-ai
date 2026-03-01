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

      <nav className="relative z-10 shrink-0 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
              NeuralCare AI
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center relative z-10 py-4">
        {children}
      </main>
    </div>
  );
}
