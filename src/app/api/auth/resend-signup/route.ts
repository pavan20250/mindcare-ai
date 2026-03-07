import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const emailRedirectTo =
  process.env.SUPABASE_EMAIL_REDIRECT ??
  (process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')}/auth/callback`
    : 'http://localhost:3000/auth/callback');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email ?? '').trim();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to resend email. Please try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

