import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { SESSION_COOKIE } from '@/lib/auth';
import { ensureUserRole, getRoleForUserId, getTenantForUserId } from '@/lib/roles';
import {
  getTenantSlugFromRequest,
  getTenantSlugFromUserMetadata,
} from '@/lib/tenant';

const MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const accessToken = body.accessToken as string | undefined;
    const tenantSlug = getTenantSlugFromRequest(request);

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing access token.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || 'Invalid or expired token.' },
        { status: 401 },
      );
    }

    const dbTenant = data.user.id
      ? await getTenantForUserId(data.user.id)
      : null;
    const metadataTenant = getTenantSlugFromUserMetadata(
      (data.user.user_metadata as Record<string, unknown>) ?? null,
    );
    const userTenant = dbTenant ?? metadataTenant ?? null;

    if (tenantSlug) {
      if (tenantSlug !== userTenant) {
        return NextResponse.json(
          {
            error:
              'This account does not belong to this organization. Please sign in using your organization-specific login link.',
          },
          { status: 403 },
        );
      }
    } else if (userTenant) {
      return NextResponse.json(
        {
          error:
            'This account belongs to an organization. Please sign in using your organization-specific login link.',
        },
        { status: 403 },
      );
    }

    const displayName =
      (data.user.user_metadata as { full_name?: string } | null)?.full_name ||
      data.user.email?.split('@')[0] ||
      '';

    const existingRole = await getRoleForUserId(data.user.id);
    const role = await ensureUserRole(data.user.id, existingRole);
    const payload = JSON.stringify({
      id: data.user.id,
      email: data.user.email,
      name: displayName,
      role,
      at: Date.now(),
    });
    const value = Buffer.from(payload).toString('base64url');

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: MAX_AGE,
      path: '/',
    });

    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

