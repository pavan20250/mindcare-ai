import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const emailRedirectTo =
  process.env.SUPABASE_EMAIL_REDIRECT ??
  (process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')}/auth/reset-password`
    : 'http://localhost:3000/auth/reset-password');

/**
 * POST /api/auth/forgot-password
 * Sends a password reset email via Supabase.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email ?? '').trim();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo: emailRedirectTo,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to send reset email.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
