import { auth } from "@/auth";

export default async function Profile() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Profile</h1>

      {/* Add a custom class to the span */}
      <span className="whitespace-pre-wrap">
        {JSON.stringify(session, null, 2)}
      </span>
    </div>
  );
}
