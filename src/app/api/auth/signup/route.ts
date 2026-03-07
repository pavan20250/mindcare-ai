import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ensureUserRole } from '@/lib/roles';

const emailRedirectTo =
  process.env.SUPABASE_EMAIL_REDIRECT ??
  (process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')}/auth/callback`
    : 'http://localhost:3000/auth/callback');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const password = body.password ?? '';

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...(name ? { full_name: name } : {}),
        },
        emailRedirectTo: emailRedirectTo,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Signup failed. Please try again.' },
        { status: 400 }
      );
    }

    // Default role in DB (RBAC source of truth).
    if (data.user?.id) {
      await ensureUserRole(data.user.id, 'user');
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}


