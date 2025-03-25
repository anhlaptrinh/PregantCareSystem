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

export default function Result() {
  // Lấy dữ liệu được truyền qua navigate từ trang Calculator
  const location = useLocation();
  const { result } = location.state || {};

  // Nếu không có dữ liệu, có thể chuyển hướng về trang tính lại hoặc hiển thị thông báo
  if (!result) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h5">
          No result found. Please recalculate your due date.
        </Typography>
        <Button component={Link} to="/dueDate" color="primary" sx={{ mt: 2 }}>
          Recalculate your due date
        </Button>
      </Box>
    );
  }

  // Format ngày dự sinh (có thể sử dụng thư viện date-fns hoặc moment nếu cần)
  const formattedDueDate = result.data;

  return (
    <Box mt={5}>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Your baby's due date is
      </Typography>

      <Box display="flex" alignItems="center" mb={3}>
        <Box mr={2}>
          <Avatar
            src={avatarImage}
            alt="Written by"
            sx={{ width: 60, height: 60 }}
          />
        </Box>
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

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Congrats! Your due date is
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            color="primary"
            gutterBottom
          >
            {formattedDueDate}
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <img src={LightImage} alt="Light" width={30} />
          </Box>

          <Typography variant="h5" textAlign="center">
            Download our free app to track your pregnancy and baby's growth!
          </Typography>
        </CardContent>
      </Card>

      <Box textAlign="center" my={2}>
        <Button
          component={Link}
          to="/due-date"
          color="primary"
          sx={{ fontSize: "1rem", textDecoration: "underline" }}
        >
          Recalculate your due date
        </Button>
      </Box>

      {/* Truyền dữ liệu timeline cho component PregnancyTimeline nếu cần */}
      <PregnancyTimeline timelineData={result.timeline} />
    </Box>
  );
}
