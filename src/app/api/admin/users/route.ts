import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRoleDb } from '@/lib/auth';
import { getTenantSlugFromRequest, getTenantSlugFromUserMetadata } from '@/lib/tenant';

type AdminUser = {
  id: string;
  email: string | null;
  name: string;
};

/**
 * GET /api/admin/users
 *
 * Returns all users that belong to the current tenant (based on subdomain).
 * - Requires the caller to have the "admin" role (checked via user_roles).
 * - On a tenant subdomain like apollo.neuralforge.in, returns only Apollo users.
 * - On the global domain (no tenant), currently returns an empty list to avoid
 *   accidentally exposing all users; you can relax this if you introduce a
 *   distinct "superadmin" role later.
 */
export async function GET(request: NextRequest) {
  const sessionOrRes = await requireRoleDb(request, ['admin']);
  if (sessionOrRes instanceof NextResponse) {
    return sessionOrRes;
  }

  const tenantSlug = getTenantSlugFromRequest(request);

  // For now, do not expose global user listing from the root domain.
  if (!tenantSlug) {
    return NextResponse.json({ users: [] });
  }

  const users: AdminUser[] = [];

  // Use the Supabase Admin API to list all users, then filter by tenant slug
  // stored in auth user metadata (tenant_slug / tenantSlug / tenant).
  // This is acceptable for modest user counts; for very large datasets you may
  // want a dedicated SQL table or view keyed by tenant.
  let page = 1;
  const perPage = 1000;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      console.error('[admin/users] listUsers failed:', error.message);
      return NextResponse.json(
        { error: 'Failed to load users for this organization.' },
        { status: 500 },
      );
    }

    const pageUsers = (data?.users ?? []).filter((u) => {
      const userTenant = getTenantSlugFromUserMetadata(
        (u.user_metadata as Record<string, unknown>) ?? null,
      );
      return userTenant === tenantSlug;
    });

    for (const u of pageUsers) {
      const email = u.email ?? null;
      const metadata = (u.user_metadata ?? {}) as Record<string, unknown>;
      const displayName =
        (metadata.full_name as string | undefined) ||
        (email ? email.split('@')[0] : 'Unknown');

      users.push({
        id: u.id,
        email,
        name: displayName,
      });
    }

    if (!data || data.users.length < perPage) {
      break;
    }
    page += 1;
  }

  return NextResponse.json({ users });
}

