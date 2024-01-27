"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogProps } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";

type Props = Omit<DialogProps, "children"> & {
  trigger?: React.ReactNode;
  bioSuggestion: string;
  onAccepted?: () => void;
  onChange: Dispatch<SetStateAction<string>>;
};

export default function EnhanceBio({
  bioSuggestion,
  onAccepted,
  ...props
}: Props) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        {/*<DialogHeader>*/}
        {/*  <DialogTitle>Enhance your bio</DialogTitle>*/}
        {/*  <DialogDescription>*/}
        {/*    Use AI to enhance your bio with more keywords and skills.*/}
        {/*  </DialogDescription>*/}
        {/*</DialogHeader>*/}
        <div className="grid gap-4 py-4">
          <Label htmlFor="bio">Suggested bio</Label>
          <Textarea
            defaultValue={bioSuggestion}
            onChange={(e) => props.onChange(e.target.value)}
            // disabled={true}
            className={"border-green-500"}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onAccepted}>
            Accept changes
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="ml-auto"
            onClick={() => props.onOpenChange && props.onOpenChange(false)}
          >
            Reject changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
