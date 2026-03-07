// Utilities for multi-tenant support using subdomains.
// Each client organization is represented by a subdomain, e.g. acme.example.com.

export type TenantSlug = string;

const RESERVED_SUBDOMAINS = ['www'];

/**
 * Derive a tenant slug from a hostname.
 * - Returns null for root domain (example.com) or localhost.
 * - Returns null for reserved subdomains like "www".
 */
export function getTenantSlugFromHostname(
  hostname: string | null | undefined,
): TenantSlug | null {
  if (!hostname) return null;

  const host = hostname.toLowerCase();

  // Treat plain localhost as global (no tenant).
  if (host === 'localhost') {
    return null;
  }

  const parts = host.split('.');
  let subdomain: string | undefined;

  if (parts.length === 2 && parts[1] === 'localhost') {
    // e.g. apollo.localhost → tenant = "apollo" (local dev)
    subdomain = parts[0];
  } else if (parts.length >= 3) {
    // e.g. apollo.neuralforge.in → tenant = "apollo"
    subdomain = parts[0];
  }

  if (!subdomain || RESERVED_SUBDOMAINS.includes(subdomain)) {
    return null;
  }

  return subdomain;
}

/**
 * Resolve the tenant slug from an incoming request.
 * Prefers the `x-tenant` header (set by middleware) and falls back to parsing the URL/Host.
 */
export function getTenantSlugFromRequest(request: Request): TenantSlug | null {
  const header = request.headers.get('x-tenant');
  if (header) {
    return header.toLowerCase();
  }

  let hostname: string | null = null;
  try {
    const url = new URL(request.url);
    hostname = url.hostname;
  } catch {
    const hostHeader = request.headers.get('host');
    hostname = hostHeader ? hostHeader.split(':')[0] : null;
  }

  return getTenantSlugFromHostname(hostname);
}

/**
 * Read the tenant slug from Supabase user metadata.
 * Expects a `tenant_slug` (preferred), `tenantSlug`, or `tenant` field.
 *
 * You can set this in Supabase by updating the user's auth metadata, e.g.:
 *   update auth.users set raw_user_meta_data = jsonb_set(coalesce(raw_user_meta_data, '{}'::jsonb), '{tenant_slug}', '"apollo"')
 * where id = '...';
 */
export function getTenantSlugFromUserMetadata(
  metadata: Record<string, unknown> | null | undefined,
): TenantSlug | null {
  if (!metadata) return null;

  const possible =
    (metadata as any).tenant_slug ??
    (metadata as any).tenantSlug ??
    (metadata as any).tenant;

  if (!possible || typeof possible !== 'string') {
    return null;
  }

  return possible.toLowerCase();
}

