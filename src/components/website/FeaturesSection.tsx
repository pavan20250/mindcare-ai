export default function FeaturesSection() {
  const steps = [
    {
      num: 1,
      title: 'Welcome',
      desc: 'AI conversational intake',
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      visual: (
        <div className="flex flex-col gap-0.5 mt-2">
          <div className="flex items-start gap-1">
            <div className="w-4 h-4 rounded-full bg-blue-500/20 shrink-0 mt-0.5" />
            <div className="bg-blue-500/10 rounded rounded-tl-sm px-1.5 py-0.5 text-[9px] text-blue-300">How are you feeling?</div>
          </div>
          <div className="flex items-start gap-1 justify-end">
            <div className="bg-white/[0.06] rounded rounded-tr-sm px-1.5 py-0.5 text-[9px] text-slate-300">Anxious lately</div>
            <div className="w-4 h-4 rounded-full bg-white/10 shrink-0 mt-0.5" />
          </div>
        </div>
      ),
    },
    {
      num: 2,
      title: 'Screening',
      desc: 'DSM-5 aligned assessment',
      gradient: 'from-emerald-500 to-teal-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      visual: (
        <div className="space-y-1 mt-2">
          {[
            { label: 'PHQ-9', width: '75%', color: 'bg-emerald-400' },
            { label: 'GAD-7', width: '50%', color: 'bg-teal-400' },
            { label: 'PCL-5', width: '35%', color: 'bg-cyan-400' },
          ].map(({ label, width, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-[8px] text-slate-500 w-7 shrink-0 font-medium">{label}</span>
              <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width }} />
              </div>
              <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: 3,
      title: 'Care',
      desc: 'Triage, referral & treatment',
      gradient: 'from-violet-500 to-purple-500',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      visual: (
        <div className="flex items-center gap-1.5 mt-2 p-1.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
          <div className="flex -space-x-1">
            {['bg-violet-400', 'bg-purple-400', 'bg-indigo-400'].map((bg, i) => (
              <div key={i} className={`w-5 h-5 rounded-full border-2 border-[#0f1729] ${bg}`} />
            ))}
          </div>
          <div>
            <div className="text-[9px] font-semibold text-slate-200">Care team matched</div>
            <div className="text-[8px] text-slate-500">3 providers ready</div>
          </div>
        </div>
      ),
    },
  ];

  const features = [
    {
      title: 'Adaptive Intake',
      desc: 'Smart forms that adjust questions based on responses in real time',
      gradient: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      visual: (
        <div className="bg-white/[0.06] backdrop-blur rounded-lg px-2.5 py-2 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-blue-300 font-semibold">Adaptive Screening</span>
            <span className="text-[8px] text-slate-500">Q4 of 12</span>
          </div>
          <p className="text-[9px] text-slate-300 mb-2">Over the past week, how would you rate your energy levels?</p>
          <div className="flex gap-1">
            {['Very low', 'Low', 'Moderate', 'Good', 'High'].map((opt, i) => (
              <div key={opt} className={`flex-1 rounded-md py-1 text-center text-[7px] border ${i === 1 ? 'bg-blue-500/20 border-blue-400/40 text-blue-300 font-semibold' : 'bg-white/[0.04] border-white/[0.06] text-slate-500'}`}>
                {opt}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
            </div>
            <span className="text-[8px] text-slate-500">33%</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Smart Triage',
      desc: 'Severity-based routing to the right provider instantly',
      gradient: 'from-emerald-500 to-teal-500',
      shadowColor: 'shadow-emerald-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      visual: (
        <div className="space-y-1.5">
          {[
            { label: 'High', sublabel: 'Crisis team', color: 'bg-red-400', border: 'border-red-400/30', bg: 'bg-red-400/10' },
            { label: 'Medium', sublabel: 'Dr. Thompson', color: 'bg-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/10' },
            { label: 'Low', sublabel: 'Wellness coach', color: 'bg-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/10' },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-2 ${item.bg} backdrop-blur rounded-lg px-2.5 py-1.5 border ${item.border}`}>
              <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold text-white">{item.label}</span>
                <span className="text-[9px] text-slate-400 ml-1.5">{item.sublabel}</span>
              </div>
              <svg className="w-3 h-3 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Progress Tracking',
      desc: 'Monitor treatment outcomes across every session',
      gradient: 'from-violet-500 to-purple-500',
      shadowColor: 'shadow-violet-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      visual: (
        <div className="space-y-1.5">
          <div className="bg-white/[0.06] backdrop-blur rounded-lg px-2.5 py-2 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-slate-400 font-medium">8-week treatment progress</span>
              <span className="text-[8px] text-emerald-400 font-semibold">Improving</span>
            </div>
            <div className="flex items-end gap-[3px] h-9">
              {[65, 58, 52, 55, 42, 38, 30, 25].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-violet-500/70 to-purple-400/80" style={{ height: `${h * 0.55}px` }} />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[7px] text-slate-600">Wk 1</span>
              <span className="text-[7px] text-violet-400/70">Wk 8</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            {[
              { val: '72%', label: 'Mood lift', color: 'text-violet-300' },
              { val: '6.2h', label: 'Sleep avg', color: 'text-purple-300' },
              { val: '89%', label: 'Adherence', color: 'text-emerald-300' },
            ].map((m) => (
              <div key={m.label} className="flex-1 bg-white/[0.06] rounded-lg px-1.5 py-1 border border-white/[0.08] text-center">
                <p className={`text-[12px] font-bold ${m.color}`}>{m.val}</p>
                <p className="text-[7px] text-slate-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Live Dashboards',
      desc: 'Real-time analytics for your entire organization',
      gradient: 'from-indigo-500 to-blue-500',
      shadowColor: 'shadow-indigo-500/20',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      visual: (
        <div className="space-y-1.5">
          <div className="flex gap-1.5">
            <div className="flex-1 bg-white/[0.06] backdrop-blur rounded-lg px-2 py-1.5 border border-white/[0.08]">
              <p className="text-[8px] text-slate-500">Active Patients</p>
              <p className="text-[13px] font-bold text-white">1,247</p>
              <span className="text-[7px] text-emerald-400">+12% this week</span>
            </div>
            <div className="flex-1 bg-white/[0.06] backdrop-blur rounded-lg px-2 py-1.5 border border-white/[0.08]">
              <p className="text-[8px] text-slate-500">Sessions Today</p>
              <p className="text-[13px] font-bold text-white">84</p>
              <span className="text-[7px] text-blue-400">32 in progress</span>
            </div>
          </div>
          <div className="bg-white/[0.06] backdrop-blur rounded-lg px-2.5 py-2 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-slate-400 font-medium">Weekly Outcomes</span>
              <span className="text-[8px] text-emerald-400">↑ 18%</span>
            </div>
            <div className="flex items-end gap-1 h-7">
              {[40, 55, 35, 65, 50, 72, 80].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500/60 to-blue-400/80" style={{ height: `${h * 0.33}px` }} />
              ))}
            </div>
            <div className="flex justify-between mt-0.5">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="text-[6px] text-slate-600 flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-teal-300 text-xs font-semibold uppercase tracking-wider border border-white/[0.08]">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2]">
            One platform, <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">zero friction</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Three steps from first contact to matched care — powered by intelligent automation.
          </p>
        </div>

        {/* 3-step patient journey — compact horizontal */}
        <div className="relative mb-6 sm:mb-8">
          <div className="hidden sm:block absolute top-5 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-blue-500/30 via-emerald-500/30 to-violet-500/30 z-0" />
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {steps.map((step) => (
              <div key={step.num} className="relative z-10 group bg-white/[0.04] backdrop-blur-lg rounded-xl p-2.5 sm:p-3 border border-white/[0.08] shadow-lg shadow-black/10 hover:bg-white/[0.07] transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                    {step.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Step {step.num}</span>
                    <h3 className="font-bold text-white text-xs sm:text-sm leading-tight">{step.title}</h3>
                  </div>
                </div>
                <p className="text-slate-400 text-[10px] mb-1.5 hidden sm:block">{step.desc}</p>
                {step.visual}
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.08]" />
          <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest">Powered by</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.08]" />
        </div>

        {/* 4 feature cards */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {features.map((f) => (
            <div key={f.title} className="group bg-white/[0.04] backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/[0.08] hover:border-white/[0.12] shadow-lg shadow-black/10 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-md ${f.shadowColor} shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-xs sm:text-sm">{f.title}</h3>
                  <p className="text-slate-400 text-[10px] sm:text-xs">{f.desc}</p>
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
