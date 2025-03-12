"use client";

import { useState } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Title, Text } = Typography;
const { Option } = Select;

const questions = [
  {
    id: 1,
    title: "How to boost the immune system for children under 3?",
    description:
      "My child frequently gets sick. Are there any ways to improve their immune system?",
    votes: 30,
    answers: 10,
    views: 2.1,
    tags: ["nutrition", "immune system", "infants"],
    user: "mommycare123",
    time: "1 hour ago",
    solved: true,
  },
  {
    id: 2,
    title: "Is mild fever after vaccination dangerous?",
    description:
      "My baby has a 38°C fever after vaccination. What should I do?",
    votes: 45,
    answers: 20,
    views: 3.5,
    tags: ["vaccine", "fever", "childcare"],
    user: "drsmith",
    time: "4 hours ago",
    solved: false,
  },
  {
    id: 3,
    title: "When should I introduce solid foods to my baby?",
    description:
      "At what age is it safe to start feeding my baby solid foods, and what should I start with?",
    votes: 25,
    answers: 12,
    views: 2.0,
    tags: ["nutrition", "baby food", "weaning"],
    user: "firsttimemom",
    time: "6 hours ago",
    solved: false,
  },
  {
    id: 4,
    title: "How to handle colic in newborns?",
    description:
      "My baby cries excessively at night and seems uncomfortable. Could it be colic?",
    votes: 38,
    answers: 14,
    views: 4.3,
    tags: ["colic", "newborn care", "crying"],
    user: "dadlife2024",
    time: "10 hours ago",
    solved: true,
  },
  {
    id: 5,
    title: "My child has a persistent cough – should I be worried?",
    description:
      "My 3-year-old has had a cough for more than two weeks. Should I see a doctor?",
    votes: 42,
    answers: 18,
    views: 3.8,
    tags: ["cough", "respiratory", "pediatrics"],
    user: "concernedmom",
    time: "1 day ago",
    solved: false,
  },
  {
    id: 6,
    title: "What are the signs of an ear infection in toddlers?",
    description:
      "My toddler keeps pulling at their ear and seems irritable. Could this be an ear infection?",
    votes: 50,
    answers: 22,
    views: 5.1,
    tags: ["ear infection", "toddler health", "ENT"],
    user: "drpaediatrics",
    time: "1 day ago",
    solved: true,
  },
  {
    id: 7,
    title: "How much sleep does my baby need?",
    description:
      "My 6-month-old baby sleeps at odd hours. How much sleep is normal for their age?",
    votes: 28,
    answers: 9,
    views: 2.7,
    tags: ["sleep", "baby care", "development"],
    user: "sleeplessmom",
    time: "2 days ago",
    solved: false,
  },
  {
    id: 8,
    title: "Is it normal for my child to have food allergies?",
    description:
      "My child developed a rash after eating eggs. How do I know if it’s an allergy?",
    votes: 36,
    answers: 15,
    views: 4.0,
    tags: ["food allergies", "rashes", "pediatrics"],
    user: "allergyconcern",
    time: "3 days ago",
    solved: true,
  },
  {
    id: 9,
    title: "What should I do if my child has diarrhea?",
    description:
      "My 2-year-old has had diarrhea for the past two days. Should I be concerned?",
    votes: 44,
    answers: 19,
    views: 4.6,
    tags: ["diarrhea", "hydration", "digestive health"],
    user: "worriedparent",
    time: "4 days ago",
    solved: false,
  },
  {
    id: 10,
    title: "How to help my child develop good hygiene habits?",
    description:
      "What’s the best way to teach young children about handwashing and hygiene?",
    votes: 31,
    answers: 11,
    views: 2.9,
    tags: ["hygiene", "parenting", "childcare"],
    user: "healthyhabits",
    time: "5 days ago",
    solved: true,
  },
];

const categories = [
  { name: "All Questions", count: 5.0 },
  { name: "Nutrition", count: 1.8 },
  { name: "Vaccination", count: 1.2 },
  { name: "Common Illnesses", count: 0.9 },
  { name: "Growth & Development", count: 0.7 },
];
const ITEMS_PER_PAGE = 5;

