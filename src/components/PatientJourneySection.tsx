export default function PatientJourneySection() {
  const steps = [
    {
      num: 1,
      title: 'Welcome',
      desc: 'AI conversational intake',
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-200/50',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 space-y-1.5">
          <div className="flex items-start gap-1.5">
            <div className="w-5 h-5 rounded-full bg-blue-100 shrink-0 mt-0.5" />
            <div className="bg-blue-50 rounded-lg rounded-tl-sm px-2.5 py-1.5 text-[11px] text-blue-700">How are you feeling?</div>
          </div>
          <div className="flex items-start gap-1.5 justify-end">
            <div className="bg-slate-100 rounded-lg rounded-tr-sm px-2.5 py-1.5 text-[11px] text-slate-600">I&apos;ve been anxious</div>
            <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0 mt-0.5" />
          </div>
        </div>
      ),
    },
    {
      num: 2,
      title: 'Screening',
      desc: 'DSM-5 aligned assessment',
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-200/50',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      visual: (
        <div className="mt-3 space-y-1.5">
          {['PHQ-9', 'GAD-7', 'PCL-5'].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-[9px] text-slate-500 w-8 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${i === 0 ? 'bg-emerald-400 w-3/4' : i === 1 ? 'bg-teal-400 w-1/2' : 'bg-cyan-400 w-1/3'}`} />
              </div>
              <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
      shadow: 'shadow-violet-200/50',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      visual: (
        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex -space-x-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-7 h-7 rounded-full border-2 border-white ${i === 0 ? 'bg-violet-200' : i === 1 ? 'bg-purple-200' : 'bg-indigo-200'}`} />
            ))}
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-700">Care team matched</div>
            <div className="text-[10px] text-slate-400">3 providers available</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="journey" className="section-padding bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-50 to-transparent rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-blue-50 to-transparent rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Three steps to better care
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 relative">
          <div className="absolute top-14 left-[20%] right-[20%] h-px bg-gradient-to-r from-blue-200 via-emerald-200 to-violet-200 hidden sm:block" />

          {steps.map((step) => (
            <div key={step.num} className="relative group">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 h-full">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md ${step.shadow} shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                    {step.icon}
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-700">{step.num}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                    <p className="text-slate-500 text-[11px]">{step.desc}</p>
                  </div>
                </div>
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
