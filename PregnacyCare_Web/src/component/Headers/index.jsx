import logo from "../../assets/images/logo/logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetImageUrl } from "../../apis/CallAPIFirebase";
import LoginSignin from "../../modules/HomeTemplate/LoginSignin";
import DrawerMenu from "../DrawerMenu";
import { Layout, Menu, Input, Button, Avatar } from "antd";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../../assets/PregnantAvatar.jpg";

const { Header } = Layout;
const { Search } = Input;

const Headers = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  // Lấy ảnh từ Firebase
  const handleGetImage = async () => {
    try {
      const result = await useGetImageUrl("pregnancyCareImages/users", 1);
      setUrl(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      handleGetImage();
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    setUser(null);
    setDrawerOpen(false);
  };

  // Xử lý mở và đóng modal Login/Signin
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header
        className={`header--sticky ${isSticky ? "sticky" : ""}`}
        style={{
          marginTop: 20,
          padding: "0 20px",
          background: "#fff",
          boxShadow: isSticky ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo và Navigation */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="logo_area"
              style={{ height: 40, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <Menu
              mode="horizontal"
              style={{ borderBottom: "none", marginLeft: 20 }}
            >
              <Menu.Item key="home" onClick={() => navigate("/")}>
                Home
              </Menu.Item>
              <Menu.Item key="expert" onClick={() => navigate("/our-expert")}>
                Our Expert
              </Menu.Item>
              <Menu.Item key="community" onClick={() => navigate("/community")}>
                Community
              </Menu.Item>
              <Menu.SubMenu key="appointment" title="Appointment">
                <Menu.Item
                  key="calendar"
                  onClick={() => navigate("/appointment/calendar")}
                >
                  Calendar
                </Menu.Item>
                <Menu.Item
                  key="schedule"
                  onClick={() => navigate("/appointment/schedule")}
                >
                  Schedule
                </Menu.Item>
                <Menu.Item
                  key="growth"
                  onClick={() => navigate("/appointment/fetus-growth-chart")}
                >
                  Growth Chart
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </div>

          {/* Phần tìm kiếm và tài khoản */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Search
              placeholder="Search..."
              allowClear
              enterButton={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              onSearch={(value) => console.log(value)}
              style={{ width: 200, marginRight: 20 }}
            />

            {user ? (
              <Avatar
                src={url || avatar}
                size={40}
                style={{ cursor: "pointer" }}
                onClick={handleOpenDrawer}
              />
            ) : (
              <button
                className="rts-btn btn-primary"
                type="primary"
                onClick={handleOpen}
              >
                Login/Signin
              </button>
            )}
          </div>
        </div>
      </Header>

      <LoginSignin
        open={open}
        onClose={() => {
          handleClose();
          const storedUser = localStorage.getItem("USER_TOKEN");
          if (storedUser) setUser(JSON.parse(storedUser));
        }}
      />

      <DrawerMenu
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        user={user}
        url={url}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Headers;
