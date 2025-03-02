import { Container, Divider } from "@mui/material";
import React, { useState } from "react";
import Advertisement from "../../../../component/Advertisement";
import Avatar from "../../../../assets/PregnantAvatar.jpg";
import ViewPost from "../../../../modules/HomeTemplate/Community/ViewPost";
import CommentList from "../../../../modules/HomeTemplate/Community/CommentList";

export default function ViewPostPages() {
  // Information of a post
  const [post, setPost] = useState({
    title: "Tile of Post",
    author: "Member",
    date: "17/2/2025",
    avatar: Avatar,
    content:
      "I’m 38 weeks and a few days along with my 2nd kid. I’ve been having super bad pain down below where it almost drops me to my knees and I cry. I didn’t experience this with my first. I had an anterior placenta with my 1st and my kids will be 18 months apart.. any advice ?? I’m trying to wait it out/ hang on.. ",
  });

  return (
    <Container>
      <div className="row">
        <div className="col-8">
          <ViewPost />
          <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          <CommentList />
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
