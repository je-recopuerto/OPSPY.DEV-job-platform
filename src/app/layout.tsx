import "@/app/globals.css";
import { auth } from "@/auth";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import knock from "@/lib/knock";
import { cn } from "@/lib/utils";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";

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
    "Tech Job Board",
    "Software Engineering Jobs",
    "DevOps Careers",
    "Remote Tech Jobs",
    "Find Software Jobs",
    "Technology Job Listings",
    "Developer Job Opportunities",
    "Remote Work in Tech",
    "Full-time Tech Jobs",
    "Part-time Tech Jobs",
    "Freelance Technology Jobs",
    "Entry-level Tech Jobs",
    "Senior Developer Positions",
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
    images: [siteConfig.ogImage],
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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function Layout({
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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
