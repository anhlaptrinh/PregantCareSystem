import React, { useState } from "react";
import {
    Layout,
    Card,
    Table,
    Button,
    Modal,
    Form,
    Input,
    Typography,
    Popconfirm,
    message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

const { Title } = Typography;
const { Content } = Layout;

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([
        {
            key: "1",
            title: "How to Stay Healthy",
            author: "Dr. Smith",
            date: "2024-02-15",
        },
        {
            key: "2",
            title: "Mental Health Awareness",
            author: "Alice Johnson",
            date: "2024-02-18",
        },
        {
            key: "3",
            title: "10 Tips for a Better Sleep",
            author: "James Brown",
            date: "2024-02-20",
        },
        {
            key: "4",
            title: "Understanding Anxiety",
            author: "Sophia White",
            date: "2024-02-22",
        },
        {
            key: "5",
            title: "Benefits of Meditation",
            author: "David Miller",
            date: "2024-02-25",
        },
        {
            key: "6",
            title: "How to Eat Healthy",
            author: "Olivia Davis",
            date: "2024-02-28",
        },
        {
            key: "7",
            title: "Work-Life Balance Tips",
            author: "Michael Lee",
            date: "2024-03-02",
        },
        {
            key: "8",
            title: "Dealing with Stress",
            author: "Emma Wilson",
            date: "2024-03-05",
        },
        {
            key: "9",
            title: "Morning Routines for Productivity",
            author: "Daniel Martinez",
            date: "2024-03-07",
        },
        {
            key: "10",
            title: "Hydration and Health",
            author: "Sophia Brown",
            date: "2024-03-10",
        },
        {
            key: "11",
            title: "The Science Behind Happiness",
            author: "Chris Evans",
            date: "2024-03-12",
        },
        {
            key: "12",
            title: "How to Develop Self-Discipline",
            author: "Natalie Carter",
            date: "2024-03-15",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [form] = Form.useForm();

    const showModal = (blog = null) => {
        setEditingBlog(blog);
        form.setFieldsValue(blog || { title: "", author: "", date: "" });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            if (editingBlog) {
                setBlogs(
                    blogs.map((blog) =>
                        blog.key === editingBlog.key
                            ? { ...values, key: blog.key }
                            : blog
                    )
                );
                message.success("Blog updated successfully!");
            } else {
                setBlogs([
                    ...blogs,
                    { ...values, key: (blogs.length + 1).toString() },
                ]);
                message.success("Blog added successfully!");
            }
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const handleDelete = (key) => {
        setBlogs(blogs.filter((blog) => blog.key !== key));
        message.success("Blog deleted!");
    };

    const columns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Author", dataIndex: "author", key: "author" },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showModal(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh", background: "#fff" }}>
            <Content style={{ padding: "20px" }}>
                <Card style={{ border: "1px solid #ddd" }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Title level={4}>All Blog Posts</Title>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showModal()}
                            style={{ width: "30%" }}
                        >
                            Add Blog
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={blogs}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Content>

            <Modal
                title={editingBlog ? "Edit Blog" : "Add Blog"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            { required: true, message: "Title is required" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="Author"
                        rules={[
                            { required: true, message: "Author is required" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[
                            { required: true, message: "Date is required" },
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default BlogManagement;
