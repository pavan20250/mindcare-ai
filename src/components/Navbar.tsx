'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = "text-muted-foreground hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors";

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
                <a href="#features" className={navLinkClass}>Features</a>
                <a href="#journey" className={navLinkClass}>Journey</a>
                <a href="#benefits" className={navLinkClass}>Benefits</a>
                <a href="#contact" className={navLinkClass}>Contact</a>
                <Link href="/login">
                  <Button variant="default" size="sm">Login</Button>
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Open menu">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-nav" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-content mobile-nav-open" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold gradient-text">Menu</h2>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <div className="space-y-4">
                <a href="#features" className={`block ${navLinkClass}`} onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#journey" className={`block ${navLinkClass}`} onClick={() => setMobileMenuOpen(false)}>Journey</a>
                <a href="#benefits" className={`block ${navLinkClass}`} onClick={() => setMobileMenuOpen(false)}>Benefits</a>
                <a href="#contact" className={`block ${navLinkClass}`} onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


