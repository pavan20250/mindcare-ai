import { NextRequest, NextResponse } from 'next/server';
import { getTenantSlugFromHostname } from '@/lib/tenant';

/**
 * Middleware to detect the tenant from the subdomain and
 * pass it to the application via the `x-tenant` request header.
 *
 * Examples:
 * - apollo.neuralforge.in   → x-tenant: apollo
 * - agastya.neuralforge.in  → x-tenant: agastya
 * - neuralforge.in          → no tenant (global)
 */
export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const tenantSlug = getTenantSlugFromHostname(hostname);

  const requestHeaders = new Headers(request.headers);
  if (tenantSlug) {
    requestHeaders.set('x-tenant', tenantSlug);
  } else {
    requestHeaders.delete('x-tenant');
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Run on all app and API routes except Next internals and common static assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};

