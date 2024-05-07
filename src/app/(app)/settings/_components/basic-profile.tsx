"use client";

import {
  getEnhancedBio,
  getMyGenerationsLeft,
} from "@/app/(app)/settings/_actions/bio";
import CvCard from "@/app/(app)/settings/_components/cv-card";
import AddCvButton from "@/app/(app)/settings/_components/cv-input";
import EnhanceBio from "@/app/(app)/settings/_components/enhance-bio";
import ProfilePictureInput from "@/app/(app)/settings/_components/profile-picture-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { UserWithCvs } from "@/lib/data/user.types";
import { cn } from "@/lib/utils";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type ProfileFormProps = {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
  user: UserWithCvs;
};

export default function BasicProfile({ form, user }: ProfileFormProps) {
  const { toast } = useToast();

  const [enhanceOpen, setEnhanceOpen] = useState(false);
  const [enhanceBioSuggestion, setEnhanceBioSuggestion] = useState<string>("");
  const [enhanceBioLoading, setEnhanceBioLoading] = useState(false);
  const [generationsLeft, setGenerationsLeft] = useState<number | undefined>();

  useEffect(() => {
    const getGenerationsLeft = async () => {
      const response = await getMyGenerationsLeft();
      if (response.success) {
        setGenerationsLeft(response.value);
      } else {
        toast({
          variant: "default",
          title: "Error",
          description: `❌ ${response.error}`,
        });
      }
    };

    getGenerationsLeft();
  }, [enhanceOpen]);

  const enhanceBio = useCallback(async () => {
    const bio = form.getValues("bio");
    if (!bio) return;

    setEnhanceBioLoading(true);

    const response = await getEnhancedBio(bio);

    if (response.success) {
      setEnhanceBioSuggestion(response.value!);
      setEnhanceOpen(true);
    } else {
      toast({
        variant: "default",
        title: "Error",
        description: `❌ ${response.error}`,
      });
    }

    // Open dialog with new bio
    setEnhanceBioLoading(false);
  }, []);

  return (
    <div className={"space-y-4"}>
      <div className={"flex flex-row space-y-2 space-x-8 mb-4"}>
        <ProfilePictureInput user={user} />

        <div className={"flex flex-col space-y-2"}>
          <div className={"flex flex-row gap-4"}>
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

          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input value={user.email ?? ""} disabled={true} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </div>

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"flex"}>
              <label className={"my-auto"}>Bio</label>
              <EnhanceBio
                open={enhanceOpen}
                onOpenChange={setEnhanceOpen}
                bioSuggestion={enhanceBioSuggestion}
                onChange={setEnhanceBioSuggestion}
                onAccepted={() => {
                  setEnhanceOpen(false);
                  form.setValue("bio", enhanceBioSuggestion);
                }}
              />
              <Button
                disabled={!field.value || enhanceBioLoading || !generationsLeft}
                className={"ml-auto"}
                size={"sm"}
                variant={"ghost"}
                type={"button"}
                onClick={enhanceBio}
              >
                {enhanceBioLoading ? (
                  <>
                    <span className={"mr-2"}>Processing</span>
                    <Loader2 className={"h-4 w-4 animate-spin"} />
                  </>
                ) : (
                  `✨ Enhance with AI (${generationsLeft === undefined ? "-" : generationsLeft} credits left)`
                )}
              </Button>
            </FormLabel>
            <Textarea
              placeholder="I'm a software engineer with experience in..."
              {...field}
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

      <div className={"flex flex-col space-y-2"}>
        <Label htmlFor="terms">CV</Label>
        <div className={"flex flex-col gap-4"}>
          {user.cv ? <CvCard cv={user.cv} /> : <AddCvButton />}
        </div>
        <p className={"text-sm text-muted-foreground"}>
          Companies will be able to see your CV. Max size{" "}
          {env.NEXT_PUBLIC_MAX_CV_FILE_SIZE}
        </p>
      </div>
    </div>
  );
}
