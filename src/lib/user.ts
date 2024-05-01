import { UserWithCompany } from "@/lib/data/user.types";
import prisma from "@/lib/db";
import { Company, User } from "@prisma/client";

export const canCreateNewCompany = async (userId: User["id"]) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      company: {
        select: {
          isVerified: true,
        },
      },
    },
  });

  if (!user) return false;
  return !user.company;
};

export const canModifyApplication = (
  user: UserWithCompany | null | undefined,
  companyId: Company["id"] | null,
) => {
  if (!user || !user.company || !companyId) return false;
  return user.company.id === companyId;
};
