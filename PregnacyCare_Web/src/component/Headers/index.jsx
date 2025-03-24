import logo from "../../assets/images/logo/logo.svg";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
      <header className={`header--sticky ${isSticky ? "sticky" : ""}`}>
        <div className="container-full-header">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-wrapper-1">
                <div className="logo-area-start">
                  <Link to="/" className="logo">
                    <img src={logo} alt="logo_area" />
                  </Link>
                  <div className="nav-area">
                    <ul className>
                      <li className="main-nav">
                        <Link to="/">Home</Link>
                      </li>
                      {(!user ||
                        (user &&
                          (user.roleName === "MEMBER" ||
                            user.roleName === "EXPERT"))) && (
                        <li className="main-nav">
                          <Link to="/our-expert">Articles</Link>
                        </li>
                      )}
                      {!user ? (
                        <li className="main-nav">
                          <Link to="/community/home">Community</Link>
                        </li>
                      ) : (
                        user.roleName === "MEMBER" && (
                          <li className="main-nav">
                            <Link to="/community">Community</Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Phần tìm kiếm và tài khoản */}
                <div className="header-right">
                  <div className="input-area">
                    <input id="myInput" type="text" placeholder="Search..." />
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="search-icon"
                    />
                  </div>

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
            </div>
          </div>
        </div>
      </header>

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
