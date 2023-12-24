import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Gauge } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { JobPostWithCompany } from "@/services/JobService";
import { quickApply } from "@/app/actions";
import { toast } from "@/components/ui/use-toast";

type ApplyJobDialogProps = {
  post: JobPostWithCompany;
};

export default function ApplyJobButton(props: ApplyJobDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {props.post.isQuickApply && (
          <form
            action={async () => {
              const success = await quickApply(props.post.id);

              toast({
                title: success
                  ? "Application sent"
                  : "Application failed to send",
                description: "You can view your job applications in your dash.",
                duration: 1500,
              });
            }}
          >
            <DialogHeader>
              <DialogTitle>Quick Apply</DialogTitle>
              <DialogDescription>
                Apply directly through opportunify and show up on the
                employer&apos;s dashboard.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="submit"
                variant={"default"}
                className={"mx-auto mt-4"}
              >
                <Gauge className={"h-4 w-4 mr-2"} />
                Quick Apply
              </Button>
            </DialogFooter>

            {props.post.externalLink && <Separator className={"my-4"} />}
          </form>
        )}

        {props.post.externalLink && (
          <>
            <DialogHeader>
              <DialogTitle>External Application</DialogTitle>
              <DialogDescription>
                Click the button below to be redirected to the employer&apos;s
                job application page.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type={"button"} className={"mx-auto"}>
                Apply Externally
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
