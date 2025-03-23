import React, { useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const { Title } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

// Hàm fetchAllBlogs dùng để gọi API và trả về danh sách blog
const fetchAllBlogs = async () => {
  const res = await useGetAllBlogs();
  if (res.code !== 200) {
    throw new Error("Error fetching blogs");
  }
  return res.data;
};

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
  // State cho việc chọn các hàng (sử dụng id kiểu int)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  // State cho tìm kiếm và filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const queryClient = useQueryClient();

  // Sử dụng useQuery để fetch danh sách blog
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
    staleTime: 1000 * 60 * 5, // dữ liệu fresh trong 5 phút
  });

  // Mutation cho xóa nhiều blog
  const deleteManyMutation = useMutation({
    mutationFn: useDeleteManyBlogs,
    onSuccess: () => {
      message.success("Blog(s) moved to trash!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setSelectedRowIds([]);
    },
    onError: () => {
      message.error("Error deleting blogs!");
    },
  });

  // Mutation cho khôi phục blog
  const restoreMutation = useMutation({
    mutationFn: useRestoreBlog,
    onSuccess: () => {
      message.success("Blog restored!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      message.error("Error restoring blog!");
    },
  });

  // Mutation cho xóa blog vĩnh viễn
  const deletePermanentlyMutation = useMutation({
    mutationFn: useDeleteBlogPermanently,
    onSuccess: () => {
      message.success("Blog permanently deleted!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      message.error("Failed to permanently delete the blog!");
    },
  });

  // Mutation cho publish blog
  const approveMutation = useMutation({
    mutationFn: useApproveBlog,
    onSuccess: () => {
      message.success("Blog published!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      message.error("Error publishing blog!");
    },
  });

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
        deleteManyMutation.mutate(selectedRowIds);
      },
    });
  };

  // Khôi phục blog từ trash
  const handleRestore = (id) => {
    restoreMutation.mutate(id);
  };

  // Xóa blog vĩnh viễn
  const handleDeletePermanently = (id) => {
    Modal.confirm({
      title: "Are you sure you want to permanently delete this blog?",
      async onOk() {
        deletePermanentlyMutation.mutate(id);
      },
    });
  };

  // Publish blog (chuyển từ Pending sang Published)
  const handlePublish = (id) => {
    approveMutation.mutate(id);
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

  if (error) {
    message.error("Error fetching blogs");
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <BackdropLoader open={isLoading} />
      <Content style={{ padding: "20px" }}>
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
