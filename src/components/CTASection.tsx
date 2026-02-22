import Link from 'next/link';

export default function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative py-16 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-blue-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-blue-400/50" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
            Ready to transform
            <span className="block bg-gradient-to-r from-blue-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              how care begins?
            </span>
          </h2>

          <p className="text-white/50 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            See how MindCare AI can support your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/demo" className="btn-primary rounded-xl px-7 py-3.5">
              Schedule Demo
            </Link>
            <button type="button" className="btn-ghost rounded-xl px-7 py-3.5">
              Contact Sales
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            {['SOC 2', 'HIPAA', 'HL7 FHIR'].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/40 text-xs font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
