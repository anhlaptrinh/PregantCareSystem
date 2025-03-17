// File: src/components/Back/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(-1)}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        width: "fit-content",
        ":hover": { color: "#615EFC" },
      }}
    >
      <ArrowBackIcon fontSize="medium" />
      <Typography
        sx={{ mr: 0.5, fontSize: 20, ":hover": { color: "#615EFC" } }}
      >
        Back
      </Typography>
    </Box>
  );
}
