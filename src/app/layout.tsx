import { auth } from "@/auth";
import MainHeader from "@/components/MainHeader";
import { Providers } from "@/components/providers/providers";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import knock from "@/lib/knock";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Job", "Job board"],
  authors: [
    {
      name: "Jonny Ruffles",
      url: "https://ruffles.pw/",
    },
  ],
  creator: "Jonny",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@pippinmole",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session && session.user && session.user.id) {
    await knock.users.identify(session.user.id, {
      name: session?.user.name ?? undefined,
      email: session?.user.email ?? undefined,
    });
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <MainHeader />

          <main className={"my-8"}>{children}</main>

          <Toaster />
        </Providers>

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 {siteConfig.name} Inc. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
