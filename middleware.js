import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is authenticated, continue to the requested page
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // If there's no token, the user is not logged in
        if (!token) {
          return false;
        }
        
        // Protect all routes under /dashboards
        if (req.nextUrl.pathname.startsWith('/dashboards')) {
          return true;
        }
        
        // Allow access to other routes
        return true;
      },
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    '/dashboards/:path*',  // Protect all dashboard routes
    '/api/protected/:path*'  // Protect API routes
  ]
}; 