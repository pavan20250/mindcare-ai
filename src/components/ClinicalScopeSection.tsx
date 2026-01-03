export default function ClinicalScopeSection() {
  return (
    <section className="section-padding section-gradient">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="mobile-text-xl font-bold text-gray-900 mb-4 gradient-text">Clinical Scope</h2>
        </div>
        
        <div className="mobile-grid-3">
          <div className="card card-hover text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Neurodevelopmental</h3>
            <p className="text-gray-600 text-xs mb-1 sm:mb-2 leading-tight">ASD, ADHD</p>
            <p className="text-blue-600 text-xs font-medium">AQ-10, ASRS</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Anxiety Disorders</h3>
            <p className="text-gray-600 text-xs mb-1 sm:mb-2 leading-tight">GAD, Social, Panic</p>
            <p className="text-blue-600 text-xs font-medium">GAD-7</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Depressive Disorders</h3>
            <p className="text-gray-600 text-xs mb-1 sm:mb-2 leading-tight">MDD, Persistent</p>
            <p className="text-blue-600 text-xs font-medium">PHQ-9, PHQ-2</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Trauma & Stress</h3>
            <p className="text-gray-600 text-xs mb-1 sm:mb-2 leading-tight">PTSD</p>
            <p className="text-blue-600 text-xs font-medium">PCL-5</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Substance & Addictive</h3>
            <p className="text-gray-600 text-xs mb-1 sm:mb-2 leading-tight">Alcohol, Drug Use</p>
            <p className="text-blue-600 text-xs font-medium">AUDIT, DAST</p>
          </div>
          
          <div className="card card-hover text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="mobile-text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Personality Disorders</h3>
            <p className="text-gray-600 text-xs mb-1 sm:mb-2 leading-tight">BPD</p>
            <p className="text-blue-600 text-xs font-medium">MSI-BPD</p>
          </div>
        </div>
      </div>
    </section>
  );
}

