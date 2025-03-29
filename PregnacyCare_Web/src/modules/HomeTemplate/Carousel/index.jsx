import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "../../../assets/images/banner/01.png";
import { useGetAllExperts } from "../../../apis/CallAPIUser";

export default function Carousel() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState("");

  const handleSelectChange = (e) => {
    const expertId = e.target.value;
    setSelectedExpert(expertId);
  };

  const handleFindExperts = () => {
    if (selectedExpert) {
      navigate(`/our-expert/expert-detail/${selectedExpert}`);
    }
  };

  const fetchAllExperts = async () => {
    try {
      const res = await useGetAllExperts();
      if (res.code == 200) {
        setExperts(res.data);
      }
    } catch (error) {
      console.error("Error fetching all experts:", error);
    }
  };

  useEffect(() => {
    fetchAllExperts();
  }, []);

  return (
    <div className="banner-area-start">
      <div className="container-full-header">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-area-one rts-section-gap bg_image">
              <div className="banner-content-area">
                <h1
                  className="title wow fadeInUp"
                  data-wow-delay=".2s"
                  data-wow-duration=".8s"
                >
                  Your Fetus <br />
                  Our Priority
                </h1>
                <div
                  className="select-area-down wow fadeInUp"
                  data-wow-delay=".6s"
                  data-wow-duration=".8s"
                >
                  <form
                    className="select-2"
                    action="#"
                    method="get"
                    acceptCharset="utf-8"
                  >
                    <select
                      name="my_select2"
                      className="my_select2"
                      value={selectedExpert}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Expert</option>
                      {experts?.map((expert) => (
                        <option key={expert.id} value={expert.id}>
                          {expert?.fullName}
                        </option>
                      ))}
                    </select>
                  </form>
                  <button
                    className="rts-btn btn-primary"
                    type="button"
                    disabled={!selectedExpert}
                    onClick={handleFindExperts}
                  >
                    Find Experts
                  </button>
                </div>
              </div>
              {/* Person image */}
              <div className="person-image">
                <img src={person} alt="heart" />
              </div>
              {/* End person image */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
