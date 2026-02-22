export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-base font-bold text-white">MindCare AI</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              Intelligent automation for behavioral health. Better intake, better outcomes.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-slate-500 hover:text-white text-xs transition-colors">Features</a></li>
              <li><a href="#journey" className="text-slate-500 hover:text-white text-xs transition-colors">How it works</a></li>
              <li><a href="#benefits" className="text-slate-500 hover:text-white text-xs transition-colors">Benefits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-slate-500 hover:text-white text-xs transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Compliance</h4>
            <div className="flex flex-wrap gap-1.5">
              {['HIPAA', 'SOC 2', 'HL7 FHIR'].map((badge) => (
                <span key={badge} className="px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-800 text-slate-400 text-[10px] font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} MindCare AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-slate-700 text-[10px]">Built with</span>
            <svg className="w-3 h-3 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-700 text-[10px]">for better care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
