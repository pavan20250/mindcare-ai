export default function PatientJourneySection() {
  const steps = [
    { num: 1, title: 'Welcome', desc: 'AI conversational intake', color: 'blue' },
    { num: 2, title: 'Screening', desc: 'DSM-5–aligned processing', color: 'emerald' },
    { num: 3, title: 'Care', desc: 'Triage, referral & treatment', color: 'violet' },
  ];

  return (
    <section id="journey" className="section-padding section-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">Flow</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Patient journey</h2>
        <p className="text-center text-slate-600 text-sm mb-10">First contact to treatment—powered by AI.</p>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-between items-stretch">
          {steps.map((step) => (
            <div key={step.num} className="flex-1">
              <div className="rounded-2xl border border-slate-200/80 section-bg-alt p-5 text-center hover:border-indigo-200 hover:shadow-md transition-all duration-300 h-full">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-white text-sm ${
                  step.color === 'blue' ? 'bg-blue-500' : step.color === 'emerald' ? 'bg-emerald-500' : 'bg-violet-500'
                }`}>
                  {step.num}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-slate-600 text-xs">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
