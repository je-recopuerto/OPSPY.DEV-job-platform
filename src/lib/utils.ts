import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[];
}

/*
 * Converts a string representation of file size (like "5MB") to its equivalent in bytes.
 * Supported units are KB, MB, GB, and TB (using the decimal system).
 * Usage example: fileSizeToBytes("5MB") will return 5000000
 */
export function fileSizeToBytes(fileSizeStr: string) {
  const units = fileSizeStr.replace(/[0-9]/g, "").toUpperCase();
  const size = parseInt(fileSizeStr.replace(/[^0-9]/g, ""), 10);

  let bytes = size;

  switch (units) {
    case "KB":
      bytes = size * 1000; // 1 KB = 1000 bytes
      break;
    case "MB":
      bytes = size * 1000 * 1000; // 1 MB = 1000 KB
      break;
    case "GB":
      bytes = size * 1000 * 1000 * 1000; // 1 GB = 1000 MB
      break;
    case "TB":
      bytes = size * 1000 * 1000 * 1000 * 1000; // 1 TB = 1000 GB
      break;
    // Add other units as needed
  }

  return bytes;
}
