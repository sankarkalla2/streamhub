"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { followUser } from "@/lib/follow-service";
import { onBlock, onUnBlock } from "@/actions/block";

interface ActionsProps {
  isFollowing: boolean;
  isBlocked: boolean;
  user: User;
}
const Actions = ({ isFollowing, isBlocked, user }: ActionsProps) => {
  const [loading, startTransition] = useTransition();

  const handleFollow = async (id: string) => {
    onFollow(id)
      .then((data) => {
        toast.success(`You are following user`);
      })
      .catch((err: any) => {
        toast.error("Something went wrong");
      });
  };

  const handleUnfollow = async (id: string) => {
    onUnFollow(id)
      .then((data) => {
        toast.success(`You are unfollwing user`);
      })
      .catch((err: any) => {
        toast.error("something went wrong");
      });
  };

  const handleBlock = async (id: string) => {
    startTransition(() => {
      !isBlocked
        ? onBlock(id)
            .then((data) => {
              toast.success(`You blocked user ${data?.blocked.username}`);
            })
            .catch((err) => {
              toast.error("something went wrong");
            })
        : onUnBlock(id)
            .then((data) => {
              toast.success(`You unblocked user ${data?.blocked.username}`);
            })
            .catch((err) => {
              toast.error("Something went wrong");
            });
    });
  };
  const onClick = async () => {
    startTransition(async () => {
      if (isFollowing) {
        await handleUnfollow(user.id);
        return;
      }

      await handleFollow(user.id);
    });
  };
  return (
    <>
      <Button variant="primary" onClick={onClick} disabled={loading}>
        {isFollowing ? "UnFollow" : "Follow"}
      </Button>
      <Button
        variant="primary"
        onClick={() => handleBlock(user.id)}
        disabled={loading}
      >
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </>
  );
};

export default Actions;
