import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import Avatar from "../../../../assets/PregnantAvatar.jpg";

export default function MyGroups() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Postpartum hemorrhoids",
      members: 50,
      group: "December 2024 Birth Club",
      avatar: Avatar,
      time: "14 minutes ago",
    },
    {
      id: 2,
      name: "Postpartum",
      members: 100,
      group: "December 2024 Birth Club",
      avatar: Avatar,
      time: "14 minutes ago",
    },
  ]);

  return (
    <Box>
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        My Groups
      </Typography>
      {/* Group List */}
      {groups.map((group) => (
        <Card key={group.id} sx={{ mb: 2, p: 2 }}>
          <div className="row justify-content-md-center">
            <div className="col-md-auto col-2" style={{ width: 70 }}>
              <img src={group.avatar} alt="Avatar of members" />
            </div>
            <div className="col">
              <Typography variant="h5" gutterBottom>
                {group.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {group.members} members . {group.time}
              </Typography>
            </div>
          </div>
        </Card>
      ))}
    </Box>
  );
}
