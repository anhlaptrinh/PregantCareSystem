"use client";

import { Container, Divider } from "@mui/material";
import Advertisement from "../../../../component/Advertisement";
import ViewPost from "../../../../modules/HomeTemplate/Community/ViewPost";
import CommentList from "../../../../modules/HomeTemplate/Community/CommentList";
import BackButton from "../../../../component/BackButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetPostDetail } from "../../../../apis/CallAPIBlog";
import BackdropLoader from "../../../../component/BackdropLoader";
import { useQuery } from "@tanstack/react-query";

export default function ViewPostPages() {
  const { postId } = useParams();
  const [user, setUser] = useState(null);

  // Sử dụng React Query để lấy chi tiết bài viết
  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      const res = await useGetPostDetail(postId);
      if (res.code === 200) {
        return res.data;
      } else {
        throw new Error("Error fetching post detail");
      }
    },
    enabled: !!postId, // Chỉ thực hiện khi có postId
    staleTime: 1000 * 60 * 5, // Dữ liệu fresh trong 5 phút
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <div className="row">
        <div className="col-8">
          <BackButton />
          {isLoading ? (
            <BackdropLoader open={isLoading} />
          ) : post ? (
            <>
              {/* Khi comment mới được tạo, onCommentCreated sẽ gọi refetch để cập nhật bài viết */}
              <ViewPost data={post} onCommentCreated={refetch} />
              <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
              <CommentList data={post} currentUser={user} />
            </>
          ) : (
            <div>No post found.</div>
          )}
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
