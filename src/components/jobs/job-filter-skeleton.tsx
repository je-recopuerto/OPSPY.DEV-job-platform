import { Skeleton } from "../ui/skeleton";

export default function JobFilterSkeleton() {
  return (
    <div className={"flex flex-row gap-4 mb-8"}>
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}
