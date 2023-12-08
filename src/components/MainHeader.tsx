import { auth } from "@/auth"
import UserButton from "@/components/user-button";
import {MainNav} from "@/components/main-nav";
import {ThemeToggle} from "@/components/theme-toggle";

export default async function MainHeader() {

  const session = await auth()

  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <MainNav />
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  )
}