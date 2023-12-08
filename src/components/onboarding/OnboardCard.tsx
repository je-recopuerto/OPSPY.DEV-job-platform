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

  const {formState: {isSubmitting}} = form

  return (
    <Card className="format lg:format-md max-w-2xl m-auto">
      <CardHeader>
        <CardTitle>Get started</CardTitle>
        <CardDescription>First, we need to know a few basic things about you.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => setOnboarding(data))} className="space-y-8">
            <div className={"flex flex-row space-x-2"}>
              <FormField
                control={form.control}
                name="firstName"
                render={({field}) => (
                  <FormItem className={"flex-grow"}>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Saul" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField name={"lastName"} control={form.control} render={({field}) => (
                <FormItem className={"flex-grow"}>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Goodman" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
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
                  <FormMessage/>
                </FormItem>
              )}
            />

            {isSubmitting ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
              ) : (
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}