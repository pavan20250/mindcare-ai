import { NextRequest, NextResponse } from 'next/server';
import { getRoleForUserId } from '@/lib/roles';

export const SESSION_COOKIE = 'neuralcare_session';

/** Supported roles. Default for new users is `user`. */
export type Role = 'user' | 'admin';

/** Session payload stored in cookie and returned from getSession. */
export interface SessionUser {
  id?: string;
  email: string;
  name?: string;
  role: Role;
}

const DEFAULT_ROLE: Role = 'user';

const VALID_ROLES: Role[] = ['user', 'admin'];

function parseRole(value: unknown): Role {
  if (typeof value === 'string' && VALID_ROLES.includes(value as Role)) {
    return value as Role;
  }
  return DEFAULT_ROLE;
}

/**
 * Reads the session from the request cookie.
 * Returns null if missing, invalid, or not containing email.
 */
export function getSession(request: NextRequest): SessionUser | null {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(token, 'base64url').toString('utf8')
    ) as {
      id?: string;
      email?: string;
      name?: string;
      role?: unknown;
    };
    if (!payload?.email) return null;
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: parseRole(payload.role),
    };
  } catch {
    return null;
  }
}

/**
 * Returns the current session or sends 401.
 * Use in API routes: const session = await requireAuth(request);
 */
export function requireAuth(request: NextRequest): SessionUser | NextResponse {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  return session;
}

/**
 * Returns the session only if the user has one of the allowed roles; otherwise 401 or 403.
 * Use in API routes: const session = requireRole(request, ['admin']);
 */
export function requireRole(
  request: NextRequest,
  allowedRoles: Role[]
): SessionUser | NextResponse {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  if (!allowedRoles.includes(session.role)) {
    return NextResponse.json(
      { error: 'You do not have permission to perform this action.' },
      { status: 403 }
    );
  }
  return session;
}

/**
 * DB-backed RBAC check (recommended).
 * Reads session from cookie, then looks up the role in `public.user_roles`.
 */
export async function requireRoleDb(
  request: NextRequest,
  allowedRoles: Role[]
): Promise<SessionUser | NextResponse> {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  if (!session.id) {
    return NextResponse.json({ error: 'Session missing user id.' }, { status: 401 });
  }
  const role = await getRoleForUserId(session.id);
  if (!allowedRoles.includes(role)) {
    return NextResponse.json(
      { error: 'You do not have permission to perform this action.' },
      { status: 403 }
    );
  }
  return { ...session, role };
}

/** Role to display label (e.g. for sidebar). */
export function getRoleLabel(role: Role): string {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'user':
    default:
      return 'User';
  }
}
