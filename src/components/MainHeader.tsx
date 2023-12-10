import { auth } from "@/auth"
import UserButton from "@/components/user-button";
import {MainNav} from "@/components/main-nav";
import {ThemeToggle} from "@/components/theme-toggle";

export default async function MainHeader() {
  return (
    <header className="sticky top-0 z-50 flex justify-center border-b border-gray-200 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full h-16 max-w-7xl px-4 mx-auto sm:px-6">
        <MainNav />

        <div className={"flex space-x-5 justify-end"}>
          <ThemeToggle/>
          <UserButton/>
        </div>
      </div>
    </header>
  )
}