// Middleware disabled: using Firebase Auth on the client for /yonet routes.
// Keeping this file as a no-op to avoid any NextAuth-based redirects that can
// cause loops between /yonet and /yonet/login.
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// Do not match any route (explicitly empty) to ensure this middleware is inert.
export const config = {
  matcher: [],
};
