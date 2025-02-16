import serviceImg02 from "../../../assets/images/service/02.svg";
export default function ShortServices() {
  return (
    <div className="short-service-area rts-section-gap2">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".2s"
            data-wow-duration=".8s"
          >
            <a href="appoinment.html" className="single-short-service">
              <div className="icon">
                <img src="assets/images/service/01.svg" alt="service" />
              </div>
              <h5 className="title">
                du doan <br /> ngay sinh
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".4s"
            data-wow-duration=".8s"
          >
            <a href="doctors-one.html" className="single-short-service">
              <div className="icon">
                <img src={serviceImg02} alt="service" />
              </div>
              <h5 className="title">
                chuyen gia <br />
                ho tro
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".6s"
            data-wow-duration=".8s"
          >
            <a href="tel:+4733378901" className="single-short-service">
              <div className="icon">
                <img src="assets/images/service/03.svg" alt="service" />
              </div>
              <h5 className="title">
                cham soc <br />
                tai nha
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".8s"
            data-wow-duration=".8s"
          >
            <a href="contactus.html" className="single-short-service">
              <div className="icon">
                <img src="assets/images/service/04.svg" alt="service" />
              </div>
              <h5 className="title">
                24/7 <br />
                Support
              </h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
