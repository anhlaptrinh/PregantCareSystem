import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import PregnancyTimeline from "../PregnancyTimeline";
import avatarImage from "../../../assets/avatar.jpg";
import DueDateCalculatorImage from "../../../assets/DueDateCalculator.jpg";
import LightImage from "../../../assets/light.jpg";
import moment from "moment";
import TimeLine from "../TimeLine";

export default function Result() {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h5">
          No result found. Please recalculate your due date.
        </Typography>
        <Button component={Link} to="/due-date" color="primary" sx={{ mt: 2 }}>
          Recalculate your due date
        </Button>
      </Box>
    );
  }

  const { dueDate, timeline } = result;
  const formattedDueDate = dueDate.suggestDate;

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Your baby's due date is
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <Avatar
          src={avatarImage}
          alt="Written by"
          sx={{ width: 60, height: 60, mr: 2 }}
        />
        <Typography variant="subtitle1">
          Written by Pregnancy Care Staff | Dec 12, 2024
        </Typography>
      </Box>

      <Card sx={{ bgcolor: "#E3F2FD", p: 3, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={DueDateCalculatorImage}
              alt="Due Date Calculator"
              width={80}
            />
          </Box>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Congrats! Your due date is
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            {moment(formattedDueDate).format("MMMM D, YYYY")}
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <img src={LightImage} alt="Light" width={30} />
          </Box>

          <Typography variant="h5">
            Download our free app to track your pregnancy and baby's growth!
          </Typography>
        </CardContent>
      </Card>

      <Box my={2}>
        <Button
          component={Link}
          to="/due-date"
          color="primary"
          sx={{ fontSize: "1rem", textDecoration: "underline" }}
        >
          Recalculate your due date
        </Button>
      </Box>

      <TimeLine data={timeline} />
    </Box>
  );
}
