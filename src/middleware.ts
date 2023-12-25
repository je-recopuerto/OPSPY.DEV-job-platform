import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(async function middleware(req) {
  return NextResponse.next();

  // const session = await auth()
  // if(!session || !session.user) {
  //   // Do nothing
  //   return NextResponse.next()
  // }
  //
  // const endsWith = req.url.endsWith("/welcome")
  // if(!session.user.isOnboarded && !endsWith) {
  //   return NextResponse.redirect(new URL("/welcome", req.url))
  // }
  //
  // // if at /onboarding path and is already onboarded, redirect to home
  // if(session.user.isOnboarded && req.url.endsWith("/onboarding")) {
  //   return NextResponse.redirect(new URL("/", req.url))
  // }
});

// export const config = {
//   matcher: [
//     // Match all request paths except for the one starting with onboarding
//     '/((?!onboarding).*)',
//   ],
// }
