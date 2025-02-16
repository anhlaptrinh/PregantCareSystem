import logo2 from '../../assets/images/logo/logo-2.svg'
import { useState, useEffect } from 'react';
export default function Footers() {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const progressPath = document.querySelector('.progress-wrap path');
    if (!progressPath) return; // Handle cases where the element isn't available

    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength / height);
      setProgress(progress);
    };

    updateProgress(); // Initial progress calculation
    window.addEventListener('scroll', updateProgress);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // For smooth scrolling
    });
  };
  return (
    <div>
      <div className="rts-footer-area footer-bg pt--105 pt_sm--50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* subscribe area start */}
              <div className="subscribe-area-start pb--30">
                <a href="#" className="logo">
                  <img src={logo2} alt="logo" />
                </a>
                {/* subscribe area start */}
                {/* subscribe area end */}
              </div>
              {/* subscribe area end */}
            </div>
            <div className="col-lg-12">
              <div className="footer-wrapper-style-between">
                <div className="single-wized">
                  <h6 className="title">Contact</h6>
                  <div className="body">
                    <p className="location">
                      Canada, 245 14h Street Office 42 Calgary, de 52473
                    </p>
                    <a href="#">info@email.com</a>
                    <a href="#">+1 554 558 748</a>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Company </h6>
                  <div className="body">
                    <ul className="nav-bottom">
                      <li>
                        <a href="about.html">Company</a>
                      </li>
                      <li>
                        <a href="about.html">About</a>
                      </li>
                      <li>
                        <a href="appoinment.html">Appointment </a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Our Services</h6>
                  <div className="body">
                    <ul className="nav-bottom">
                      <li>
                        <a href="service-details.html">Orthopaedic</a>
                      </li>
                      <li>
                        <a href="service-details.html">Neurology</a>
                      </li>
                      <li>
                        <a href="service-details.html">Psychiatry </a>
                      </li>
                      <li>
                        <a href="service-details.html">Cardiology</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Working Time</h6>
                  <div className="body">
                    <p className="location">Mon - Fri: 9.00am - 5.00pm</p>
                    <p className="location">Saturday: 10.00am - 6.00pm</p>
                    <p className="location">Sunday Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-area-inner">
                <p>
                  © 2025 Mediweb. All Rights Reserved by&nbsp;
                  <a
                    target="_blank"
                    href="https://themeforest.net/user/themewant"
                  >
                    ThemeWant
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`progress-wrap ${isActive ? 'active-progress' : ''}`} onClick={scrollToTop}>
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="0 0 100 100"> {/* ViewBox adjusted */}
        <path
          d="M 50,10 A 40,40 0 1 1 50,90"  
          style={{
            strokeDasharray: "251.327, 251.327", // Path length (approx.)
            strokeDashoffset: progress, // Use the calculated offset
            transition: "stroke-dashoffset 10ms linear 0s",
          }}
        />
      </svg>
      {/* ... (rest of your component JSX) */}
    </div>
    </div>
  );
}
