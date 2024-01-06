"use client";

import { createJobPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createJobPostSchema } from "@/schemas/jobPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { Currency, JobType, WorkMode } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
      currency: Currency.GBP,
      type: JobType.FULL_TIME,
      workMode: WorkMode.HYBRID,
    },
  });

  const {
    formState: { isSubmitSuccessful, isSubmitting },
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
                  <Input placeholder="Software Engineer L4" {...field} />
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
                    placeholder="(Tech stack: .NET Developer, .NET 7, C#, Azure, Angular 14, Multithreading, RESTful, Web API 2, JavaScript, Programmer, Full Stack Engineer, Architect, .NET Developer)"
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
                <FormItem className={"w-24"}>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(Currency).map((type) => (
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
            name="workMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Environment</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value as string}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(WorkMode).map((type) => (
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Create Job Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
