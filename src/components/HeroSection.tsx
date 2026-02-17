import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden mobile-hero">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-medium tracking-wide mb-4 slide-in">
              AI for Behavioral Health
            </span>
            <h1 className="mobile-hero-title font-bold mb-3 sm:mb-4 slide-in tracking-tight">
              Smarter intake.
              <span className="block text-blue-100 font-semibold">Better outcomes.</span>
            </h1>
            <p className="text-white/90 text-sm sm:text-base mb-6 max-w-md slide-in" style={{ animationDelay: '0.15s' }}>
              Conversational AI intake, triage, and clinical insights—so care comes first.
            </p>
            <div className="mobile-btn-group justify-center lg:justify-start slide-in gap-3">
              <a href="#contact" className="btn-primary rounded-xl">
                Get Started
              </a>
              <Link href="/demo" className="btn-ghost rounded-xl">
                Try Demo
              </Link>
            </div>
          </div>
          <div className="relative fade-in mt-6 sm:mt-8 lg:mt-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-2 sm:p-3 lg:p-4 border border-white/20 shadow-2xl hover:border-white/40 transition-all duration-300">
              <div className="aspect-video rounded-xl overflow-hidden relative">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" >
                  <source src="/MindCare_AI_Homepage_Video_Generation.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-white/15 backdrop-blur rounded-lg px-2.5 py-1 text-white text-xs font-medium">Platform</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
