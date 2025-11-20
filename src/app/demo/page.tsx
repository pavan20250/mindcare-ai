'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);

  const demoSteps = [
    {
      id: 'welcome',
      title: 'Welcome to MindCare AI',
      message: "Hello! I'm your AI care assistant. I'm here to help you get the care you need. Let's start by understanding how you've been feeling lately. Can you tell me about your main concerns?",
      type: 'message'
    },
    {
      id: 'symptoms',
      title: 'Symptom Assessment',
      message: "I understand you're experiencing some challenges. Let me ask you a few questions to better understand your situation. How long have you been feeling this way?",
      type: 'question',
      options: ['Less than 2 weeks', '2-4 weeks', '1-3 months', 'More than 3 months']
    },
    {
      id: 'severity',
      title: 'Severity Assessment',
      message: "Thank you for sharing that. On a scale of 1-10, where 1 is 'not at all' and 10 is 'extremely', how would you rate the impact of these feelings on your daily life?",
      type: 'scale',
      min: 1,
      max: 10
    },
    {
      id: 'phq9',
      title: 'PHQ-9 Assessment',
      message: "Based on your responses, I'd like to ask you some specific questions about your mood. Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
      type: 'question',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
    },
    {
      id: 'recommendation',
      title: 'Care Recommendation',
      message: "Thank you for completing the assessment. Based on your responses, I recommend scheduling a consultation with a mental health professional. Your symptoms suggest mild to moderate depression, and early intervention can be very helpful.",
      type: 'recommendation',
      severity: 'mild',
      nextSteps: [
        'Schedule consultation with psychologist',
        'Complete full PHQ-9 assessment',
        'Access self-help resources'
      ]
    }
  ];

  const handleResponse = (response: string) => {
    setResponses(prev => ({ ...prev, [demoSteps[currentStep].id]: response }));
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1500);
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl sm:text-2xl font-bold gradient-text">MindCare AI</Link>
            <div className="text-sm text-gray-600">Demo Mode</div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Platform Demo</h1>
          <p className="text-base sm:text-lg text-gray-600">Experience our AI-powered conversational intake process</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {demoSteps.length}</span>
            <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="space-y-4 sm:space-y-6">
            {/* AI Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">{currentStepData.title}</h3>
                  <p className="text-blue-800 text-sm sm:text-base">{currentStepData.message}</p>
                </div>
              </div>
            </div>

            {/* User Response */}
            {responses[currentStepData.id] && (
              <div className="flex items-start space-x-3 justify-end">
                <div className="flex-1 max-w-xs sm:max-w-sm">
                  <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                    <p className="text-gray-800 text-sm sm:text-base">{responses[currentStepData.id]}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Response Options */}
        {!isTyping && currentStepData.type === 'question' && (
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Select your response:</h3>
            <div className="grid gap-3">
              {currentStepData.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleResponse(option)}
                  className="text-left p-4 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100 transition-colors text-sm sm:text-base min-h-[44px] w-full"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isTyping && currentStepData.type === 'scale' && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Rate your experience:</h3>
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <span className="text-sm text-gray-600">1 (Not at all)</span>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handleResponse(num.toString())}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100 transition-colors text-sm sm:text-base font-semibold touch-manipulation"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600">10 (Extremely)</span>
            </div>
          </div>
        )}

        {!isTyping && currentStepData.type === 'recommendation' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-4">Care Recommendation</h3>
              <div className="space-y-3">
                {currentStepData.nextSteps?.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-green-800 text-sm sm:text-base">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setCurrentStep(0)}
                className="btn-primary w-full sm:w-auto"
              >
                Restart Demo
              </button>
              <Link
                href="/"
                className="btn-secondary w-full sm:w-auto"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Demo Info */}
        <div className="mt-8 sm:mt-12 bg-gray-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6 text-center">Demo Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-3">AI-Powered Features</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Conversational Flow</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Real-Time Scoring</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-3">Clinical Integration</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span>DSM-5 Criteria</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>PHQ-9 Assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
