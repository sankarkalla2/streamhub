import { Skeleton } from "@/components/ui/skeleton";
import { ChatSkeleton } from "../chat/_components/toggle-card";

const Loading = () => {
  return (
    <div className="p-6 md:px-20 xl:m-32">
      <div className="pb-4 flex items-center justify-between">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <ChatSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
