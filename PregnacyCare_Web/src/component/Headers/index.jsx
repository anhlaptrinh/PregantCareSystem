import logo from "../../assets/images/logo/logo.svg";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoginSignin from "../../modules/HomeTemplate/LoginSignin";
import { Drawer, Avatar, Button, Divider, Typography } from "antd";
import StyledButton from "../StyleButton";
import avatar from "../../assets/PregnantAvatar.jpg";

const { Title, Text } = Typography;
=======
// import logoduoi from '../../assets/images/banner/icons/arrow--up-right.svg'
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Login from "../../modules/HomeTemplate/Login";
import LoginSignin from "../../modules/HomeTemplate/LoginSignin";
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703

export default function Headers() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
<<<<<<< HEAD
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    setUser(null);
    setDrawerOpen(false);
=======

  // Handle open and close Login modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
  };

  useEffect(() => {
    const handleScroll = () => {
<<<<<<< HEAD
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

=======
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
  return (
    <header className={`header--sticky ${isSticky ? "sticky" : ""}`}>
      <div className="container-full-header">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-wrapper-1">
              <div className="logo-area-start">
                <a href="/" className="logo">
                  <img src={logo} alt="logo_area" />
                </a>
                <div className="nav-area">
<<<<<<< HEAD
                  <ul>
                    <li className="main-nav">
                      <a href="/">Home</a>
                    </li>
                    <li className="main-nav">
                      <a href="#">Page</a>
                    </li>
                    <li className="main-nav">
                      <a href="#">Service</a>
                    </li>
                    <li className="main-nav">
                      <a href="#">Community</a>
=======
                  <ul className>
                    <li className="main-nav">
                      <a href="/">Home</a>
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
                      <a href="doctors-one.html">Our Expert</a>
                      <ul className="submenu parent-nav">
                        <li>
                          <a href="doctors-one.html">Our Doctors</a>
                        </li>
                        <li>
                          <a href="doctors-two.html">Our Doctors v2</a>
                        </li>
                        <li>
                          <a href="doctor-details.html">Doctors Details</a>
                        </li>
                      </ul>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a href="#">Community</a>
                      <ul className="submenu parent-nav">
                        <li>
                          <a href="">Home</a>
                        </li>
                        <li>
                          <a href="">Bookmarks</a>
                        </li>
                        <li>
                          <a href="">My Groups</a>
                        </li>
                        <li>
                          <a href="">Activity</a>
                        </li>
                      </ul>
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
                    </li>
                    <li className="main-nav">
                      <a href="contactus.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
<<<<<<< HEAD

=======
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
              <div className="header-right">
                <div className="input-area">
                  <input id="myInput" type="text" placeholder="Search..." />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="search-icon"
                  />
                </div>

<<<<<<< HEAD
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
=======
                <button
                  onClick={() => handleOpen()}
                  className="rts-btn btn-primary"
                >
                  Login/Signin{" "}
                </button>
                {/* Gọi component Login và truyền props open, onClose */}
                <LoginSignin open={open} onClose={handleClose} />

                <div className="menu-btn" id="menu-btn">
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
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
