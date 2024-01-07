"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { updateProfile } from "@/services/actions/profile";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type ProfileFormProps = {
  user: User;
};

export function ProfileForm(props: ProfileFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      firstName: props.user.firstName ?? "",
      lastName: props.user.lastName ?? "",
      dateOfBirth: props.user.dateOfBirth,
      email: props.user.email ?? "",
      bio: props.user.bio ?? "",
    },
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful, isDirty, errors },
  } = form;

  useEffect(() => {
    if (!isSubmitting && isSubmitSuccessful) {
      toast({
        variant: "default",
        title: "Success",
        description: "✅ Successfully updated profile!",
        duration: 3000,
      });

      form.reset();
    }
  }, [isSubmitSuccessful, toast, isSubmitting]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => await updateProfile(data))}
        className="space-y-5"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    captionLayout="dropdown-buttons"
                    selected={field.value ?? new Date("1900-01-01")}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
