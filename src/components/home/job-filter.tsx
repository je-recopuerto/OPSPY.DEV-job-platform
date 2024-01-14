"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobFilter() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/jobs?keywords=${search}`);
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <form className="flex space-x-2" onSubmit={handleSubmit}>
        <Input
          className="max-w-lg flex-1"
          placeholder="Enter job title or keywords"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
