import { auth } from "@/auth";

type JobsLayoutProps = {
  children: React.ReactNode;
  searchParams?: {
    keywords?: string;
  };
};

export default async function JobsLayout(props: JobsLayoutProps) {
  const session = await auth();
  if (!session || !session.user) return;

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <h1 className="text-2xl font-semibold pb-6">Jobs</h1>

      {props.children}
      {/*<JobPosts children={props.children} userId={session.user.id} />*/}
    </main>
  );
}
