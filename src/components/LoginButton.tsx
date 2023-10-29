"use client"

import {signIn, signOut, useSession} from "next-auth/react";

export default function LoginButton() {
  const {data: session} = useSession();

  if (session) return (
    <button onClick={() => signOut()}>
      Sign out
    </button>
  )

  return (
    <button onClick={() => signIn()}>
      Sign in
    </button>
  )
}