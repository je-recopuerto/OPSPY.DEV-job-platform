import { z } from "zod";
import { useSearchParams } from "next/navigation";

export const useTypedSearchParams = <T extends z.Schema>(schema: T) => {
  const search = useSearchParams();

  const parsed = schema.parse(search) as z.infer<typeof schema>;

  console.log(parsed);

  return {
    query: schema.parse(search) as z.infer<typeof schema>,
    params: search,
  };
};
