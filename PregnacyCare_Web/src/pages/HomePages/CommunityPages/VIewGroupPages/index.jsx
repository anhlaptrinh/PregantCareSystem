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

export default function ViewGroupPages() {
  const { groupId } = useParams();

  const {
    data: group,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["GroupDetail", groupId],
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
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <BackdropLoader open={true} />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <BackdropLoader open={isLoading} />
      <div className="row">
        <div className="col-8">
          <BackButton />
          <ViewGroup group={group} />
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
