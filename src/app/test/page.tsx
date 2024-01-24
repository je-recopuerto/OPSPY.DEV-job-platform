import { auth } from "@/auth";

export default async function P() {
  const session = await auth();

  console.log(JSON.stringify(session, null, 2));

  return (
    <div className={"whitespace-pre-wrap"}>
      {JSON.stringify(session, null, 2)}
    </div>
  );
}
