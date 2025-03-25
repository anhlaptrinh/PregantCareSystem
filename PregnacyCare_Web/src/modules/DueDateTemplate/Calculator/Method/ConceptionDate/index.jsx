import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";

export default function ConceptionDate({ onChange }) {
  const [conceptionDate, setConceptionDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Gửi dữ liệu khi giá trị thay đổi
  useEffect(() => {
    if (onChange) {
      onChange({ conceptionDate });
    }
  }, [conceptionDate, onChange]);

  const handleChange = (e) => {
    setConceptionDate(e.target.value);
  };

  return (
    <Box mt={2}>
      <TextField
        id="conceptionDate"
        label="When did you conceive?"
        type="date"
        value={conceptionDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        className="bg-white"
      />
    </Box>
  );
}
