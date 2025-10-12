import { NextResponse } from 'next/server';
import { pingDatabase } from '@/lib/database';

export async function GET() {
  const result = await pingDatabase();
  if (result.ok) {
    return NextResponse.json({ status: 'ok', serverVersion: result.serverVersion });
  }
  return NextResponse.json({ status: 'error', error: result.error }, { status: 500 });
}
