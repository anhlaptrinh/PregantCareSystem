import { Container, Divider } from "@mui/material";
import Advertisement from "../../../../component/Advertisement";
import ViewPost from "../../../../modules/HomeTemplate/Community/ViewPost";
import CommentList from "../../../../modules/HomeTemplate/Community/CommentList";
import BackButton from "../../../../component/BackButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetPostDetail } from "../../../../apis/CallAPIBlog";
import BackdropLoader from "../../../../component/BackdropLoader";

export default function ViewPostPages() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleGetPostDetail = async () => {
    setLoading(true);
    const res = await useGetPostDetail(postId);
    if (res.code === 200) {
      setPost(res.data);
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    setLoading(true);
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    handleGetPostDetail();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-8">
          <BackButton />
          {post ? (
            <>
              <ViewPost data={post} onCommentCreated={handleGetPostDetail} />
              <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
              <CommentList data={post} currentUser={user} />
            </>
          ) : (
            <BackdropLoader open={loading} />
          )}
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
