import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import React from "react";

export function SignIn({
  ...props
}: { provider?: string | undefined } & React.ComponentPropsWithRef<
  typeof Button
>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("auth0");
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <DropdownMenuItem>
        <button className="flex flex-row my-auto w-full items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </button>
      </DropdownMenuItem>
    </form>
  );
}
