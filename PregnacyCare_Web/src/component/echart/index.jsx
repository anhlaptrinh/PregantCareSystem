import ReactEcharts from "echarts-for-react";

const ChartContent = () => {
    const option = {
        title: {
            left: "center",
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: ["Label 1", "Label 2", "Label 3"],
            top: "10px",
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["A", "B", "C", "D", "E", "F", "G"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: "Label 1",
                type: "line",
                data: [5, 2, 7, 3, 9, 4, 2],
                itemStyle: { color: "#3F51B5" },
                symbol: "circle",
            },
            {
                name: "Label 2",
                type: "line",
                data: [3, 6, 4, 8, 10, 9, 7],
                itemStyle: { color: "#E91E63" },
                symbol: "circle",
            },
            {
                name: "Label 3",
                type: "line",
                data: [6, 4, 8, 10, 5, 3, 6],
                itemStyle: { color: "#4CAF50" },
                symbol: "circle",
            },
        ],
    };

    return (
        <div className="container">
            <ReactEcharts option={option} />
        </div>
    );
};

export default ChartContent;
