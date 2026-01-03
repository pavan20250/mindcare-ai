export default function CTASection() {
  return (
    <section id="contact" className="hero-gradient section-padding">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <svg className="w-20 h-20 text-white mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="mobile-text-xl font-bold text-white mb-6">Ready to Transform Behavioral Health Care?</h2>
        <div className="mobile-btn-group justify-center">
          <button className="btn-primary">
            Schedule Demo
          </button>
          <button className="btn-ghost">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}

