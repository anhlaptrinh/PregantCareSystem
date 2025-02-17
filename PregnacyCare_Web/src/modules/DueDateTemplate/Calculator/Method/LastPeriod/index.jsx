import React, { useState } from "react";

export default function LastPeriod() {
  const [lastPeriodDate, setLastPeriodDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cycleLength, setCycleLength] = useState("28");
  const cycleOptions = Array.from({ length: 26 }, (_, i) => i + 20);

  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">
          When did your last period start?
        </label>
        <input
          type="date"
          id="lastPeriodDate"
          value={lastPeriodDate}
          onChange={(e) => setLastPeriodDate(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Cycle length</label>
        <select
          id="cycleLength"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          {cycleOptions.map((day) => (
            <option key={day} value={day}>
              {day} days
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
