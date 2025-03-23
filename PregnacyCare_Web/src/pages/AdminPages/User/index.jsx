"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Typography,
  Badge,
  Modal,
  Form,
  message,
  Dropdown,
  Menu,
  Select,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useGetAllUsers } from "../../../apis/CallAPIUser";

const { Title } = Typography;
const { Option } = Select;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form] = Form.useForm();

  // Hàm thay đổi status của user (Active ⇔ Inactive)
  const handleChangeStatus = (record) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === record.id ? { ...user, status: !user.status } : user
      )
    );
    message.success("User status updated!");
  };

  // Cấu hình các cột cho bảng dựa theo JSON mới
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const statusText = status ? "Active" : "Inactive";
        return (
          <Badge status={status ? "success" : "error"} text={statusText} />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              if (key === "edit") {
                handleEditUser(record);
              } else if (key === "delete") {
                handleDeleteUser(record);
              } else if (key === "changeStatus") {
                handleChangeStatus(record);
              }
            }}
            items={[
              { key: "edit", label: "Edit" },
              { key: "delete", label: "Delete" },
              { key: "changeStatus", label: "Change Status" },
            ]}
          />
        );
        return (
          <Dropdown overlay={menu}>
            <Button type="link">Actions</Button>
          </Dropdown>
        );
      },
    },
  ];

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (record) => {
    Modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn xóa user "${record.fullName}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        setUsers((prev) => prev.filter((user) => user.id !== record.id));
        message.success("Xóa user thành công!");
      },
    });
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === editingUser.id ? { ...user, ...values } : user
            )
          );
          message.success("Cập nhật user thành công!");
        } else {
          // Khi tạo mới user, không cần lấy id thủ công; dùng Date.now() hoặc có thể để API trả về id
          const newUser = { ...values, id: Date.now() };
          setUsers((prev) => [...prev, newUser]);
          message.success("Thêm user thành công!");
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Các biến hiệu ứng của Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const navVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  const fetchAllUsers = async () => {
    try {
      const res = await useGetAllUsers();
      if (res.code === 200) {
        // Giả sử API trả về res.data theo định dạng JSON mới
        setUsers(res.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Thanh điều hướng */}
      <motion.nav
        className="navbar navbar-expand-lg navbar-light bg-white border-bottom"
        variants={navVariants}
      >
        <div className="container">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search user..."
            className="w-50"
            style={{ marginRight: "1rem" }}
            size="large"
          />
          <Button type="primary" size="large" onClick={handleAddUser}>
            Add User
          </Button>
        </div>
      </motion.nav>

      {/* Nội dung chính */}
      <Card className="mt-4">
        <Title level={4}>User List</Title>
        <Table
          dataSource={paginatedUsers}
          columns={columns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: users.length,
            onChange: (page) => setCurrentPage(page),
          }}
          bordered
        />
      </Card>

      {/* Modal cho Thêm/Sửa User */}
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter full name",
              },
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Email is not valid!" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="roles"
            label="Roles"
            rules={[{ required: true, message: "Please select role!" }]}
          >
            <Select placeholder="Select role">
              <Option value="ADMIN">Admin</Option>
              <Option value="EXPERT">Expert</Option>
              <Option value="MEMBER">Member</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select placeholder="Select status">
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
}
