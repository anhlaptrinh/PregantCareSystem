import React from "react";
import { Layout, Card, Table, Typography, Menu, message } from "antd";
import {
    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "chart.js/auto";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const columns = [
    { title: "Patient", dataIndex: "patient", key: "patient" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
];

const data = [
    {
        key: "1",
        patient: "Sarah Johnson",
        date: "2024-02-24",
        status: "Scheduled",
    },
    {
        key: "2",
        patient: "Emily Davis",
        date: "2024-02-25",
        status: "Completed",
    },
    {
        key: "3",
        patient: "Maria Garcia",
        date: "2024-02-26",
        status: "Cancelled",
    },
    {
        key: "4",
        patient: "Lisa Wilson",
        date: "2024-02-27",
        status: "Scheduled",
    },
];

// Dữ liệu biểu đồ
const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Appointments Overview",
            data: [200, 320, 280, 450, 350, 470, 390],
            backgroundColor: "rgba(0, 123, 255, 0.7)",
            borderRadius: 5,
        },
    ],
};

const Dashboard = () => {
    return (
        <Layout>
            <Content style={{ padding: "20px", background: "#fff" }}>
                <div className="row">
                    {/* Cards */}
                    <div className="col-md-3">
                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #ddd",
                            }}
                        >
                            <Title level={4}>Total Users</Title>
                            <Title level={2}>3000</Title>
                        </Card>
                    </div>
                    <div className="col-md-3">
                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #ddd",
                            }}
                        >
                            <Title level={4}>Active Appointments</Title>
                            <Title level={2}>145</Title>
                        </Card>
                    </div>
                    <div className="col-md-3">
                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #ddd",
                            }}
                        >
                            <Title level={4}>Blog Posts</Title>
                            <Title level={2}>432</Title>
                        </Card>
                    </div>
                    <div className="col-md-3">
                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #ddd",
                            }}
                        >
                            <Title level={4}>Active Subscriptions</Title>
                            <Title level={2}>89</Title>
                        </Card>
                    </div>
                </div>

                {/* Overview Chart and Recent Appointments */}
                <div className="row mt-4">
                    <div className="col-md-6">
                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #ddd",
                            }}
                        >
                            <Title level={4}>Overview</Title>
                            <Bar data={chartData} />
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #ddd",
                            }}
                        >
                            <Title level={4}>Recent Appointments</Title>
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                            />
                        </Card>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Dashboard;
