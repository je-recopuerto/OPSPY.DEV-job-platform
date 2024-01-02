"use client";

import { Input } from "@/components/ui/input";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function JobFilter({ placeholder }: { placeholder: string }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof filterJobPostsSchema>>({
    resolver: zodResolver(filterJobPostsSchema),
    defaultValues: {
      keywords: searchParams.get("keywords")?.toString(),
      minSalary: Number.parseFloat(searchParams.get("minSalary") ?? "0"),
    },
  });

  function onSubmit(values: z.infer<typeof filterJobPostsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // Write to URL as search params.
    const params = new URLSearchParams();
    if (values.keywords) {
      params.set("keywords", values.keywords);
    } else {
      params.delete("keywords");
    }

    if (values.minSalary) {
      params.set("minSalary", values.minSalary.toString());
    } else {
      params.delete("minSalary");
    }

    // Redirect to new URL.
    replace(`${pathname}?${params.toString()}`);

    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={"flex flex-row gap-4"}>
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className={"flex-grow"}>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input placeholder="Search" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Salary</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={100}
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className={"hidden"}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
