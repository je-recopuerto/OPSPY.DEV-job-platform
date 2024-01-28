"use client";

import { ComputerIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn("h-8 w-8", props.className)}
    >
      {theme === "system" && <ComputerIcon className="h-[1.2rem] w-[1.2rem]" />}
      {theme === "light" && (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      {theme === "dark" && (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
