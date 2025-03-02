
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography } from "antd";

import { AppBar, Box, Tab, Tabs } from "@mui/material";
import Login from "../Login";
import Signin from "../Signin";

// Danh sách các tab trong phần Account Settings
const tabLabels = ["Log in", "Sign in"];

// eslint-disable-next-line react/prop-types
export default function LoginSignin({ open, onClose }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Quản lý state cho tab đang được chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Modal visible={open} onCancel={onClose} footer={null} width={900}>
      <Box margin={3}>
        {/* Tabs AppBar) */}
        <AppBar
          position="static"
          color="default"
          sx={{ boxShadow: "none", mb: "30px" }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {tabLabels.map((label, index) => (
              <Tab sx={{ fontSize: 15 }} key={index} label={label} />
            ))}
          </Tabs>
        </AppBar>

        {/* Nội dung cho từng tab*/}
        {activeTab === 0 && <Login />}
        {activeTab === 1 && <Signin />}
      </Box>
    </Modal>
  );
}
