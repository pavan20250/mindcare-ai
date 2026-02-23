'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#journey', label: 'Journey' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
          scrolled ? 'bg-[#0a0e1a]/95 border-white/10' : 'bg-transparent border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-white/95 hover:text-white transition-colors"
            >
              <span className="text-base font-semibold tracking-tight">MindCare AI</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/login"
                className="ml-2 text-white/90 hover:text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Log in
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                className="text-white/90 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — simple overlay matching bg */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden bg-[#0a0e1a]/95 backdrop-blur-sm"
          aria-hidden={false}
        >
          <div className="flex flex-col pt-20 px-5 gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/90 hover:text-white py-3 text-base font-medium border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              className="text-white py-3 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
