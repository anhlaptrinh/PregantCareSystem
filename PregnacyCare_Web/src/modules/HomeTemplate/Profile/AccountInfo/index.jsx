import React from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";

export default function AccountInfo() {
  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Account Info
      </Typography>

      <input placeholder="Full name" />
      <input placeholder="Email" />
      <input placeholder="Password" disabled />

      <a href="#" className="text-decoration-underline">
        Change password
      </a>

      <div class="row justify-content-md-center mb-5">
        <div class="col-md-auto">
          <button className="rts-btn btn-primary">Save</button>
        </div>
      </div>
    </Box>
  );
}
