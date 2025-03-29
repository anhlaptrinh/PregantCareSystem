import React, { useEffect } from "react";
import { Table, Card } from "antd";

const columns = [
  {
    title: "Tuần Bắt Đầu",
    dataIndex: "startWeek",
    key: "startWeek",
  },
  {
    title: "Tuần Kết Thúc",
    dataIndex: "endWeek",
    key: "endWeek",
  },
  {
    title: "Tam Cá Nguyệt",
    dataIndex: "trimester",
    key: "trimester",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Ngày Gợi Ý",
    dataIndex: "suggestDate",
    key: "suggestDate",
  },
];

const TimeLine = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, [data]); // Cập nhật dependency để tránh lỗi không cập nhật dữ liệu

  return (
    <Card title="Thông Tin Thai Kỳ">
      <Table
        dataSource={Array.isArray(data) ? data : []}
        columns={columns}
        rowKey="startWeek"
      />
    </Card>
  );
};

export default TimeLine;
