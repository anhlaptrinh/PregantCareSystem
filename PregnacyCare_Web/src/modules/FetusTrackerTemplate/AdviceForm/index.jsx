import { useState } from "react";
import { Tabs } from "antd";
import AskForm from "./AskForm";
import AnswersList from "./AnswersList";

export default function AdviceForm() {
    const [questions, setQuestions] = useState([
        {
            id: "1",
            title: "How to improve my coding skills?",
            description:
                "I'm a beginner in programming and want to know the best way to improve.",
            createdAt: new Date().toISOString(),
            answers: [
                {
                    id: "1",
                    content:
                        "Practice daily, work on small projects, and join coding communities.",
                    createdAt: new Date().toISOString(),
                },
            ],
        },
        {
            id: "2",
            title: "Best resources for learning React?",
            description:
                "I want to learn React but there are so many resources. Which ones are the best?",
            createdAt: new Date().toISOString(),
            answers: [],
        },
    ]);

    const handleSubmitQuestion = (title, description) => {
        const newQuestion = {
            id: (questions.length + 1).toString(),
            title,
            description,
            createdAt: new Date().toISOString(),
            answers: [],
        };
        setQuestions([...questions, newQuestion]);
    };

    return (
        <main style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <Tabs defaultActiveKey="ask" centered>
                <Tabs.TabPane tab="Hỏi đáp" key="ask">
                    <AskForm onSubmit={handleSubmitQuestion} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Xem câu trả lời" key="answers">
                    <AnswersList questions={questions} />
                </Tabs.TabPane>
            </Tabs>
        </main>
    );
}
