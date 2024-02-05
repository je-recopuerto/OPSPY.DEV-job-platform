"use client";

import { rejectCandidate } from "@/app/(app)/(employer)/e/applications/[applicationId]/_actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ApplicationWithJob } from "@/lib/data/application.types";
import { employerDashboardUrl } from "@/lib/pages";
import { rejectCandidateSchema } from "@/lib/validations/reject";
import { zodResolver } from "@hookform/resolvers/zod";
import type { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface RejectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  application: ApplicationWithJob;
}

export default function Reject({ application, ...props }: RejectProps) {
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof rejectCandidateSchema>>({
    resolver: zodResolver(rejectCandidateSchema),
    defaultValues: {
      reason: "",
    },
  });

  const {
    formState: { isValid, isSubmitting },
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof rejectCandidateSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const result = await rejectCandidate(application.id, values);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        duration: 5000,
      });
    } else {
      toast({
        title: "Success",
        description: "Candidate rejected.",
        duration: 5000,
      });

      router.push(employerDashboardUrl);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} {...props}>
          Reject
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                Reject {application.user.firstName} {application.user.lastName}?
              </DialogTitle>
              <DialogDescription>
                This will send an email to the applicant.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Unfortunately, your skills don't align with our needs."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifyCandidate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Notify the candidate?</FormLabel>
                    <FormDescription>
                      You may want to send a message to the candidate manually.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <Button
                variant="destructive"
                type="submit"
                disabled={isSubmitting}
              >
                Confirm
              </Button>

              <DialogClose asChild>
                <Button type="button">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
