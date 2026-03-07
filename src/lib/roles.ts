import { supabaseAdmin } from '@/lib/supabase';
import type { Role } from '@/lib/auth';

export type UserRoleRow = { user_id: string; role: Role; created_at?: string };

const DEFAULT_ROLE: Role = 'user';

function normalizeRole(value: unknown): Role {
  return value === 'admin' ? 'admin' : 'user';
}

/**
 * Reads a user's role from `public.user_roles`.
 * If no row exists or query fails (e.g. RLS with anon key), returns `user`.
 */
export async function getRoleForUserId(userId: string): Promise<Role> {
  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    // Often: permission denied when using anon key and RLS blocks. Use SUPABASE_SERVICE_ROLE_KEY.
    console.error('[roles] getRoleForUserId failed:', error.message, { userId });
    return DEFAULT_ROLE;
  }
  if (!data) return DEFAULT_ROLE;
  return normalizeRole((data as { role?: unknown }).role);
}

/**
 * Ensures a row exists for user. Safe to call multiple times.
 * Returns the role after ensuring.
 */
export async function ensureUserRole(userId: string, role: Role = DEFAULT_ROLE): Promise<Role> {
  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .upsert({ user_id: userId, role }, { onConflict: 'user_id' })
    .select('role')
    .maybeSingle();

  if (error || !data) return role;
  return normalizeRole((data as { role?: unknown }).role);
}

