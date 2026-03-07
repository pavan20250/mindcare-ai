import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ensureUserRole } from '@/lib/roles';
import { getTenantSlugFromRequest } from '@/lib/tenant';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const password = body.password ?? '';

    const tenantSlug = getTenantSlugFromRequest(request);

    // Derive the email redirect target from the current request origin so that
    // signup links keep the user on the same subdomain/tenant in both local
    // and production environments.
    const url = new URL(request.url);
    const origin = url.origin.replace(/\/$/, '');
    const emailRedirectTo =
      process.env.SUPABASE_EMAIL_REDIRECT ||
      `${origin}/auth/callback`;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...(name ? { full_name: name } : {}),
          ...(tenantSlug ? { tenant_slug: tenantSlug } : {}),
        },
        emailRedirectTo,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Signup failed. Please try again.' },
        { status: 400 },
      );
    }

    // Default role in DB (RBAC source of truth).
    if (data.user?.id) {
      await ensureUserRole(data.user.id, 'user', tenantSlug ?? null);
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


