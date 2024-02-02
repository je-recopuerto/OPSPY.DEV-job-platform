import knock, {
  applicationCreatedKnock,
  applicationUpdatedKnock,
} from "@/lib/knock";
import { JobPostWithCompany } from "@/services/JobService";
import { User } from "@prisma/client";

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
    },
  });
}
