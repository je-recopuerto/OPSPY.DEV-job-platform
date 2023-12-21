import CreateJobForm from "@/components/jobs/create-job-form";

export default async function NewJobPage() {
  return (
    <main className="flex flex-col max-w-3xl m-auto p-14">
      <CreateJobForm />
    </main>
  );
}
