import { getRandomJobPost } from "@/services/JobService";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Jobs",
};

export default async function JobsPage() {
  const job = await getRandomJobPost();
  return redirect(`/jobs/${job.id}`);
}
