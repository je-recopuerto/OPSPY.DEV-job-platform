import { EmployeeCount } from "@prisma/client";
import { z } from "zod";

export const registerCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  employeeCount: z.nativeEnum(EmployeeCount),
  website: z.string().url("Invalid URL").optional(),
  description: z
    .string()
    .max(1000, "Description is too long, please keep it under 1000 characters")
    .optional(),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip/postal code is required"),
  country: z.string().min(1, "Country is required"),
});

export const employeeCountMap: Record<EmployeeCount, string> = {
  [EmployeeCount.ONE_TO_TEN]: "1-10",
  [EmployeeCount.ELEVEN_TO_FIFTY]: "11-50",
  [EmployeeCount.FIFTY_ONE_TO_TWO_HUNDRED]: "51-200",
  [EmployeeCount.TWO_HUNDRED_AND_ONE_TO_FIVE_HUNDRED]: "201-1000",
  [EmployeeCount.FIVE_HUNDRED_AND_ONE_TO_ONE_THOUSAND]: "501-1000",
  [EmployeeCount.ONE_THOUSAND_AND_ONE_TO_FIVE_THOUSAND]: "1001-5000",
  [EmployeeCount.FIVE_THOUSAND_AND_ONE_TO_TEN_THOUSAND]: "5001-10000",
  [EmployeeCount.TEN_THOUSAND_AND_ONE_PLUS]: "10001+",
};
