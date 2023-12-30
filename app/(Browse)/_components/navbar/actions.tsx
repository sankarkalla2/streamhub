import { Button } from "@/components/ui/button";
import { UserButton, currentUser, SignInButton } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

const Actions = async () => {
  const user = await currentUser();
  return (
    <div>
      {!user ? (
        <SignInButton>
          <Button size='sm' variant='primary'>Login</Button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-x-2 cursor-pointer">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/u/dashboard"
              className="flex gap-x-1 items-center text-muted-foreground hover:text-primary"
            >
              <Clapperboard className="w-6 h-6" />
              <p className="text-sm hidden lg:flex">Dashboard</p>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};

export default Actions;
