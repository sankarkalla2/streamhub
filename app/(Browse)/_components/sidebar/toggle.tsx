"use client";

import { Button } from "@/components/ui/button";
import Hint from "@/components/ui/hint";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {!collapsed && (
        <div className={cn("p-3 pl-6 flex items-center w-full h-auto")}>
          <p className="text-primary font-semibold">For You</p>
          <Hint label={label} side="right" asChild>
            <Button variant="ghost" className="ml-auto">
              <ArrowLeftFromLine
                className="h-4 w-4 text-muted-foreground"
                onClick={onCollapse}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!!collapsed && (
        <div className="p-3 lg:flex items-center w-full h-auto hidden">
          {/* <p className="text-primary font-semibold">For You</p> */}
          <Hint side="left" label={label} asChild>
            <Button variant="ghost" className="ml-auto">
              <ArrowRightFromLine
                className="h-4 w-4 text-muted-foreground"
                onClick={onExpand}
              />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
