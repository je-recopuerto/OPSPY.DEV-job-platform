import { Knock } from "@knocklabs/node";

const knockClientSingleton = () => {
  return new Knock(process.env.KNOCK_SECRET_API_KEY!);
};

type KnockSingleton = ReturnType<typeof knockClientSingleton>;

const globalForKnock = globalThis as unknown as {
  knock: KnockSingleton | undefined;
};

const knock = globalForKnock.knock ?? knockClientSingleton();

export default knock;

if (process.env.NODE_ENV !== "production") globalForKnock.knock = knock;

export const applicationCreatedKnock = "application-created";
export const applicationUpdatedKnock = "application-updated";
