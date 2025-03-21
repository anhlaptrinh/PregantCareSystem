import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Table,
  Button,
  Modal,
  Typography,
  Popconfirm,
  message,
  Tag,
  Tabs,
  Select,
  Row,
  Col,
} from "antd";
import {
  DeleteOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import Trash from "./Trash";
import SearchBar from "../../../component/SearchBar";
import {
  useApproveBlog,
  useDeleteBlogPermanently,
  useDeleteManyBlogs,
  useGetAllBlogs,
  useRestoreBlog,
} from "../../../apis/CallAPIBlog";
import BackdropLoader from "../../../component/BackdropLoader";

const { Title } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

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

export default function BlogManagement() {
  // Dữ liệu mẫu (giả sử id là int)
  const [blogs, setBlogs] = useState([]);
  // State cho việc chọn các hàng (sử dụng id kiểu int)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  // State cho tìm kiếm và filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowIds) => {
    setSelectedRowIds(newSelectedRowIds);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: onSelectChange,
  };
  const handleDeleteSelected = () => {
    Modal.confirm({
      title: "Are you sure you want to delete the selected blogs?",
      async onOk() {
        try {
          // Gọi API xóa nhiều blog với mảng id
          await useDeleteManyBlogs(selectedRowIds);
          // Cập nhật lại danh sách blogs (đánh dấu là deleted)
          setBlogs(
            blogs.map((blog) =>
              selectedRowIds.includes(blog.id)
                ? { ...blog, deleted: true }
                : blog
            )
          );
          setSelectedRowIds([]);
          message.success("Blog(s) moved to trash!");
        } catch (error) {
          console.log(error.message);
          message.error("Error deleting blogs!");
        }
      },
    });
  };

  // Khôi phục blog đã bị đưa vào trash
  const handleRestore = async (id) => {
    try {
      const res = await useRestoreBlog(id);
      if (res.code == 200) {
        message.success("Blog restored!");
        setBlogs(
          blogs.map((blog) =>
            blog.id === id ? { ...blog, deleted: false } : blog
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Xóa blog vĩnh viễn
  const handleDeletePermanently = (id) => {
    Modal.confirm({
      title: "Are you sure you want to permanently delete this blog?",
      async onOk() {
        try {
          const res = await useDeleteBlogPermanently(id);
          if (res.code === 200) {
            message.success("Blog permanently deleted!");
            // Cập nhật lại state hoặc thực hiện các hành động cần thiết khác
            setBlogs(blogs.filter((blog) => blog.id !== id));
          }
        } catch (error) {
          message.error("Failed to permanently delete the blog!");
        }
      },
    });
  };

  //  Nút Publish để chuyển từ Pending sang Published
  const handlePublish = async (id) => {
    try {
      const res = await useApproveBlog(id);
      if (res.code == 200) {
        await handleGetAllBlogs();
        message.success("Blog published!");
      }
    } catch (err) {
      console.log(err);
      message.error("Error publishing blog!");
    }
  };

  // Định nghĩa cột cho bảng Active Blogs
  const columnsActive = [
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
      render: (_, record) => (
        <Tag color={record.status ? "green" : "volcano"}>
          {record.status ? "Published" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        !record.status ? (
          <Button onClick={() => handlePublish(record.id)}>Publish</Button>
        ) : null,
    },
  ];

  // Lọc dữ liệu active
  let activeBlogs = blogs.filter((blog) => !blog.deleted);
  if (searchTerm) {
    activeBlogs = activeBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (filterStatus !== "all") {
    activeBlogs = activeBlogs.filter((blog) =>
      filterStatus === "published"
        ? blog.status === true
        : blog.status === false
    );
  }

  // Lấy toàn bộ blog (post and articles)
  const handleGetAllBlogs = async () => {
    setLoading(true);
    try {
      const res = await useGetAllBlogs();
      if (res.code === 200) {
        setBlogs(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllBlogs();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <BackdropLoader open={loading} />
      <Content style={{ padding: "20px" }}>
        {/* Bọc nội dung chính trong motion.div */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card style={{ border: "1px solid #ddd" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Title level={4} style={{ margin: 0 }}>
                <FileTextOutlined style={{ marginRight: 8 }} />
                All Blog (Posts and Articles)
              </Title>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Active Blogs" key="1">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={16}>
                    <SearchBar
                      placeholder="Search by title or author..."
                      onSearch={(term) => setSearchTerm(term)}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <Select
                      defaultValue="all"
                      style={{ width: "100%" }}
                      onChange={(value) => setFilterStatus(value)}
                    >
                      <Option value="all">All Status</Option>
                      <Option value="published">Published</Option>
                      <Option value="pending">Pending</Option>
                    </Select>
                  </Col>
                </Row>
                {selectedRowIds.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <Popconfirm
                      title="Are you sure you want to delete the selected blogs?"
                      onConfirm={handleDeleteSelected}
                    >
                      <Button icon={<DeleteOutlined />} danger>
                        Delete Selected
                      </Button>
                    </Popconfirm>
                  </div>
                )}
                <Table
                  columns={columnsActive}
                  dataSource={activeBlogs}
                  rowSelection={rowSelection}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  components={{
                    body: {
                      row: MotionBodyRow,
                    },
                  }}
                />
              </TabPane>
              <TabPane tab="Trash" key="2">
                <Trash
                  blogs={blogs}
                  onRestore={handleRestore}
                  onDeletePermanently={handleDeletePermanently}
                />
              </TabPane>
            </Tabs>
          </Card>
        </motion.div>
      </Content>
    </Layout>
  );
}
