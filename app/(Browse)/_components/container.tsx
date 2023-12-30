"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const matches = useMediaQuery("max-width:768px");

  useEffect(() => {
    if (matches) {
      onCollapse();
      console.log(collapsed);
    } else {
      onExpand();
      console.log(collapsed);
    }
  }, [matches, onCollapse, onExpand]);
  return (
    <div className={cn("flex-1", collapsed ? "ml-16" : "ml-16 md:ml-60")}>
      {children}
    </div>
  );
};

export default Container;
