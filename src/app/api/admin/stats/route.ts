import { NextRequest, NextResponse } from 'next/server';
import { requireRoleDb } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantSlugFromRequest } from '@/lib/tenant';
import { DOCTORS } from '@/app/api/doctors/route';

type GlobalStats = {
  totalUsers: number;
  globalUsers: number;
  tenantUsers: number;
  tenants: number;
  adminUsers: number;
};

type TenantStats = {
  totalUsers: number;
  adminUsers: number;
  memberUsers: number;
  doctorCount: number;
};

/**
 * GET /api/admin/stats
 * Returns stats for either:
 * - Global scope (when no tenant in URL, or for superadmins)
 * - Tenant scope (when subdomain/tenant is present for tenant admins)
 *
 * Admin or superadmin role required.
 */
export async function GET(request: NextRequest) {
  const sessionOrRes = await requireRoleDb(request, ['admin', 'superadmin']);
  if (sessionOrRes instanceof NextResponse) {
    return sessionOrRes;
  }

  const session = sessionOrRes;
  const tenantSlug = getTenantSlugFromRequest(request);

  // Superadmins always see global, cross-tenant stats regardless of subdomain.
  if (tenantSlug && session.role !== 'superadmin') {
    // Tenant-scoped stats: only users belonging to this tenant.
    const { data, error } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('tenant_slug', tenantSlug);

    if (error) {
      console.error('[admin/stats] tenant stats failed:', error.message, {
        tenantSlug,
      });
      return NextResponse.json(
        { error: 'Failed to load organization stats.' },
        { status: 500 },
      );
    }

    const rows = (data ?? []) as { role?: string | null }[];
    const totalUsers = rows.length;
    const adminUsers = rows.filter((r) => r.role === 'admin').length;
    const memberUsers = Math.max(0, totalUsers - adminUsers);

    const stats: TenantStats = {
      totalUsers,
      adminUsers,
      memberUsers,
      doctorCount: DOCTORS.length,
    };

    return NextResponse.json({
      scope: 'tenant',
      tenant: tenantSlug,
      stats,
    });
  }

  // Global stats: aggregate view across all users/tenants.
  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('role, tenant_slug');

  if (error) {
    console.error('[admin/stats] global stats failed:', error.message);
    return NextResponse.json(
      { error: 'Failed to load admin stats.' },
      { status: 500 },
    );
  }

  const rows = (data ?? []) as { role?: string | null; tenant_slug?: string | null }[];
  const totalUsers = rows.length;
  const globalUsers = rows.filter((r) => !r.tenant_slug).length;
  const tenantUsers = totalUsers - globalUsers;
  const adminUsers = rows.filter((r) => r.role === 'admin').length;
  const tenantSet = new Set(
    rows
      .map((r) => (typeof r.tenant_slug === 'string' ? r.tenant_slug : null))
      .filter((v): v is string => !!v),
  );

  const stats: GlobalStats = {
    totalUsers,
    globalUsers,
    tenantUsers,
    tenants: tenantSet.size,
    adminUsers,
  };

  return NextResponse.json({
    scope: 'global',
    stats,
  });
}

