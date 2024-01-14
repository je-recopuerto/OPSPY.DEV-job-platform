"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface DashboardProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className={"flex flex-row gap-4"}>
      <Card className={"w-[50%]"}>
        <CardHeader>
          <CardTitle>Search Query</CardTitle>
        </CardHeader>
        <CardContent>'{searchParams.get("search")}'</CardContent>
      </Card>

      <Card className={"w-[50%]"}>
        <CardHeader>
          <CardTitle>Page</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              // Set params to random string
              router.push(
                pathname +
                  "?" +
                  createQueryString("search", Math.random().toString()),
              );
            }}
          >
            Reload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
