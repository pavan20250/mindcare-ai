import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden mobile-hero">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left text-white">
            <h1 className="mobile-hero-title font-bold mb-4 sm:mb-6 slide-in">
              AI-Powered Platform for
              <span className="block text-yellow-200">Behavioral Health</span>
              Coordination & Care
            </h1>
            <div className="mobile-btn-group justify-center lg:justify-start slide-in">
              <button className="btn-primary">
                Get Started
              </button>
              <Link href="/demo" className="btn-ghost">
                Try Demo
              </Link>
            </div>
          </div>
          {/* Platform Demo */}
          <div className="relative fade-in mt-6 sm:mt-8 lg:mt-0 group">
            {/* Glow effect - reduced on mobile */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl opacity-10 sm:opacity-20 blur-xl sm:blur-2xl group-hover:opacity-30 sm:group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-6 border border-white/30 shadow-xl sm:shadow-2xl hover:border-white/50 transition-all duration-300">
              <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden relative shadow-lg sm:shadow-2xl">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover sm:scale-105 sm:hover:scale-100 transition-transform duration-700"
                >
                  <source src="/MindCare_AI_Homepage_Video_Generation.mp4" type="video/mp4" />
                </video>
                
                {/* Elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
                
                {/* Hover overlay with play icon - adjusted for mobile */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="transform scale-75 sm:scale-75 group-hover:scale-90 sm:group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="white" opacity="0.2"/>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Floating label - responsive sizing */}
                <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4 flex items-center justify-between gap-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 border border-white/20">
                    <p className="text-white text-xs sm:text-sm font-semibold">Platform Demo</p>
                  </div>
                  <div className="bg-red-500/80 backdrop-blur-md rounded-full px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 border border-red-300/30 animate-pulse">
                    <p className="text-white text-[10px] sm:text-xs font-bold">LIVE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating elements - hidden on mobile */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full floating-animation mobile-floating"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full floating-animation mobile-floating" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full floating-animation mobile-floating" style={{animationDelay: '4s'}}></div>
    </section>
  );
}

