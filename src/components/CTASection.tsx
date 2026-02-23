import Link from 'next/link';

const badges = [
  { label: 'SOC 2', desc: 'Compliant' },
  { label: 'HIPAA', desc: 'Secure' },
  { label: 'HL7 FHIR', desc: 'Interoperable' },
];

export default function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950/95 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Get started</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15]">
                Ready to transform
                <span className="block mt-2 bg-gradient-to-r from-blue-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  how care begins?
                </span>
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                See how MindCare AI can support your organization with AI-powered intake and triage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 mb-12">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-blue-600 hover:to-violet-700 transition-all duration-300"
              >
                Schedule Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-white/90 bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                Contact Sales
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
              {badges.map(({ label, desc }) => (
                <div key={label} className="flex items-center gap-3 text-white/50">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <svg className="h-4 w-4 text-emerald-400/80" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-white/90 text-sm">{label}</span>
                    <span className="text-white/45 text-xs ml-1.5">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
