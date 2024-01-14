import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JobFilter() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <form className="flex space-x-2">
        <Input
          className="max-w-lg flex-1"
          placeholder="Enter job title or keywords"
          type="text"
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
