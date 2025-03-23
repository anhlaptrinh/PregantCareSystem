"use client";

import { useState, useMemo } from "react";
import {
  Button,
  Tag,
  Space,
  Select,
  Badge,
  Card,
  Typography,
  Avatar,
  List,
  Pagination,
  Tooltip,
  message,
} from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  MessageOutlined,
  EyeOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import moment from "moment";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllAdvices } from "../../../apis/CallAPIAdvice";
import SearchBar from "../../../component/SearchBar";

const { Title, Text } = Typography;
const { Option } = Select;
const ITEMS_PER_PAGE = 5;

export default function ForumAdmin() {
  const [selectedCategory, setSelectedCategory] = useState("All advices");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize React Query client
  const queryClient = useQueryClient();

  // Use React Query to fetch advices với object syntax
  const {
    data: advices = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["advices"],
    queryFn: async () => {
      const res = await useGetAllAdvices();
      if (res.code !== 200) {
        throw new Error("Error fetching advices");
      }
      return res.data;
    },
  });

  if (isError) {
    message.error(error.message || "Error fetching advices");
  }

  // Tạo danh mục từ advices
  const categories = useMemo(() => {
    const categoryMap = {};
    advices.forEach((advice) => {
      if (advice.blogCategory && advice.blogCategory.name) {
        const catName = advice.blogCategory.name;
        categoryMap[catName] = (categoryMap[catName] || 0) + 1;
      }
    });
    const categoriesArr = [{ name: "All advices", count: advices.length }];
    for (const key in categoryMap) {
      categoriesArr.push({ name: key, count: categoryMap[key] });
    }
    return categoriesArr;
  }, [advices]);

  // Lọc advices theo category và search term
  const filteredAdvices = useMemo(() => {
    let filtered = advices;
    if (selectedCategory !== "All advices") {
      filtered = filtered.filter(
        (advice) =>
          advice.blogCategory && advice.blogCategory.name === selectedCategory
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((advice) =>
        advice.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [advices, selectedCategory, searchTerm]);

  // Sắp xếp theo ngày
  const sortedAdvices = useMemo(() => {
    return [...filteredAdvices].sort((a, b) => {
      return sortBy === "newest"
        ? new Date(b.datePublish) - new Date(a.datePublish)
        : new Date(a.datePublish) - new Date(b.datePublish);
    });
  }, [filteredAdvices, sortBy]);

  // Phân trang
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAdvices = sortedAdvices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <div className="row">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-12 col-md-3"
        >
          <Card className="border-0 shadow-sm">
            <List
              itemLayout="horizontal"
              dataSource={categories}
              renderItem={(item) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List.Item
                    className={`cursor-pointer p-4 ${
                      selectedCategory === item.name ? "bg-light" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(item.name);
                      setCurrentPage(1);
                    }}
                  >
                    <Space className="w-100 justify-content-between">
                      <Text>{item.name}</Text>
                      <Badge count={item.count} />
                    </Space>
                  </List.Item>
                </motion.div>
              )}
            />
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-12 col-md-9"
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Title level={4} className="mb-0">
              {selectedCategory}
            </Title>
            <Space>
              <Text>Sort by:</Text>
              <Select
                defaultValue="newest"
                style={{ width: 120 }}
                onChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
              >
                <Option value="newest">Newest</Option>
                <Option value="oldest">Oldest</Option>
              </Select>
            </Space>
          </div>

          {/* Thêm SearchBar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SearchBar
              onSearch={(term) => {
                setSearchTerm(term);
                setCurrentPage(1);
              }}
              placeholder="Search advices..."
            />
          </motion.div>

          {/* Advices List */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {paginatedAdvices.map((advice) => (
              <motion.div
                key={advice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-3 border-0 shadow-sm">
                  <div className="row">
                    <div className="col-auto text-center">
                      <Space direction="vertical" align="center">
                        <Button type="text" icon={<CaretUpOutlined />} />
                        <Text strong>{advice.status ? 1 : 0}</Text>
                        <Button type="text" icon={<CaretDownOutlined />} />
                      </Space>
                    </div>
                    <div className="col">
                      <Space direction="vertical" className="w-100">
                        <Space align="center">
                          <Title level={5} className="mb-0">
                            <Link
                              to={`/expert/forum/${advice.id}`}
                              className="text-decoration-none"
                            >
                              {advice.title}
                            </Link>
                          </Title>
                          {advice.status && (
                            <Tooltip title="Answered">
                              <CheckCircleFilled style={{ color: "#52c41a" }} />
                            </Tooltip>
                          )}
                        </Space>
                        <Text type="secondary">{advice.description}</Text>
                        <Space wrap>
                          <Tag color="blue">
                            {advice.blogCategory && advice.blogCategory.name}
                          </Tag>
                        </Space>
                        <Space className="w-100 justify-content-between">
                          <Space>
                            <Avatar
                              size="small"
                              src="https://assets.babycenter.com/ims/2022/08/kate-shand-profile-picture.jpg?width=80"
                            />
                            <Text type="secondary">
                              {advice.member && advice.member.fullName} •{" "}
                              {moment(advice.datePublish).fromNow()}
                            </Text>
                          </Space>
                          <Space size="large">
                            <MessageOutlined />
                            <Text type="secondary">
                              {advice.answer ? "1 answer" : "No answer"}
                            </Text>
                            <EyeOutlined />
                          </Space>
                        </Space>
                      </Space>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={filteredAdvices.length}
            onChange={(page) => setCurrentPage(page)}
            className="mt-4 text-center"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
