import Link from 'next/link';

export default function CTASection() {
  return (
    <section id="contact" className="hero-gradient section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(255,255,255,0.1),transparent)]" />
      <div className="relative max-w-2xl mx-auto text-center px-4">
        <p className="text-blue-100/90 text-xs font-semibold uppercase tracking-widest mb-3">Get started</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to transform care?</h2>
        <p className="text-white/90 text-sm sm:text-base mb-8">See how MindCare AI can support your organization.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo" className="btn-primary rounded-xl">Schedule Demo</Link>
          <button type="button" className="btn-ghost rounded-xl">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
