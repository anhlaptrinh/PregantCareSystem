import React, { useState } from "react";
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
    MessageOutlined,
    FlagOutlined,
    ShareAltOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const categories = [
    { name: "All Questions", count: 5.0 },
    { name: "Nutrition", count: 1.8 },
    { name: "Vaccination", count: 1.2 },
    { name: "Common Illnesses", count: 0.9 },
    { name: "Growth & Development", count: 0.7 },
];

const relatedQuestions = [
    {
        title: "What are the best remedies for baby colic?",
        answers: 8,
        views: "2.5k",
    },
    {
        title: "How can I get my baby to sleep longer at night?",
        answers: 12,
        views: "4.1k",
    },
    {
        title: "Is it normal for a newborn to cry so much?",
        answers: 5,
        views: "1.8k",
    },
    {
        title: "When should I call a doctor about my baby’s crying?",
        answers: 6,
        views: "3.0k",
    },
];

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function ForumPostDetail() {
    const [selectedCategory, setSelectedCategory] = useState("All Questions");
    const [answers, setAnswers] = useState([
        {
            author: "Dr. Rachel",
            time: "8 hours ago",
            content:
                "Here are some tips that might help with colic:\n- Try different holding positions\n- Create a calming environment\n- Use white noise or gentle swaying\n- Consider baby massage\n- Maintain a consistent routine\n\nRemember that colic typically improves by 3-4 months of age. If you're concerned, always consult with your pediatrician.",
            votes: 12,
        },
    ]);
    const [newAnswer, setNewAnswer] = useState("");

    const handlePostAnswer = () => {
        if (newAnswer.trim() === "") {
            message.warning("Please enter an answer before posting.");
            return;
        }

        const newPost = {
            author: "You",
            time: "Just now",
            content: newAnswer,
            votes: 0,
        };

        setAnswers([newPost, ...answers]);
        setNewAnswer("");
        message.success("Your answer has been posted!");
    };

    return (
        <div className="container py-4">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        KidsHealth Q&A
                    </a>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search questions..."
                        className="w-50"
                        style={{ marginRight: "1rem" }}
                        size="large"
                    />
                    <Button
                        type="primary"
                        icon={<QuestionCircleOutlined />}
                        size="large"
                        style={{ backgroundColor: "#615efc", width: "350px" }}
                    >
                        Ask a Question
                    </Button>
                </div>
            </nav>

            <div className="d-flex">
                <div
                    className="col-12 col-md-3"
                    style={{
                        marginRight: "4px",
                    }}
                >
                    <Card className="border-0 ">
                        <List
                            itemLayout="horizontal"
                            dataSource={categories}
                            renderItem={(item) => (
                                <List.Item
                                    className={`cursor-pointer p-4 ${
                                        selectedCategory === item.name
                                            ? "bg-light"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setSelectedCategory(item.name)
                                    }
                                >
                                    <Space className="w-100 justify-content-between">
                                        <Text>{item.name}</Text>
                                        <Badge count={`${item.count}k`} />
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>

                <div className="col mt-3">
                    {/* Question Header */}
                    <div className="row">
                        <div className="col-auto d-flex flex-column align-items-center">
                            <Button
                                type="text"
                                shape="circle"
                                icon={<LikeOutlined />}
                            />
                            <span className="fw-semibold fs-5">38</span>
                            <Button
                                type="text"
                                shape="circle"
                                icon={<DislikeOutlined />}
                            />
                        </div>

                        <div className="col ">
                            <div className="mb-2 ">
                                <Badge color="blue" className="text-dark">
                                    <CheckCircleOutlined className="me-1" />
                                    Verified Answer
                                </Badge>
                            </div>
                            <h1 className="fs-4 fw-bold">
                                How to handle colic in newborns?
                            </h1>
                            <p className="text-muted">
                                My baby cries excessively at night and seems
                                uncomfortable. Could it be colic?
                            </p>
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* Answer Input Section */}
                    <div className="mb-4">
                        <h3 className="fs-5 fw-semibold">Post Your Answer</h3>
                        <TextArea
                            rows={4}
                            placeholder="Write your answer here..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                        />
                        <Button
                            type="primary"
                            className="mt-2 "
                            style={{
                                backgroundColor: "#615efc",
                            }}
                            onClick={handlePostAnswer}
                        >
                            Post Answer
                        </Button>
                    </div>

                    {/* Answer List */}
                    <h2 className="fs-5 fw-semibold">
                        {answers.length} Answers
                    </h2>
                    {answers.map((answer, index) => (
                        <div key={index} className="row mt-3">
                            <div className="col-auto d-flex flex-column align-items-center">
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<LikeOutlined />}
                                />
                                <span className="fw-semibold fs-5">
                                    {answer.votes}
                                </span>
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<DislikeOutlined />}
                                />
                            </div>

                            <div className="col">
                                <div className="bg-light p-3 rounded">
                                    <p>{answer.content}</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="d-flex align-items-center">
                                        <Avatar src="https://assets.babycenter.com/ims/2022/08/kate-shand-profile-picture.jpg?width=80" />
                                        <div className="ms-2">
                                            <p className="mb-0 fw-medium">
                                                {answer.author}
                                            </p>
                                            <p className="mb-0 text-muted small">
                                                {answer.time}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <Button
                                            type="text"
                                            icon={<ShareAltOutlined />}
                                        >
                                            Share
                                        </Button>
                                        <Button
                                            type="text"
                                            icon={<FlagOutlined />}
                                        >
                                            Report
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            marginTop: "20px",
                            backgroundColor: "gray",
                        }}
                    ></div>
                    {/* Related Questions */}
                    <div className="mt-5">
                        <h3 className="fs-5 fw-semibold">Related Questions</h3>
                        <List
                            itemLayout="horizontal"
                            dataSource={relatedQuestions}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href="#">{item.title}</a>}
                                        description={`${item.answers} answers • ${item.views} views`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
