import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Space,
  Avatar,
  Badge,
  Button,
  Input,
  Card,
  List,
  Typography,
  message,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  ShareAltOutlined,
  FlagOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { motion } from "framer-motion";
import { useAnswerAdvice } from "../../apis/CallAPIAdvice";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function ForumPostDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Lấy danh sách advices từ cache (dữ liệu mẫu có cấu trúc như JSON bạn cung cấp)
  const cachedAdvices = queryClient.getQueryData(["advices"]);

  if (!cachedAdvices) {
    return <div>Loading advice details...</div>;
  }

  // Tìm advice dựa trên id từ URL
  const adviceDetail = useMemo(
    () => cachedAdvices.find((advice) => advice.id.toString() === id),
    [cachedAdvices, id]
  );

  if (!adviceDetail) {
    return <div>Advice not found</div>;
  }

  // Tạo danh sách related advices bằng cách loại bỏ advice hiện tại
  const relatedAdvices = useMemo(
    () => cachedAdvices.filter((advice) => advice.id.toString() !== id),
    [cachedAdvices, id]
  );

  // Sử dụng local state để lưu trữ câu trả lời của advice
  const [localAnswer, setLocalAnswer] = useState(adviceDetail.answer || "");
  const [newAnswer, setNewAnswer] = useState("");

  const handlePostAnswer = async () => {
    if (newAnswer.trim() === "") {
      message.warning("Please enter an answer before posting.");
      return;
    }
    try {
      const res = await useAnswerAdvice(id, newAnswer);
      if (res.code === 200) {
        setLocalAnswer(newAnswer);
        setNewAnswer("");
        message.success("Your answer has been posted!");

        // Cập nhật status của advice trong cache React Query
        queryClient.setQueryData(["advices"], (oldAdvices) => {
          if (!oldAdvices) return [];
          return oldAdvices.map((advice) => {
            if (advice.id.toString() === id) {
              return {
                ...advice,
                status: true, // Cập nhật status thành true
                answer: newAnswer, // Cập nhật câu trả lời
                answerDate: new Date().toISOString(), // Cập nhật thời gian trả lời
              };
            }
            return advice;
          });
        });
      }
    } catch (e) {
      console.error(e.message);
      message.error("Failed to post answer.");
    }
  };

  // Tính tổng số câu trả lời: 1 nếu localAnswer có giá trị, 0 nếu không
  const totalAnswerCount = localAnswer ? 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-fluid py-4 pe-5"
    >
      <div className="d-flex">
        {/* Sidebar: hiển thị danh sách advices từ cache */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-12 col-md-3"
          style={{ marginRight: "4px" }}
        >
          <Card className="border-0 col-10">
            <List
              itemLayout="horizontal"
              dataSource={cachedAdvices}
              renderItem={(item) => (
                <List.Item className="cursor-pointer p-4">
                  <Space className="w-100 justify-content-between">
                    <Link to={`/expert/forum/${item.id}`}>
                      <Text>{item.title}</Text>
                    </Link>
                    <Badge
                      count={
                        item.blogCategory
                          ? item.blogCategory.name
                          : "Uncategorized"
                      }
                    />
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col mt-3"
        >
          {/* Question Header */}
          <motion.div
            className="row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="col-auto d-flex flex-column align-items-center">
              <Button type="text" shape="circle" icon={<LikeOutlined />} />
              <span className="fw-semibold fs-5">
                {adviceDetail.status ? 1 : 0}
              </span>
              <Button type="text" shape="circle" icon={<DislikeOutlined />} />
            </div>
            <div className="col">
              <div className="mb-2">
                {adviceDetail.status && (
                  <Badge color="blue" className="text-dark">
                    <CheckCircleOutlined className="me-1" />
                    Verified Answer
                  </Badge>
                )}
              </div>
              <h1 className="fs-4 fw-bold">{adviceDetail.title}</h1>
              <p className="text-muted">{adviceDetail.description}</p>
              <Space>
                <Avatar
                  size="small"
                  src="https://assets.babycenter.com/ims/2022/08/kate-shand-profile-picture.jpg?width=80"
                />
                <Text type="secondary">
                  {adviceDetail.member && adviceDetail.member.fullName} •{" "}
                  {adviceDetail.datePublish &&
                    moment(adviceDetail.datePublish).fromNow()}
                </Text>
              </Space>
            </div>
          </motion.div>

          <hr className="my-4" />

          {/* Answer Input Section */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="fs-5 fw-semibold">Post Your Answer</h3>
            <TextArea
              rows={4}
              placeholder="Write your answer here..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              disabled={adviceDetail.status}
            />
            <Button
              type="primary"
              className="mt-2"
              style={{ backgroundColor: "#615efc" }}
              onClick={handlePostAnswer}
              disabled={adviceDetail.status}
            >
              Post Answer
            </Button>
          </motion.div>

          {/* Answer List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="fs-5 fw-semibold">{totalAnswerCount} Answers</h2>
            {localAnswer && (
              <motion.div
                className="row mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="col-auto d-flex flex-column align-items-center">
                  <Button type="text" shape="circle" icon={<LikeOutlined />} />
                  <span className="fw-semibold fs-5">-</span>
                  <Button
                    type="text"
                    shape="circle"
                    icon={<DislikeOutlined />}
                  />
                </div>
                <div className="col">
                  <div className="bg-light p-3 rounded">
                    <p>{localAnswer}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                      <Avatar src="https://assets.babycenter.com/ims/2022/08/kate-shand-profile-picture.jpg?width=80" />
                      <div className="ms-2">
                        <p className="mb-0 fw-medium">
                          {adviceDetail.expert
                            ? adviceDetail.expert.fullName
                            : adviceDetail.member.fullName}
                        </p>
                        <p className="mb-0 text-muted small">
                          {adviceDetail.answerDate
                            ? moment(adviceDetail.answerDate).fromNow()
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button type="text" icon={<ShareAltOutlined />}>
                        Share
                      </Button>
                      <Button type="text" icon={<FlagOutlined />}>
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div
            style={{
              width: "100%",
              height: "1px",
              marginTop: "20px",
              backgroundColor: "gray",
            }}
          ></div>

          {/* Related Questions: hiển thị danh sách advices khác */}
          <motion.div
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="fs-5 fw-semibold">Related Questions</h3>
            <List
              itemLayout="horizontal"
              dataSource={relatedAdvices}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Link to={`/expert/forum/${item.id}`}>{item.title}</Link>
                    }
                    description={
                      item.blogCategory && `Category: ${item.blogCategory.name}`
                    }
                  />
                </List.Item>
              )}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
