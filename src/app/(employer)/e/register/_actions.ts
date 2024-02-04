"use server";

import { canCreateNewCompany } from "@/app/_actions";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { registerCompanySchema } from "@/lib/validations/company";
import { Company } from "@prisma/client";
import { z } from "zod";

type RegisterCompanyResult =
  | { success: false; error: string }
  | { success: true; data: { company: Company; message: string } };

export async function registerCompany(
  values: z.infer<typeof registerCompanySchema>,
): Promise<RegisterCompanyResult> {
  console.log("values", values);
  const response = registerCompanySchema.safeParse(values);
  if (!response.success) {
    return {
      success: false,
      error: "Invalid input",
    };
  }

  const parsedValues = response.data;

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const data = await canCreateNewCompany(session?.user?.id);
  if (!data.authorized) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const { user } = data.data;

  // Create company
  const company = await prisma.company.create({
    data: {
      name: parsedValues.name,
      phone: parsedValues.phone,
      email: parsedValues.email,
      website: parsedValues.website,
      employeeCount: parsedValues.employeeCount,
      description: parsedValues.description,
      addressLine1: parsedValues.addressLine1,
      addressLine2: parsedValues.addressLine2,
      city: parsedValues.city,
      state: parsedValues.state,
      zipCode: parsedValues.zipCode,
      country: parsedValues.country,
      ownerId: user.id,
      isVerified: false,
    },
  });

  if (!company) throw new Error("Company not created");

  return {
    success: true,
    data: {
      message: `Company ${company.name} created`,
      company,
    },
  };
}
