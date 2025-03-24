import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serviceImg02 from "../../../assets/images/service/02.svg";
import serviceImg01 from "../../../assets/images/service/01.svg";
import serviceImg03 from "../../../assets/images/service/03.svg";
import { UserContext } from "../../../context/UserContext";

export default function ShortServices() {
  const { user } = useContext(UserContext);

  // Nếu user không tồn tại hoặc role khác "MEMBER", không hiển thị component
  if (!user || user.roleName !== "MEMBER") return null;

  return (
    <div className="short-service-area rts-section-gap2">
      <div className="container">
        <div className="row justify-content-center text-center g-5">
          <div
            className="col-md-4 wow fadeInRight"
            data-wow-delay=".2s"
            data-wow-duration=".8s"
          >
            <Link
              to="/appointment/schedule"
              className="single-short-service d-flex flex-column align-items-center justify-content-center"
            >
              <div className="icon">
                <img src={serviceImg01} alt="service" />
              </div>
              <h5 className="title">Estimated due date</h5>
            </Link>
          </div>
          <div
            className="col-md-4 wow fadeInRight"
            data-wow-delay=".4s"
            data-wow-duration=".8s"
          >
            <Link
              to="/appointment/calendar"
              className="single-short-service d-flex flex-column align-items-center justify-content-center"
            >
              <div className="icon">
                <img src={serviceImg02} alt="service" />
              </div>
              <h5 className="title">Create an appointment</h5>
            </Link>
          </div>
          <div
            className="col-md-4 wow fadeInRight"
            data-wow-delay=".6s"
            data-wow-duration=".8s"
          >
            <Link
              to="/appointment/fetus-growth-chart"
              className="single-short-service d-flex flex-column align-items-center justify-content-center"
            >
              <div className="icon">
                <img src={serviceImg03} alt="service" />
              </div>
              <h5 className="title">Fetus Growth Tracker</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
