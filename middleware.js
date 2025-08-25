import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig);

const PUBLIC_FILE = /\.(.*)$/; // any file with an extension

export default auth((req) => {
  const { nextUrl } = req;
  // console.log(nextUrl);
  const isAuthenticated = !!req.auth;
  // console.log(isAuthenticated);

  // Skip static assets (png, jpg, css, js, etc.)
  if (PUBLIC_FILE.test(nextUrl.pathname)) return;

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// That negative lookahead excludes api, so any route under /api/... (including
// /api/auth/callback/google and /api/auth/callback/github) bypasses the middleware entirely.
// Since the middleware never sees those requests, they don’t need to be in PUBLIC_ROUTES, and NextAuth can handle them normally — that’s why your app still works without them.
