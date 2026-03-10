'use client';

import type { Role } from '@/lib/permissions';
import { useSessionUser } from '@/components/auth/useSessionUser';

export function RoleGate({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: React.ReactNode;
}) {
  const { user, loading } = useSessionUser();
  if (loading) return null;
  if (!user?.role) return null;
  if (!allowedRoles.includes(user.role)) return null;
  return children;
}

