import ReactEcharts from "echarts-for-react";


const ChartContent = () => {
  const option = {
    title: {
      text: "Fetus Growth Chart",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Fetus", "WHO Standard"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      name: "Weeks", // Đặt tên cột X
      nameLocation: "middle",
      nameGap: 20,
      data: ["4", "8", "12", "16", "20", "24", "28"], // Số tuần thai nhi
    },
    yAxis: {
      type: "value",
      name: "Weight (gram)", // Đặt tên cột Y
      nameLocation: "middle",
      nameGap: 22,
      data: ["4", "8", "12", "16", "20"],
    },
    series: [
      {
        name: "Fetus",
        type: "line",
        stack: "Total",
        data: [2, 5, 7, 9, 10, 12, 18], // Cân nặng thực tế của thai nhi theo tuần
      },
      {
        name: "WHO Standard",
        type: "line",
        stack: "Total",
        data: [3, 6, 10, 12, 16, 17, 18], // Chuẩn của WHO
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
