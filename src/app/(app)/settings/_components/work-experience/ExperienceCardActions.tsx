import { Button } from "@/components/ui/button";
import { PenIcon, SaveIcon, TrashIcon } from "lucide-react";
import { UseFieldArrayRemove } from "react-hook-form";

type ExperienceCardActionsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  index: number;
  remove: UseFieldArrayRemove;
};

export default function ExperienceCardActions({
  open,
  setOpen,
  index,
  remove,
}: ExperienceCardActionsProps) {
  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(!open)}
        variant={"outline"}
        className={"ml-2"}
      >
        {open ? (
          <>
            <SaveIcon className={"h-4 w-4 mr-2"} />
            Save
          </>
        ) : (
          <>
            <PenIcon className={"h-4 w-4 mr-2"} />
            Edit
          </>
        )}
      </Button>
      <Button
        type="button"
        onClick={() => remove(index)}
        variant={"destructive"}
        className={"ml-2"}
      >
        <TrashIcon className={"h-4 w-4"} />
      </Button>
    </>
  );
}
