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
  Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
import backgroundImage from "../../../assets/ExpertDetailBackground.jpg";
import avatar from "../../../assets/PregnantAvatar.jpg";
import { useParams } from "react-router-dom";
import { useGetExpertDetail } from "../../../apis/CallAPIUser";
import moment from "moment";
import { useGetImageUrl } from "../../../apis/CallAPIFirebase";
import { useQuery } from "@tanstack/react-query";

const ExpertDetail = () => {
  const { id } = useParams();

  // Hàm fetch expert detail kết hợp với việc lấy URL ảnh từ Firebase
  const fetchExpertDetail = async () => {
    const res = await useGetExpertDetail(id);
    if (res.code === 200) {
      let imageUrl;
      try {
        imageUrl = await useGetImageUrl(
          "pregnancyCareImages/users",
          res.data.id
        );
      } catch (error) {
        console.error("Error fetching image:", error);
      }
      // Nếu không lấy được ảnh từ Firebase thì sử dụng avatar mặc định
      const expertImage = imageUrl ? imageUrl : avatar;
      return { ...res.data, image: expertImage };
    }
    throw new Error("Failed to fetch expert detail");
  };

  // Sử dụng react-query để lưu expert vào cache
  const { data: expert, isLoading } = useQuery({
    queryKey: ["expert", id],
    queryFn: fetchExpertDetail,
    staleTime: 1000 * 60 * 5, // dữ liệu fresh trong 5 phút
  });

  // Nếu dữ liệu đang được fetch thì hiển thị Skeleton của MUI
  if (isLoading) {
    return (
      <Box sx={{ width: "50%", margin: "0 auto", padding: 4 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ borderRadius: 2, mb: 4 }}
        />
        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

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
              backgroundColor: "rgba(0,0,0,0.5)",
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
              src={expert?.image}
              alt={expert?.fullName}
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
              sx={{ mb: 1, color: "white" }}
            >
              {expert?.fullName}
            </Typography>
          </Box>
        </Box>
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
                <TableCell sx={{ fontSize: 22 }}>Date Begin</TableCell>
                <TableCell sx={{ fontSize: 22 }}>Date End</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expert?.certificates.map((certificate, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: 16 }}>
                    {certificate.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 16 }}>
                    {moment(certificate.dateBegin).format("MMMM D, YYYY")}
                  </TableCell>
                  <TableCell sx={{ fontSize: 16 }}>
                    {moment(certificate.dateEnd).format("MMMM D, YYYY")}
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
