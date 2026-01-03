export default function PatientJourneySection() {
  return (
    <section id="journey" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="mobile-text-xl font-bold text-gray-900 mb-4 gradient-text">Patient Journey Flow</h2>
        </div>
        
        {/* Horizontal Timeline Flow */}
        <div className="relative px-2 sm:px-0">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400" style={{zIndex: 0}}></div>
          
          {/* Steps Container */}
          <div className="relative lg:flex lg:flex-row lg:gap-8">
            {/* Step 1 */}
            <div className="relative z-10 mb-6 lg:mb-0 lg:flex-1">
              <div className="card card-hover text-center">
                <div className="relative mb-2 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">1</span>
                  </div>
                  <div className="hidden lg:block absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-500"></div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">Welcome & Discovery</h3>
                <div className="bg-blue-50 rounded-lg p-1.5 sm:p-2 md:p-3 mb-1.5 sm:mb-2">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 mx-auto mb-0.5 sm:mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 leading-tight">AI Conversational Intake</p>
                <p className="text-xs text-blue-600 mt-0.5 sm:mt-1 font-medium">Symptom Analyzer</p>
              </div>
            </div>

            {/* Arrow - Mobile/Tablet */}
            <div className="lg:hidden flex items-center justify-center my-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 mb-6 lg:mb-0 lg:flex-1">
              <div className="card card-hover text-center">
                <div className="relative mb-2 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">2</span>
                  </div>
                  <div className="hidden lg:block absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-green-500"></div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">Conversational Screening</h3>
                <div className="bg-green-50 rounded-lg p-1.5 sm:p-2 md:p-3 mb-1.5 sm:mb-2">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600 mx-auto mb-0.5 sm:mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 leading-tight">Intelligent Processing</p>
                <p className="text-xs text-green-600 mt-0.5 sm:mt-1 font-medium">DSM-5 Classification</p>
              </div>
            </div>

            {/* Arrow - Mobile/Tablet */}
            <div className="lg:hidden flex items-center justify-center my-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 lg:flex-1">
              <div className="card card-hover text-center">
                <div className="relative mb-2 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">3</span>
                  </div>
                  <div className="hidden lg:block absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-500"></div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">Treatment & Consultation</h3>
                <div className="bg-purple-50 rounded-lg p-1.5 sm:p-2 md:p-3 mb-1.5 sm:mb-2">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600 mx-auto mb-0.5 sm:mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 leading-tight">AI-Powered Efficiency</p>
                <p className="text-xs text-purple-600 mt-0.5 sm:mt-1 font-medium">10-15 min → Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

