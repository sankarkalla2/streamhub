import { currentUser } from "@clerk/nextjs";
import { getUserByUsername } from "@/lib/user-service";
import StreamPlayer from "@/components/stream-player";

interface CratePageProps {
  params: {
    username: string;
  };
}

const CreaterPage = async ({ params }: CratePageProps) => {
  const user = await getUserByUsername(params.username);
  const externalUser = await currentUser();
  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("You are unauthrized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} />
    </div>
  );
};

export default CreaterPage;
