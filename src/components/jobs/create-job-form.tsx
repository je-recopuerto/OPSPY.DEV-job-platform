"use client";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createJobPost } from "@/app/actions";
import { createJobPostSchema } from "@/schemas/jobPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { JobType } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateJobForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createJobPostSchema>>({
    resolver: zodResolver(createJobPostSchema),
    defaultValues: {
      title: "",
      description: "",
      minSalary: 0,
      maxSalary: 0,
      location: "",
      currency: "",
      type: "",
      isRemote: false,
    },
  });

  const {
    formState: { isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast({
        variant: "default",
        title: "Created Post",
        description: "✅ You have successfully created a job post!",
        duration: 3000,
      });
    }
  }, [isSubmitSuccessful, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => createJobPost(data))}
        className="space-y-8"
      >
        <div className={"space-y-8"}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This will be displayed to candidates
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Try to be as descriptive as possible
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={"flex flex-row space-x-2 w-full"}>
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className={"max-w-24"}>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GBP">£</SelectItem>
                      <SelectItem value="USD">$</SelectItem>
                      <SelectItem value="EUR">€</SelectItem>
                    </SelectContent>
                  </Select>
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
                      type={"number"}
                      placeholder="40,000"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Salary</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      placeholder="100,000"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="London, UK" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(JobType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRemote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is this job remote?</FormLabel>
                  <FormDescription>
                    If you select this, candidates will be able to filter by
                    remote jobs
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit">Create Job Post</Button>
        </div>
      </form>
    </Form>
  );
}
