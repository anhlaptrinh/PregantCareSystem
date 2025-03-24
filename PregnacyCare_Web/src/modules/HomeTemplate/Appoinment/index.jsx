import { Link, useNavigate } from "react-router-dom";

export default function Appointment() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      navigate("/appointment/calendar");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="request-appoinment-area rts-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="request-appoinemnt-area-main-wrapper bg_image rts-section-gap">
              <span className="pre">Book Appointment</span>
              <h2 className="title">
                Request Your <br />
                <span>Appointment</span>
              </h2>
              <Link
                onClick={() => handleClick()}
                className="rts-btn btn-primary"
              >
                Get Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
