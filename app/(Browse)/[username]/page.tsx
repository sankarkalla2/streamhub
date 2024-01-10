import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isBlockedByUser, isUserBlockedByMe } from "@/lib/block-service";

interface UserNameProps {
  params: {
    username: string;
  };
}

const UserName = async ({ params }: UserNameProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) return notFound();
  const isFollowing = await isFollowingUser(user?.id);
  const isBlocked = await isUserBlockedByMe(user.id);
  const amIBlocked = await isBlockedByUser(user.id);

  if(amIBlocked) return <div className="bg-background">
    {notFound()}
  </div>
  return (
    <div>
      <p>
  what you name
      </p>
      <p>Username: {params.username}</p>
      <p>userId: {user?.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <p>Am i Blocked {`${amIBlocked}`}</p>
      <Actions isFollowing={isFollowing} user={user} isBlocked={isBlocked}/>
    </div>
  );
};

export default UserName;
