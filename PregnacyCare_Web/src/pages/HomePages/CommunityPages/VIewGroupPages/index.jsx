import { Container, Divider } from "@mui/material";
<<<<<<< HEAD
=======
import React from "react";
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
import Advertisement from "../../../../component/Advertisement";
import ViewGroup from "../../../../modules/HomeTemplate/Community/ViewGroup";
import PostList from "../../../../modules/HomeTemplate/Community/PostList";

export default function ViewGroupPages() {
  return (
    <Container>
      <div className="row">
        <div className="col-8">
          <ViewGroup />
          <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          <PostList />
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
