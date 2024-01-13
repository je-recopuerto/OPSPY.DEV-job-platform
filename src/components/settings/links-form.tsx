"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { Github, Linkedin, Twitter } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type PageProps = {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
};

export default function LinksForm({ form }: PageProps) {
  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mt-8">Social Links</h3>
        <p className="text-sm text-muted-foreground">
          Add links to your social profiles and personal website.
        </p>
      </div>

      <Separator className={"mt-3 mb-6"} />

      <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex flex-row"}>
                <Github className={"mr-2 h-4 w-4"} />
                GitHub
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="github.com/pippinmole"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedInLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex flex-row"}>
                <Linkedin className={"mr-2 h-4 w-4"} />
                LinkedIn
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="linkedin.com/in/jonathan-ruffles/"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex flex-row"}>
                <Twitter className={"mr-2 h-4 w-4"} />
                Twitter
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="twitter.com/pippinmole"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="linkedInLink"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel>Last Name</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Input placeholder="shadcn" {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="twitterLink"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel>Last Name</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Input placeholder="shadcn" {...field} defaultValue={field.value ?? ""} />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
      </div>
    </div>
  );
}
