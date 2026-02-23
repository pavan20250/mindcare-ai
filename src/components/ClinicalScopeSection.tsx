export default function ClinicalScopeSection() {
  const domains = [
    {
      label: 'Neurodevelopmental',
      sub: 'ASD, ADHD',
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      label: 'Anxiety',
      sub: 'GAD, Social, Panic',
      gradient: 'from-amber-500 to-orange-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Depression',
      sub: 'MDD, Persistent',
      gradient: 'from-indigo-500 to-violet-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
    },
    {
      label: 'Trauma & Stress',
      sub: 'PTSD, Acute',
      gradient: 'from-rose-500 to-pink-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: 'Substance Use',
      sub: 'Alcohol, Drug',
      gradient: 'from-emerald-500 to-green-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      label: 'Personality',
      sub: 'BPD, Patterns',
      gradient: 'from-violet-500 to-purple-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding section-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-50/40 to-violet-50/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold uppercase tracking-wider border border-violet-100/80">
              Clinical Scope
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
              Evidence-based,
              <span className="block text-violet-600">DSM-5 aligned</span>
            </h2>
            <p className="text-slate-600 text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              Comprehensive screening across all major behavioral health domains.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {domains.map((d) => (
              <div
                key={d.label}
                className="group relative bg-white rounded-xl p-4 border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-center"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${d.gradient} flex items-center justify-center mx-auto mb-2 text-white shadow group-hover:scale-110 transition-transform duration-400`}>
                  {d.icon}
                </div>
                <p className="font-semibold text-slate-900 text-xs leading-tight">{d.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{d.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
