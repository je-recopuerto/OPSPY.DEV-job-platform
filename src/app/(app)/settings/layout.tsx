import { ProfileSuggestions } from "@/app/(app)/settings/_components/profile-suggestions";
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
  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="flex max-w-5xl w-full">
        {" "}
        {/* Ensuring max width includes sidebar */}
        {/* Main content area */}
        <div className="flex-1 lg:max-w-2xl lg:px-0 px-8">{children}</div>
        {/* Right-side bar */}
        <div className="w-64">
          {" "}
          {/* This is typically 256px, adjust as needed */}
          {/* Content of the sidebar */}
          <div className="px-4 py-6 grid gap-y-4">
            <ProfileSuggestions />
          </div>
        </div>
      </div>
    </div>
  );
}
