import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If user is logged in and tries to access login page, redirect to admin dashboard
    if (pathname.startsWith("/admin/login") && token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Always allow access to login page
        if (pathname.startsWith("/admin/login")) {
          return true;
        }

        // Must be logged in for other admin routes
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
