'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#journey', label: 'Journey' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#contact', label: 'Contact' },
];

const SCROLL_THRESHOLD = 36;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // init in case we're not at top
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const overHero = !scrolled;
  const navLinkClass = overHero
    ? 'relative text-white/90 hover:text-white px-3 py-2 rounded-lg text-[15px] font-medium tracking-tight transition-all duration-200 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
    : 'relative text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg text-[15px] font-medium tracking-tight transition-all duration-200 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-px after:scale-x-0 after:bg-slate-900 after:transition-transform after:duration-200 hover:after:scale-x-100';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'nav-glass nav-glass-shadow'
            : 'bg-transparent border-b border-white/0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[4.25rem]">
            <Link
              href="/"
              className={`flex items-center gap-3 group transition-colors duration-300 ${
                overHero ? 'text-white' : 'text-slate-900'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  overHero
                    ? 'bg-white/15 backdrop-blur-sm ring-1 ring-white/20 group-hover:bg-white/25 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]'
                    : 'bg-gradient-to-br from-blue-600 to-violet-600 shadow-sm ring-1 ring-black/5 group-hover:scale-[1.02] group-hover:shadow-md group-hover:shadow-blue-500/20'
                }`}
              >
                <svg
                  className="w-4.5 h-4.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                MindCare AI
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className={navLinkClass}>
                  {item.label}
                </a>
              ))}
              <Link href="/login" className="ml-4">
                <Button
                  size="sm"
                  className={`rounded-lg h-9 px-4 font-medium border-0 transition-all duration-200 hover:transition-all focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    overHero
                      ? 'bg-white/20 text-white hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-visible:ring-white/50 border border-white/20'
                      : 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/25 focus-visible:ring-slate-400'
                  }`}
                >
                  Log in
                </Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`size-10 rounded-lg transition-colors duration-300 ${
                  overHero
                    ? 'text-white/90 hover:text-white hover:bg-white/15'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
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
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-[min(300px,85vw)] bg-white shadow-xl border-l border-slate-200/80 transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full pt-6 pb-8 px-5">
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 font-medium text-[15px] transition-colors active:scale-[0.99]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-slate-100">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  className="w-full h-11 rounded-lg font-medium bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99] transition-transform"
                  size="lg"
                >
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
