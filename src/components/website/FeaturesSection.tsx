export default function FeaturesSection() {
  const features = [
    {
      title: 'Intake & Screening',
      desc: '24/7 conversational AI with DSM-5 assessments',
      gradient: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/20',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      visual: (
        <div className="relative h-28 overflow-hidden rounded-xl mt-3">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
          <div className="absolute inset-0 flex items-end justify-center pb-1.5 gap-1.5 px-3">
            <div className="w-[65%] bg-white/[0.06] backdrop-blur rounded-lg p-2.5 border border-white/[0.08] transform translate-y-2">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-500/20" />
                <div className="h-1.5 w-12 bg-white/10 rounded-full" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full" />
                <div className="h-1.5 w-3/4 bg-white/[0.06] rounded-full" />
              </div>
            </div>
            <div className="w-[35%] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2.5 shadow-sm transform translate-y-5">
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-white/30 rounded-full" />
                <div className="h-1.5 w-2/3 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Triage & Referral',
      desc: 'Smart routing by severity and specialty',
      gradient: 'from-emerald-500 to-teal-500',
      shadowColor: 'shadow-emerald-500/20',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      visual: (
        <div className="relative h-28 overflow-hidden rounded-xl mt-3">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-teal-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {[0, 1, 2].map((i) => (
                <div key={i} className="absolute w-7 h-7 rounded-md bg-white/[0.06] backdrop-blur border border-white/[0.08] flex items-center justify-center" style={{
                  top: `${-16 + i * 20}px`,
                  left: `${50 + i * 12}px`,
                  opacity: 1 - i * 0.2,
                }}>
                  <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Clinical Insights',
      desc: 'AI-generated summaries and care plans',
      gradient: 'from-violet-500 to-purple-500',
      shadowColor: 'shadow-violet-500/20',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      visual: (
        <div className="relative h-28 overflow-hidden rounded-xl mt-3">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10" />
          <div className="absolute inset-0 flex items-center justify-center px-3">
            <div className="w-full bg-white/[0.06] backdrop-blur rounded-lg p-2.5 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-px">
                  {[40, 60, 35, 75, 50, 65, 80].map((h, i) => (
                    <div key={i} className="w-2.5 rounded-sm bg-gradient-to-t from-violet-400 to-purple-400" style={{ height: `${h * 0.32}px` }} />
                  ))}
                </div>
                <div className="text-right ml-auto">
                  <div className="h-1.5 w-7 bg-white/[0.08] rounded-full mb-0.5" />
                  <div className="h-2.5 w-10 bg-violet-500/20 rounded-full" />
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full">
                <div className="h-1.5 w-3/4 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full" />
              </div>
              <div className="bg-white/[0.04] rounded-md p-2 mt-1 border border-white/[0.06]">
                <div className="w-7 h-1.5 bg-white/[0.08] rounded-full mb-0.5" />
                <div className="w-9 h-2.5 bg-indigo-500/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Dashboards',
      desc: 'Real-time analytics and tracking',
      gradient: 'from-indigo-500 to-blue-500',
      shadowColor: 'shadow-indigo-500/20',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      visual: (
        <div className="relative h-28 overflow-hidden rounded-xl mt-3">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10" />
          <div className="absolute inset-0 flex items-center justify-center px-2.5 gap-1.5">
            <div className="w-1/2 bg-white/[0.06] backdrop-blur rounded-md p-2 border border-white/[0.08]">
              <div className="w-full h-3 bg-white/[0.06] rounded mb-1.5" />
              <div className="flex gap-0.5">
                {[60, 45, 70, 55].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-indigo-300 to-blue-400" style={{ height: `${h * 0.4}px` }} />
                ))}
              </div>
            </div>
            <div className="w-1/2 space-y-1.5">
              <div className="bg-white/[0.06] backdrop-blur rounded-md p-2 border border-white/[0.08]">
                <div className="w-7 h-1.5 bg-white/[0.08] rounded-full mb-0.5" />
                <div className="w-10 h-2.5 bg-indigo-500/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-teal-300 text-xs font-semibold uppercase tracking-wider border border-white/[0.08]">
            Platform
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2]">
            Everything you need
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            AI-powered tools that streamline intake, triage, and clinical workflows.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group bg-white/[0.04] backdrop-blur-lg rounded-xl p-6 border border-white/[0.08] hover:border-white/[0.12] shadow-lg shadow-black/10 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-md ${f.shadowColor} shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{f.title}</h3>
                  <p className="text-slate-400 text-xs">{f.desc}</p>
                </div>
              </div>
              {f.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