export default function ForumAdmin() {
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleQuickReply = (questionId) => {
    if (activeReplyId === questionId) {
      setActiveReplyId(null);
      setReplyContent("");
    } else {
      setActiveReplyId(questionId);
    }
  };

  const handleSubmitAnswer = (questionId) => {
    message.success(`Trả lời thành công cho câu hỏi ID ${questionId}`);

    setActiveReplyId(null);
    setReplyContent("");
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedQuestions = questions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="">
      {/* Navigation */}

      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3">
            <Card className="border-0 shadow-sm">
              <List
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={(item) => (
                  <List.Item
                    className={`cursor-pointer p-4 ${
                      selectedCategory === item.name ? "bg-light" : ""
                    }`}
                    onClick={() => setSelectedCategory(item.name)}
                  >
                    <Space className="w-100 justify-content-between">
                      <Text>{item.name}</Text>
                      <Badge
                        count={`${item.count}k`}
                        className="site-badge-count-4"
                      />
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Title level={4} className="mb-0">
                {selectedCategory}
              </Title>
              <Space>
                <Text>Sort by:</Text>
                <Select
                  defaultValue="newest"
                  style={{ width: 120 }}
                  onChange={(value) => setSortBy(value)}
                >
                  <Option value="newest">Newest</Option>
                  <Option value="votes">Most Votes</Option>
                  <Option value="answers">Most Answers</Option>
                  <Option value="views">Most Views</Option>
                </Select>
              </Space>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-12 col-md-9">
                  <div className="questions-list">
                    {paginatedQuestions.map((question) => (
                      <Card
                        key={question.id}
                        className="mb-3 border-0 shadow-sm"
                      >
                        <div className="row">
                          <div className="col-auto text-center">
                            <Space
                              direction="vertical"
                              align="center"
                              className="votes"
                            >
                              <Button type="text" icon={<CaretUpOutlined />} />
                              <Text strong>{question.votes}</Text>
                              <Button
                                type="text"
                                icon={<CaretDownOutlined />}
                              />
                            </Space>
                          </div>

                          <div className="col">
                            <Space direction="vertical" className="w-100">
                              <Space align="center">
                                <Title level={5} className="mb-0">
                                  <a href="#" className="text-decoration-none">
                                    {question.title}
                                  </a>
                                </Title>
                                {question.solved && (
                                  <Tooltip title="Solved">
                                    <CheckCircleFilled
                                      style={{
                                        color: "#52c41a",
                                      }}
                                    />
                                  </Tooltip>
                                )}
                              </Space>
                              <Text type="secondary">
                                {question.description}
                              </Text>
                              <Space wrap>
                                {question.tags.map((tag) => (
                                  <Tag key={tag} color="blue">
                                    {tag}
                                  </Tag>
                                ))}
                              </Space>
                              <Space className="w-100 justify-content-between">
                                <Space>
                                  <Avatar
                                    size="small"
                                    src="https://assets.babycenter.com/ims/2022/08/kate-shand-profile-picture.jpg?width=80"
                                  />
                                  <Text type="secondary">
                                    {question.user} • {question.time}
                                  </Text>
                                </Space>
                                <Space size="large">
                                  <MessageOutlined />
                                  <Text type="secondary">
                                    {question.answers} answers
                                  </Text>
                                  <EyeOutlined />
                                  <Text type="secondary">
                                    {question.views}k views
                                  </Text>
                                </Space>
                              </Space>
                              {/* Nút trả lời nhanh từ admin */}
                              <div className="admin-quick-reply mt-2">
                                <Button
                                  type="dashed"
                                  size="small"
                                  onClick={() => handleQuickReply(question.id)}
                                >
                                  Trả lời nhanh từ admin
                                </Button>
                                {activeReplyId === question.id && (
                                  <div className="mt-2">
                                    <ReactQuill
                                      theme="snow"
                                      value={replyContent}
                                      onChange={setReplyContent}
                                      placeholder="Nhập nội dung trả lời..."
                                    />
                                    <Button
                                      type="primary"
                                      className="mt-2"
                                      onClick={() =>
                                        handleSubmitAnswer(question.id)
                                      }
                                    >
                                      Gửi trả lời
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </Space>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Pagination
                    current={currentPage}
                    pageSize={ITEMS_PER_PAGE}
                    total={questions.length}
                    onChange={(page) => setCurrentPage(page)}
                    className="mt-4 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
