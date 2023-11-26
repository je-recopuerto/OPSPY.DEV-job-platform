'use client'

import {Avatar, Dropdown, Navbar} from "flowbite-react";
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

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" size={"sm"} img={data?.user.image ?? "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{data?.user.name}</span>
            {/*<span className="block truncate text-sm font-medium">name@flowbite.com</span>*/}
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>

        {data?.user ? (
          <>
            <Navbar.Link>Onboarded: {data.user.isOnboarded.toString()}</Navbar.Link>
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