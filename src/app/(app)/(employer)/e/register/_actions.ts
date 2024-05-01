"use server";

import { auth } from "@/auth";
import { createServerAction, ServerActionError } from "@/lib/action-utils";
import prisma from "@/lib/db";
import { notifyCompanyRegistration } from "@/lib/knock";
import { canCreateNewCompany } from "@/lib/user";
import { registerCompanySchema } from "@/lib/validations/company";
import { z } from "zod";

export const registerCompany = createServerAction(
  async (values: z.infer<typeof registerCompanySchema>) => {
    const response = registerCompanySchema.safeParse(values);
    if (!response.success) {
      throw new ServerActionError(response.error.errors.join(", "));
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new ServerActionError("Unauthorized");
    }

    if (!(await canCreateNewCompany(session?.user?.id))) {
      throw new ServerActionError(
        "You cannot create a new company at this time.",
      );
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        name: response.data.name,
        phone: response.data.phone,
        website: response.data.website,
        employeeCount: response.data.employeeCount,
        description: response.data.description,
        addressLine1: response.data.addressLine1,
        addressLine2: response.data.addressLine2,
        city: response.data.city,
        state: response.data.state,
        zipCode: response.data.zipCode,
        country: response.data.country,
        ownerId: session?.user?.id,
        isVerified: false,
      },
    });

    if (!company) throw new ServerActionError("Company not created");

    // Notify company owner
    await notifyCompanyRegistration(company);

    return {
      message: `Company ${company.name} created`,
      company,
    };
  },
);
