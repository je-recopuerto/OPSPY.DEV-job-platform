"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function OpportunifyLogo({
  height,
  width,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <LogoSkeleton />;

  return resolvedTheme === "light" ? (
    <Image
      src={"/opportunify-logo-black.svg"}
      alt={"Black logo"}
      height={height || 24}
      width={width || 24}
      className={className}
    />
  ) : (
    <Image
      src={"/opportunify-logo-white.svg"}
      alt={"White logo"}
      height={height || 24}
      width={width || 24}
      className={className}
    />
  );
}

const LogoSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[24px] w-[24px] bg-gray-300 rounded-full" />
  </div>
);
