import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Advertisement from "../../../../component/Advertisement";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";

export default function CreatePostPages() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    date: "",
    description: "",
  });

  const onHandle = () => {
    // Ví dụ: alert hiển thị dữ liệu post dưới dạng JSON
    alert(JSON.stringify(post));
  };

  return (
    <Container>
      <div className="row">
        <div className="col-8 mt-5">
          {/* Create a post */}
          <Box>
            <Link
              underline="hover"
              onClick={() => navigate(-1)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <ArrowBackIcon fontSize="small" sx={{ mr: 0.5 }} />
              Back
            </Link>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Create a post
            </Typography>
            <TextField
              className="mb-5"
              placeholder="Post title *"
              multiline
              rows={1}
              fullWidth
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              sx={{
                // Dành cho input bình thường
                "& input::placeholder": {
                  fontSize: "3rem", // Tăng kích thước placeholder
                },
              }}
            />
            <TextField
              placeholder="Post detail *"
              multiline
              rows={5}
              fullWidth
              inputProps={{ style: { resize: "vertical" } }}
              className="mb-5"
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              sx={{
                // Dành cho input bình thường
                "& input::placeholder": {
                  fontSize: "1.5rem", // Tăng kích thước placeholder
                },
                // Nếu là TextField multiline (textarea)
                "& textarea::placeholder": {
                  fontSize: "1.5rem",
                },
              }}
            />
            <div className="row mb-5">
              <button className="rts-btn btn-primary" onClick={onHandle}>
                Create Post
              </button>
            </div>
          </Box>
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
