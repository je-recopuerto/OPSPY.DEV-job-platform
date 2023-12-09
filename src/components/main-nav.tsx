"use client"

import { cn } from "@/lib/utils"
import {
  NavigationMenuLink,
} from "./ui/navigation-menu"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link";

export function MainNav() {
  return (
    <div className="flex items-center space-x-2 lg:space-x-6">
      <Link href="/">
        <Button variant="ghost">
          Home
        </Button>
      </Link>

      <Link href="jobs">
        <Button variant="ghost">
          Jobs
        </Button>
      </Link>

      <Link href="companies">
        <Button variant="ghost">
          Companies
        </Button>
      </Link>

      <Link href="onboarding">
        <Button variant="ghost">
          (TEST) Onboarding
        </Button>
      </Link>
      {/*<NavigationMenu>*/}
      {/*  <NavigationMenuList>*/}
      {/*    <NavigationMenuItem>*/}
      {/*      <NavigationMenuTrigger>Server Side</NavigationMenuTrigger>*/}
      {/*      <NavigationMenuContent>*/}
      {/*        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">*/}
      {/*          <ListItem href="/server-example" title="RSC Example">*/}
      {/*            Protecting React Server Component.*/}
      {/*          </ListItem>*/}
      {/*          <ListItem href="/middleware-example" title="Middleware Example">*/}
      {/*            Using Middleware to protect pages & APIs.*/}
      {/*          </ListItem>*/}
      {/*          <ListItem href="/api-example" title="Route Handler Example">*/}
      {/*            Getting the session inside an API Route.*/}
      {/*          </ListItem>*/}
      {/*        </ul>*/}
      {/*      </NavigationMenuContent>*/}
      {/*    </NavigationMenuItem>*/}
      {/*    <NavigationMenuItem>*/}
      {/*      <NavigationMenuLink*/}
      {/*        href="/client-example"*/}
      {/*        className={navigationMenuTriggerStyle()}*/}
      {/*      >*/}
      {/*        Client Side*/}
      {/*      </NavigationMenuLink>*/}
      {/*    </NavigationMenuItem>*/}
      {/*  </NavigationMenuList>*/}
      {/*</NavigationMenu>*/}
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"