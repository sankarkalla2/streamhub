import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Actions = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Button size="sm" variant="ghost">
        <Link
          href="/"
          className="flex gap-x-1 text-muted-foreground hover:text-primary"
        >
          <LogOut className="h-5 w-5"/>
          <p className="text-sm">Exit</p>
        </Link>
      </Button>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Actions;
