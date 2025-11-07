import { NextRequest, NextResponse } from 'next/server';
import { getAdminSettings, upsertAdminSettings, AdminSettings } from '@/lib/database';

export async function GET() {
  try {
    const settings = await getAdminSettings();
    return NextResponse.json(settings || {});
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const payload: AdminSettings = {
      name: body.name || '',
      email: body.email || '',
      bio: body.bio || '',
      location: body.location || '',
      website: body.website || '',
      email_notifications: !!body.email_notifications,
      push_notifications: !!body.push_notifications,
      weekly_digest: !!body.weekly_digest,
      security_alerts: !!body.security_alerts,
    };
    const ok = await upsertAdminSettings(payload);
    if (!ok) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
