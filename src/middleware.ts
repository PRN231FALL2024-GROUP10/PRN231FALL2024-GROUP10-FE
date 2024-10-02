// export { default } from 'next-auth/middleware';
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  const accessToken = await req.nextauth.token?.data.accessToken;
  if (accessToken) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/auth/signin", req.nextUrl.origin);
  signInUrl.searchParams.append(
    "callbackUrl",
    `${req.nextUrl.pathname}${req.nextUrl.search}`
  );

  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: [
    "/((?!auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
