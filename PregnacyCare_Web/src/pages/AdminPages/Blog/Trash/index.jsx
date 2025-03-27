import React from "react";
import { Table, Button, Popconfirm, Tag, Typography } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { motion } from "framer-motion";

const { Title } = Typography;

// Component motion cho mỗi hàng của bảng
const MotionBodyRow = (props) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {props.children}
    </motion.tr>
  );
};

const Trash = ({ blogs, onRestore, onDeletePermanently }) => {
  // Lọc ra các blog đã bị xóa
  const trashBlogs = blogs.filter((blog) => blog.deleted);

  // Định nghĩa cột cho bảng Trash
  const columns = [
    {
      title: (
        <span>
          <FileTextOutlined style={{ marginRight: 4 }} />
          Title
        </span>
      ),
      dataIndex: "title",
      key: "title",
    },
    {
      title: (
        <span>
          <UserOutlined style={{ marginRight: 4 }} />
          Author
        </span>
      ),
      key: "author",
      render: (_, record) => record.user?.fullName,
    },
    {
      title: (
        <span>
          <CalendarOutlined style={{ marginRight: 4 }} />
          Date Publish
        </span>
      ),
      key: "datePublish",
      render: (_, record) => moment(record.datePublish).format("MMMM D, YYYY"),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const color = record.status ? "green" : "volcano";
        const text = record.status ? "Published" : "Pending";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => onRestore(record.id)}
            style={{ marginRight: 8 }}
          >
            Restore
          </Button>
          <Popconfirm
            title="Are you sure to permanently delete this blog?"
            onConfirm={() => onDeletePermanently(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete Permanently
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>
        Trash Bin
      </Title>
      <Table
        columns={columns}
        dataSource={trashBlogs}
        rowKey={(record) => record.id.toString()} // Chuyển id (int) sang string
        pagination={{ pageSize: 5 }}
        components={{
          body: {
            row: MotionBodyRow,
          },
        }}
      />
    </div>
  );
};

export default Trash;
