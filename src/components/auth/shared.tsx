'use client';

import { useState, type InputHTMLAttributes } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Google icon (official brand SVG)                                   */
/* ------------------------------------------------------------------ */
export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-5', className)} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Google OAuth button                                                */
/* ------------------------------------------------------------------ */
export function GoogleOAuthButton({ label = 'Continue with Google' }: { label?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full h-11 rounded-xl border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium gap-2.5 transition-all duration-200"
      onClick={() => { window.location.href = '/api/auth/google'; }}
    >
      <GoogleIcon className="size-[18px]" />
      {label}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  "or" divider                                                       */
/* ------------------------------------------------------------------ */
export function OAuthDivider() {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-white/[0.08]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wider">
        <span className="bg-[#0c1220] px-3 text-slate-500 select-none">or</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styled form field (label + input)                                  */
/* ------------------------------------------------------------------ */
const inputClasses =
  'rounded-xl border-white/10 bg-white/[0.05] h-11 text-white placeholder:text-slate-500 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200';

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldId: string;
}

export function AuthField({ label, fieldId, className, ...props }: AuthFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldId} className="text-slate-300 text-[13px] font-medium">
        {label}
      </Label>
      <Input id={fieldId} className={cn(inputClasses, className)} {...props} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Password field with visibility toggle                              */
/* ------------------------------------------------------------------ */
interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  fieldId: string;
}

export function PasswordField({ label, fieldId, className, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldId} className="text-slate-300 text-[13px] font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={fieldId}
          type={visible ? 'text' : 'password'}
          className={cn(inputClasses, 'pr-11', className)}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          {visible ? (
            <svg className="size-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg className="size-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Error alert                                                        */
/* ------------------------------------------------------------------ */
export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-3.5 py-2.5 text-red-300 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
      <svg className="size-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success alert                                                      */
/* ------------------------------------------------------------------ */
export function AuthSuccess({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="status" className="flex items-start gap-2.5 rounded-xl border border-teal-500/20 bg-teal-500/[0.07] px-3.5 py-2.5 text-teal-300 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
      <svg className="size-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Submit button with loading spinner                                 */
/* ------------------------------------------------------------------ */
export function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 active:scale-[0.98] text-white border-0 shadow-lg shadow-teal-500/20 transition-all duration-200 disabled:opacity-60"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Please wait…
        </span>
      ) : children}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Auth footer link                                                   */
/* ------------------------------------------------------------------ */
export function AuthFooter({ text, linkText, href }: { text: string; linkText: string; href: string }) {
  return (
    <p className="mt-5 text-center text-slate-400 text-sm">
      {text}{' '}
      <Link href={href} className="text-teal-400 font-medium hover:text-teal-300 transition-colors">
        {linkText}
      </Link>
    </p>
  );
}
