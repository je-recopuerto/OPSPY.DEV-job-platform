import { env } from "@/env.mjs";
import { JobPostWithCompany } from "@/lib/data/job.types";
import { Knock } from "@knocklabs/node";
import { Company, User } from "@prisma/client";

const knockClientSingleton = () => {
  return new Knock(env.KNOCK_SECRET_API_KEY);
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

export async function notifyCompanyRegistration(company: Company) {
  if (!company.ownerId) return;

  return await knock.notify("company-registration", {
    actor: company.ownerId,
    recipients: [company.ownerId],
    data: {
      // prettier-ignore
      "companyName": company.name,
    },
  });
}

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

export async function notifyApplicationUpdated({
  userId,
  companyName,
  jobTitle,
  jobId,
  message,
}: {
  userId: User["id"];
  companyName: string;
  jobTitle: string;
  jobId: string;
  message?: string;
}) {
  return await knock.notify(applicationUpdatedKnock, {
    actor: userId,
    recipients: [userId],
    data: {
      // prettier-ignore
      "companyName": {
        // prettier-ignore
        "value": companyName,
      },
      // prettier-ignore
      "jobName": {
        // prettier-ignore
        "value": jobTitle,
      },
      // prettier-ignore
      "jobId": {
        // prettier-ignore
        "value": jobId,
      },
      // prettier-ignore
      "message": {
        // prettier-ignore
        "value": message,
      },
    },
  });
}
