import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getUserWithCompanyById } from "@/lib/data/user";
import { UserWithCompany } from "@/lib/data/user.types";
import { profileSuggestions } from "@/lib/user";

async function ProfileScore({ score }: { score: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Score ({score}%)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={score} className={"w-100 mt-3"} />
      </CardContent>
    </Card>
  );
}

function calculateProfileScore(user: UserWithCompany): number {
  const totalSuggestions = profileSuggestions.length;
  const unmetSuggestions = profileSuggestions.filter((suggestion) =>
    suggestion.qualifier(user),
  ).length;
  const metSuggestions = totalSuggestions - unmetSuggestions;
  const score = (metSuggestions / totalSuggestions) * 100;

  return Math.round(score); // Optionally round the score to avoid fractional percentages
}

async function ProfileSuggestions() {
  const user = await auth().then(async (session) =>
    getUserWithCompanyById(session?.user?.id),
  );
  if (!user) return null;

  const qualifiedSuggestions = profileSuggestions.filter((suggestion) =>
    suggestion.qualifier(user),
  );

  const score = calculateProfileScore(user);

  return (
    <>
      <ProfileScore score={score} />

      <Card>
        <CardHeader>
          <CardTitle>Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qualifiedSuggestions.map((suggestion) => (
            <div
              className="flex items-center space-x-2"
              id={suggestion.title}
              key={suggestion.title}
            >
              <suggestion.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="font-medium">{suggestion.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {suggestion.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

export { ProfileSuggestions };
