import { buttonVariants } from "@/components/ui/button";
import { registerCompanyUrl } from "@/lib/pages";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Employer",
};

export default function EmployerPage() {
  return (
    <>
      <section className="flex flex-row space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 min-h-screen">
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
                <GetStarted />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const GetStarted = () => {
  return (
    <Link
      href={registerCompanyUrl}
      className={buttonVariants({ variant: "default" })}
    >
      Get Started
    </Link>
  );
};

// const SetupAccount = () => {
//   return (
//     <Link
//       href={employerDashboardUrl}
//       className={buttonVariants({ variant: "default" })}
//     >
//       Setup Account
//     </Link>
//   );
// };
//
// const Dashboard = () => {
//   return (
//     <Link
//       href={employerDashboardUrl}
//       className={buttonVariants({ variant: "default" })}
//     >
//       Go to Dashboard
//     </Link>
//   );
// };
//
// const RegisterCompany = () => {
//   return (
//     <Link
//       href={registerCompanyUrl}
//       className={buttonVariants({ variant: "default" })}
//     >
//       Register Company
//     </Link>
//   );
// };
