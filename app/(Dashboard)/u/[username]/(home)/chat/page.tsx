import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import ToggleCard from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  
  return (
    <div className="p-6 md:px-20 lg:px-32">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>
      <div className="space-y-4"> 
        <ToggleCard
          label="Enable Chat"
          field="isChatEnabled"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          label="Dalay Chat"
          field="isChatDelayed"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          label="Enable For Followers only"
          field="isChatFollowersOnly"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
