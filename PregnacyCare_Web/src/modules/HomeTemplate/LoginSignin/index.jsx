import React, { useState } from "react";
import { Box, AppBar, Tab, Tabs } from "@mui/material";
import { motion } from "framer-motion";
import Login from "../Login";
import Signin from "../Signin";
import ForgotPassword from "../ForgotPassword";
import backgroundImage from "../../../assets/LoginBackground.jpg";
import { useNavigate } from "react-router-dom";

const primaryColor60 = "#615EFC";
const tabLabels = ["Home", "Log in", "Sign in", "Forgot Password"];

export default function LoginSignin() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const handleChangeTab = (event, newValue) => {
    if (newValue === 0) {
      navigate("/");
    } else {
      setActiveTab(newValue);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImage})`, // Đặt ảnh nền
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(6px)", // Hiệu ứng làm mờ background
      }}
    >
      {/* Hiệu ứng nổi của Box */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          width={900}
          p={4}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)", // Làm box trắng mờ
            borderRadius: 3,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // Hiệu ứng đổ bóng
          }}
        >
          <AppBar
            position="static"
            color="default"
            sx={{ boxShadow: "none", mb: 2, backgroundColor: "#fff" }}
          >
            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": { fontSize: 15, color: primaryColor60 },
                "& .MuiTabs-indicator": { backgroundColor: primaryColor60 },
              }}
            >
              {tabLabels.map((label, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
          </AppBar>

          {/* Nội dung cho từng tab */}
          {activeTab === 1 && <Login />}
          {activeTab === 2 && <Signin setActiveTab={setActiveTab} />}
          {activeTab === 3 && <ForgotPassword setActiveTab={setActiveTab} />}
        </Box>
      </motion.div>
    </Box>
  );
}
