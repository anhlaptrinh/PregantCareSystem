import logo from "../../assets/images/logo/logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetImageUrl } from "../../apis/CallAPIFirebase";
import LoginSignin from "../../modules/HomeTemplate/LoginSignin";
import DrawerMenu from "../DrawerMenu";
import { Layout, Menu, Input, Avatar } from "antd";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../../assets/PregnantAvatar.jpg";
import { useQueryClient } from "@tanstack/react-query";

const { Header } = Layout;
const { Search } = Input;

const Headers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(null);

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
    queryClient.removeQueries(["userInfo"]);
    setUser(null);
    setDrawerOpen(false);
  };

  // Xử lý mở/đóng modal Login/Signin
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const sticky = window.scrollY > 150;
      setIsSticky(sticky);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xây dựng mảng menu items dựa theo điều kiện của user
  const menuItems = [
    {
      key: "home",
      label: "Home",
      onClick: () => navigate("/"),
    },
    (!user || (user && (user.role === "MEMBER" || user.role === "EXPERT"))) && {
      key: "expert",
      label: "Our Expert",
      onClick: () => navigate("/our-expert"),
    },
    !user
      ? {
          key: "community",
          label: "Community",
          onClick: () => navigate("/community/home"),
        }
      : user &&
        user.role === "MEMBER" && {
          key: "community",
          label: "Community",
          onClick: () => navigate("/community"),
        },
    user &&
      user.role === "MEMBER" && {
        key: "appointment",
        label: "Appointment",
        children: [
          {
            key: "calendar",
            label: "Calendar",
            onClick: () => navigate("/appointment/calendar"),
          },
          {
            key: "schedule",
            label: "Schedule",
            onClick: () => navigate("/appointment/schedule"),
          },
          {
            key: "growth",
            label: "Growth Chart",
            onClick: () => navigate("/appointment/fetus-growth-chart"),
          },
        ],
      },
  ].filter(Boolean); // Lọc bỏ các giá trị false/null

  return (
    <>
      <Header
        className={`header--sticky ${isSticky ? "sticky" : ""}`}
        style={{
          padding: "12px 20px",
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
          {/* Logo và Navigation luôn hiển thị */}
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
              items={menuItems}
            />
          </div>

          {/* Phần tìm kiếm và tài khoản */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Search
              placeholder="Search..."
              allowClear
              enterButton={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              onSearch={(value) => console.log(value)}
              style={{
                width: 200,
                marginRight: 20,
                marginBottom: 5,
              }}
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
                type="button"
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

      {/* DrawerMenu vẫn được giữ nếu bạn cần sử dụng cho các chức năng khác */}
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
