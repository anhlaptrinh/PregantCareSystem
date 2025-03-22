import ReactEcharts from "echarts-for-react";

const ChartContent = () => {
    const option = {
        title: {
           
            left: "center",
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                return `
                    <b>Tuần thai: ${params[0].axisValue}</b> <br/>
                    ⚖️ Cân nặng của bé: ${params[0].value} kg <br/>
                    🔴 Cân nặng WHO: ${params[1].value} kg <br/>
                    📏 Chiều cao của bé: ${params[2].value} cm <br/>
                    🟡 Chiều cao WHO: ${params[3].value} cm
                `;
            },
        },
        legend: {
            data: [
                "Cân nặng của bé", "Cân nặng WHO",
                "Chiều cao của bé", "Chiều cao WHO"
            ],
            top: "10px",
        },
        grid: {
            left: "5%",
            right: "5%",
            bottom: "5%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            name: "Week",
            
            nameLocation: "center",
            
            data: [12, 16, 20, 24, 28, 32, 36, 40], // Giả định các tuần thai
        },
        yAxis: [
            {
                type: "value",
                name: "Weight (gram)",
                position: "left",
                axisLabel: {
                    formatter: "{value} gram",
                },
            },
            {
                type: "value",
                name: "Height (cm)",
                position: "right",
                axisLabel: {
                    formatter: "{value} cm",
                },
            },
        ],
        series: [
            {
                name: "Cân nặng của bé",
                type: "line",
                yAxisIndex: 0,
                data: [0.12, 0.18, 0.35, 0.7, 1.4, 2.2, 2.9, 3.6], // Dữ liệu bé của bạn
                itemStyle: { color: "#3F51B5" }, // Xanh
                symbol: "circle",
            },
            {
                name: "Cân nặng WHO",
                type: "line",
                yAxisIndex: 0,
                data: [0.1, 0.15, 0.3, 0.6, 1.2, 2.0, 2.8, 3.5], // Dữ liệu WHO
                itemStyle: { color: "#E91E63" }, // Đỏ
                lineStyle: { type: "dashed" }, // Đường gạch
                symbol: "circle",
            },
            {
                name: "Chiều cao của bé",
                type: "line",
                yAxisIndex: 1,
                data: [8, 13, 19, 26, 36, 43, 49, 51], // Dữ liệu bé của bạn
                itemStyle: { color: "#4CAF50" }, // Xanh lá
                symbol: "triangle",
            },
            {
                name: "Chiều cao WHO",
                type: "line",
                yAxisIndex: 1,
                data: [8, 12, 18, 25, 35, 42, 48, 50], // Dữ liệu WHO
                itemStyle: { color: "#FFC107" }, // Vàng
                lineStyle: { type: "dashed" }, // Đường gạch
                symbol: "triangle",
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
