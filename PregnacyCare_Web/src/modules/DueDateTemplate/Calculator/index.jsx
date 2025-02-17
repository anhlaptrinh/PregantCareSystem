import React, { useState } from "react";
import ConceptionDate from "./Method/ConceptionDate";
import DueDateCalculatorImage from "../../../assets/DueDateCalculator.jpg";
import LastPeriod from "./Method/LastPeriod";
import Ivf from "./Method/Ivf";
import Ultrasound from "./Method/Ultrasound";
import KnowDueDate from "./Method/KnowDueDate";
import { useNavigate } from "react-router-dom";

export default function Calculator() {
  const navigate = useNavigate();
  const [calculationMethod, setCalculationMethod] = useState("lastPeriod");

  // Hàm submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic tính toán hoặc chuyển sang trang kết quả ở đây
    console.log({
      calculationMethod,
      lastPeriodDate,
      cycleLength,
      conceptionDate,
    });
  };
  return (
    <>
      <div className="mt-5">
        {/* Title */}
        <h3 className=" font-bold text-center mb-4">
          Pregnancy Due Date Calculator
        </h3>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={DueDateCalculatorImage}
            alt="Calendar Icon"
            className="w-20"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-10 p-6 bg-indigo-100 rounded-md shadow-md"
        >
          {/* Calculation method */}
          <div>
            <label
              htmlFor="calculationMethod"
              className="block mb-2 font-semibold"
            >
              Calculation method
            </label>
            <select
              id="calculationMethod"
              value={calculationMethod}
              onChange={(e) => setCalculationMethod(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="lastPeriod">Last period</option>
              <option value="conceptionDate">Conception date</option>
              <option value="ivf">IVF</option>
              <option value="ultrasound">Ultrasound</option>
              <option value="knowDueDate">I know my due date</option>
            </select>
          </div>

          {/* Conception date */}
          {calculationMethod === "conceptionDate" && <ConceptionDate />}
          {/* Last Period */}
          {calculationMethod === "lastPeriod" && <LastPeriod />}
          {/* IVF */}
          {calculationMethod === "ivf" && <Ivf />}
          {/* Ultrasound */}
          {calculationMethod === "ultrasound" && <Ultrasound />}
          {/* I know my due date */}
          {calculationMethod === "knowDueDate" && <KnowDueDate />}

          {/* Submit Button */}
          <div class="row mt-5 mb-4">
            <div class="col-4">
              <button
                type="button"
                class="btn btn-info text-white py-3 fs-3 rounded-pill "
                onClick={() => navigate("/dueDateResult")}
              >
                See your timeline
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
