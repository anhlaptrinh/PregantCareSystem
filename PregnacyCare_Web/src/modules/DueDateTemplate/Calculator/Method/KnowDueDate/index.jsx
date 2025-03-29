import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

export default function KnowDueDate({ onChange }) {
  const [knowDueDate, setKnowDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Gửi dữ liệu khi giá trị thay đổi
  useEffect(() => {
    if (onChange) {
      onChange({ dueDate: knowDueDate });
    }
  }, [knowDueDate, onChange]);

  const handleChange = (e) => {
    setKnowDueDate(e.target.value);
  };

  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">
          What's your due date?
        </label>
        <TextField
          type="date"
          value={knowDueDate}
          onChange={handleChange}
          fullWidth
          className="bg-white"
          InputLabelProps={{ shrink: true }}
        />
      </div>
    </>
  );
}
