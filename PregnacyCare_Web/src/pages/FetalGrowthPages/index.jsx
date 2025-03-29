import React from "react";
import Advertisement from "../../component/Advertisement";
import FetalGrowth from "../../modules/HomeTemplate/FetalGrowth";

export default function FetalGrowthPages() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <FetalGrowth />
          </div>
          <div className="col-5">
            <Advertisement />
          </div>
        </div>
      </div>
    </>
  );
}
