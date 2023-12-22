import { Suspense } from "react";
import JobFeed from "@/components/jobs/job-feed";
import { redirect } from "next/navigation";

export default function JobsPage() {
  return redirect("/jobs/1");
}
