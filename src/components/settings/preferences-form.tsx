"use client";

import { updateNotificationSettings } from "@/app/settings/notifications/_actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { PreferenceSet } from "@knocklabs/node";
import { ChannelType } from "@knocklabs/node/dist/src/common/interfaces";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type PreferencesFormProps = {
  preferences: PreferenceSet;
};

const preferenceTypes: {
  name: string;
  description: string;
  code: ChannelType;
}[] = [
  {
    name: "Chat",
    description: "Chat",
    code: "chat",
  },
  {
    name: "E-Mail",
    description: "E-Mail",
    code: "email",
  },
  // {
  //   name: "email",
  //   description: "Email",
  //   code: "http",
  // },
  {
    name: "In-App Feed",
    description: "In-App Feed",
    code: "in_app_feed",
  },
  {
    name: "Push Notifications",
    description: "Push Notifications",
    code: "push",
  },
  {
    name: "SMS",
    description: "SMS (text message)",
    code: "sms",
  },
];

export default function PreferencesForm(props: PreferencesFormProps) {
  const { toast } = useToast();

  const form = useForm<PreferenceSet>({
    defaultValues: props.preferences,
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful, isDirty, errors },
  } = form;

  useEffect(() => {
    if (!isSubmitting && isSubmitSuccessful) {
      toast({
        variant: "default",
        title: "Success",
        description: "✅ Successfully updated notification settings!",
        duration: 3000,
      });
    }
  }, [isSubmitSuccessful, toast, isSubmitting]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const result = await updateNotificationSettings(data);

          // Set the form values to the result
          form.reset(result);
        })}
        className="space-y-5"
      >
        <div className={"grid gap-4 w-full grid-cols-2"}>
          {preferenceTypes.map((preferenceType) => {
            return (
              <div key={preferenceType.code}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    defaultChecked={
                      props.preferences.channel_types[
                        preferenceType.code
                      ] as boolean
                    }
                    {...form.register(`channel_types.${preferenceType.code}`)}
                  />
                  <span className="text-sm">{preferenceType.name}</span>
                </label>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={!isDirty || isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
