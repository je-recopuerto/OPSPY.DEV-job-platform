import { auth } from "@/auth";
import { MainNav } from "@/components/main-nav";
import { NotificationsMenu } from "@/components/notifications/NotificationsMenu";
import { ThemeToggle } from "@/components/theme-toggle";
import UserButton from "@/components/user-button";

export default async function MainHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 flex justify-center border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full h-16 max-w-7xl px-4 mx-auto sm:px-6">
        <MainNav />

        <div className={"flex space-x-3 justify-end"}>
          <div>
            <ThemeToggle />
          </div>

          <div>
            <NotificationsMenu userId={session?.user!.id!} />
          </div>
          <div>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
