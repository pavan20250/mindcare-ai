export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">MindCare AI</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Intelligent automation for behavioral health. Better intake, better outcomes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#journey" className="text-slate-400 hover:text-white text-sm transition-colors">How it works</a></li>
              <li><a href="#benefits" className="text-slate-400 hover:text-white text-sm transition-colors">Benefits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Compliance</h4>
            <div className="flex flex-wrap gap-2">
              {['HIPAA', 'SOC 2', 'HL7 FHIR'].map((badge) => (
                <span key={badge} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} MindCare AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 text-xs">Built with</span>
            <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-600 text-xs">for better care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
