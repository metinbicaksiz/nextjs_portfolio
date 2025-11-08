import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        // Allow the login page to render without a token to avoid redirect loops
        if (pathname === '/yonet/login') {
          return true;
        }
        // Require a NextAuth token for other /yonet routes
        return !!token;
      },
    },
    pages: {
      signIn: '/yonet/login', // Route to the login page
    },
  }
);

export const config = {
  matcher: ['/yonet/:path*'],
};
