import React, { useState, useEffect } from "react";
import { Button, Col, Menu, Row } from "antd";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MenuIcon from "@mui/icons-material/Menu"; // Icon dành cho Drawer Button
import "./index.css";
import DrawerMenu from "../../component/DrawerMenu";

const menuAppointment = () => [
  {
    icon: <CalendarTodayOutlinedIcon />,
    label: "Home",
    key: "/",
  },
  {
    icon: <MenuIcon />,
    label: "My profile",
    key: "drawer-menu",
  },
  {
    icon: <CalendarTodayOutlinedIcon />,
    label: "Calendar",
    key: "/appointment/calendar",
  },
  {
    icon: <EditCalendarOutlinedIcon />,
    label: "Appointment Schedule",
    key: "/appointment/schedule",
  },
  {
    label: "Growth Chart",
    key: "/appointment/fetus-growth-chart",
  },
];

const AppointmentManagement = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(null);

  // Giả sử bạn lưu thông tin người dùng trong localStorage (tương tự như trong header)
  useEffect(() => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Nếu có hàm lấy ảnh (useGetImageUrl), bạn có thể gọi ở đây để setUrl
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    setUser(null);
    setDrawerVisible(false);
  };

  return (
    <>
      <Row style={{ padding: "20px 16px" }}>
        <Col span={4} className="menu-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span>
              <CalendarMonthOutlinedIcon
                style={{
                  fontSize: "30px",
                  color: "var(--color-primary)",
                  marginRight: "6px",
                }}
              />
            </span>
            <span style={{ fontSize: "18px", fontWeight: 700 }}>
              Appointopia
            </span>
          </div>
          <div>
            <Menu
              mode="inline"
              onClick={(e) => {
                if (e.key === "drawer-menu") {
                  setDrawerVisible(true);
                } else {
                  navigate(e.key);
                }
              }}
              items={menuAppointment()}
              selectedKeys={[location?.pathname]}
            />
          </div>
        </Col>
        <Col span={20} style={{ padding: "0px 12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <div style={{ color: "black", fontSize: "25px", fontWeight: 700 }}>
              {
                menuAppointment().find((i) => i.key === location?.pathname)
                  ?.label
              }
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button icon={<AddIcon />} className="rts-btn btn-primary">
                Create
              </Button>
              <div style={{ marginLeft: "12px" }}>
                <SearchIcon style={{ fontSize: "23px" }} />
              </div>
              <div style={{ marginLeft: "12px" }}>
                <NotificationsNoneIcon style={{ fontSize: "23px" }} />
              </div>
              <div style={{ marginLeft: "12px" }}>
                <MessageOutlinedIcon style={{ fontSize: "23px" }} />
              </div>
              <div
                style={{ marginLeft: "8px" }}
                className="menu-btn"
                id="menu-btn"
              >
                <svg
                  width={20}
                  height={16}
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y={14} width={20} height={2} fill="#1F1F25" />
                  <rect y={7} width={20} height={2} fill="#1F1F25" />
                  <rect width={20} height={2} fill="#1F1F25" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-container">{children}</div>
        </Col>
      </Row>
      {/* Sử dụng DrawerMenu đã tách giống như trong header */}
      <DrawerMenu
        drawerOpen={drawerVisible}
        handleCloseDrawer={() => setDrawerVisible(false)}
        user={user}
        url={url}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default AppointmentManagement;
