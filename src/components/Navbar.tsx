'use client';

import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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
    </>
  );
}

