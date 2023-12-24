"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { updateProfile } from "@/app/actions";
import React from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { User } from "@prisma/client";

type ProfileFormProps = {
  user: User;
};

export function ProfileForm(props: ProfileFormProps) {
  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      firstName: props.user.firstName ?? "",
      lastName: props.user.lastName ?? "",
      dateOfBirth: props.user.dateOfBirth,
      bio: props.user.bio ?? "",
    },
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => await updateProfile(data))}
        className="space-y-8"
      >
        <div className={"grid gap-4 w-full grid-cols-2"}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            defaultValue={props.user.lastName ?? ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <Textarea
                onChange={field.onChange}
                defaultValue={props.user.bio ?? ""}
              />
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? new Date("1900-01-01")}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<div>*/}
        {/*  {fields.map((field, index) => (*/}
        {/*    <FormField*/}
        {/*      control={form.control}*/}
        {/*      key={field.id}*/}
        {/*      name={`urls.${index}.value`}*/}
        {/*      render={({ field }) => (*/}
        {/*        <FormItem>*/}
        {/*          <FormLabel className={cn(index !== 0 && "sr-only")}>*/}
        {/*            URLs*/}
        {/*          </FormLabel>*/}
        {/*          <FormDescription className={cn(index !== 0 && "sr-only")}>*/}
        {/*            Add links to your website, blog, or social media profiles.*/}
        {/*          </FormDescription>*/}
        {/*          <FormControl>*/}
        {/*            <Input {...field} />*/}
        {/*          </FormControl>*/}
        {/*          <FormMessage />*/}
        {/*        </FormItem>*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*  <Button*/}
        {/*    type="button"*/}
        {/*    variant="outline"*/}
        {/*    size="sm"*/}
        {/*    className="mt-2"*/}
        {/*    onClick={() => append({ value: "" })}*/}
        {/*  >*/}
        {/*    Add URL*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>Update profile</>
          )}
        </Button>
      </form>
    </Form>
  );
}
