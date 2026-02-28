'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import NeuralNetworkBg from '@/components/website/NeuralNetworkBg';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 relative z-10">
      <Card className="border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-2xl shadow-black/20 rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white">Sign in</CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to book an appointment with a provider.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="rounded-xl border-red-500/30 bg-red-500/10 text-red-300">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-lg border-white/10 bg-white/[0.06] h-11 text-white placeholder:text-slate-500 focus:border-teal-500/50 focus:ring-teal-500/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-lg border-white/10 bg-white/[0.06] h-11 text-white placeholder:text-slate-500 focus:border-teal-500/50 focus:ring-teal-500/20"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 rounded-lg font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white border-0">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
          <p className="mt-6 text-center text-slate-500 text-sm">
            Demo: use any email and password to sign in.
          </p>
        </CardContent>
      </Card>

      <p className="mt-8 text-center">
        <Link href="/" className="text-slate-400 text-sm font-medium hover:text-teal-400 transition-colors">
          ← Back
        </Link>
      </p>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 relative z-10">
      <Card className="border-white/10 bg-white/[0.06] backdrop-blur-xl rounded-2xl min-h-[220px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-3 pt-6">
          <div className="size-9 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading…</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NeuralNetworkBg nodeCount={60} />
      </div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-teal-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <nav className="relative z-10 border-b border-white/[0.06] bg-white/[0.03] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
              MindCare AI
            </Link>
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}