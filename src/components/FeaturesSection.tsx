import React from 'react';

export default function FeaturesSection() {
  const features = [
    { title: 'Intake & Screening', desc: '24/7 AI chat with DSM-5 assessments', icon: 'chat', color: 'blue' },
    { title: 'Triage & Referral', desc: 'Smart routing by severity', icon: 'clipboard', color: 'green' },
    { title: 'Clinical Insights', desc: 'AI summaries and care plans', icon: 'chart', color: 'purple' },
    { title: 'Dashboards', desc: 'Analytics and appointment tracking', icon: 'grid', color: 'indigo' },
  ];

  const icons: Record<string, React.ReactElement> = {
    chat: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    ),
    clipboard: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    ),
    chart: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
    grid: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    ),
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-600',
    green: 'bg-emerald-500/10 text-emerald-600',
    purple: 'bg-violet-500/10 text-violet-600',
    indigo: 'bg-indigo-500/10 text-indigo-600',
  };

  return (
    <section id="features" className="section-padding section-bg-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">Platform</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Key features</h2>
        <p className="text-center text-slate-600 text-sm max-w-lg mx-auto mb-10">From intake to insights—built for behavioral health.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card card-hover section-bg rounded-2xl p-5 text-center border-slate-200/80">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${colorMap[f.color]}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[f.icon]}</svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5">{f.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
