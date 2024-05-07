import { UserWithCompany } from "@/lib/data/user.types";
import prisma from "@/lib/db";
import { Company, User } from "@prisma/client";
import { LucideIcon, PencilIcon, ThumbsUpIcon } from "lucide-react";

type ProfileSuggestions = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  qualifier: (user: UserWithCompany) => boolean;
};

export const profileSuggestions: ProfileSuggestions[] = [
  {
    id: 1,
    title: "Add a profile photo",
    description:
      "Upload a professional-looking photo to make your profile more engaging.",
    icon: PencilIcon,
    qualifier: (user) => !user.image,
  },
  {
    id: 2,
    title: "Add a bio",
    description:
      "Your bio is a great way to introduce yourself to companies. Tell us about your interests and what you're looking for.",
    icon: ThumbsUpIcon,
    qualifier: (user) => !user.bio || user.bio.length <= 0,
  },
  {
    id: 3,
    title: "Improve bio",
    description:
      "A great bio is a key part of your profile. Make sure it's up to date and reflects your interests.",
    icon: ThumbsUpIcon,
    qualifier: (user) => {
      if (!user.bio) return false;
      return user.bio.length < 50;
    },
  },
  {
    id: 4,
    title: "Attach your CV",
    description:
      "Upload your CV to make it easier for companies to see your experience and skills.",
    icon: PencilIcon,
    qualifier: (user) => !user.cv,
  },
  {
    id: 5,
    title: "Add work experience",
    description:
      "Add your work experience to show companies where you've worked before.",
    icon: PencilIcon,
    qualifier: (user) =>
      !user.workExperience || user.workExperience.length <= 0,
  },
  {
    id: 6,
    title: "Add your GitHub profile",
    description:
      "Link your GitHub profile to show companies your open-source contributions.",
    icon: PencilIcon,
    qualifier: (user) => !user.githubLink,
  },
  {
    id: 7,
    title: "Add your LinkedIn profile",
    description:
      "Link your GitHub profile to show companies your open-source contributions.",
    icon: PencilIcon,
    qualifier: (user) => !user.linkedinLink,
  },
  // {
  //   id: 8,
  //   title: "Add your Twitter profile",
  //   description:
  //     "Link your GitHub profile to show companies your open-source contributions.",
  //   icon: PencilIcon,
  //   qualifier: (user) => !user.twitterLink,
  // },
];

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
