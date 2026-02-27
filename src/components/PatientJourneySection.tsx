'use client';

export default function PatientJourneySection() {
  const steps = [
    {
      num: 1,
      title: 'Welcome',
      desc: 'AI conversational intake',
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      visual: (
        <div className="flex flex-col gap-0.5 p-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-start gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500/20 shrink-0 mt-0.5" />
            <div className="bg-blue-500/10 rounded rounded-tl-sm px-1 py-0.5 text-[9px] text-blue-300 max-w-[90px]">How are you feeling?</div>
          </div>
          <div className="flex items-start gap-1 justify-end">
            <div className="bg-white/[0.06] rounded rounded-tr-sm px-1 py-0.5 text-[9px] text-slate-300 max-w-[90px]">Anxious lately</div>
            <div className="w-3.5 h-3.5 rounded-full bg-white/[0.1] shrink-0 mt-0.5" />
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
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      visual: (
        <div className="space-y-0.5">
          {[
            { label: 'PHQ-9', width: '75%', color: 'bg-emerald-400' },
            { label: 'GAD-7', width: '50%', color: 'bg-teal-400' },
            { label: 'PCL-5', width: '35%', color: 'bg-cyan-400' },
          ].map(({ label, width, color }) => (
            <div key={label} className="flex items-center gap-1">
              <span className="text-[9px] text-slate-500 w-7 shrink-0 font-medium">{label}</span>
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
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      visual: (
        <div className="flex items-center gap-1 p-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
          <div className="flex -space-x-1">
            {['bg-violet-400', 'bg-purple-400', 'bg-indigo-400'].map((bg, i) => (
              <div key={i} className={`w-4 h-4 rounded-full border-2 border-[#0f1729] ${bg}`} />
            ))}
          </div>
          <div>
            <div className="text-[9px] font-semibold text-slate-200">Care team matched</div>
            <div className="text-[8px] text-slate-500">3 providers</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="journey" className="relative overflow-hidden py-8 md:py-10">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-teal-300 text-xs font-semibold uppercase tracking-wider border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            Patient Journey
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2]">
            Three steps to better care
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            First contact to matched care—streamlined and evidence-based.
          </p>
        </div>

        {/* Horizontal step flow (desktop) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-1.5 items-stretch">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col">
                {i < steps.length - 1 && (
                  <div className="absolute top-4 left-[calc(50%+24px)] right-[-10px] h-0.5 bg-gradient-to-r from-white/[0.08] to-white/[0.03] z-0" aria-hidden />
                )}
                <div className="relative z-10 bg-white/[0.04] backdrop-blur-lg rounded-lg p-2.5 border border-white/[0.08] shadow-lg shadow-black/10 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-200 flex flex-col min-h-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow flex-shrink-0`}>
                      {step.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold text-slate-500 tabular-nums">0{step.num}</span>
                      <h3 className="font-bold text-white text-xs leading-tight truncate">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 text-[11px] mb-1.5 flex-shrink-0">{step.desc}</p>
                  <div className="flex-1 min-h-0">{step.visual}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical timeline (mobile) */}
        <div className="md:hidden">
          <div className="relative pl-1">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-full" aria-hidden />
            <div className="space-y-1.5">
              {steps.map((step) => (
                <div key={step.num} className="relative flex gap-2">
                  <div className={`relative z-10 w-6 h-6 rounded-md bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow flex-shrink-0 mt-0.5`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0 pb-1.5 last:pb-0">
                    <div className="bg-white/[0.04] backdrop-blur-lg rounded-lg p-2 border border-white/[0.08] shadow-lg shadow-black/10">
                      <h3 className="font-bold text-white text-xs mb-0.5">{step.title}</h3>
                      <p className="text-slate-400 text-[11px] mb-1">{step.desc}</p>
                      {step.visual}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          See the demo video in the hero above.
        </p>
      </div>
    </section>
  );
}
