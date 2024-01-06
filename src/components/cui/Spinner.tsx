import { Loader2 } from "lucide-react";
import React from "react";

type SpinnerProps = {
  text?: string;
};

export default function Spinner(props: SpinnerProps) {
  return (
    <p
      className={
        "flex flex-row ml-2 text-sm text-muted-foreground items-center"
      }
    >
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      {props.text ?? "Loading..."}
    </p>
  );
}
