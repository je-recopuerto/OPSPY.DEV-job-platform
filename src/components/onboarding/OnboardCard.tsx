'use client'

import {setOnboarding} from "@/app/actions";
import {OnboardProps} from "../../../types/props";
import {onboardingSchema} from "@/schemas/onboardingSchema";
import * as z from "zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {CalendarIcon, Loader2} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import { Input } from "../ui/input";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {useEffect} from "react";
import {Separator} from "@/components/ui/separator";
import GettingStarted from "@/components/onboarding/getting-started";
import YourExperience from "@/components/onboarding/your-experience";

type PageProps = {
  state: OnboardProps,
  setState: (o: OnboardProps) => void,
  validate: () => void,
  moveNext: () => void,
  submit: () => Promise<void>
}

export default function OnboardingCard() {
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date("November 12, 1960"),
    },
  })

  // const submit = async () => {
  //   try {
  //     await form.handleSubmit((data) => setOnboarding(data))
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  const {formState: {isSubmitting}} = form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => setOnboarding(data))} className="space-y-8">
        <Card className="format lg:format-md max-w-2xl m-auto">
          <GettingStarted form={form}/>

          <Separator/>

          <YourExperience form={form}/>
        </Card>
      </form>
    </Form>
  )
}