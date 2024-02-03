import { JobPostWithCompany } from "@/lib/data/job.types";
import { Knock } from "@knocklabs/node";
import { User } from "@prisma/client";

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

export async function notifyApplicationCreated(
  user: User,
  job: JobPostWithCompany,
) {
  return await knock.notify(applicationCreatedKnock, {
    actor: user.id,
    recipients: [user.id],
    data: {
      // prettier-ignore
      "companyName": {
        // prettier-ignore
        "value": job.company.name,
      },
      // prettier-ignore
      "jobName": {
        // prettier-ignore
        "value": job.title,
      },
      // prettier-ignore
      "jobId": {
        // prettier-ignore
        "value": job.id,
      },
    },
  });
}

export async function notifyApplicationUpdated(
  user: User,
  job: JobPostWithCompany,
  message?: string,
) {
  return await knock.notify(applicationUpdatedKnock, {
    actor: user.id,
    recipients: [user.id],
    data: {
      // prettier-ignore
      "companyName": {
        // prettier-ignore
        "value": job.company.name,
      },
      // prettier-ignore
      "jobName": {
        // prettier-ignore
        "value": job.title,
      },
      // prettier-ignore
      "jobId": {
        // prettier-ignore
        "value": job.id,
      },
      // prettier-ignore
      "message": {
        // prettier-ignore
        "value": message,
      },
    },
  });
}
