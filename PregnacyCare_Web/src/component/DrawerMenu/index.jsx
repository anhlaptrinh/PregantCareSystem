import React from "react";
import { Drawer, Avatar, Divider, Typography } from "antd";
import StyledButton from "../StyleButton";
import avatar from "../../assets/PregnantAvatar.jpg";

const { Title, Text } = Typography;

const DrawerMenu = ({
  drawerOpen,
  handleCloseDrawer,
  user,
  url,
  handleLogout,
}) => {
  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={handleCloseDrawer}
      open={drawerOpen}
    >
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <Avatar src={url || avatar} size={80} style={{ marginBottom: 10 }} />
        <Typography style={{ fontSize: 20, color: "#615EFC" }}>
          {user?.email || "User"}
        </Typography>
      </div>
      <Divider />
      <StyledButton
        to="/profile"
        className="mb-4 p-5 fs-3"
        onCloseDrawer={handleCloseDrawer}
      >
        My Family Info
      </StyledButton>
      <StyledButton
        to="/profile"
        className="mb-4 p-5 fs-3"
        onCloseDrawer={handleCloseDrawer}
      >
        Personal Info
      </StyledButton>
      <StyledButton
        to="/"
        className="mb-4 p-5 fs-3"
        type="danger"
        onClick={handleLogout}
      >
        Log out
      </StyledButton>
    </Drawer>
  );
};

export default DrawerMenu;
