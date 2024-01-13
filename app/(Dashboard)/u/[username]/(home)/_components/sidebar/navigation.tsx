"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { MessageSquare, Fullscreen, Users, KeyRound } from "lucide-react";
import NavItem, { NavItemSkeleton } from "./navitem";

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      icon: Fullscreen,
      href: `/u/${user?.username}`,
    },
    {
      label: "Keys",
      icon: KeyRound,
      href: `/u/${user?.username}/keys`,
    },
    {
      label: "Chat",
      icon: MessageSquare,
      href: `/u/${user?.username}/chat`,
    },
    {
      label: "Community",
      icon: Users,
      href: `/u/${user?.username}/community`,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton />
        ))}
      </ul>
    );
  }
  return (
    <div className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </div>
  );
};

export default Navigation;
