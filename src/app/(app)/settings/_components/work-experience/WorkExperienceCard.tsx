"use client";

import ExperienceCardActions from "@/app/(app)/settings/_components/work-experience/ExperienceCardActions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

type Props = {
  index: number;
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
  remove: UseFieldArrayRemove;
  isOpen: boolean;
};

export default function WorkExperienceCard({
  index,
  form,
  remove,
  isOpen,
}: Props) {
  const [editing, setEditing] = useState(isOpen);

  const tryClose = async () => {
    if (!editing) {
      setEditing(true);
      return;
    }

    // validate the form
    await form.trigger();

    // if the form is valid, close the card
    if (form.formState.isValid) {
      setEditing(false);
    }
  };

  const dateToMonthYear = (startDate: Date, endDate: Date | null) => {
    return `${format(startDate, "MM/yyyy")} - ${endDate ? format(endDate, "MM/yyyy") : "Present"}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className={"flex flex-row justify-between"}>
          <div className={"flex flex-col"}>
            {editing ? (
              <FormField
                control={form.control}
                name={`workExperience.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <TextareaAutosize
                      autoFocus
                      id="title"
                      defaultValue={field.value ?? ""}
                      placeholder="Enter Job Title"
                      className="resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
                      disabled={!editing}
                      hidden={!editing && !field.value}
                      {...field}
                    />

                    {!editing && (
                      <span className="text-sm text-muted-foreground">
                        {" - "}
                        {dateToMonthYear(
                          form.watch(`workExperience.${index}.startDate`),
                          form.watch(`workExperience.${index}.endDate`),
                        )}
                      </span>
                    )}

                    {editing && <FormMessage />}
                  </FormItem>
                )}
              />
            ) : (
              <span className="text-2xl font-bold flex flex-row">
                {form.watch(`workExperience.${index}.jobTitle`)}

                <p className="text-sm text-muted-foreground font-normal my-auto ml-3">
                  {dateToMonthYear(
                    form.watch(`workExperience.${index}.startDate`),
                    form.watch(`workExperience.${index}.endDate`),
                  )}
                </p>
              </span>
            )}

            {editing ? (
              <FormField
                control={form.control}
                name={`workExperience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <TextareaAutosize
                      autoFocus
                      id="title"
                      defaultValue={field.value ?? ""}
                      placeholder="Enter Company Name"
                      className={
                        "resize-none appearance-none overflow-hidden bg-transparent text-md font-bold focus:outline-none"
                      }
                      disabled={!editing}
                      hidden={!editing && !field.value}
                      {...field}
                    />
                    {!editing && (
                      <span className="text-sm text-muted-foreground">
                        {form.watch(`workExperience.${index}.location`)}
                      </span>
                    )}

                    {editing && <FormMessage />}
                  </FormItem>
                )}
              />
            ) : (
              <span className="text-md font-bold flex flex-row">
                {form.watch(`workExperience.${index}.company`)}

                <p className="text-sm text-muted-foreground font-normal my-auto ml-3">
                  {form.watch(`workExperience.${index}.location`)}
                </p>
              </span>
            )}
          </div>

          <div className={"flex flex-row"}>
            <ExperienceCardActions
              remove={remove}
              index={index}
              open={editing}
              setOpen={tryClose}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4"}>
        <EditStartEndDates
          remove={remove}
          index={index}
          form={form}
          isOpen={editing}
        />

        {editing && (
          <FormField
            control={form.control}
            name={`workExperience.${index}.location`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={editing ? "" : "text-primary"}>
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="London, UK"
                    {...field}
                    disabled={!editing}
                  />
                </FormControl>
                {editing && <FormMessage />}
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name={`workExperience.${index}.description`}
          render={({ field }) => (
            <FormItem>
              {editing && <FormLabel>Description</FormLabel>}
              <FormControl>
                <TextareaAutosize
                  autoFocus
                  id="title"
                  defaultValue={field.value ?? ""}
                  placeholder="I worked on..."
                  className="w-full resize-none appearance-none overflow-hidden bg-transparent text-sm focus:outline-none"
                  disabled={!editing}
                  hidden={!editing && !field.value}
                  {...field}
                />
              </FormControl>
              {editing && <FormMessage />}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

const EditStartEndDates = ({ form, index, isOpen }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={"flex flex-row gap-4"}>
      <FormField
        control={form.control}
        name={`workExperience.${index}.startDate`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date</FormLabel>
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
                  selected={field.value ?? new Date()}
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

      <FormField
        control={form.control}
        name={`workExperience.${index}.endDate`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>End Date</FormLabel>
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
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date("1900-01-01")
                  // }
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
    </div>
  );
};
