'use client'

import { Navbar } from "flowbite-react";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

export default function MainHeader() {

  const {data} = useSession()

  return (
    <Navbar rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        {/*<img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo"/>*/}
        <span className="self-center whitespace-nowrap text-l font-semibold dark:text-white">opportunify</span>
      </Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse>

        {data?.user ? (
          <>
            <Navbar.Link>{data.user.isOnboarded.toString()}</Navbar.Link>
            <Navbar.Link className={"cursor-pointer"} active onClick={() => signOut()}>Log out ({data.user.name})</Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Link className={"cursor-pointer"} active onClick={() => signIn()}>Login</Navbar.Link>
            <Navbar.Link className={"cursor-pointer"} onClick={() => signIn()}>Sign up</Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}