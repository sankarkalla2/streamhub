"use client";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/create-layout-sidebar";
import React, { Children } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebar(
    (state) => state
  );
  return (
    <aside
      className={cn(
        "fixed w-[70px] lg:w-60 z-50 bg-[#2D2E35] h-full bg-background flex flex-col left-0",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
