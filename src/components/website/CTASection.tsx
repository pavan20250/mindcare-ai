import Link from 'next/link';

const badges = [
  { label: 'SOC 2', desc: 'Compliant' },
  { label: 'HIPAA', desc: 'Secure' },
  { label: 'HL7 FHIR', desc: 'Interoperable' },
];

export default function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="relative py-10 sm:py-12 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">Start Today</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.15]">
            Reimagine{' '}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              how care begins
            </span>
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
            Book a demo and see how NeuralCare AI transforms intake, triage, and patient outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-1">
            <Link
              href="/login?next=/demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:from-teal-400 hover:to-teal-500 transition-all duration-300 w-full sm:w-auto"
            >
              Schedule Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-white/90 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
            >
              Contact Sales
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 pt-1">
            {badges.map(({ label, desc }) => (
              <div key={label} className="flex items-center gap-1.5 text-white/50">
                <svg className="h-3.5 w-3.5 text-teal-400/90 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold text-white/90 text-xs">{label}</span>
                <span className="text-white/40 text-[10px]">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
