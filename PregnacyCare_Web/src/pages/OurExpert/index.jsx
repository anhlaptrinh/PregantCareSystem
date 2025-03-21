"use client";

import { useEffect, useState } from "react";
import {
  SearchOutlined,
  CloseCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Input, Tabs, Button, Modal, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import moment from "moment";
import { useGetArticles } from "../../apis/CallAPIBlog";
import BackdropLoader from "../../component/BackdropLoader";

// Tách các variants ra ngoài component
const titleVariants = {
  rest: { color: "#000" },
  hover: { color: "#615EFC" },
};

const underlineVariants = {
  rest: { width: 0 },
  hover: { width: "100%" },
};

export default function OurExpert() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const handleCheckboxChange = (checkedValues) =>
    setSelectedFilters(checkedValues);
  const handleApplyFilters = () => {
    setIsModalVisible(false);
  };
  const handleClearFilters = () => setSelectedFilters([]);

  // Lấy bài viết từ API (dữ liệu bao gồm blogCategory)
  const handleGetArticles = async () => {
    setLoading(true);
    try {
      const res = await useGetArticles();
      if (res.code === 200) {
        setArticles(res.data);
        // Xây dựng filterOptions dựa trên blogCategory có trong bài viết (loại bỏ giá trị null và trùng lặp)
        const options = [
          ...new Set(
            res.data
              .map((article) => article.blogCategory?.name)
              .filter((name) => !!name)
          ),
        ].map((name) => ({ label: name, value: name }));
        setFilterOptions(options);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetArticles();
  }, []);

  // Lọc bài viết dựa trên searchTerm và selectedFilters (so sánh với blogCategory.name)
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedFilters.length === 0 ||
      (article.blogCategory &&
        selectedFilters.includes(article.blogCategory.name));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-4">
      <BackdropLoader open={loading} />
      <div className="relative w-full mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search expert..."
          size="large"
          className="pr-10"
          suffix={
            searchTerm && (
              <CloseCircleOutlined
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              />
            )
          }
        />
      </div>

      <Tabs
        defaultActiveKey="expert"
        items={[{ key: "expert", label: "Expert" }]}
        className="mb-4"
      />

      <div className="flex justify-between items-center mb-4">
        <Button
          icon={<FilterOutlined />}
          onClick={showModal}
          className="flex items-center gap-2"
        >
          Filter
        </Button>
        <span className="text-gray-500 text-sm">
          {`1-${filteredArticles.length} of ${filteredArticles.length}`}
        </span>
      </div>

      <Modal
        title={<h2 className="fw-bold fs-4">Filter</h2>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="apply"
            type="primary"
            onClick={handleApplyFilters}
            className="btn btn-primary rounded-pill w-100 py-2"
          >
            Apply
          </Button>,
          <Button
            key="clear"
            type="link"
            onClick={handleClearFilters}
            className="text-decoration-underline text-primary w-100"
          >
            Clear filter
          </Button>,
        ]}
        closeIcon={<CloseCircleOutlined className="text-muted fs-5" />}
        className="custom-modal"
      >
        <Checkbox.Group
          className="d-flex flex-column gap-2"
          options={filterOptions}
          value={selectedFilters}
          onChange={handleCheckboxChange}
        />
      </Modal>

      <div className="d-flex flex-column gap-4">
        {filteredArticles.map((article) => (
          <article key={article.id} className="border-bottom pb-4">
            <div className="text-secondary small mb-2">
              {article.blogCategory.name}
            </div>
            <Link
              to={`/our-expert/article/${article.slug}`}
              state={{ articleId: article.id }}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                style={{
                  position: "relative",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                <motion.h2
                  className="h5 mb-2"
                  variants={titleVariants}
                  transition={{ duration: 0.2 }}
                >
                  {article.title}
                </motion.h2>
                <motion.div
                  variants={underlineVariants}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: "2px",
                    background: "#1890ff",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                />
              </motion.div>
            </Link>
            <p className="mb-0">{article.description}</p>
            <div className="text-muted small">
              Published on: {moment(article.datePublish).format("MMMM D, YYYY")}
            </div>
            <div className="text-muted small">
              By: {article.user?.fullName || "Unknown"}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
