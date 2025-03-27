import React, { useEffect, useState, useMemo } from "react";
import { Table, Typography, Button, Select, Row, Col, Tag } from "antd";
import {
  InfoOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import moment from "moment";
import MyAdviceDetailModal from "./MyAdviceDetailModal";
import { useGetAllMyAdvices } from "../../../../apis/CallAPIAdvice";
import SearchBar from "../../../../component/SearchBar";

const { Title, Text } = Typography;
const { Option } = Select;

export default function MyAdvices() {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAdvice, setSelectedAdvice] = useState(null);

  // State cho tìm kiếm, filter trạng thái và sắp xếp theo ngày
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateSort, setDateSort] = useState("newest"); // newest hoặc oldest

  const fetchAdvices = async () => {
    try {
      const res = await useGetAllMyAdvices();
      if (res.code === 200) {
        setAdvices(res.data);
      }
    } catch (error) {
      console.error("Error fetching advices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvices();
  }, []);

  // Lọc và sắp xếp advices theo từ khóa tìm kiếm, trạng thái và ngày publish
  const filteredAdvices = useMemo(() => {
    let filtered = advices;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (advice) =>
          (advice.title && advice.title.toLowerCase().includes(term)) ||
          (advice.expert &&
            advice.expert.fullName &&
            advice.expert.fullName.toLowerCase().includes(term)) ||
          (advice.fetus &&
            advice.fetus.name &&
            advice.fetus.name.toLowerCase().includes(term))
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((advice) =>
        filterStatus === "answered"
          ? advice.status === true
          : advice.status === false
      );
    }
    // Sắp xếp theo datePublish: newest hoặc oldest
    filtered.sort((a, b) => {
      // Nếu một trong số datePublish bị thiếu, đẩy ra cuối danh sách
      if (!a.datePublish) return 1;
      if (!b.datePublish) return -1;
      return dateSort === "newest"
        ? new Date(b.datePublish) - new Date(a.datePublish)
        : new Date(a.datePublish) - new Date(b.datePublish);
    });
    return filtered;
  }, [advices, searchTerm, filterStatus, dateSort]);

  const columns = [
    {
      title: "",
      key: "id",
      render: (_, record, index) => (
        <Text style={{ fontSize: "1.5rem" }}>{index + 1}</Text>
      ),
    },
    {
      title: (
        <>
          <FileTextOutlined style={{ marginRight: 4 }} />
          Title
        </>
      ),
      dataIndex: "title",
      key: "title",
      render: (text) => <Text style={{ fontSize: "1.5rem" }}>{text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status ? "green" : "volcano"}
          style={{ fontSize: "1.5rem" }}
        >
          {status ? "Answered" : "Pending"}
        </Tag>
      ),
    },
    {
      title: (
        <>
          <UserOutlined style={{ marginRight: 4 }} />
          Expert
        </>
      ),
      dataIndex: ["expert", "fullName"],
      key: "expert",
      render: (fullName) =>
        fullName ? (
          <Text style={{ fontSize: "1.5rem" }}>{fullName}</Text>
        ) : (
          <Tag color="volcano" style={{ fontSize: "1.5rem" }}>
            Not yet
          </Tag>
        ),
    },
    {
      title: "Pregnancy",
      dataIndex: ["fetus", "name"],
      key: "fetus",
      render: (name) => <Text style={{ fontSize: "1.5rem" }}>{name}</Text>,
    },
    {
      title: (
        <>
          <CalendarOutlined style={{ marginRight: 4 }} />
          Date Published
        </>
      ),
      dataIndex: "datePublish",
      key: "datePublish",
      render: (datePublish) => (
        <Text style={{ fontSize: "1.5rem" }}>
          {datePublish ? moment(datePublish).format("MMMM D, YYYY") : "not yet"}
        </Text>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Button
          type="link"
          icon={
            <InfoOutlined style={{ fontSize: "1.2rem", color: "#615EFC" }} />
          }
          onClick={() => {
            setSelectedAdvice(record);
            setModalVisible(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: "#615EFC" }}
      >
        <Title
          style={{
            fontSize: "1.75rem",
            fontWeight: "bold",
            color: "#615EFC",
            marginBottom: "16px",
          }}
        >
          My Advices
        </Title>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12}>
            <SearchBar
              onSearch={(term) => setSearchTerm(term)}
              placeholder="Search by title, expert or pregnancy..."
            />
          </Col>
          <Col xs={24} sm={6}>
            <Select
              defaultValue="all"
              style={{ width: "100%", fontSize: "1.2rem" }}
              onChange={(value) => setFilterStatus(value)}
            >
              <Option value="all">All Status</Option>
              <Option value="answered">Answered</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Col>
          <Col xs={24} sm={6}>
            <Select
              defaultValue="newest"
              style={{ width: "100%", fontSize: "1.2rem" }}
              onChange={(value) => setDateSort(value)}
            >
              <Option value="newest">Newest</Option>
              <Option value="oldest">Oldest</Option>
            </Select>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={filteredAdvices}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </motion.div>
      <MyAdviceDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        advice={selectedAdvice}
      />
    </>
  );
}
