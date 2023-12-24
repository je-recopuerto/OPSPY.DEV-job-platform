import { auth } from "@/auth";

export default async function TestPage() {
  const session = await auth();
  return (
    <div className={"whitespace-pre-wrap"}>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{session?.user?.id}</pre>
    </div>
  );
}
