export default function BenefitsSection() {
  return (
    <section id="benefits" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="mobile-text-xl font-bold text-gray-900 mb-4 gradient-text">Benefits for All Stakeholders</h2>
        </div>
        
        <div className="mobile-grid">
          <div className="card card-hover text-center">
            <div className="mobile-icon-lg bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-glow">
              <svg className="w-5 h-5 sm:w-6 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Patients</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Personalized Care</span>
              </div>
            </div>
          </div>
          
          <div className="card card-hover text-center">
            <div className="mobile-icon-lg bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-glow">
              <svg className="w-5 h-5 sm:w-6 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Clinicians</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Auto Summaries</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Less Admin Time</span>
              </div>
            </div>
          </div>
          
          <div className="card card-hover text-center">
            <div className="mobile-icon-lg bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-glow-purple">
              <svg className="w-5 h-5 sm:w-6 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Administrators</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Auto-Scheduling</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Faster Reimbursement</span>
              </div>
            </div>
          </div>
          
          <div className="card card-hover text-center">
            <div className="mobile-icon-lg bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-glow-purple">
              <svg className="w-5 h-5 sm:w-6 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Organization</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Data Insights</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

