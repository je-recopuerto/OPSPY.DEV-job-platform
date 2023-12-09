'use client'

import {setOnboarding} from "@/app/actions";
import {onboardingSchema} from "@/schemas/onboardingSchema";
import * as z from "zod";
import {Card, CardDescription} from "../ui/card";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Separator} from "@/components/ui/separator";
import GettingStarted from "@/components/onboarding/getting-started";
import FormSubmitButton from "@/components/onboarding/form-submit";
import {useToast} from "@/components/ui/use-toast";
import {useEffect} from "react";

export default function OnboardingCard() {

  const { toast } = useToast()

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date("November 12, 1960"),
    },
  })

  const { formState: {isSubmitSuccessful} } = form

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast({
        variant: "default",
        title: "Onboarding",
        description: "✅ You have been onboarded successfully!",
        duration: 3000,
      })
    }
  }, [isSubmitSuccessful, toast])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => setOnboarding(data))} className="space-y-8">
        <Card className="format lg:format-md max-w-2xl m-auto">
          <GettingStarted form={form}/>

          <Separator/>

          {/*<YourExperience form={form}/>*/}

          <Separator/>

          <CardDescription>
            <FormSubmitButton form={form}/>

          </CardDescription>
        </Card>
      </form>
    </Form>
  )
}