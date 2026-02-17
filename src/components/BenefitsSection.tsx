import React from 'react';

export default function BenefitsSection() {
  const items = [
    { who: 'Patients', benefit: '24/7 access, personalized path', icon: 'user', color: 'blue' },
    { who: 'Clinicians', benefit: 'Auto summaries, less admin', icon: 'check', color: 'emerald' },
    { who: 'Admins', benefit: 'Scheduling & reimbursement', icon: 'chart', color: 'violet' },
    { who: 'Organizations', benefit: 'Insights and optimization', icon: 'building', color: 'indigo' },
  ];

  const iconSvg = (name: string) => {
    const icons: Record<string, React.ReactElement> = {
      user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
      chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      building: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    };
    return icons[name] || icons.user;
  };

  const colorBg: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    violet: 'bg-violet-500/10 text-violet-600',
    indigo: 'bg-indigo-500/10 text-indigo-600',
  };

  return (
    <section id="benefits" className="section-padding section-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">Benefits</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Everyone gains</h2>
        <p className="text-center text-slate-600 text-sm mb-10">Patients, clinicians, admins, and organizations.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.who} className="rounded-2xl section-bg border border-slate-200/80 p-5 text-center hover:border-indigo-200 hover:shadow-md transition-all">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 ${colorBg[item.color]}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{iconSvg(item.icon)}</svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{item.who}</h3>
              <p className="text-slate-600 text-xs">{item.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
