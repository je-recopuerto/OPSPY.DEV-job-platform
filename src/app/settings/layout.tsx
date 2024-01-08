import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <div className="flex-1 lg:max-w-2xl mx-auto pb-44">{children}</div>;
}
