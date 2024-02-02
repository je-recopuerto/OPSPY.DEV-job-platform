import { auth } from "@/auth";
import { NotificationsMenu } from "@/components/NotificationsMenu";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import UserButton from "@/components/user-button";
import { companiesUrl, homeUrl, jobsUrl, pricingUrl } from "@/lib/pages";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 flex justify-center border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full h-16 max-w-7xl px-4 mx-auto sm:px-6">
        <Nav />

        <div className={"flex space-x-3 justify-end"}>
          <div>
            <ThemeToggle />
          </div>

          <div>
            <NotificationsMenu userId={session?.user?.id} />
          </div>
          <div>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}

const Nav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={`flex items-center space-x-2 lg:space-x-6`}>
      <Logo />

      <Link
        href={homeUrl}
        className={`text-sm font-medium transition-colors hover:text-primary`}
      >
        Home
      </Link>

      <Link
        href={jobsUrl}
        className={`text-sm font-medium transition-colors hover:text-primary`}
      >
        Jobs
      </Link>

      <Link
        href={companiesUrl}
        className={`text-sm font-medium transition-colors hover:text-primary`}
      >
        Companies
      </Link>

      <Link
        href={pricingUrl}
        className={`text-sm font-medium transition-colors hover:text-primary`}
      >
        Pricing
      </Link>
    </nav>
  );
};

function activeClass(currentPage: string, page: string) {
  return currentPage === page ? "" : "text-muted-foreground ";
}
