"use client";

import { matchCandidate } from "@/app/(app)/(employer)/e/applications/[applicationId]/_actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { acceptCandidateSchema } from "@/lib/validations/reject";
import { zodResolver } from "@hookform/resolvers/zod";
import type { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AcceptProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  application: ApplicationWithJob;
}

export default function Accept({ application, ...props }: AcceptProps) {
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof acceptCandidateSchema>>({
    resolver: zodResolver(acceptCandidateSchema),
    defaultValues: {
      message: "",
      notifyCandidate: false,
    },
  });

  const {
    watch,
    formState: { isSubmitting },
  } = form;

  const watchNotifyCandidate = watch("notifyCandidate");

  async function onSubmit(values: z.infer<typeof acceptCandidateSchema>) {
    const result = await matchCandidate(application.id, values);
    if (result.success) {
      toast({
        title: "Success",
        description: "Successfully matched with candidate",
        duration: 5000,
      });

      router.push(employerDashboardUrl);
    } else {
      toast({
        title: "Error",
        description: result.error,
        duration: 5000,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Accept</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                Match with {application.user.firstName}{" "}
                {application.user.lastName}?
              </DialogTitle>
              {/*<DialogDescription>*/}
              {/*  Move forward with a candidate*/}
              {/*</DialogDescription>*/}
            </DialogHeader>

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

            {watchNotifyCandidate && (
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={"Hey! We'd like to move forward with you."}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be sent to the candidate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="sm:justify-start">
              <Button type="submit" disabled={isSubmitting}>
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
