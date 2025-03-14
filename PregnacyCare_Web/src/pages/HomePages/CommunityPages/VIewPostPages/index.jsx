import { Container, Divider } from "@mui/material";
import Advertisement from "../../../../component/Advertisement";
import ViewPost from "../../../../modules/HomeTemplate/Community/ViewPost";
import CommentList from "../../../../modules/HomeTemplate/Community/CommentList";

export default function ViewPostPages() {
  // Information of a post

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
