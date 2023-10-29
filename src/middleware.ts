import {withAuth} from "next-auth/middleware";
import {getSession} from "next-auth/react";
import {NextResponse} from "next/server";

export default withAuth(
  async function middleware(req) {
    const requestForNextAuth = {
      headers: {
        cookie: req.headers.get("cookie")
      }
    }

    // @ts-ignore
    const session = await getSession({req: requestForNextAuth})
    if(session && !session.user.isOnboarded) {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }
  }
)

export const config = {
  matcher: [
    // Match all request paths except for the one starting with onboarding
    '/((?!onboarding).*)',
  ],
}