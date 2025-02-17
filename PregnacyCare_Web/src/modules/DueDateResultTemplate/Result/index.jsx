import React from "react";
import avatarImage from "../../../assets/avatar.jpg";
import DueDateCalculatorImage from "../../../assets/DueDateCalculator.jpg";
import LightImage from "../../../assets/light.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <h2 className="font-bold mb-4">Your baby's due date is</h2>

      <div className="row mb-8">
        <div className="col-md-auto">
          <img src={avatarImage} alt="Written by" className="mt-2 w-30" />
        </div>
        <div className="col-md-auto">
          <p>Written by Pregnancy Care Staff | Dec 12, 2024</p>
        </div>
      </div>

      <div className="bg-blue-100 p-6 rounded-lg">
        <div className="bg-white p-6 mb-3">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <img
              src={DueDateCalculatorImage}
              alt="Due Date Calculator Image"
              className="w-20"
            />
          </div>
          <p className="text-xl font-bold text-center mb-4">
            Congrats! Your due date is
          </p>
          <h3 className="text-3xl font-bold text-center mb-6">
            November 24, 2025
          </h3>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <img src={LightImage} alt="Light Image" className="w-20" />
          </div>

          <p className="text-center">
            Download our free app to track your pregnancy and baby's growth!
          </p>
        </div>

        <Link
          to="/dueDate"
          className="text-decoration-underline nav-link text-center"
        >
          Recalculate your due date
        </Link>
      </div>
    </div>
  );
}
