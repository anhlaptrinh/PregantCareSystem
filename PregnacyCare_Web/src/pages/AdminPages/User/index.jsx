"use client";

import { useState } from "react";
import {
    Table,
    Input,
    Button,
    Card,
    Typography,
    Space,
    Select,
    Badge,
    Pagination,
    Modal,
    Form,
    message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

// Sample user data ban đầu
const initialUsers = [
    {
        id: 1,
        username: "johnDoe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        registered: "2025-01-01",
    },
    {
        id: 2,
        username: "janeSmith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
        registered: "2025-02-15",
    },
    {
        id: 3,
        username: "alexBrown",
        email: "alex@example.com",
        role: "User",
        status: "Inactive",
        registered: "2025-03-20",
    },
    {
        id: 4,
        username: "mariaGarcia",
        email: "maria@example.com",
        role: "User",
        status: "Active",
        registered: "2025-04-10",
    },
    {
        id: 5,
        username: "lindaLee",
        email: "linda@example.com",
        role: "Moderator",
        status: "Active",
        registered: "2025-05-05",
    },
    {
        id: 6,
        username: "markWong",
        email: "mark@example.com",
        role: "User",
        status: "Inactive",
        registered: "2025-06-01",
    },
];

export default function UserManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [form] = Form.useForm();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 50,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: 150,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            width: 120,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (text) => (
                <Badge
                    status={text === "Active" ? "success" : "error"}
                    text={text}
                />
            ),
        },
        {
            title: "Registered Date",
            dataIndex: "registered",
            key: "registered",
            width: 150,
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEditUser(record)}>
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDeleteUser(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
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
            content: `Bạn có chắc muốn xóa user "${record.username}"?`,
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: () => {
                setUsers((prev) =>
                    prev.filter((user) => user.id !== record.id)
                );
                message.success("Xóa user thành công!");
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                if (editingUser) {
                    setUsers((prev) =>
                        prev.map((user) =>
                            user.id === editingUser.id
                                ? { ...user, ...values }
                                : user
                        )
                    );
                    message.success("Cập nhật user thành công!");
                } else {
                    const newId =
                        users.length > 0
                            ? Math.max(...users.map((u) => u.id)) + 1
                            : 1;
                    const newUser = { id: newId, ...values };
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

    return (
        <div className="container">
            {/* Thanh điều hướng */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm user..."
                        className="w-50"
                        style={{ marginRight: "1rem" }}
                        size="large"
                    />
                    <Button type="primary" size="large" onClick={handleAddUser}>
                        Thêm User
                    </Button>
                </div>
            </nav>

            {/* Nội dung chính */}
            <Card className="mt-4">
                <Title level={4}>Danh sách User</Title>
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
                title={editingUser ? "Chỉnh sửa User" : "Thêm User"}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập username",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                            { required: true, message: "Vui lòng chọn role" },
                        ]}
                    >
                        <Select placeholder="Chọn role">
                            <Option value="Admin">Admin</Option>
                            <Option value="Moderator">Moderator</Option>
                            <Option value="User">User</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                            { required: true, message: "Vui lòng chọn status" },
                        ]}
                    >
                        <Select placeholder="Chọn status">
                            <Option value="Active">Active</Option>
                            <Option value="Inactive">Inactive</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="registered"
                        label="Registered Date"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập ngày đăng ký",
                            },
                        ]}
                    >
                        <Input placeholder="YYYY-MM-DD" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
