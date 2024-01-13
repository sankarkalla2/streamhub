"use client";
import { Button } from "@/components/ui/button";
import Hint from "@/components/ui/hint";
import { useCreatorSidebar } from "@/store/create-layout-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {collapsed && (
        <div className="w-full lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} asChild side="left">
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-8 mb-2 lg:flex hidden items-center justify-between w-full">
          <p className="">Dashboard</p>
          <Hint label={label} side="left" asChild>
            <Button className="h-auto p-2" variant="ghost" onClick={onCollapse}>
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
