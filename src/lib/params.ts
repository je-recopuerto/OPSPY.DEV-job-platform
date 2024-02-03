import { JobType } from "@prisma/client";
import { z } from "zod";

// OptionType is a custom type that is used for the multi-select component
const optionTypeSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const jobFilterSchema = z.object({
  cid: z.string().optional(),
  keywords: z.string().max(255).optional(),
  tags: z.array(z.string()).optional(),
  minSalary: z.number().min(0).max(500000).optional(),
  type: z.array(z.nativeEnum(JobType)).optional(),
  page: z.number().min(1).optional(),
  countries: z.array(optionTypeSchema).optional(),
});

export function jobFilterParams(searchParams: {
  [key: string]: string | undefined;
}): z.infer<typeof jobFilterSchema> {
  return {
    keywords: searchParams["keywords"] ?? "",
    tags: searchParams.tags ? searchParams.tags.split(",") : [],
    minSalary: searchParams.minSalary ? parseInt(searchParams.minSalary) : 0,
    type: enumOrEmpty(JobType, searchParams.type),
    page: Number(searchParams.page) || 1,
    // countries: searchParams.countries
    //   ? searchParams.countries.map((c) => {
    //       const [label, value] = c.split(":");
    //       return { label, value };
    //     })
    //   : [],
  };
}

export function jobFilterQueryParams(
  params: z.infer<typeof jobFilterSchema>,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.keywords) searchParams.set("keywords", params.keywords);
  if (params.cid) searchParams.set("cid", params.cid);
  if (params.tags && params.tags.length > 0)
    searchParams.set("tags", params.tags.join(","));
  if (params.minSalary)
    searchParams.set("minSalary", params.minSalary.toString());
  if (params.type) searchParams.set("type", params.type.join(","));
  if (params.page && params.page !== 1)
    searchParams.set("page", params.page?.toString() ?? "1");

  // searchParams.set(
  //   "countries",
  //   params.countries.map((c) => `${c.label}:${c.value}`).join(","),
  // );

  return searchParams;
}

function enumOrEmpty<T extends { [key: string]: string }>(
  enumType: T,
  value: string | undefined,
): (keyof T)[] | undefined {
  // Check if the value is one of the enum's values
  const isEnumValue =
    value !== undefined && Object.values(enumType).includes(value);

  // If it is, return the value in an array
  if (isEnumValue) {
    // TypeScript does not allow casting string to keyof T directly, so we keep it as is
    return [value as keyof T];
  }

  // Return undefined if no matching enum value is found
  return undefined;
}
