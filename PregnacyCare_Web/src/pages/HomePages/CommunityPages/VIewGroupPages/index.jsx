import { Container, Divider } from "@mui/material";
import Advertisement from "../../../../component/Advertisement";
import ViewGroup from "../../../../modules/HomeTemplate/Community/ViewGroup";
import PostList from "../../../../modules/HomeTemplate/Community/PostList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetGroup, useGetGroupList } from "../../../../apis/CallAPIGroup";
import BackdropLoader from "../../../../component/BackdropLoader";
import BackButton from "../../../../component/BackButton";

export default function ViewGroupPages() {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(null);

  const handleGetGroup = async () => {
    setLoading(true);
    const res = await useGetGroup(groupId);
    if (res.code === 200 && res.data) {
      setGroup(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetGroup();
  }, []);

  return (
    <Container>
      <BackdropLoader open={loading} />
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
