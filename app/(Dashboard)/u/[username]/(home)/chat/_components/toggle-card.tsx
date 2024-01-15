"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypeProps = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  field: FieldTypeProps;
  value: boolean;
}
const ToggleCard = ({ label, field, value }: ToggleCardProps) => {
  const [isLoading, startTransition] = useTransition();
  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success("Chat Settings updated");
        })
        .catch(() => {
          toast.error("something went wrong");
        });
    });
  };

  return (
    <div className="p-6 bg-muted rounded-xl flex items-center justify-between">
      <p className="font-semibold shrink-0">{label}</p>
      <div className="space-y-2">
        <Switch checked={value} disabled={isLoading} onCheckedChange={onChange}>
          {value ? "On" : "Off"}
        </Switch>
      </div>
    </div>
  );
};

export default ToggleCard;

export const ChatSkeleton = () => {
  return <Skeleton className="p-10 rounded-xl w-full" />;
};
