import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export interface ProfileRow {
  full_name?:         string | null;
  phone?:             string | null;
  date_of_birth?:     string | null;
  address?:           string | null;
  bio?:               string | null;
  emergency_contact?: string | null;
  emergency_phone?:   string | null;
  blood_type?:        string | null;
  allergies?:         string | null;
}

/**
 * GET /api/profile
 * Returns identity (display_name, email, role, member_since) + editable profile fields.
 */
export async function GET(request: NextRequest) {
  const session = getSession(request);
  if (!session?.id) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }

  // Auth user — display_name and email
  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.getUserById(session.id);

  if (authError || !authData?.user) {
    console.error('[profile] auth lookup failed:', authError?.message);
    return NextResponse.json({ error: 'Failed to load user.' }, { status: 500 });
  }

  const authUser    = authData.user;
  const displayName = ((authUser.user_metadata?.full_name as string | undefined) ?? '').trim();
  const email       = authUser.email ?? '';

  // user_roles — role, created_at, editable profile fields
  const { data: roleRow, error: roleError } = await supabaseAdmin
    .from('user_roles')
    .select('role, created_at, full_name, phone, date_of_birth, address, bio, emergency_contact, emergency_phone, blood_type, allergies')
    .eq('user_id', session.id)
    .maybeSingle();

  if (roleError) {
    console.error('[profile] user_roles fetch failed:', roleError.message);
    return NextResponse.json({ error: 'Failed to load profile.' }, { status: 500 });
  }

  const row = (roleRow ?? {}) as Record<string, unknown>;

  // Use saved full_name from DB; fall back to auth metadata on first load
  const savedFullName = (row.full_name as string | null)?.trim() || displayName || null;

  return NextResponse.json({
    display_name: displayName,
    email,
    role:         row.role        ?? 'user',
    member_since: row.created_at  ?? null,
    profile: {
      full_name:         savedFullName,
      phone:             row.phone             ?? null,
      date_of_birth:     row.date_of_birth     ?? null,
      address:           row.address           ?? null,
      bio:               row.bio               ?? null,
      emergency_contact: row.emergency_contact ?? null,
      emergency_phone:   row.emergency_phone   ?? null,
      blood_type:        row.blood_type        ?? null,
      allergies:         row.allergies         ?? null,
    },
  });
}

/**
 * PATCH /api/profile
 * Updates only whitelisted profile columns — role and tenant_slug are never touched.
 */
export async function PATCH(request: NextRequest) {
  const session = getSession(request);
  if (!session?.id) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const ALLOWED: (keyof ProfileRow)[] = [
    'full_name', 'phone', 'date_of_birth', 'address', 'bio',
    'emergency_contact', 'emergency_phone', 'blood_type', 'allergies',
  ];

  const update: Partial<ProfileRow> = {};
  for (const key of ALLOWED) {
    if (key in body) {
      const val = body[key];
      (update as Record<string, unknown>)[key] =
        typeof val === 'string' ? val.trim() || null : null;
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields provided.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('user_roles')
    .update(update)
    .eq('user_id', session.id);

  if (error) {
    console.error('[profile] PATCH failed:', error.message);
    return NextResponse.json({ error: 'Failed to save profile.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}