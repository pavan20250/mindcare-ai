export default function ChallengesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="mobile-text-xl font-bold text-gray-900 mb-4 gradient-text">Current Challenges We Solve</h2>
        </div>
        
        <div className="mobile-grid-2">
          <div className="card card-hover text-center">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
              <svg className="w-7 h-7 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-red-800 mb-2 sm:mb-4">Patient Challenges</h3>
            <div className="space-y-1.5 sm:space-y-3">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 text-xs">Long Wait Times</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-red-700 text-xs">Complex Forms</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-red-700 text-xs">No Follow-Up</span>
              </div>
            </div>
          </div>
          
          <div className="card card-hover text-center">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
              <svg className="w-7 h-7 sm:w-10 sm:h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-orange-800 mb-2 sm:mb-4">Clinician Challenges</h3>
            <div className="space-y-1.5 sm:space-y-3">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-orange-700 text-xs">35% Time on Docs</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="text-orange-700 text-xs">Referral Errors</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-orange-700 text-xs">Billing Issues</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

