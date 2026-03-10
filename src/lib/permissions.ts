import type { Role as AuthRole } from '@/lib/auth';

export type Role = AuthRole;

/**
 * Centralized list of all permissioned pages (RBAC).
 *
 * Adding a new permissioned page should only require editing this file:
 * - add the page key to `PAGES`
 * - assign it to roles in `ROLE_PERMISSIONS`
 */
export const PAGES = {
  dashboard: { href: '/dashboard', label: 'Dashboard', category: 'General' },
  profile: { href: '/profile', label: 'Profile', category: 'General' },
  reports: { href: '/reports', label: 'Reports', category: 'General' },

  team: { href: '/team', label: 'Team', category: 'Admin' },
  billing: { href: '/billing', label: 'Billing', category: 'Admin' },
  audit_logs: { href: '/audit-logs', label: 'Audit logs', category: 'Admin' },

  user_management: { href: '/admin', label: 'User management', category: 'SuperAdmin' },
  role_management: { href: '/admin/roles', label: 'Role management', category: 'SuperAdmin' },
  system_settings: { href: '/admin/system', label: 'System settings', category: 'SuperAdmin' },
  api_keys: { href: '/admin/api-keys', label: 'API keys', category: 'SuperAdmin' },
  global_analytics: { href: '/admin/analytics', label: 'Global analytics', category: 'SuperAdmin' },
} as const;

export type PageKey = keyof typeof PAGES;

export const ROLE_PERMISSIONS: Record<Role, readonly PageKey[]> = {
  user: ['dashboard', 'profile', 'reports'],
  admin: ['dashboard', 'profile', 'reports', 'team', 'billing', 'audit_logs'],
  superadmin: [
    'dashboard',
    'profile',
    'reports',
    'team',
    'billing',
    'audit_logs',
    'user_management',
    'role_management',
    'system_settings',
    'api_keys',
    'global_analytics',
  ],
} as const;

export function hasAccess(role: Role, page: PageKey): boolean {
  return ROLE_PERMISSIONS[role].includes(page);
}

export function getAccessiblePages(role: Role): PageKey[] {
  return [...ROLE_PERMISSIONS[role]];
}

export type PageCategory = (typeof PAGES)[PageKey]['category'];

export function getPageMeta(page: PageKey) {
  return PAGES[page];
}

/**
 * Maps a URL pathname to a PageKey using `PAGES`.
 * Uses longest-prefix match so nested routes (e.g. `/admin/roles/...`) resolve correctly.
 */
export function getPageKeyFromPath(pathname: string): PageKey | null {
  const path = pathname.split('?')[0]?.split('#')[0] ?? pathname;
  const keys = (Object.keys(PAGES) as PageKey[]).sort(
    (a, b) => PAGES[b].href.length - PAGES[a].href.length
  );

  for (const key of keys) {
    const href = PAGES[key].href;
    if (path === href || path.startsWith(href + '/')) return key;
  }

  return null;
}
