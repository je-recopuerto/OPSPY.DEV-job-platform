import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JobFilter() {
  return (
    <form className="flex space-x-2">
      <Input
        className="flex-1 py-3 w-full"
        placeholder="Job title or company"
        type="text"
      />
      <Input
        className="flex-1 py-3 w-full"
        placeholder="Location"
        type="text"
      />
      <Button className="py-3" type="submit">
        Search
      </Button>
    </form>
  );
}
