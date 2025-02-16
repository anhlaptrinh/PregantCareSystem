import logo from '../../assets/images/logo/logo.svg'
import logoduoi from '../../assets/images/banner/icons/arrow--up-right.svg'

export default function Headers() {
  return (
    <header className="header-one  header--sticky">
      <div className="container-full-header">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-wrapper-1">
              <div className="logo-area-start">
                <a href="index.html" className="logo">
                  <img src={logo} alt="logo_area" />
                </a>
                <div className="nav-area">
                  <ul className>
                    <li className="main-nav">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a href="#">Page</a>
                      <ul className="submenu parent-nav">
                        <li><a href="blog.html">Blog Grid</a></li>
                        <li><a href="blog-list.html">Blog List</a></li>
                        <li><a href="blog-details.html">Blog Details</a></li>
                      </ul>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a href="#">Service</a>
                      <ul className="submenu parent-nav">
                        <li><a href="blog.html">Blog Grid</a></li>
                        <li><a href="blog-list.html">Blog List</a></li>
                        <li><a href="blog-details.html">Blog Details</a></li>
                      </ul>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a href="doctors-one.html">Our Doctors</a>
                      <ul className="submenu parent-nav">
                        <li><a href="doctors-one.html">Our Doctors</a></li>
                        <li><a href="doctors-two.html">Our Doctors v2</a></li>
                        <li><a href="doctor-details.html">Doctors Details</a></li>
                      </ul>
                    </li>
                    <li className="main-nav has-dropdown">
                      <a href="#">Blog</a>
                      <ul className="submenu parent-nav">
                        <li><a href="blog.html">Blog Grid</a></li>
                        <li><a href="blog-list.html">Blog List</a></li>
                        <li><a href="blog-details.html">Blog Details</a></li>
                      </ul>
                    </li>
                    <li className="main-nav"><a href="contactus.html">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="header-right">
                <div className="input-area">
                  <input id="myInput" type="text" placeholder="Search..." />
                  <i className="fa-light fa-magnifying-glass" />
                </div>
                {/* <div class="cart-button">
                      <i class="fa-light fa-cart-shopping"></i>
                  </div> */}
                <a href="appoinment.html" className="rts-btn btn-primary">Login/Signin <img src={logoduoi} alt /></a>
                <div className="menu-btn" id="menu-btn">
                  <svg width={20} height={16} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
