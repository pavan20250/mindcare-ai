export default function BenefitsSection() {
  const items = [
    {
      who: 'Patients',
      benefit: '24/7 access, personalized care path',
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-200/50',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex-1 bg-blue-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] text-slate-500">Available now</span>
            </div>
            <div className="text-xl font-bold text-blue-600">24/7</div>
          </div>
          <div className="flex-1 bg-cyan-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[9px] text-slate-500">Avg. response</span>
            </div>
            <div className="text-xl font-bold text-cyan-600">&lt;2s</div>
          </div>
        </div>
      ),
    },
    {
      who: 'Clinicians',
      benefit: 'Auto summaries, reduced admin burden',
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-200/50',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between bg-emerald-50 rounded-md px-2.5 py-1.5">
            <span className="text-[11px] text-slate-600">Time saved per intake</span>
            <span className="text-xs font-bold text-emerald-600">45 min</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
          </div>
        </div>
      ),
    },
    {
      who: 'Admins',
      benefit: 'Streamlined scheduling & billing',
      gradient: 'from-violet-500 to-purple-500',
      shadow: 'shadow-violet-200/50',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {['Mon', 'Tue', 'Wed'].map((day) => (
            <div key={day} className="bg-violet-50 rounded-md p-1.5 text-center">
              <div className="text-[9px] text-slate-400 mb-0.5">{day}</div>
              <div className="w-full h-5 bg-gradient-to-t from-violet-300 to-purple-200 rounded" />
            </div>
          ))}
        </div>
      ),
    },
    {
      who: 'Organizations',
      benefit: 'Data-driven insights & optimization',
      gradient: 'from-indigo-500 to-blue-500',
      shadow: 'shadow-indigo-200/50',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      visual: (
        <div className="mt-3 flex items-end gap-1 h-12 px-1">
          {[40, 55, 45, 70, 60, 80, 65].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-indigo-400 to-blue-300 transition-all duration-300 hover:from-indigo-500 hover:to-blue-400" style={{ height: `${h}%` }} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="benefits" className="section-padding section-bg-alt relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Everyone gains
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((item) => (
            <div key={item.who} className="group bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md ${item.shadow} shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.who}</h3>
                  <p className="text-slate-500 text-xs">{item.benefit}</p>
                </div>
              </div>
              {item.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
