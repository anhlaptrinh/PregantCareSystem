import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useGetAllPackages } from "../../../apis/CallAPIPackage";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const storedUser = localStorage.getItem("USER_TOKEN");
  const user = JSON.parse(storedUser);

  if (!user || user.role !== "MEMBER") return null;

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const res = await useGetAllPackages();
        if (res.code === 200) {
          setPackages(res.data);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchAllPackages();
  }, []);

  return (
    <div className="pricing-area-start rts-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-center">
              <h2 className="title text-center">Our Pricing Best Plan</h2>
            </div>
          </div>
        </div>
        <div className="row g-75 mt--0">
          {loading ? (
            <p>Loading packages...</p>
          ) : (
            packages.map((pkg, index) => (
              <div
                key={pkg.id || index}
                className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
                data-wow-delay={`${0.2 * (index + 1)}s`}
                data-wow-duration=".8s"
              >
                <div
                  className={`single-pricing-area ${
                    index === 1 ? "active" : ""
                  }`}
                >
                  <div className="pricing-head">
                    <span>{pkg.name}</span>
                    <h2 className="price">${pkg.price}</h2>
                    <p>per/month</p>
                  </div>
                  <div className="body">
                    <p className="disc">{pkg.description}</p>
                    {pkg.features?.map((feature, idx) => (
                      <div key={idx} className="single-check">
                        <FontAwesomeIcon icon={faCheck} />
                        <span>{feature}</span>
                      </div>
                    ))}
                    <Link
                      to={`/payment/${pkg.id}`}
                      className="rts-btn btn-primary"
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
