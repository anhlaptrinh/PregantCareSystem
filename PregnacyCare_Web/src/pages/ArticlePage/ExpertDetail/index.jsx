import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import backgroundImage from "../../../assets/ExpertDetailBackground.jpg";

// Dữ liệu mẫu của expert
const expertData = {
  image:
    "https://assets.babycenter.com/ims/2021/08/Karen-Miles-bio.jpeg?width=396",
  name: "Dr. Jane Doe",
  description:
    "Dr. Jane Doe là chuyên gia hàng đầu về sản khoa với hơn 15 năm kinh nghiệm, nghiên cứu chuyên sâu về chăm sóc trước sinh và sức khỏe bà mẹ.",

  certificates: [
    {
      name: "Board Certified in Obstetrics & Gynecology",
      title: "ABOG",
      date: 2010,
    },
    {
      name: "Certified Maternal-Fetal Medicine Specialist",
      title: "SMFM",
      date: 2012,
    },
  ],
};

const ExpertDetail = () => {
  return (
    <Box sx={{ width: "50%", margin: "0 auto", padding: 4 }}>
      {/* Phần Header với background image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 300,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Overlay để làm mờ nền */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              color: "#fff",
              px: 2,
            }}
          >
            {/* Expert image hiển thị dưới dạng avatar */}
            <Box
              component="img"
              src={expertData.image}
              alt={expertData.name}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                mb: 2,
                border: "3px solid #fff",
              }}
            />
            <Typography
              variant="h3"
              component="div"
              sx={{ mb: 1, color: "black" }}
            >
              {expertData.name}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h2" gutterBottom>
          About {expertData.name}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {expertData.description}
        </Typography>
      </motion.div>

      {/* Bảng Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Certificates
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 22 }}>Name</TableCell>
                <TableCell sx={{ fontSize: 22 }}>Title</TableCell>
                <TableCell sx={{ fontSize: 22 }}>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expertData.certificates.map((certificate, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: 18 }}>
                    {certificate.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }}>
                    {certificate.title}
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }}>
                    {certificate.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Box>
  );
};

export default ExpertDetail;
