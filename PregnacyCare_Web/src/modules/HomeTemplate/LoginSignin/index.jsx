import React, { useState } from "react";
import { Modal } from "antd";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { motion } from "framer-motion";
import Login from "../Login";
import Signin from "../Signin";
import ForgotPassword from "../ForgotPassword";

const primaryColor60 = "#615EFC";
const tabLabels = ["Log in", "Sign in", "Forgot Password"];

export default function LoginSignin({ open, onClose }) {
  // Quản lý state cho tab đang được chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      style={{ marginTop: -90 }}
    >
      {/* Áp dụng hiệu ứng với Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box margin={3}>
          <AppBar
            position="static"
            color="default"
            sx={{
              boxShadow: "none",
              mb: "30px",
              backgroundColor: "#fff",
            }}
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
          {activeTab === 0 && <Login onClose={onClose} />}
          {activeTab === 1 && <Signin setActiveTab={setActiveTab} />}
          {activeTab === 2 && <ForgotPassword setActiveTab={setActiveTab} />}
        </Box>
      </motion.div>
    </Modal>
  );
}
