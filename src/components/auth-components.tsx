import {signIn, signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import React, {useRef} from "react";
import {DropdownMenuItem, DropdownMenuShortcut} from "@/components/ui/dropdown-menu";
import {LogOut} from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export function SignIn({
                         provider,
                         ...props
                       }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignOut() {
  return (
    <form action={async () => {
      "use server"
      await signOut()
    }}
          className="w-full"
    >
      <DropdownMenuItem>
        <button className="flex flex-row my-auto w-full p-1 items-center">
          <LogOut className="mr-2 h-4 w-4"/>
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </button>
      </DropdownMenuItem>
    </form>
  )
}