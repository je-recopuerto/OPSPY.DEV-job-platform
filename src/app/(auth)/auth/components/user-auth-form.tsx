"use client";

import * as React from "react";

import { signInAuth } from "@/app/(auth)/auth/_actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  FacebookIcon,
  GithubIcon,
  Key,
  LoaderIcon,
  TwitterIcon,
} from "lucide-react";
import { getProviders } from "next-auth/react";
import { useEffect } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [providers, setProviders] =
    React.useState<Awaited<ReturnType<typeof getProviders>>>(null);

  useEffect(() => {
    getProviders().then((r) => setProviders(r));
  }, []);

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      {providers ? (
        <AuthButtons providers={providers} />
      ) : (
        <AuthButtonsSkeleton />
      )}
    </div>
  );
}

const AuthButtonsSkeleton = () => {
  return (
    <Button variant="outline" type="button" disabled={true}>
      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
};

const AuthButtons = ({
  providers,
}: {
  providers: Awaited<ReturnType<typeof getProviders>>;
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={async () => signInAuth(provider.id)}
            key={(provider as any).name}
          >
            {isLoading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ProviderIcon provider={provider.name} className="mr-2 h-4 w-4" />
            )}{" "}
            {provider.name}
          </Button>
        ))}
    </>
  );
};

const ProviderIcon = ({
  provider,
  className,
}: {
  provider: string;
  className?: string;
}) => {
  switch (provider.toLowerCase()) {
    case "auth0":
      return <Key className={cn("", className)} />;
    case "linkedin":
      return <LinkedInLogoIcon className={cn("", className)} />;
    case "github":
      return <GithubIcon className={cn("", className)} />;
    case "facebook":
      return <FacebookIcon className={cn("", className)} />;
    case "twitter":
      return <TwitterIcon className={cn("", className)} />;
    default:
      return null; // or a default icon
  }
};
