import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Input, Form } from "antd";
import useFetusRecordStore from "../../../zustand/fetusRecordStore";
import { useFetchFetusRecordList } from "../../../hooks/FetusRecordHooks/useGetFetusRecord";
import dayjs from "dayjs";

export default function FetusRecord({ selectedFetus }) {
  const { fetusRecords, setFetusRecords, updateRecord, deleteRecord } =
    useFetusRecordStore();
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Lấy danh sách dữ liệu từ Zustand theo fetusId
  const {
    data: records = [],
    isLoading,
    isError,
  } = useFetchFetusRecordList(selectedFetus?.id);
  const today = dayjs().startOf("day");
  console.log("lấy duodjc id ", records);

  const showEditModal = (record) => {
    setEditingRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      updateRecord(selectedFetus.id, editingRecord.id, values);
      setIsModalVisible(false);
      setEditingRecord(null);
    });
  };

  const handleDelete = (recordId) => {
    deleteRecord(selectedFetus.id, recordId);
  };

  const columns = [
    {
      title: "Date Record",
      dataIndex: "dateRecord",
      align: "center",
      key: "dateRecord",
      render: (text) => {
        if (!text) return "N/A";
        const date = new Date(text);
        return new Intl.DateTimeFormat("vi-VN").format(date); // Định dạng theo chuẩn Việt Nam
      },
    },
    {
      title: "Weight (gram)",
      dataIndex: "weight",
      align: "center",
      key: "weight",
      width: 100,
    },
    {
      title: "Height (cm)",
      dataIndex: "height",
      align: "center",
      key: "height",
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 180,
      render: (_, record) => {
        const recordDate = dayjs(record.dateRecord.split("T")[0]);

        return recordDate.isBefore(today) ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center", // Căn giữa nội dung
              alignItems: "center",
              gap: 8,
            }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(record.id)}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center", // Căn giữa nội dung
              alignItems: "center",
              gap: 8,
            }}
          >
            <Button
              onClick={() => showEditModal(record)}
              icon={<EditOutlined />}
              size="small"
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(record.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={records}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 3 }} // Luôn hiển thị 3 dòng
      />
    </>
  );
}
