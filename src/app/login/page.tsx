'use client'

import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import DiscordLoginButton from "@/components/Buttons/DiscordLoginButton";
import FormSplitter from "@/components/FormSplitter";

export default function LoginPage() {
  return (
    <div className={"flex-1 flex flex-col relative max-w-[390px] mx-auto"}>

      <p className="text-2xl text-gray-900 dark:text-white font-extrabold my-4 text-center">
        Login
      </p>

      {/*<form className="flex max-w-md flex-col gap-4">*/}
      {/*  <div>*/}
      {/*    <div className="mb-2 block">*/}
      {/*      <Label*/}
      {/*        htmlFor="email1"*/}
      {/*        value="Your email"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <TextInput*/}
      {/*      id="email1"*/}
      {/*      placeholder="name@flowbite.com"*/}
      {/*      required*/}
      {/*      type="email"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <div className="mb-2 block">*/}
      {/*      <Label*/}
      {/*        htmlFor="password1"*/}
      {/*        value="Your password"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <TextInput*/}
      {/*      id="password1"*/}
      {/*      required*/}
      {/*      type="password"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="flex items-center gap-2">*/}
      {/*    <Checkbox id="remember" />*/}
      {/*    <Label htmlFor="remember">*/}
      {/*      Remember me*/}
      {/*    </Label>*/}
      {/*  </div>*/}
      {/*  <Button type="submit">*/}
      {/*    Submit*/}
      {/*  </Button>*/}
      {/*</form>*/}
      {/*<FormSplitter text={"or"} className={"my-4"} />*/}

      <DiscordLoginButton />
    </div>
  )
}