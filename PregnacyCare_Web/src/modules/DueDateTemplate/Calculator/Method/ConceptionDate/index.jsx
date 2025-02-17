import React, { useState } from "react";

export default function ConceptionDate() {
  const [conceptionDate, setConceptionDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <>
      <div>
        <label htmlFor="conceptionDate" className="block mb-2 font-semibold">
          When did you conceive?
        </label>
        <input
          type="date"
          id="conceptionDate"
          value={conceptionDate}
          onChange={(e) => setConceptionDate(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
    </>
  );
}
