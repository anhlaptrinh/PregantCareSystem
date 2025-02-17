import React, { useState } from "react";

export default function KnowDueDate() {
  const [knowDueDate, setKnowDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">
          What's your due date?
        </label>
        <input
          type="date"
          id="knowDueDate"
          value={knowDueDate}
          onChange={(e) => setKnowDueDate(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
    </>
  );
}
