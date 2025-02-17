import React, { useState } from "react";

export default function Ultrasound() {
  const [ultrasound, setUltrasound] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ultrasoundWeeksLength, setUltrasoundWeeksLength] = useState("6");
  const ultrasoundWeeksOption = Array.from({ length: 24 }, (_, i) => i + 1);
  const [ultrasoundDaysLength, setUltrasoundDaysLength] = useState("0");
  const ultrasoundDaysOption = Array.from({ length: 7 }, (_, i) => i + 0);

  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">Date of ultrasound</label>
        <input
          type="date"
          id="ultrasound"
          value={ultrasound}
          onChange={(e) => setUltrasound(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />

        <div className="row mt-4">
          <div className="col">
            <div>
              <label className="block mb-2 font-semibold">Weeks</label>
              <select
                id="weeks"
                value={ultrasoundWeeksLength}
                onChange={(e) => setUltrasoundWeeksLength(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                {ultrasoundWeeksOption.map((day) => (
                  <option key={day} value={day}>
                    {day} days
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col">
            <div>
              <label className="block mb-2 font-semibold">Days</label>
              <select
                id="Days"
                value={ultrasoundDaysLength}
                onChange={(e) => setUltrasoundDaysLength(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                {ultrasoundDaysOption.map((day) => (
                  <option key={day} value={day}>
                    {day} days
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
