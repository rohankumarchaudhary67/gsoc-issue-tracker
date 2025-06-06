import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes
const protectedRoutes = [
    "/issues",
    "/organizations",
    "/bookmarks",
    "/history",
    "/analytics",
    "/profile",
    "/settings",
    "/api/protected", // Add your protected API routes here
];

// Define API routes that need authentication
const protectedApiRoutes = [
    "/api/user",
    "/api/subscription",
    "/api/usage",
    "/api/bookmarks",
    "/api/issues",
    // Add more protected API routes as needed
];

// Define public routes that should redirect to dashboard if authenticated
const authRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the token from NextAuth
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthenticated = !!token;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if the current path is a protected API route
    const isProtectedApiRoute = protectedApiRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if the current path is an auth route
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // Handle protected API routes
    if (isProtectedApiRoute) {
        if (!isAuthenticated) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                    message: "Authentication required",
                },
                { status: 401 }
            );
        }
        // If authenticated, continue to the API route
        return NextResponse.next();
    }

    // Handle protected page routes
    if (isProtectedRoute) {
        if (!isAuthenticated) {
            // Simple redirect to auth page without callback
            return NextResponse.redirect(new URL("/auth", request.url));
        }
        // If authenticated, continue to the protected page
        return NextResponse.next();
    }

    // Handle auth routes (redirect to dashboard if already authenticated)
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/issues", request.url));
    }

    // For all other routes, continue normally
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
    ],
};
