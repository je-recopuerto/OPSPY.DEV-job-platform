import ProfileFormSkeleton from "@/components/settings/profile-form-skeleton";

export default function ProfileLoadingSkeleton() {
  /*
     <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator />

      <ProfileForm user={user} />
    </div>
   */
  return (
    <div className={"space-y-6"}>
      <ProfileFormSkeleton />
    </div>
  );
}
