import { getRandomJobPost } from "@/services/JobService";
import { redirect } from "next/navigation";
import serialize from "query-string";

export const metadata = {
  title: "Jobs",
};

type JobPageParams = {
  searchParams: {
    [key: string]: string | string[];
  };
};

export default async function JobsPage({ searchParams }: JobPageParams) {
  const job = await getRandomJobPost();

  // Serialize the searchParams object into a query string
  const p  = new URLSearchParams();
  for(const [key, value] of Object.entries(searchParams)) {
    p.append(key, value.toString());
  }

  // Append the query string to the redirect URL
  return redirect(`/jobs/${job.id}?${p.toString()}`);
}
