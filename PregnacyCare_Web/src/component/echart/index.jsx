import React from "react";
import ReactEcharts from "echarts-for-react";
import { useFetchFetusRecordStatistic } from "../../hooks/FetusRecordHooks/useGetStatistic";
import { useFetusStore } from "../../zustand/fetusStore";
import { useFetchWhoStatistic } from "../../hooks/FetusRecordHooks/useGetWhoStatistic";

const ChartContent = () => {
    const {selectedFetus} = useFetusStore();
    const {data: fetusData = { fetusWeek: [], weight: [], height: [] }} = useFetchFetusRecordStatistic(selectedFetus?.id);
    const {data: whoData = { fetusWeek: [], weight: [], height: [] }} = useFetchWhoStatistic();
    // const whoData = {
    //     fetusWeek: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    //     weight: [1, 2, 4, 7, 14, 23, 43, 70, 100, 140, 190, 240, 300, 360, 430, 500, 600, 660, 760, 875, 1005, 1150, 1320, 1500, 1700, 1920, 2150, 2380, 2620, 2860, 3080, 3290, 3460], // grams
    //     height: [2, 2, 3, 4, 5, 7, 9, 10, 12, 13, 14, 15, 26, 27, 28, 29, 30, 35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 49, 50, 51, 51] // cm
    // };
    
    // const fetusData = {
    //     fetusWeek: [38, 40], // Weeks provided by user
    //     weight: [0.4, 2], // kg → convert to grams
    //     height: [0.8, 3]  // meters → convert to cm
    // };
    
    // Convert weight (kg to g) and height (m to cm)
    const convertedFetusWeight = fetusData.weight.map(w => w * 1000);
    const convertedFetusHeight = fetusData.height.map(h => h * 100);
    
    // Find min & max weeks
    const minWeek = Math.min(...fetusData.fetusWeek);
    const maxWeek = Math.max(...fetusData.fetusWeek);
    
    // Generate a complete week range from min to max
    const completeWeeks = Array.from(
        { length: maxWeek - minWeek + 1 }, 
        (_, i) => minWeek + i
    );
    
    // Interpolation function
    const interpolate = (x1, y1, x2, y2, x) => {
        return y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);
    };
    
    // Generate interpolated values for missing weeks
    const interpolatedFetusWeight = completeWeeks.map(week => {
        const idx = fetusData.fetusWeek.findIndex(w => w === week);
        if (idx !== -1) return convertedFetusWeight[idx];
    
        // Find surrounding weeks for interpolation
        const lowerWeek = fetusData.fetusWeek[0];
        const upperWeek = fetusData.fetusWeek[1];
    
        return interpolate(lowerWeek, convertedFetusWeight[0], upperWeek, convertedFetusWeight[1], week);
    });
    
    const interpolatedFetusHeight = completeWeeks.map(week => {
        const idx = fetusData.fetusWeek.findIndex(w => w === week);
        if (idx !== -1) return convertedFetusHeight[idx];
    
        // Find surrounding weeks for interpolation
        const lowerWeek = fetusData.fetusWeek[0];
        const upperWeek = fetusData.fetusWeek[1];
    
        return interpolate(lowerWeek, convertedFetusHeight[0], upperWeek, convertedFetusHeight[1], week);
    });
    
    // Get WHO data for these weeks
    const matchedWHOWeights = completeWeeks.map(week => 
        whoData.weight[whoData.fetusWeek.indexOf(week)]
    );
    const matchedWHOHeights = completeWeeks.map(week => 
        whoData.height[whoData.fetusWeek.indexOf(week)]
    );
    const option = {
      
        tooltip: {

            trigger: "axis",
            formatter: function (params) {
                return `
                    <b>Week: ${params[0].axisValue}</b><br/>
                    ⚖️ Fetus Weight: ${params[0].value} g<br/>
                    🔴 WHO Weight: ${params[1].value} g<br/>
                    📏 Fetus Height: ${params[2].value} cm<br/>
                    🟡 WHO Height: ${params[3].value} cm
                `;
            }
        },
        legend: { 
            data: ["Fetus Weight", "WHO Weight", "Fetus Height", "WHO Height"], 
            top: "10px" 
        },
        grid: {
            left: "5%", right: "5%", bottom: "5%", containLabel: true,
        },
        xAxis: {
            type: "category",
            name: "Week",
            nameLocation: "center",
            nameGap: 20,
            data: completeWeeks, // Complete weeks including interpolated ones
        },
        yAxis: [
            {
                type: "value",
                name: "Weight (gram)",
                position: "left",
                axisLabel: { formatter: "{value}" },
            },
            {
                type: "value",
                name: "Height (cm)",
                position: "right",
                axisLabel: { formatter: "{value}" },
            }
        ],
        series: [
            {
                name: "Fetus Weight",
                type: "line",
                yAxisIndex: 0,
                data: interpolatedFetusWeight, // Use interpolated data
                itemStyle: { color: "#3F51B5" }, // Blue
                symbol: "circle",
            },
            {
                name: "WHO Weight",
                type: "line",
                yAxisIndex: 0,
                data: matchedWHOWeights, // WHO data
                itemStyle: { color: "#E91E63" }, // Red
                lineStyle: { type: "dashed" }, // Dashed line
                symbol: "circle",
            },
            {
                name: "Fetus Height",
                type: "line",
                yAxisIndex: 1,
                data: interpolatedFetusHeight, // Use interpolated data
                itemStyle: { color: "#4CAF50" }, // Green
                symbol: "triangle",
            },
            {
                name: "WHO Height",
                type: "line",
                yAxisIndex: 1,
                data: matchedWHOHeights, // WHO data
                itemStyle: { color: "#FFC107" }, // Yellow
                lineStyle: { type: "dashed" }, // Dashed line
                symbol: "triangle",
            }
        ],
    };

    return (
        <div className="container">
            <ReactEcharts option={option} />
        </div>
    );
};

export default ChartContent;
