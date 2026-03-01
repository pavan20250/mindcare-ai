export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md shadow-teal-500/20">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">MindCare AI</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed max-w-[180px] mb-2.5">
              Intelligent automation for behavioral health.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="X (Twitter)" className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="#" aria-label="GitHub" className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Product</h4>
            <ul className="space-y-1">
              <li><a href="#challenges" className="text-slate-400 hover:text-white text-xs transition-colors">Why Us</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-white text-xs transition-colors">Platform</a></li>
              <li><a href="#clinical" className="text-slate-400 hover:text-white text-xs transition-colors">Clinical Scope</a></li>
              <li><a href="#benefits" className="text-slate-400 hover:text-white text-xs transition-colors">Benefits</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#contact" className="text-slate-400 hover:text-white text-xs transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-xs transition-colors">Privacy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-xs transition-colors">Terms</a></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Compliance</h4>
            <div className="flex flex-wrap gap-1.5">
              {['HIPAA', 'SOC 2', 'HL7 FHIR'].map((badge) => (
                <span key={badge} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[10px] font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-[11px]">
            &copy; {new Date().getFullYear()} MindCare AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-slate-600 text-[10px]">Built with</span>
            <svg className="w-2.5 h-2.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-600 text-[10px]">for better care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
