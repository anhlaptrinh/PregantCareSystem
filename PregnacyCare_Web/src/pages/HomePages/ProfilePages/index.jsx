import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography, Container } from "@mui/material";
import AccountInfo from "../../../modules/HomeTemplate/Profile/AccountInfo";
import FamilyInfo from "../../../modules/HomeTemplate/Profile/FamilyInfo";
import CommunityInfo from "../../../modules/HomeTemplate/Profile/CommunityInfo";

// Danh sách các tab trong phần Account Settings
const tabLabels = ["Account Info", "Family Info", "Community Profile"];

export default function ProfilePages() {
  // Quản lý state cho tab đang được chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container sx={{ width: "50%" }}>
      <Box>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Account Settings
        </Typography>
        {/* Thanh Tabs (AppBar) */}
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
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </AppBar>

        {/* Nội dung cho từng tab*/}
        {activeTab === 0 && <AccountInfo />}
        {activeTab === 1 && <FamilyInfo />}
        {activeTab === 2 && <CommunityInfo />}
      </Box>
    </Container>
  );
}
