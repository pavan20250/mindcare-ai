export default function ChallengesSection() {
  return (
    <section className="section-padding section-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">What we solve</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Built for care, not paperwork</h2>
        <p className="text-center text-slate-600 text-sm max-w-xl mx-auto mb-10">Less friction for patients and clinicians.</p>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl section-bg-alt border border-slate-200/80 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Patients</h3>
              <p className="text-slate-600 text-sm">Long waits, complex forms, little follow-up—we simplify the path in.</p>
            </div>
          </div>
          <div className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl section-bg-alt border border-slate-200/80 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Clinicians</h3>
              <p className="text-slate-600 text-sm">Too much time on docs, referral errors, billing—we automate the heavy lift.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
