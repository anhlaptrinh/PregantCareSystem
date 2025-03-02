import logo from "../../assets/images/logo/logo.svg";
// import logoduoi from '../../assets/images/banner/icons/arrow--up-right.svg'
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Login from "../../modules/HomeTemplate/Login";
import LoginSignin from "../../modules/HomeTemplate/LoginSignin";

export default function Headers() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);

  // Handle open and close Login modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
