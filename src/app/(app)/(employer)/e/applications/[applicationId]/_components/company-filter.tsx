"use client";

import { Search } from "@/components/cui/search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { companyFilterSchema } from "@/schemas/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CompanyFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof companyFilterSchema>>({
    resolver: zodResolver(companyFilterSchema),
    defaultValues: {
      name: searchParams.get("name")?.toString(),
      page: Math.max(Number(searchParams.get("page")), 1),
    },
  });

  const applyFilters = (values: z.infer<typeof companyFilterSchema>) => {
    console.log("Applying filter:", values);
    const params = new URLSearchParams(window.location.search);
    if (values.name) {
      params.set("name", values.name);
    } else {
      params.delete("name");
    }

    if (values.page) {
      params.set("page", values.page.toString());
    } else {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyFilters)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormControl>
                    <Search
                      className={"w-full"}
                      placeholder={"Search..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              Search
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
