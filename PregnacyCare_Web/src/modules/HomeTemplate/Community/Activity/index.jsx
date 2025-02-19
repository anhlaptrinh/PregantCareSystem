import { Box, Typography, Link, Divider, Card } from "@mui/material";
import React from "react";
import { useState } from "react";

export default function Activity() {
  // Post List
  const [posts, setPosts] = useState([
    {
      id: 1,
      postName: "John Post",
      groupName: "Baby Group",
      time: "14 minutes ago",
    },
    {
      id: 2,
      postName: "Bob Post",
      groupName: "Big Kid Group",
      time: "14 minutes ago",
    },
  ]);
  // Comment List
  const [comments, setComments] = useState([
    {
      id: 1,
      postName: "Boy Comment",
      groupName: "Baby Group",
      time: "14 minutes ago",
    },
    {
      id: 2,
      postName: "Girl Comment",
      groupName: "Big Kid Group",
      time: "14 minutes ago",
    },
  ]);
  return (
    <Box>
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Browse your activiy
      </Typography>
      {/* My post button and My comment button */}
      <div className="row">
        <div className="col-2">
          <Link
            href="#"
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("my-posts");
              if (target) {
                const offset = 170; // Khoảng cách mong muốn
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
                const offset = 180; // Khoảng cách mong muốn
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

      {/* My post list */}
      <Box mb={5}>
        {/* Title */}
        <Typography id="my-posts" variant="h4" fontWeight="bold" gutterBottom>
          My posts
        </Typography>
        {/* Post List */}
        {posts.map((post) => (
          <div className="row" key={post.id}>
            <Typography variant="h5">
              created post "{post.postName}" in group "{post.groupName}"
            </Typography>
            {/* Time */}
            <Typography variant="h6" color="text.secondary">
              {post.time}
            </Typography>
            <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          </div>
        ))}
      </Box>

      {/* My comment list */}
      <Box mb={5}>
        {/* Title */}
        <Typography
          id="my-comments"
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          My comments
        </Typography>
        {/* Post List */}
        {comments.map((comment) => (
          <div className="row" key={comment.id}>
            <Typography variant="h5">
              commented on post "{comment.postName}" in group "
              {comment.groupName}"
            </Typography>
            {/* Time */}
            <Typography variant="h6" color="text.secondary">
              {comment.time}
            </Typography>
            <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
