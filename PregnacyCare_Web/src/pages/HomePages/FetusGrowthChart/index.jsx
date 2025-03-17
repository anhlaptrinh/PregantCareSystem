import AdviceForm from "../../../modules/FetusTrackerTemplate/AdviceForm";
import GrowthChart from "../../../modules/FetusTrackerTemplate/GrowthChart";
import NotificationFetus from "../../../modules/FetusTrackerTemplate/Notification";

import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

export default function FetusGrowthChart() {
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col" style={{ height: "100vh" }}>
                        <DropdownComponent />
                        <GrowthChart />
                        <AdviceForm />
                    </div>
                    <div
                        className="col"
                        style={{
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <NotificationFetus />
                    </div>
                </div>
            </div>
        </div>
    );
}

const DropdownComponent = () => {
    const [selectedFetus, setSelectedFetus] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                padding: "10px",
                width: "100%",
            }}
        >
            <Select
                value={selectedFetus}
                onChange={(value) => setSelectedFetus(value)}
                style={{ width: "100%" }}
                placeholder="Fetus List"
            >
                <Option value="fetus1">Fetus 1</Option>
                <Option value="fetus2">Fetus 2</Option>
                <Option value="fetus3">Fetus 3</Option>
            </Select>
        </div>
    );
};
