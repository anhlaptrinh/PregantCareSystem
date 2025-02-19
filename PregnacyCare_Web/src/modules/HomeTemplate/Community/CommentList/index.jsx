import { Box, Card, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import Avatar from "../../../../assets/PregnantAvatar.jpg";

export default function CommentList() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Member 1",
      date: "17/2/2025",
      avatar: Avatar,
      content:
        "I’m 38 weeks and a few days along with my 2nd kid. I’ve been having super bad pain down below where it almost drops me to my knees and I cry. I didn’t experience this with my first. I had an anterior placenta with my 1st and my kids will be 18 months apart.. any advice ?? I’m trying to wait it out/ hang on.. ",
    },
    {
      id: 2,
      author: "Member 2",
      date: "17/2/2025",
      avatar: Avatar,
      content:
        "I’m 38 weeks a pain downy first. I had an anterior placenta with my 1st and my kids will be 18 months apart.. any advice ?? I’m trying to wait it out/ hang on.. ",
    },
  ]);

  return (
    <Box>
      {comments.map((comment) => (
        <Card key={comment.id}>
          {/* Member Name */}
          <div className="row mb-4">
            <div className="col-1">
              <img
                src={comment.avatar}
                alt="Avatar of member"
                style={{ width: 50, borderRadius: 50 }}
              />
            </div>
            <div className="col-8">
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {comment.author}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {comment.date}
              </Typography>
            </div>
          </div>
          {/* Content of comment */}
          <Typography variant="h5" gutterBottom>
            {comment.content}
          </Typography>
          <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
        </Card>
      ))}
    </Box>
  );
}
