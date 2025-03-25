import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

export default function Ultrasound({ onChange }) {
  const [ultrasound, setUltrasound] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ultrasoundWeeksLength, setUltrasoundWeeksLength] = useState("6");
  const [ultrasoundDaysLength, setUltrasoundDaysLength] = useState("0");
  const ultrasoundWeeksOption = Array.from({ length: 24 }, (_, i) => i + 1);
  const ultrasoundDaysOption = Array.from({ length: 7 }, (_, i) => i);

  // Chuyển đổi dữ liệu về định dạng payload theo yêu cầu:
  // - ultrasoundDate: string (ngày)
  // - gestationalWeeks: số nguyên
  // - gestationalDays: số nguyên
  useEffect(() => {
    if (onChange) {
      onChange({
        ultrasoundDate: ultrasound,
        gestationalWeeks: parseInt(ultrasoundWeeksLength, 10),
        gestationalDays: parseInt(ultrasoundDaysLength, 10),
      });
    }
  }, [ultrasound, ultrasoundWeeksLength, ultrasoundDaysLength, onChange]);

  const handleUltrasoundDateChange = (e) => {
    setUltrasound(e.target.value);
  };

  const handleWeeksChange = (e) => {
    setUltrasoundWeeksLength(e.target.value);
  };

  const handleDaysChange = (e) => {
    setUltrasoundDaysLength(e.target.value);
  };

  return (
    <div>
      <InputLabel className="fs-4 mb-2" shrink>
        Date of ultrasound
      </InputLabel>
      <TextField
        type="date"
        id="ultrasound"
        value={ultrasound}
        onChange={handleUltrasoundDateChange}
        fullWidth
        variant="outlined"
        className="bg-white mb-5"
        InputLabelProps={{ shrink: true }}
      />
      <div className="row mt-4">
        <div className="col">
          <FormControl fullWidth>
            <InputLabel id="weeks-label" className="fs-4">
              Weeks
            </InputLabel>
            <Select
              labelId="weeks-label"
              id="weeks"
              value={ultrasoundWeeksLength}
              onChange={handleWeeksChange}
              className="bg-white"
            >
              {ultrasoundWeeksOption.map((week) => (
                <MenuItem key={week} value={week}>
                  {week} weeks
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col">
          <FormControl fullWidth>
            <InputLabel id="days-label" className="fs-4">
              Days
            </InputLabel>
            <Select
              labelId="days-label"
              id="days"
              value={ultrasoundDaysLength}
              onChange={handleDaysChange}
              className="bg-white"
            >
              {ultrasoundDaysOption.map((day) => (
                <MenuItem key={day} value={day}>
                  {day} days
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
