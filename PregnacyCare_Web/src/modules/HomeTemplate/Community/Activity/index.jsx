import { Box, Typography, Link, Divider } from "@mui/material";
import React, { useMemo } from "react";
import { useGetMyPosts } from "../../../../apis/CallAPIBlog";
import { useGetMyComments } from "../../../../apis/CallAPIComment";
import BackdropLoader from "../../../../component/BackdropLoader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Activity() {
  const navigate = useNavigate();

  // Sử dụng React Query để fetch posts
  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
    error: postsErrorMessage,
  } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const res = await useGetMyPosts();
      if (res.code === 200) return res.data;
      throw new Error("Error fetching posts");
    },
    staleTime: 1000 * 60 * 5,
  });

  // Sử dụng React Query để fetch comments
  const {
    data: comments = [],
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentsErrorMessage,
  } = useQuery({
    queryKey: ["myComments"],
    queryFn: async () => {
      const res = await useGetMyComments();
      if (res.code === 200) return res.data;
      throw new Error("Error fetching comments");
    },
    staleTime: 1000 * 60 * 5,
  });

  // Hiển thị loader nếu một trong hai query đang loading
  if (postsLoading || commentsLoading) {
    return <BackdropLoader open={true} />;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (postsError) {
    return <div>Error fetching posts: {postsErrorMessage.message}</div>;
  }
  if (commentsError) {
    return <div>Error fetching comments: {commentsErrorMessage.message}</div>;
  }

  // Tìm kiếm hoặc lọc dữ liệu nếu cần (ví dụ: dùng useMemo cho các dữ liệu này)
  // Ở đây, ví dụ chúng ta không có xử lý tìm kiếm riêng, chỉ hiển thị toàn bộ dữ liệu

  // Nếu posts hoặc comments trống thì có thể hiển thị thông báo "No posts" hay "No comments"
  // Trong ví dụ này, chúng ta sẽ render theo như cấu trúc ban đầu.

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Tiêu đề */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Browse your activity
      </Typography>
      {/* Nút chuyển đến My posts và My comments */}
      <div className="row">
        <div className="col-2">
          <Link
            href="#"
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("my-posts");
              if (target) {
                const offset = 170;
                const targetPosition =
                  target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
              }
            }}
          >
            My posts
          </Link>
        </div>
        <div className="col-8">
          <Link
            href="#"
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("my-comments");
              if (target) {
                const offset = 180;
                const targetPosition =
                  target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
              }
            }}
          >
            My comments
          </Link>
        </div>
      </div>

      <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />

      {/* Danh sách My posts */}
      <Box mb={5}>
        <Typography id="my-posts" variant="h4" fontWeight="bold" gutterBottom>
          My posts
        </Typography>
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Typography variant="h5">
                created post{" "}
                <Link
                  onClick={() => navigate(`/community/post-detail/${post.id}`)}
                >
                  "{post.title}"
                </Link>{" "}
                in group{" "}
                {post.group ? (
                  <Link
                    onClick={() =>
                      navigate(`/community/group/${post.group.id}`)
                    }
                  >
                    "{post.group.name}"
                  </Link>
                ) : (
                  "Unknown Group"
                )}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {moment(post.datePublish).format("MMMM D, YYYY")}
              </Typography>
              <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
            </motion.div>
          ))
        ) : (
          <Typography>No posts found.</Typography>
        )}
      </Box>

      {/* Danh sách My comments */}
      <Box mb={5}>
        <Typography
          id="my-comments"
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          My comments
        </Typography>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <motion.div key={comment.id} variants={itemVariants}>
              <Typography variant="h5">
                commented on post{" "}
                <Link
                  onClick={() =>
                    navigate(`/community/post-detail/${comment.blog.id}`)
                  }
                >
                  "{comment.blog.title}"
                </Link>{" "}
                in group{" "}
                {comment.blog.group ? (
                  <Link
                    onClick={() =>
                      navigate(`/community/group/${comment.blog.group.id}`)
                    }
                  >
                    "{comment.blog.group.name}"
                  </Link>
                ) : (
                  "Unknown Group"
                )}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {moment(comment.datePublish).format("MMMM D, YYYY")}
              </Typography>
              <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
            </motion.div>
          ))
        ) : (
          <Typography>No comments found.</Typography>
        )}
      </Box>
    </motion.div>
  );
}
