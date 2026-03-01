export default function BenefitsSection() {
  const items = [
    {
      who: 'Patients',
      benefit: '24/7 access, personalized care path',
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex-1 bg-blue-500/10 rounded-lg p-2.5 border border-blue-500/10">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-slate-500">Available now</span>
              </div>
              <div className="text-xl font-bold text-blue-400">24/7</div>
            </div>
            <div className="flex-1 bg-cyan-500/10 rounded-lg p-2.5 border border-cyan-500/10">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-[9px] text-slate-500">Matched for you</span>
              </div>
              <div className="text-xl font-bold text-cyan-400">1:1</div>
            </div>
          </div>
          <div className="bg-white/[0.05] rounded-lg px-2.5 py-2 border border-white/[0.06]">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              <span className="text-[9px] text-slate-300 font-medium">Private & secure access</span>
            </div>
            <p className="text-[8px] text-slate-500 leading-relaxed">End-to-end encrypted. Access your records, results, and provider messages anytime from any device.</p>
          </div>
        </div>
      ),
    },
    {
      who: 'Clinicians',
      benefit: 'Faster workflows, better decisions',
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 space-y-1.5">
          <div className="bg-white/[0.05] rounded-lg px-2.5 py-2 border border-white/[0.06]">
            <span className="text-[9px] text-slate-500 font-medium">Time per patient (before vs after)</span>
            <div className="mt-1.5 space-y-1">
              {[
                { task: 'Chart review', before: 20, after: 2 },
                { task: 'Note writing', before: 15, after: 1 },
                { task: 'Referral prep', before: 10, after: 1 },
              ].map((t) => (
                <div key={t.task} className="flex items-center gap-1.5">
                  <span className="text-[8px] text-slate-500 w-14 shrink-0">{t.task}</span>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="h-1 bg-rose-400/40 rounded-full" style={{ width: `${t.before * 2}%` }} />
                    <span className="text-[7px] text-rose-400/70 line-through">{t.before}m</span>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="h-1 bg-emerald-400 rounded-full" style={{ width: `${t.after * 2}%` }} />
                    <span className="text-[7px] text-emerald-400 font-semibold">{t.after}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-emerald-500/10 rounded-md px-2.5 py-1.5 border border-emerald-500/10">
            <span className="text-[10px] text-slate-400">Total time recovered per day</span>
            <span className="text-xs font-bold text-emerald-400">2.5 hrs</span>
          </div>
        </div>
      ),
    },
    {
      who: 'Admins',
      benefit: 'Streamlined scheduling & billing',
      gradient: 'from-violet-500 to-purple-500',
      shadow: 'shadow-violet-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 space-y-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { day: 'Mon', slots: 6, booked: 5 },
              { day: 'Tue', slots: 8, booked: 7 },
              { day: 'Wed', slots: 5, booked: 3 },
            ].map((d) => (
              <div key={d.day} className="bg-violet-500/10 rounded-md p-1.5 text-center border border-violet-500/10">
                <div className="text-[9px] text-slate-500 mb-0.5">{d.day}</div>
                <div className="text-[13px] font-bold text-violet-300">{d.booked}/{d.slots}</div>
                <div className="text-[7px] text-slate-500">booked</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-white/[0.05] rounded-lg px-2.5 py-1.5 border border-white/[0.06]">
            <span className="text-[9px] text-slate-400">No-show rate reduced</span>
            <span className="text-[11px] font-bold text-purple-300">↓ 40%</span>
          </div>
        </div>
      ),
    },
    {
      who: 'Organizations',
      benefit: 'Data-driven insights & optimization',
      gradient: 'from-indigo-500 to-blue-500',
      shadow: 'shadow-indigo-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      visual: (
        <div className="mt-3 space-y-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-indigo-500/10 rounded-lg p-2 border border-indigo-500/10 text-center">
              <p className="text-[15px] font-bold text-indigo-300">92%</p>
              <p className="text-[8px] text-slate-500">Retention rate</p>
            </div>
            <div className="flex-1 bg-blue-500/10 rounded-lg p-2 border border-blue-500/10 text-center">
              <p className="text-[15px] font-bold text-blue-300">3.2x</p>
              <p className="text-[8px] text-slate-500">ROI increase</p>
            </div>
          </div>
          <div className="bg-white/[0.05] rounded-lg px-2.5 py-2 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-slate-400">Patient satisfaction</span>
              <span className="text-[9px] font-bold text-emerald-400">4.8/5</span>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`w-3 h-3 ${s <= 4 ? 'text-amber-400' : 'text-amber-400/40'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="benefits" className="section-padding relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-teal-300 text-xs font-semibold uppercase tracking-wider border border-white/[0.08]">
            Impact
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2]">
            Better outcomes, <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">for everyone</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Patients, clinicians, admins, and organizations — measurably aligned.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item) => (
            <div key={item.who} className="group bg-white/[0.04] backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/[0.08] hover:border-white/[0.12] shadow-lg shadow-black/10 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md ${item.shadow} shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{item.who}</h3>
                  <p className="text-slate-400 text-xs">{item.benefit}</p>
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
