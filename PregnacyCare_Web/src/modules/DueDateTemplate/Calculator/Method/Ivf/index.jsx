import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function Ivf({ onChange }) {
  const [conceptionDate, setConceptionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // Giới hạn ivdDate chỉ cho phép giá trị "3" hoặc "5", mặc định là "3"
  const [ivdDate, setIvdDate] = useState("3");

  // Payload: { conceptionDate: string, ivdDate: number }
  useEffect(() => {
    if (onChange) {
      onChange({
        conceptionDate,
        ivdDate: parseInt(ivdDate, 10),
      });
    }
  }, [conceptionDate, ivdDate, onChange]);

  const handleConceptionChange = (e) => {
    setConceptionDate(e.target.value);
  };

  const handleIvdDateChange = (e) => {
    setIvdDate(e.target.value);
  };

  return (
    <Box mt={2}>
      <TextField
        id="conceptionDate"
        label="Conception Date"
        type="date"
        value={conceptionDate}
        onChange={handleConceptionChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        className="bg-white mb-4"
      />
      <FormControl fullWidth>
        <InputLabel id="ivdDate-label">IVD Date</InputLabel>
        <Select
          labelId="ivdDate-label"
          id="ivdDate"
          value={ivdDate}
          label="IVD Date"
          onChange={handleIvdDateChange}
          className="bg-white"
        >
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
