import logo from "../../assets/images/logo/logo.svg";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGetImageUrl } from "../../apis/CallAPIFirebase";
import DrawerMenu from "../DrawerMenu";
import { Avatar, Layout } from "antd";
import avatar from "../../assets/PregnantAvatar.jpg";
import { useQueryClient } from "@tanstack/react-query";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../context/UserContext";
import { useUserInfo } from "../../apis/CallAPIUser";

const { Header } = Layout;

const Headers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [url, setUrl] = useState(null);

  // Lấy thông tin chi tiết của user hiện tại
  const fetchUserInfo = async () => {
    try {
      const res = await useUserInfo();
      if (res.code == 200) {
        // Lấy ảnh từ Firebase
        const imageUrl = await useGetImageUrl(
          "pregnancyCareImages/users",
          res.data.id
        );
        setUrl(imageUrl);
        setUser(res.data);
        queryClient.setQueryData(["userInfo"], res.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      fetchUserInfo();
    }
  }, []);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    queryClient.removeQueries(["userInfo"]);
    setUser(null);
    setDrawerOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const sticky = window.scrollY > 150;
      setIsSticky(sticky);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header
        className={`header--sticky ${isSticky ? "sticky" : ""}`}
        style={{
          padding: "14px 28px",
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logo}
              alt="logo_area"
              sx={{ height: 40, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigate("/")}
                sx={{
                  textTransform: "none",
                  color: "black",
                  fontSize: 18,
                  marginRight: 2,
                  "&:hover": { backgroundColor: "#615EFC", color: "white" },
                }}
              >
                Home
              </Button>
              {(!user ||
                (user &&
                  (user.roleName === "MEMBER" ||
                    user.roleName === "EXPERT"))) && (
                <Button
                  onClick={() => navigate("/our-expert")}
                  sx={{
                    textTransform: "none",
                    color: "black",
                    fontSize: 18,
                    marginRight: 2,
                    "&:hover": { backgroundColor: "#615EFC", color: "white" },
                  }}
                >
                  Our Expert
                </Button>
              )}
              {!user ? (
                <Button
                  onClick={() => navigate("/community/home")}
                  sx={{
                    textTransform: "none",
                    color: "black",
                    fontSize: 18,
                    marginRight: 2,
                    "&:hover": { backgroundColor: "#615EFC", color: "white" },
                  }}
                >
                  Community
                </Button>
              ) : (
                user.roleName === "MEMBER" && (
                  <Button
                    onClick={() => navigate("/community")}
                    sx={{
                      textTransform: "none",
                      color: "black",
                      fontSize: 18,
                      marginRight: 2,
                      "&:hover": { backgroundColor: "#615EFC", color: "white" },
                    }}
                  >
                    Community
                  </Button>
                )
              )}
            </Box>
          </Box>

          {/* Phần tìm kiếm và tài khoản */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              sx={{
                marginRight: 5,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
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
                onClick={() => navigate("/login")}
              >
                Login/Signin
              </button>
            )}
          </div>
        </div>
      </Header>

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
