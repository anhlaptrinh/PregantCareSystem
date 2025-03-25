import AdviceForm from "../../../modules/FetusTrackerTemplate/AdviceForm";
import GrowthChart from "../../../modules/FetusTrackerTemplate/GrowthChart";
import NotificationFetus from "../../../modules/FetusTrackerTemplate/Notification";

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useGetMyFetusList } from "../../../apis/CallAPIFetus";
import { useFetusStore } from "../../../zustand/fetusStore";

const { Option } = Select;

export default function FetusGrowthChart() {
  const { selectedFetus } = useFetusStore();
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col" style={{ height: "100vh" }}>
            <DropdownComponent />
            <GrowthChart />
            <AdviceForm selectedFetus={selectedFetus} />
          </div>
          <div
            className="col"
            style={{
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NotificationFetus selectedFetus={selectedFetus} />
          </div>
        </div>
      </div>
    </div>
  );
}

const DropdownComponent = () => {
  const { selectedFetus, setSelectedFetus, fetusList, setFetusList } =
    useFetusStore();
  const [defaultFetus, setDefaultFetus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useGetMyFetusList(); // Gọi API
        const today = new Date(); // Lấy ngày hiện tại

        const formattedFetusList = response.data?.map((fetus) => {
          const dueDate = new Date(fetus.dueDate);
          const weeksLeft = Math.floor(
            (dueDate - today) / (7 * 24 * 60 * 60 * 1000)
          );
          const pregnancyWeek = 40 - weeksLeft; // Tính tuần thai nhi

          return {
            id: fetus.id,
            name: fetus.name,
            week: pregnancyWeek < 0 ? 0 : pregnancyWeek, // Đảm bảo không có số âm
          };
        });

        setFetusList(formattedFetusList);
        if (formattedFetusList.length > 0) {
          setSelectedFetus(formattedFetusList[0]);
          setDefaultFetus(formattedFetusList[0].id);
        }
      } catch (error) {
        console.error("Error fetching fetus list:", error);
      }
    };

    fetchData();
  }, [setFetusList, setSelectedFetus]);

  return (
    <div
      style={{ display: "flex", gap: "20px", padding: "10px", width: "100%" }}
    >
      <Select
        value={defaultFetus}
        onChange={(value) => {
          const selected = fetusList.find((f) => f.id === value);
          setSelectedFetus(selected);
          setDefaultFetus(value);
        }}
        style={{ width: "100%" }}
        placeholder="Select Fetus"
      >
        {fetusList?.map((fetus) => (
          <Option key={fetus.id} value={fetus.id}>
            {`${fetus.name} - Week ${fetus.week}`}
          </Option>
        ))}
      </Select>
    </div>
  );
};
