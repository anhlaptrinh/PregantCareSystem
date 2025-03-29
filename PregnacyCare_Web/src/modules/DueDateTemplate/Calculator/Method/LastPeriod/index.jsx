import React, { useState, useEffect } from "react";
import { TextField, MenuItem, InputLabel, Select } from "@mui/material";

export default function LastPeriod({ onChange }) {
  const [lastPeriodDate, setLastPeriodDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cycleLength, setCycleLength] = useState("28");
  const cycleOptions = Array.from({ length: 26 }, (_, i) => i + 20);

  // Payload: { lastPeriod: string, cycleLength: number }
  useEffect(() => {
    if (onChange) {
      onChange({
        lastPeriod: lastPeriodDate,
        cycleLength: parseInt(cycleLength, 10),
      });
    }
  }, [lastPeriodDate, cycleLength, onChange]);

  const handleDateChange = (e) => {
    setLastPeriodDate(e.target.value);
  };

  const handleCycleChange = (e) => {
    setCycleLength(e.target.value);
  };

  return (
    <>
      <div>
        <TextField
          type="date"
          id="lastPeriodDate"
          value={lastPeriodDate}
          onChange={handleDateChange}
          fullWidth
          variant="outlined"
          label="When did your last period start?"
          className="mb-4 bg-white"
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <div>
        <InputLabel id="cycleLength-label" className="fs-4 mb-2">
          Cycle length
        </InputLabel>
        <Select
          labelId="cycleLength-label"
          id="cycleLength"
          value={cycleLength}
          onChange={handleCycleChange}
          className="bg-white"
        >
          {cycleOptions.map((day) => (
            <MenuItem key={day} value={day}>
              {day} days
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
}
