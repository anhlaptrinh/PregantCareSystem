<<<<<<< HEAD
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Modal } from "antd";
=======
import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
// import LoginBackground from "../../../assets/Login.jpg";
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import Login from "../Login";
import Signin from "../Signin";

<<<<<<< HEAD
// Danh sách các tab trong phần Account Settings
const tabLabels = ["Log in", "Sign in"];

// eslint-disable-next-line react/prop-types
export default function LoginSignin({ open, onClose }) {
=======
const { Title, Text } = Typography;
// Danh sách các tab trong phần Account Settings
const tabLabels = ["Log in", "Sign in"];

export default function LoginSignin({ open, onClose }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
  // Quản lý state cho tab đang được chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
<<<<<<< HEAD
    <Modal
      visible={open}
      onCancel={onClose}
      footer={null}
      width={900}
      style={{ marginTop: -90 }}
    >
=======
    <Modal visible={open} onCancel={onClose} footer={null} width={900}>
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
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
<<<<<<< HEAD
        {activeTab === 0 && <Login onClose={onClose} />}
        {activeTab === 1 && <Signin setActiveTab={setActiveTab} />}
=======
        {activeTab === 0 && <Login />}
        {activeTab === 1 && <Signin />}
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
      </Box>
    </Modal>
  );
}
