'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">MindCare AI</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                <a href="#journey" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Patient Journey</a>
                <a href="#benefits" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Benefits</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-content mobile-nav-open" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold gradient-text">Menu</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <a href="#features" className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#journey" className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Patient Journey</a>
                <a href="#benefits" className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
                <a href="#contact" className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden mobile-hero">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left text-white">
              <h1 className="mobile-hero-title font-bold mb-4 sm:mb-6 slide-in">
                AI-Powered Platform for
                <span className="block text-yellow-200">Behavioral Health</span>
                Coordination & Care
              </h1>
              <div className="mobile-btn-group justify-center lg:justify-start slide-in">
                <button className="btn-primary">
                  Get Started
                </button>
                <Link href="/demo" className="btn-ghost">
                  Try Demo
                </Link>
              </div>
            </div>
            <div className="relative fade-in mt-8 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-base sm:text-lg font-semibold">Platform Demo</p>
                    <p className="text-xs sm:text-sm opacity-80">See it in action</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Floating elements - hidden on mobile */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full floating-animation mobile-floating"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full floating-animation mobile-floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full floating-animation mobile-floating" style={{animationDelay: '4s'}}></div>
      </section>

      {/* Current Challenges Section */}
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

      {/* Features Section */}
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

      {/* Patient Journey Section */}
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

      {/* Clinical Scope Section */}
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

      {/* Benefits Section */}
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

      {/* CTA Section */}
      <section id="contact" className="hero-gradient section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 text-white mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="mobile-text-xl font-bold text-white mb-6">Ready to Transform Behavioral Health Care?</h2>
          <div className="mobile-btn-group justify-center">
            <button className="btn-primary">
              Schedule Demo
            </button>
            <button className="btn-ghost">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mobile-grid gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 mb-3 sm:mb-4">MindCare AI</h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                AI-powered platform for behavioral health coordination and care delivery.
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Patient Journey</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clinical Scope</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Benefits</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2024 MindCare AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
