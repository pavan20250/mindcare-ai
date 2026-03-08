import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRoleDb } from '@/lib/auth';
import { getTenantSlugFromRequest, getTenantSlugFromUserMetadata } from '@/lib/tenant';

type AdminUser = {
  id: string;
  email: string | null;
  name: string;
  tenant?: string | null;
};

/**
 * GET /api/admin/users
 *
 * Returns users visible to the current admin:
 * - Tenant admins: all users that belong to the current tenant (based on subdomain).
 * - Superadmins: all users across all tenants (global view).
 */
export async function GET(request: NextRequest) {
  const sessionOrRes = await requireRoleDb(request, ['admin', 'superadmin']);
  if (sessionOrRes instanceof NextResponse) {
    return sessionOrRes;
  }

  const session = sessionOrRes;
  const tenantSlug = getTenantSlugFromRequest(request);
  const users: AdminUser[] = [];

  // Use the Supabase Admin API to list all users, optionally filtering by tenant
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

      // Superadmins see all tenants; tenant admins are scoped.
      if (session.role === 'superadmin') {
        return true;
      }

      // For safety, only show tenant users when we have an explicit tenant slug.
      if (!tenantSlug) {
        return false;
      }

      return userTenant === tenantSlug;
    });

    for (const u of pageUsers) {
      const email = u.email ?? null;
      const metadata = (u.user_metadata ?? {}) as Record<string, unknown>;
      const displayName =
        (metadata.full_name as string | undefined) ||
        (email ? email.split('@')[0] : 'Unknown');
      const userTenant = getTenantSlugFromUserMetadata(
        (u.user_metadata as Record<string, unknown>) ?? null,
      );

      users.push({
        id: u.id,
        email,
        name: displayName,
        tenant: userTenant,
      });
    }

    if (!data || data.users.length < perPage) {
      break;
    }
    page += 1;
  }

  return NextResponse.json({ users });
}

