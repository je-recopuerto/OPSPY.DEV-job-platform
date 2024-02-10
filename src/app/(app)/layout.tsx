import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { employerHomepageUrl } from "@/lib/pages";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We use suppressHydrationWarning here because of this: https://github.com/WITS/next-themes#server-component
  return (
    <>
      <Header />

      <main>{children}</main>

      <Toaster />

      <Footer />
    </>
  );
}

const Footer = () => (
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-gray-500 dark:text-gray-400">
      © 2024 {siteConfig.name} Inc. All rights reserved.
    </p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link
        className="text-xs hover:underline underline-offset-4"
        href={employerHomepageUrl}
      >
        Employers
      </Link>
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Terms of Service
      </Link>
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Privacy
      </Link>
    </nav>
  </footer>
);
