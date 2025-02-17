import React, { useState } from "react";

export default function Ivf() {
  const [ivfDate, setIvfDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [transferType, setTransferType] = useState("3-day");

  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">Date of transfer</label>
        <input
          type="date"
          id="ivfDate"
          value={ivfDate}
          onChange={(e) => setIvfDate(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
        <div className="row ms-2 mt-3">
          <label className="row space-x-2">
            <input
              type="radio"
              name="transferType"
              value="3-day"
              checked={transferType === "3-day"}
              onChange={() => setTransferType("3-day")}
              className="text-blue-600 col"
            />
            <span className="col">IVF 3 Day Transfer Date</span>
          </label>
          <label className="row space-x-2 mt-2">
            <input
              type="radio"
              name="transferType"
              value="5-day"
              checked={transferType === "5-day"}
              onChange={() => setTransferType("5-day")}
              className="text-blue-600 col"
            />
            <span className="col">IVF 5 Day Transfer Date</span>
          </label>
        </div>
      </div>
    </>
  );
}
