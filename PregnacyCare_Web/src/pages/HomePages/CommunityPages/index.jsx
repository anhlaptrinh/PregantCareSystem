import { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography, Container } from "@mui/material";
import Advertisement from "../../../component/Advertisement";
import Home from "../../../modules/HomeTemplate/Community/Home";
import Bookmarks from "../../../modules/HomeTemplate/Community/Bookmarks";
import MyGroups from "../../../modules/HomeTemplate/Community/MyGroups";
import Activity from "../../../modules/HomeTemplate/Community/Activity";

// Danh sách các tab trong phần Community
const tabLabels = ["Home", "Bookmarks", "My Groups", "Activity"];

export default function CommunityPages() {
  // Quản lý state cho tab đang được chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <div className="row">
        <div className="col-8">
          <Box>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Community
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
            {activeTab === 0 && <Home />}
            {activeTab === 1 && <Bookmarks />}
            {activeTab === 2 && <MyGroups />}
            {activeTab === 3 && <Activity />}
          </Box>
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
