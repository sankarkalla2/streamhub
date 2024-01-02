import Wrapper from "./wrappter";
import Toggle from "./toggle";
import Recommended from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { RecommnedSkeleton } from "./user-item";
import { Suspense } from "react";
import { resolve } from "path";
import { getFollowedUsers } from "@/lib/follow-service";
import Following from "./following";

const Sidebar = async () => {
  const user = await getRecommended();
  const following = await getFollowedUsers();

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4">
        <Recommended data={user!} />
        <Following data={following!} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;
