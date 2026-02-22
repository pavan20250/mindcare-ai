export default function ChallengesSection() {
  return (
    <section className="section-padding bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left: Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-red-100 to-orange-50 rounded-full blur-2xl opacity-50" />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-2xl opacity-50" />

              <div className="relative space-y-3">
                <div className="relative bg-white rounded-2xl p-5 shadow-md shadow-slate-200/40 border border-slate-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shrink-0 shadow-md shadow-red-200/40">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">Long wait times</h3>
                      <p className="text-slate-500 text-xs mt-0.5">48-day avg for first appointment</p>
                    </div>
                  </div>
                </div>

                <div className="relative bg-white rounded-2xl p-5 shadow-md shadow-slate-200/40 border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 ml-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-amber-200/40">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">Paperwork overload</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Hours on docs, not care</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center py-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/40 animate-bounce">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 hover:shadow-md transition-all duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-200/40">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-sm">AI handles the rest</h3>
                      <p className="text-blue-600/70 text-xs mt-0.5">Instant intake, auto-triage, zero friction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Minimal text */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-3">
              The Problem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
              Built for care,
              <span className="block text-slate-400">not paperwork</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              We eliminate the friction between patients and the care they need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
