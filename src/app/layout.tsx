import "@/app/globals.css";
import { auth } from "@/auth";
import Header from "@/components/header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import knock from "@/lib/knock";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Job",
    "Job board",
    "Job board template",
    "Job board theme",
    "software jobs",
    "software",
    "devops",
    "devops jobs",
    "remote jobs",
    "remote",
    "remote software jobs",
  ],
  authors: [
    {
      name: "Jonny Ruffles",
      url: "https://ruffles.pw/",
    },
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
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
    images: [siteConfig.ogImage],
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

  // We use suppressHydrationWarning here because of this: https://github.com/WITS/next-themes#server-component
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SpeedInsights />
        <Analytics />

        <Providers>
          <Header />

          <main className={"py-8"}>{children}</main>

          <Toaster />
        </Providers>

        <Footer />
      </body>
    </html>
  );
}

const Footer = () => (
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-gray-500 dark:text-gray-400">
      © 2024 {siteConfig.name} Inc. All rights reserved.
    </p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Terms of Service
      </Link>
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Privacy
      </Link>
    </nav>
  </footer>
);
