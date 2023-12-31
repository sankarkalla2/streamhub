"use client";

import { useSidebar } from "@/store/use-sidebar";
import React from "react";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-16 bg-background h-full border-r border-[2D2E35 z-50",
        !collapsed && "w-60"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
