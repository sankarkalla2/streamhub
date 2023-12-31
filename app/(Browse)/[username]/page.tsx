import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";

interface UserNameProps {
  params: {
    username: string;
  };
}

const UserName = async({ params }: UserNameProps) => {
  const user = await getUserByUsername(params.username);
  if(!user) return notFound()
  const isFollowing = await isFollowingUser(user?.id);
  return <div>
    <p>Username: {params.username}</p>
    <p>userId: {user?.id}</p>
    <p>isFollowing: { `${isFollowing}`}</p>
    <Actions isFollowing={isFollowing}/>

  </div>;
};

export default UserName;
