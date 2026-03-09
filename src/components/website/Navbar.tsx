'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };

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
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      const el = document.querySelector(href);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    },
    []
  );

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
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity font-semibold shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/NeuralCare_logo/website_logo.png"
                alt="NeuralCare AI"
                width={180}
                height={100}
                className="h-24 sm:h-32 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
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

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="text-slate-400 hover:text-white p-2.5 -mr-1 rounded-lg hover:bg-white/[0.06] transition-colors active:scale-95"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
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

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } bg-[#0a0e1a]/98 backdrop-blur-xl`}
        aria-hidden={!mobileMenuOpen}
        onClick={(e) => {
          // Close if tapping the backdrop itself
          if (e.target === e.currentTarget) setMobileMenuOpen(false);
        }}
      >
        {/* Close button top-right */}
        <div className="flex justify-between items-center px-4 h-14 border-b border-white/[0.06]">
          <Link
            href="/"
            className="flex items-center shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/NeuralCare_logo/website_logo.png"
              alt="NeuralCare AI"
              width={140}
              height={80}
              className="h-24 w-auto"
            />
          </Link>
          <button
            type="button"
            className="text-slate-400 hover:text-white p-2.5 -mr-1 rounded-lg hover:bg-white/[0.06] transition-colors active:scale-95"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div
          className={`flex flex-col px-4 pt-2 transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between text-slate-300 hover:text-white py-4 text-base font-medium border-b border-white/[0.06] transition-all duration-200 active:text-teal-300 ${
                mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${80 + i * 45}ms` : '0ms',
              }}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
              <svg className="size-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}

          {/* Login CTA at bottom of menu */}
          <div className="pt-5 pb-6">
            <Link
              href="/login"
              className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/15 transition-colors active:scale-[0.98]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}