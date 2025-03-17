// File: src/components/SearchBar.jsx
import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Chỉ thực hiện tìm kiếm khi nhấn Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}
