import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn(className, "flex items-center relative")}>
        <SearchIcon className="w-4 h-4 text-muted-foreground absolute left-3" />
        <Input className="pl-10" {...props} ref={ref} />
      </div>
    );
  },
);

Search.displayName = "Search";

export { Search };
