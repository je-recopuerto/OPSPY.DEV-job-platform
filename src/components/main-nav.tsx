"use client";

import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "./ui/navigation-menu";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const currentPage = usePathname();

  return (
    <nav className={`flex items-center space-x-2 lg:space-x-6`}>
      <Link
        href="/t/dash"
        className={`${activeClass(
          currentPage,
          "/dash",
        )} text-sm font-medium transition-colors hover:text-primary`}
      >
        Home
      </Link>

      <Link
        href="/jobs"
        className={`${activeClass(
          currentPage,
          "/jobs",
        )} text-sm font-medium transition-colors hover:text-primary`}
      >
        Jobs
      </Link>

      <Link
        href="/companies"
        className={`${activeClass(
          currentPage,
          "/companies",
        )} text-sm font-medium transition-colors hover:text-primary`}
      >
        Companies
      </Link>

      <Link
        href="/t/onboarding"
        className={`${activeClass(
          currentPage,
          "/onboarding",
        )} text-sm font-medium transition-colors hover:text-primary`}
      >
        (TEST) Onboarding
      </Link>
    </nav>
  );
}

function activeClass(currentPage: string, page: string) {
  return currentPage === page ? "" : "text-muted-foreground ";
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
            className,
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
  );
});
ListItem.displayName = "ListItem";
