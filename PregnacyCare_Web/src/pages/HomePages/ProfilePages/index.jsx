import { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography, Container } from "@mui/material";
import AccountInfo from "../../../modules/HomeTemplate/Profile/AccountInfo";
import FamilyInfo from "../../../modules/HomeTemplate/Profile/FamilyInfo";
import MyAdvices from "../../../modules/HomeTemplate/Profile/MyAdvices";

// Danh sách các tab trong phần Account Settings
const tabLabels = ["My Family Info", "My advices"];

export default function ProfilePages() {
  // Quản lý state cho tab đang được chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container sx={{ width: "70%" }}>
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
              <Tab sx={{ fontSize: 13 }} key={index} label={label} />
            ))}
          </Tabs>
        </AppBar>

        {/* Nội dung cho từng tab*/}
        {activeTab === 0 && <FamilyInfo />}
        {activeTab === 1 && <MyAdvices />}
      </Box>
    </Container>
  );
}
