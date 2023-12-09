import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { auth } from "@/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { SignIn, SignOut } from "./auth-components"
import {
  Cloud,
  CreditCard, Github,
  LifeBuoy,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

export default async function UserButton() {
  const session = await auth()
  if (!session?.user) return <SignIn />
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full my-auto">
          <Avatar className="w-8 h-8">
            {session.user.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ""}
              />
            )}
            <AvatarFallback>{session.user.email}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className={"my-0 pb-0"}>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuLabel className={"text-xs text-muted-foreground pt-0.5"}>{session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>

          <DropdownMenuItem asChild>
            <Link href={"/profile"}>
              <User className="mr-2 h-4 w-4"/>
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>
            <CreditCard className="mr-2 h-4 w-4"/>
            <span>Dashboard</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4"/>
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        {/*<DropdownMenuGroup>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <Users className="mr-2 h-4 w-4"/>*/}
        {/*    <span>Team</span>*/}
        {/*  </DropdownMenuItem>*/}
        {/*  <DropdownMenuSub>*/}
        {/*    <DropdownMenuSubTrigger>*/}
        {/*      <UserPlus className="mr-2 h-4 w-4"/>*/}
        {/*      <span>Invite users</span>*/}
        {/*    </DropdownMenuSubTrigger>*/}
        {/*    <DropdownMenuPortal>*/}
        {/*      <DropdownMenuSubContent>*/}
        {/*        <DropdownMenuItem>*/}
        {/*          <Mail className="mr-2 h-4 w-4"/>*/}
        {/*          <span>Email</span>*/}
        {/*        </DropdownMenuItem>*/}
        {/*        <DropdownMenuItem>*/}
        {/*          <MessageSquare className="mr-2 h-4 w-4"/>*/}
        {/*          <span>Message</span>*/}
        {/*        </DropdownMenuItem>*/}
        {/*        <DropdownMenuSeparator/>*/}
        {/*        <DropdownMenuItem>*/}
        {/*          <PlusCircle className="mr-2 h-4 w-4"/>*/}
        {/*          <span>More...</span>*/}
        {/*        </DropdownMenuItem>*/}
        {/*      </DropdownMenuSubContent>*/}
        {/*    </DropdownMenuPortal>*/}
        {/*  </DropdownMenuSub>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <Plus className="mr-2 h-4 w-4"/>*/}
        {/*    <span>New Team</span>*/}
        {/*    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>*/}
        {/*  </DropdownMenuItem>*/}
        {/*</DropdownMenuGroup>*/}
        {/*<DropdownMenuSeparator/>*/}
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4"/>
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4"/>
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4"/>
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>

        <SignOut/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
