export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding section-gradient">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="mobile-text-xl font-bold text-gray-900 mb-4 gradient-text">Key Features</h2>
        </div>
        
        <div className="mobile-grid">
          <div className="card card-hover text-center">
            <div className="feature-icon mb-2 sm:mb-4 mx-auto">
              <svg className="w-4 h-4 sm:w-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Intake & Screening</h3>
            <div className="bg-blue-50 rounded-lg p-2 sm:p-4 mb-2 sm:mb-3 aspect-video flex items-center justify-center">
              <div className="text-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-xs text-blue-600 font-medium">24/7 AI Chat</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-tight">Conversational intake with DSM-5 assessments</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="feature-icon mb-2 sm:mb-4 mx-auto bg-gradient-secondary">
              <svg className="w-4 h-4 sm:w-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Triage & Referral</h3>
            <div className="bg-green-50 rounded-lg p-2 sm:p-4 mb-2 sm:mb-3 aspect-video flex items-center justify-center">
              <div className="text-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="text-xs text-green-600 font-medium">Smart Routing</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-tight">Automated routing based on severity</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="feature-icon mb-2 sm:mb-4 mx-auto bg-gradient-success">
              <svg className="w-4 h-4 sm:w-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">AI Clinical Insights</h3>
            <div className="bg-purple-50 rounded-lg p-2 sm:p-4 mb-2 sm:mb-3 aspect-video flex items-center justify-center">
              <div className="text-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-xs text-purple-600 font-medium">AI Summaries</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-tight">LLM-powered clinical summaries & plans</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="feature-icon mb-2 sm:mb-4 mx-auto bg-gradient-to-r from-purple-600 to-pink-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Smart Dashboards</h3>
            <div className="bg-pink-50 rounded-lg p-2 sm:p-4 mb-2 sm:mb-3 aspect-video flex items-center justify-center">
              <div className="text-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-pink-600 mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <p className="text-xs text-pink-600 font-medium">Real-Time Views</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-tight">Analytics & appointment tracking</p>
          </div>
        </div>
      </div>
    </section>
  );
}

