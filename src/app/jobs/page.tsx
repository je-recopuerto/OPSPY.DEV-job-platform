import { JobPost } from "@/components/jobs/job-post";

export const metadata = {
  title: "Jobs",
};

type JobPageParams = {
  searchParams: {
    jid: string;
  };
};

export default async function JobsPage({
  searchParams: { jid },
}: JobPageParams) {
  return jid && <JobPost jobId={jid} />;
}
