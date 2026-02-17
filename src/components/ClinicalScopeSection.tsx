export default function ClinicalScopeSection() {
  const domains = [
    { label: 'Neurodevelopmental', sub: 'ASD, ADHD' },
    { label: 'Anxiety', sub: 'GAD, Social, Panic' },
    { label: 'Depression', sub: 'MDD, Persistent' },
    { label: 'Trauma & stress', sub: 'PTSD' },
    { label: 'Substance', sub: 'Alcohol, drug use' },
    { label: 'Personality', sub: 'BPD' },
  ];

  return (
    <section className="section-padding section-bg-alt">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">Clinical scope</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Evidence-based, DSM-5 aligned</h2>
        <p className="text-center text-slate-600 text-sm mb-8">Screening across key behavioral health domains.</p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {domains.map((d) => (
            <div
              key={d.label}
              className="px-4 py-2.5 rounded-xl section-bg border border-slate-200/80 hover:border-indigo-200 hover:shadow-sm transition-all text-center min-w-[120px]"
            >
              <p className="font-medium text-slate-900 text-sm">{d.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{d.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
