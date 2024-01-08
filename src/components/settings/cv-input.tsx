"use client";

import { uploadCv } from "@/app/settings/_actions";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";

export default function AddCvButton() {
  const [uploading, setUploading] = useState(false);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);

      await uploadCv(formData);
    } catch (error) {
      console.error("Error uploading CV:", error);
      // Handle error appropriately
    } finally {
      setUploading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    fileInputRef.current!.click();
  };

  return (
    <Card className={"cursor-pointer border-dashed"} onClick={handleCardClick}>
      <CardContent className={"flex flex-row pt-6 gap-4"}>
        {uploading ? (
          <>
            <div className={"my-auto"}>
              <Plus className={"h-5 w-5"} />
            </div>
            <div className={"my-auto"}>
              <p className={"text-sm"}>Uploading...</p>
            </div>
            <div className={"ml-auto"}></div>
          </>
        ) : (
          <>
            <div className={"my-auto"}>
              <Plus className={"h-5 w-5"} />
            </div>
            <div className={"my-auto"}>
              <p className={"text-sm"}>Add CV</p>
            </div>
            <div className={"ml-auto"}></div>
          </>
        )}
      </CardContent>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={upload}
        accept={".pdf"}
      />
    </Card>
  );
}
