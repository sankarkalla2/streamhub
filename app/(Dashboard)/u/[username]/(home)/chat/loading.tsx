import { Skeleton } from "@/components/ui/skeleton";
import { ChatSkeleton } from "./_components/toggle-card";

const ChatLoading = () => {
  return (
    <div className="p-6 space-y-4 md:px-20 lg:px-32">
      <Skeleton className="w-[200px] h-10" />
      <ChatSkeleton />
      <ChatSkeleton />
      <ChatSkeleton />
    </div>
  );
};

export default ChatLoading;
