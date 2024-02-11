"use client";

import WorkExperienceCard from "@/app/(app)/settings/_components/work-experience/WorkExperienceCard";
import { Button } from "@/components/ui/button";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../../../../components/ui/separator";

type PageProps = {
  form: UseFormReturn<z.infer<typeof updateProfileFormSchema>>;
};

export default function WorkExperienceForm({ form }: PageProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  return (
    <div>
      <div className={"flex flex-row"}>
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Work Experience</h3>
          <p className="text-sm text-muted-foreground">
            Add your work experience.
          </p>
        </div>

        <div className={"flex flex-row justify-end ml-auto my-auto"}>
          <Button
            type="button"
            onClick={() => {
              append({
                company: "",
                jobTitle: "",
                location: "",
                startDate: new Date(),
                endDate: null,
                description: "",
              });

              setOpenCardIndex(fields.length);
            }}
            variant={"ghost"}
          >
            <Plus className={"mr-2 h-4 w-4"} />
            <span>Add Experience</span>
          </Button>
        </div>
      </div>

      <Separator className={"mt-3 mb-6"} />

      <div className={"flex flex-col gap-4 w-full"}>
        {fields.reverse().map((field, index) => (
          <WorkExperienceCard
            index={index}
            form={form}
            key={field.id}
            isOpen={openCardIndex === index}
            remove={remove}
          />
        ))}

        {fields.length === 0 && (
          <p className={"text-sm text-muted-foreground text-center"}>
            No work experience added yet.
          </p>
        )}
      </div>
    </div>
  );
}
