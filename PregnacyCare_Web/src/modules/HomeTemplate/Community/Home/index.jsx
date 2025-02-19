import React, { useState } from "react";
import {
  Card,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const posts = [
  {
    id: 1,
    title: "Postpartum hemorrhoids",
    author: "Getzy",
    group: "December 2024 Birth Club",
    content:
      "TMI, but I’m desperate and need some help if possible, I’m experiencing such painful hemorrhoids that flare up after every bowel movement...",
    time: "14 minutes ago",
    comments: 1,
    likes: 0,
  },
  {
    id: 2,
    title: "Never goes as planned",
    author: "oopsyIdiditagain",
    group: "Baby Names",
    content:
      "So I have decided to stick with the name Emrys Mae. Until my cousin asked me if I would change the middle because her daughter’s middle name...",
    time: "15 minutes ago",
    comments: 10,
    likes: 0,
  },
];

export default function Home() {
  const [sortBy, setSortBy] = useState("newest");

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Posts in my groups
      </Typography>
      <FormControl>
        <InputLabel id="sort-by" sx={{ fontSize: 12 }}>
          Sort by
        </InputLabel>
        <Select
          value={sortBy}
          displayEmpty
          onChange={(e) => setSortBy(e.target.value)}
          labelId="sort-by"
          label="Sort by"
          sx={{ mb: 2, width: 150 }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>

      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2, p: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {post.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Avatar sx={{ width: 24, height: 24 }} />
            <Typography variant="body1">
              By <strong>{post.author}</strong> in <strong>{post.group}</strong>
            </Typography>
          </Box>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            {post.content}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {post.time}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Comment Icon */}
              <IconButton size="small" disabled>
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
              <Typography variant="body1">{post.comments}</Typography>
              {/* Like Ion */}
              <IconButton size="small" disabled>
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
              <Typography variant="body1">{post.likes}</Typography>
            </Box>
            {/* Edit Button */}
            <IconButton size="large" sx={{ width: 40 }}>
              <MoreHorizIcon fontSize="large" />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
