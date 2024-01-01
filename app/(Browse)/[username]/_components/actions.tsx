"use client";

import { Button } from "@/components/ui/button";
import { onFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";

interface ActionsProps {
  isFollowing: boolean;
  user: User
}
const Actions = ({ isFollowing, user }: ActionsProps) => {
  const [loading, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      onFollow(user.id)
        .then(() => {
          toast.success("You followed user");
        })
        .catch(() => {
          toast.error("something went wrong");
        });
    });
  };
  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={loading || isFollowing}
    >
      Follow
    </Button>
  );
};

export default Actions;
