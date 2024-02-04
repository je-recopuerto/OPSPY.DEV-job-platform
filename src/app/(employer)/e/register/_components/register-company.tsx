"use client";

import { registerCompany } from "@/app/(employer)/e/register/_actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { companyUrl } from "@/lib/pages";
import {
  employeeCountMap,
  registerCompanySchema,
} from "@/lib/validations/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeCount } from "@prisma/client";
import { RocketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

export default function RegisterCompany() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerCompanySchema>>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {},
  });

  const {
    formState: { isSubmitting },
  } = form;

  const submit = async () => {
    const response = await registerCompany(form.getValues());
    if (!response.success) {
      toast({
        title: "Failed",
        description: response.error,
        duration: 3000,
      });
    } else {
      const { data } = response;

      toast({
        title: "Success",
        description: data.message,
      });

      // Redirect to new company page
      router.push(companyUrl(data.company.id));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => await submit())}
        className="space-y-2"
      >
        <MediaLaterBanner />

        <div className={"space-y-4"}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Amazon" {...field} />
                </FormControl>
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
                    placeholder="Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It is considered one of the Big Five American technology companies; the other four are Alphabet, Apple, Meta, and Microsoft."
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

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://amazon.com/" {...field} />
                </FormControl>
                <FormDescription>Please include the full URL</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Count</FormLabel>
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
                    {Object.keys(EmployeeCount).map((type) => (
                      <SelectItem key={type} value={type}>
                        {employeeCountMap[type as EmployeeCount] || type}{" "}
                        employees
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Please include the country code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company E-mail</FormLabel>
                <FormControl>
                  <Input type={"email"} {...field} />
                </FormControl>
                <FormDescription>
                  Please do not use personal email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <AddressForm form={form} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

const AddressForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof registerCompanySchema>>;
}) => {
  return (
    <div className={"flex flex-col gap-2 max-w-md"}>
      <div className={"flex flex-row gap-4"}>
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />{" "}
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />{" "}
      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zip/Postal Code</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />{" "}
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const MediaLaterBanner = () => {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add media later on, such as images and videos.
      </AlertDescription>
    </Alert>
  );
};
