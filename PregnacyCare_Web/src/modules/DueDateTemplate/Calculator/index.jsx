import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ConceptionDate from "./Method/ConceptionDate";
import LastPeriod from "./Method/LastPeriod";
import Ivf from "./Method/Ivf";
import Ultrasound from "./Method/Ultrasound";
import KnowDueDate from "./Method/KnowDueDate";
import DueDateCalculatorImage from "../../../assets/DueDateCalculator.jpg";
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import {
  calculateDueDateFromConception,
  calculateDueDateForIVF,
  getDueDateFromUltrasound,
  getPregnancyTimelineFromDueDate,
  calculateDueDateFromLastPeriod,
} from "../../../apis/CallAPIDueDate";

export default function Calculator() {
  const navigate = useNavigate();
  const [calculationMethod, setCalculationMethod] = useState("lastPeriod");
  const [lastPeriodData, setLastPeriodData] = useState({});
  const [conceptionData, setConceptionData] = useState({});
  const [ivfData, setIvfData] = useState({});
  const [ultrasoundData, setUltrasoundData] = useState({});
  const [dueDateData, setDueDateData] = useState({});

  // Sử dụng useCallback để memo hóa các callback onChange
  const handleLastPeriodChange = useCallback((data) => {
    console.log(data);
    setLastPeriodData(data);
  }, []);

  const handleConceptionChange = useCallback((data) => {
    setConceptionData(data);
  }, []);

  const handleIvfChange = useCallback((data) => {
    setIvfData(data);
  }, []);

  const handleUltrasoundChange = useCallback((data) => {
    setUltrasoundData(data);
  }, []);

  const handleDueDateChange = useCallback((data) => {
    setDueDateData(data);
  }, []);

  const handleSubmit = async (e) => {
    let response;
    e.preventDefault();
    try {
      switch (calculationMethod) {
        case "lastPeriod":
          response = await calculateDueDateFromLastPeriod(lastPeriodData);
          break;
        case "conceptionDate":
          response = await calculateDueDateFromConception(conceptionData);
          break;
        case "ivf":
          response = await calculateDueDateForIVF(ivfData);
          break;
        case "ultrasound":
          response = await getDueDateFromUltrasound(ultrasoundData);
          break;
        case "knowDueDate":
          response = await getPregnancyTimelineFromDueDate(dueDateData);
          break;
        default:
          break;
      }
      console.log("API response:", response);
      navigate("/due-date/result", { state: { result: response } });
    } catch (error) {
      console.error("Error calculating due date:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h2" fontWeight="bold" align="center" gutterBottom>
          Pregnancy Due Date Calculator
        </Typography>

        <Box display="flex" justifyContent="center" mb={4}>
          <img
            src={DueDateCalculatorImage}
            alt="Calendar Icon"
            style={{ width: 50 }}
          />
        </Box>

        <Paper elevation={3} className="p-5 mb-5" sx={{ bgcolor: "#E3F2FD" }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" className="mb-5">
              <InputLabel
                id="calculation-method-label"
                sx={{ fontSize: "1.5rem" }}
              >
                Calculation method
              </InputLabel>
              <Select
                labelId="calculation-method-label"
                id="calculationMethod"
                value={calculationMethod}
                label="Calculation method"
                onChange={(e) => setCalculationMethod(e.target.value)}
                className="bg-white fs-5"
              >
                <MenuItem value="lastPeriod">Last period</MenuItem>
                <MenuItem value="conceptionDate">Conception date</MenuItem>
                <MenuItem value="ivf">IVF</MenuItem>
                <MenuItem value="ultrasound">Ultrasound</MenuItem>
                <MenuItem value="knowDueDate">I know my due date</MenuItem>
              </Select>
            </FormControl>

            {calculationMethod === "conceptionDate" && (
              <ConceptionDate onChange={handleConceptionChange} />
            )}
            {calculationMethod === "lastPeriod" && (
              <LastPeriod onChange={handleLastPeriodChange} />
            )}
            {calculationMethod === "ivf" && <Ivf onChange={handleIvfChange} />}
            {calculationMethod === "ultrasound" && (
              <Ultrasound onChange={handleUltrasoundChange} />
            )}
            {calculationMethod === "knowDueDate" && (
              <KnowDueDate onChange={handleDueDateChange} />
            )}

            <Box mt={4} display="flex" justifyContent="start">
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.25rem",
                  bgcolor: "rgb(97, 94, 252)",
                }}
              >
                See your timeline
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
