import { Prisma } from "@prisma/client";

export type UserWithCvs = Prisma.UserGetPayload<{
  include: {
    cv: true;
    workExperience: true;
  };
}>;

export type UserWithJobTrackers = Prisma.UserGetPayload<{
  include: {
    trackers: true;
  };
}>;

export type UserWithCompany = Prisma.UserGetPayload<{
  include: {
    company: true;
  };
}>;

export type UserWithBioGenerations = Prisma.UserGetPayload<{
  include: {
    bioGenerations: true;
  };
}>;
