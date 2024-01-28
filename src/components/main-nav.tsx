"use client";

import OpportunifyLogo from "@/components/opportunify-logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavigationMenuLink } from "./ui/navigation-menu";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // return (
  //   <NavigationMenu>
  //     <NavigationMenuList>
  //       <NavigationMenuItem>
  //         <Link href="/" legacyBehavior passHref>
  //           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
  //             Home
  //           </NavigationMenuLink>
  //         </Link>
  //       </NavigationMenuItem>
  //       <NavigationMenuItem>
  //         <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
  //         <NavigationMenuContent>
  //           <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
  //             <li className="row-span-3">
  //               <NavigationMenuLink asChild>
  //                 <a
  //                   className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
  //                   href="/"
  //                 >
  //                   <OpportunifyLogo className="h-6 w-6" />
  //                   <div className="mb-2 mt-4 text-lg font-medium">
  //                     shadcn/ui
  //                   </div>
  //                   <p className="text-sm leading-tight text-muted-foreground">
  //                     Beautifully designed components that you can copy and
  //                     paste into your apps. Accessible. Customizable. Open
  //                     Source.
  //                   </p>
  //                 </a>
  //               </NavigationMenuLink>
  //             </li>
  //             <ListItem href="/docs" title="Introduction">
  //               Re-usable components built using Radix UI and Tailwind CSS.
  //             </ListItem>
  //             <ListItem href="/docs/installation" title="Installation">
  //               How to install dependencies and structure your app.
  //             </ListItem>
  //             <ListItem href="/docs/primitives/typography" title="Typography">
  //               Styles for headings, paragraphs, lists...etc
  //             </ListItem>
  //           </ul>
  //         </NavigationMenuContent>
  //       </NavigationMenuItem>
  //       <NavigationMenuItem>
  //         <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
  //         <NavigationMenuContent>
  //           <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
  //             {components.map((component) => (
  //               <ListItem
  //                 key={component.title}
  //                 title={component.title}
  //                 href={component.href}
  //               >
  //                 {component.description}
  //               </ListItem>
  //             ))}
  //           </ul>
  //         </NavigationMenuContent>
  //       </NavigationMenuItem>
  //       <NavigationMenuItem>
  //         <Link href="/docs" legacyBehavior passHref>
  //           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
  //             Documentation
  //           </NavigationMenuLink>
  //         </Link>
  //       </NavigationMenuItem>
  //     </NavigationMenuList>
  //   </NavigationMenu>
  // );

  const currentPage = usePathname();

  return (
    <nav className={`flex items-center space-x-2 lg:space-x-6`}>
      <OpportunifyLogo />

      <Link
        href="/"
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
        href="/pricing"
        className={`${activeClass(
          currentPage,
          "/companies",
        )} text-sm font-medium transition-colors hover:text-primary`}
      >
        Pricing
      </Link>
    </nav>
  );
}
//
// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Jobs",
//     href: "/jobs",
//     description: "A list of jobs.",
//   },
//   {
//     title: "Companies",
//     href: "/companies",
//     description: "A list of companies.",
//   },
// ];

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
