import { Container, Divider } from "@mui/material";
import Advertisement from "../../../../component/Advertisement";
import ViewGroup from "../../../../modules/HomeTemplate/Community/ViewGroup";
import PostList from "../../../../modules/HomeTemplate/Community/PostList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BackdropLoader from "../../../../component/BackdropLoader";
import BackButton from "../../../../component/BackButton";
import { useGetGroup } from "../../../../apis/CallAPIGroup";
import { useGetImageUrl } from "../../../../apis/CallAPIFirebase";
import { useState } from "react";

export default function ViewGroupPages() {
  const { groupId } = useParams();
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Thêm state theo dõi refresh

  const {
    data: group,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["GroupDetail", groupId, refreshTrigger], // Thêm refreshTrigger vào queryKey
    queryFn: async () => {
      const res = await useGetGroup(groupId);
      if (res.code === 200 && res.data) {
        const groupData = res.data;
        try {
          const url = await useGetImageUrl(
            "pregnancyCareImages/groups",
            groupData.id
          );
          return { ...groupData, imageUrl: url };
        } catch (err) {
          console.error("Error getting group image:", err);
          return groupData;
        }
      }
      throw new Error("Error fetching group detail");
    },
    staleTime: 1000 * 5,
  });

  if (isLoading) return <BackdropLoader open={true} />;
  if (isError) return <div>Error: {error.message}</div>;

  const storedUser = localStorage.getItem("USER_TOKEN");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Container>
      <BackdropLoader open={isLoading} />
      <div className="row">
        <div className="col-8">
          <BackButton />
          <ViewGroup user={user} group={group} setFresh={setRefreshTrigger} />
          <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          <PostList group={group} />
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
