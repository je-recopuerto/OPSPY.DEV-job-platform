"use client";

import { uploadProfilePicture } from "@/app/settings/_actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";

type ProfilePictureInputProps = {
  user: User;
};

export default function ProfilePictureInput(props: ProfilePictureInputProps) {
  const { toast } = useToast();

  const [uploading, setUploading] = useState(false);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      await uploadProfilePicture(formData);

      toast({
        variant: "default",
        title: "Success",
        description: "✅ Profile picture uploaded successfully",
      });
    } catch (error) {
      if (!(error instanceof Error)) return;

      console.error("Error uploading profile picture:", error);
      // Handle error appropriately

      toast({
        variant: "default",
        title: "Error",
        description: "❌ Error uploading profile picture: " + error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    fileInputRef.current!.click();
  };

  return (
    <>
      <div className={"flex flex-col gap-2"}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger type={"button"}>
              <Avatar
                className={"h-48 w-48 cursor-pointer"}
                onClick={handleCardClick}
              >
                {uploading && (
                  <div
                    className={
                      "absolute top-0 left-0 w-full h-full bg-black opacity-50"
                    }
                  >
                    <div
                      className={
                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      }
                    >
                      <Loader2 className={"h-8 w-8 text-white animate-spin"} />
                    </div>
                  </div>
                )}

                <AvatarImage src={props.user.imageURL ?? ""} alt="@shadcn" />
                <AvatarFallback>
                  {props.user.firstName?.charAt(0)}
                  {props.user.lastName?.charAt(0)}
                </AvatarFallback>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={upload}
                  accept={"image/*"}
                />
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side={"bottom"} className={"mt-2"}>
              <p>Upload new profile picture</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
