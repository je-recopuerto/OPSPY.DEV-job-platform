import SavedJobTable from "@/components/dashboard/saved-job-table";
import { getSavedJobsForUserId } from "@/services/JobService";

type SavedJobTabProps = {
  userId: string;
};

export default async function SavedJobTab(props: SavedJobTabProps) {
  const savedJobs = await getSavedJobsForUserId(props.userId);

  return (
    <>
      {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
      {/*  <Card>*/}
      {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
      {/*      <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>*/}

      {/*      <PinIcon className={"h-4 w-4 text-muted-foreground"} />*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      <div className="text-2xl font-bold">{savedJobs.length}</div>*/}
      {/*      <p className="text-xs text-muted-foreground">*/}
      {/*        +20% from last month*/}
      {/*      </p>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</div>*/}
      <div className="grid gap-4">
        <SavedJobTable data={savedJobs} />
      </div>
    </>
  );
}
