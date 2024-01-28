"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import NextTopLoader from "nextjs-toploader";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextTopLoader />

      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    mounted && <NextThemesProvider {...props}>{children}</NextThemesProvider>
  );
}

// "use client";
//
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { type ThemeProviderProps } from "next-themes/dist/types";
//
// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }
// Context: https://github.com/shadcn-ui/ui/issues/1906#issuecomment-1827521490
