'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#challenges', label: 'Why Us' },
  { href: '#features', label: 'Platform' },
  { href: '#clinical', label: 'Clinical Scope' },
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0e1a]/90 backdrop-blur-xl border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent backdrop-blur-sm border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity font-semibold"
            >
              <span className="text-lg tracking-tight bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">MindCare AI</span>
            </Link>

            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-slate-400 hover:text-white px-3.5 py-2 text-sm font-medium rounded-lg hover:bg-white/[0.06] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/login"
                className="ml-2 text-teal-300 hover:text-teal-200 px-4 py-2 text-sm font-medium rounded-lg bg-teal-500/10 hover:bg-teal-500/15 border border-teal-500/20 transition-colors"
              >
                Log in
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                className="text-slate-400 hover:text-white p-2.5 rounded-lg hover:bg-white/[0.06] transition-colors"
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

      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } bg-[#0a0e1a]/98 backdrop-blur-xl`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`flex flex-col pt-24 px-6 gap-0 transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-white py-4 text-base font-medium border-b border-white/[0.06] transition-all duration-200"
              style={{ transitionDelay: mobileMenuOpen ? `${i * 50}ms` : '0ms' }}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/login"
            className="text-teal-400 py-4 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
