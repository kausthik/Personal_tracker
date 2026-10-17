import { NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";

// Sends logged-out visitors to /login. Actions and API routes still check the session themselves.
export default auth((req) => {
  if (!req.auth) {
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    "/study-tracker/:path*",
    "/calorie-tracker/:path*",
    "/foody/:path*",
    "/forget-password",
  ],
};
