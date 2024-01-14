import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getUserWithJobTrackersById } from "@/services/UserService";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Employer",
};

export default async function EmployerPage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserWithJobTrackersById(session.user.id);
  if (!user) return;

  return (
    <>
      <section className="flex flex-row space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className={"w-2/5"}>
          <Image
            src={"/employerdashboard_dark.png"}
            className={"hidden dark:block"}
            width={600}
            height={600}
            alt={"Hire the best in the game."}
          />
          <Image
            src={"/employerdashboard_light.png"}
            className={"dark:hidden"}
            width={600}
            height={600}
            alt={"Hire the best in the game."}
          />
        </div>

        <div className="flex flex-col items-center gap-4 text-center w-3/5">
          <div className={"flex flex-col"}>
            <div className={"flex flex-col gap-4 text-center items-center"}>
              <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-7xl">
                Hire the best in the game.
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Connect with top talent and transform your team&apos;s future.
                Simplify your hiring, amplify your results.
              </p>
              <div className="space-x-4">
                <Link
                  href="/login"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
