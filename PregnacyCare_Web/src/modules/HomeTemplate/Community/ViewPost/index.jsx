import { Box, Container, TextField, Typography } from "@mui/material";
import { Button, IconButton, Stack, Divider } from "@mui/material";
import React, { useState } from "react";
import Avatar from "../../../../assets/PregnantAvatar.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ViewPost() {
  // Information of a post
  const [post, setPost] = useState({
    title: "Tile of Post",
    author: "Member",
    date: "17/2/2025",
    avatar: Avatar,
    content:
      "I’m 38 weeks and a few days along with my 2nd kid. I’ve been having super bad pain down below where it almost drops me to my knees and I cry. I didn’t experience this with my first. I had an anterior placenta with my 1st and my kids will be 18 months apart.. any advice ?? I’m trying to wait it out/ hang on.. ",
  });
  // Comment
  const [comment, setComment] = useState();

  const onHandle = () => {
    alert(comment);
  };

  return (
    <Box>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        {post.title}
      </Typography>
      {/* Member Name */}
      <div className="row mb-4">
        <div className="col-1">
          <img
            src={post.avatar}
            alt="Avatar of member"
            style={{ width: 50, borderRadius: 50 }}
          />
        </div>
        <div className="col-8">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {post.author}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {post.date}
          </Typography>
        </div>
      </div>
      {/* Content of post */}
      <Typography variant="h5" gutterBottom>
        {post.content}
      </Typography>

      <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />

      {/* Nav */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Left */}
        <div className="col-md-auto">
          <IconButton>
            <BookmarkAddOutlinedIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </div>
        {/* Right */}
        <div className="col-md-auto">
          <IconButton>
            <MoreHorizIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </div>
      </Stack>

      <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />

      {/* Add comment */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add a comment
      </Typography>
      <TextField
        multiline
        rows={6}
        fullWidth
        sx={{ mb: 3 }}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="rts-btn btn-primary" onClick={() => onHandle()}>
        Comment
      </button>
    </Box>
  );
}
