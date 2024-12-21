"use client";

import { updateNotificationSettings } from "@/app/(app)/settings/_actions/notifications";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { PreferenceSet, SetPreferencesProperties } from "@knocklabs/node";
import { ChannelType } from "@knocklabs/node/dist/src/common/interfaces";
import { ChannelTypePreferences } from "@knocklabs/node/dist/src/resources/preferences/interfaces";
import { useForm } from "react-hook-form";

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
] as const;

export default function PreferencesForm({
  preferences,
}: {
  preferences: PreferenceSet;
}) {
  const { toast } = useToast();

  const form = useForm<SetPreferencesProperties>({
    defaultValues: preferences as SetPreferencesProperties,
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful, isDirty, errors },
  } = form;

  const isChecked = (
    channelTypes: ChannelTypePreferences | null,
    type: ChannelType,
  ): boolean => {
    if (!channelTypes) return false;
    if (!channelTypes[type]) return false;
    return channelTypes[type] as boolean;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const result = await updateNotificationSettings(data);

          if (result.success) {
            toast({
              variant: "default",
              title: "Success",
              description: "✅ Successfully updated notification settings!",
              duration: 3000,
            });

            // Set the form values to the result
            form.reset(result.value as SetPreferencesProperties);
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: `❌ ${result.error}`,
              duration: 3000,
            });
          }
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
                    defaultChecked={isChecked(
                      preferences.channel_types,
                      preferenceType.code,
                    )}
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
