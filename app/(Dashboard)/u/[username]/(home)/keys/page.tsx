
import UrlCard from "./_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import KeyCard from "./_components/key-card";
import ConnectModal from "./_components/connect-modal";

const KeyPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }
  return (
    <div className="p-6 md:px-20 xl:px-32">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys and URLs</h1>
        {/* <Button variant="primary" size="sm">
          Generate
        </Button> */}
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeyPage;
