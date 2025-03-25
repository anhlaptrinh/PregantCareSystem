import { Box, Typography } from "@mui/material";
import React from "react";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import { useNavigate } from "react-router-dom";

export default function ViewGroup({ group }) {
  const navigate = useNavigate();

  // Direct to create post pages
  const onHandlePost = () => {
    navigate(`/community/group/create-post/${group?.id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop={5}
      width="100%"
    >
      {/* Avatar of group: sử dụng imageUrl nếu có, ngược lại sử dụng avatar mặc định */}
      <img
        src={group?.imageUrl || avatar}
        alt="Avatar of group"
        style={{ width: 100, borderRadius: 10, marginBottom: 20 }}
      />

      {/* Group Name */}
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        {group?.name}
      </Typography>

      {/* Members, posts and owner info */}
      <div className="row justify-content-md-center mb-5">
        <div className="col-md-auto">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {group?.users?.length || 0}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            members
          </Typography>
        </div>
        <div className="col-md-auto">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {group?.blogs?.length || 0}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            posts
          </Typography>
        </div>
        <div className="col-md-auto">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {group?.owner?.fullName || "Unknown"}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            owner
          </Typography>
        </div>
      </div>

      {/* Post button */}
      <button className="rts-btn btn-primary" onClick={onHandlePost}>
        Post
      </button>
    </Box>
  );
}
