"use client";

import { Button } from "@/components/ui/button";
import { onFollow } from "@/actions/follow";
import { useTransition } from "react";

interface ActionsProps {
  isFollowing: boolean;
}
const Actions = ({ isFollowing }: ActionsProps) => {
  const [loading, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      onFollow("123");
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
