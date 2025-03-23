import React, { useState } from "react";
import { EditOutlined, DeleteOutlined,InfoCircleOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Input, Form, Tooltip, Popconfirm } from "antd";
import useFetusRecordStore from "../../../zustand/fetusRecordStore";
import { useFetchFetusRecordList } from "../../../hooks/FetusRecordHooks/useGetFetusRecord";
import dayjs from "dayjs";
import { useDeleteFetusRecord } from "../../../hooks/FetusRecordHooks/useDeleteFetusRecord";

export default function FetusRecord({ selectedFetus }) {
  const { fetusRecords, setFetusRecords, updateRecord, deleteRecord } =
    useFetusRecordStore();
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const {mutate: deletFetusRecord} = useDeleteFetusRecord();
  // Lấy danh sách dữ liệu từ Zustand theo fetusId
  const {
    data: records = [],
    isLoading,
    isError,
  } = useFetchFetusRecordList(selectedFetus?.id);
  const today = dayjs().startOf("day");

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
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Tooltip title={record.warningMess || "No warnings"}>
            <Button style={{ backgroundColor: "green" }} type="primary" icon={<InfoCircleOutlined />} size="middle" />
          </Tooltip>
          
          <Popconfirm
          title="Are you sure you want to delete this event?"
          onConfirm={(e) => {
            e.stopPropagation();
            deletFetusRecord(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" size="middle" danger icon={<DeleteOutlined />} onClick={(e) => e.stopPropagation()}>
            
          </Button>
        </Popconfirm>
        </div>
      ),
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
