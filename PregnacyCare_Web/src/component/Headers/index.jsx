import logo from "../../assets/images/logo/logo.svg";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoginSignin from "../../modules/HomeTemplate/LoginSignin";
import { Drawer, Avatar, Button, Divider, Typography } from "antd";
import StyledButton from "../StyleButton";
import avatar from "../../assets/PregnantAvatar.jpg";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function Headers() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
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

  // Handle open and close Login modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header--sticky ${isSticky ? "sticky" : ""}`}>
      <div className="container-full-header">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-wrapper-1">
              <div className="logo-area-start">
                <a onClick={() => navigate("/")} className="logo">
                  <img src={logo} alt="logo_area" />
                </a>
                <div className="nav-area">
                  <ul className>
                    <li className="main-nav">
                      <a onClick={() => navigate("/")}>Home</a>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a href="#">Page</a>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a href="#">Service</a>
                      <ul className="submenu parent-nav">
                        <li>
                          <a href="blog.html">Blog Grid</a>
                        </li>
                        <li>
                          <a href="blog-list.html">Blog List</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Details</a>
                        </li>
                      </ul>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a onClick={() => navigate("/our-expert")}>Our Expert</a>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a onClick={() => navigate("/community")}>Community</a>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a onClick={() => navigate("/appointment")}>
                        Appointment
                      </a>
                      <ul className="submenu parent-nav">
                        <li>
                          <a onClick={() => navigate("/appointment/calendar")}>
                            Calendar
                          </a>
                        </li>
                        <li>
                          <a onClick={() => navigate("/appointment/schedule")}>
                            Schedule
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() =>
                              navigate("/appointment/fetus-growth-chart")
                            }
                          >
                            Growth Chart
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="main-nav">
                      <a href="contactus.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
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
                    src={avatar}
                    size={40}
                    style={{ cursor: "pointer" }}
                    onClick={handleOpenDrawer}
                  />
                ) : (
                  <button onClick={handleOpen} className="rts-btn btn-primary">
                    Login/Signin
                  </button>
                )}

                <LoginSignin
                  open={open}
                  onClose={() => {
                    handleClose();
                    const storedUser = localStorage.getItem("USER_TOKEN");
                    if (storedUser) setUser(JSON.parse(storedUser));
                  }}
                />

                {/* Drawer Menu với Avatar lớn */}
                <Drawer
                  placement="right"
                  closable={true}
                  onClose={handleCloseDrawer}
                  open={drawerOpen}
                >
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <Avatar
                      src={avatar}
                      size={80}
                      style={{ marginBottom: 10 }}
                    />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
