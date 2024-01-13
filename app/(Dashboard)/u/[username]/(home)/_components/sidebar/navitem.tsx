"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/create-layout-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}
const NavItem = ({ label, href, icon: Icon, isActive }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <Button
      variant="ghost"
      className={cn("w-full h-12", isActive && "bg-accent")}
      asChild
    >
      <Link
        href={href}
        className="gap-x-4 flex justify-center lg:justify-start"
      >
        <Icon className="w-5 h-5" />
        <span className="hidden lg:flex">{label}</span>
      </Link>
    </Button>
  );
};

export default NavItem;

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[40px] min-w-[40px] rounded-md ">
        <div className="hidden lg:block">
          <Skeleton className="h-6 w-40" />
        </div>
      </Skeleton>
    </li>
  );
};
