"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function OpportunifyLogo({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) {
  const { theme, systemTheme } = useTheme();
  const flatTheme = theme === "system" ? systemTheme : theme;

  return flatTheme === "light" ? (
    <Image
      src={"/opportunify-logo-black.svg"}
      alt={"Black logo"}
      height={height || 24}
      width={width || 24}
    />
  ) : (
    <Image
      src={"/opportunify-logo-white.svg"}
      alt={"White logo"}
      height={height || 24}
      width={width || 24}
    />
  );
}
