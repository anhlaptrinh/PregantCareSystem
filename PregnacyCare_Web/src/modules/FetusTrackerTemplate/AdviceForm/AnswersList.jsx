import { useState } from "react";
import { Card, Button, Input, Collapse } from "antd";

const { TextArea } = Input;
const { Panel } = Collapse;

export default function AnswersList({ questions }) {
    const [newAnswers, setNewAnswers] = useState({});

    const handleAddAnswer = (questionId) => {
        if (newAnswers[questionId]?.trim()) {
            console.log(
                `New answer for question ${questionId}: ${newAnswers[questionId]}`
            );

            setNewAnswers({
                ...newAnswers,
                [questionId]: "",
            });
        }
    };

    if (questions.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                Chưa có câu hỏi nào.
            </div>
        );
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h2
                style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                }}
            >
                Câu hỏi trước đây
            </h2>
            <Collapse accordion>
                {questions.map((question) => (
                    <Panel
                        header={
                            <div>
                                <strong>{question.title}</strong>
                                <p style={{ fontSize: "12px", color: "#888" }}>
                                    {new Date(
                                        question.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        }
                        key={question.id}
                    >
                        <Card>
                            <p>{question.description}</p>

                            {question.answers.length > 0 ? (
                                <div style={{ marginTop: "10px" }}>
                                    <h4>Trả lời:</h4>
                                    {question.answers.map((answer) => (
                                        <Card
                                            key={answer.id}
                                            style={{
                                                marginBottom: "10px",
                                                background: "#f9f9f9",
                                            }}
                                        >
                                            <p>{answer.content}</p>
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#888",
                                                }}
                                            >
                                                {new Date(
                                                    answer.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ fontSize: "14px", color: "#888" }}>
                                    Chưa có câu trả lời nào.
                                </p>
                            )}

                            <div style={{ marginTop: "10px" }}>
                                <TextArea
                                    placeholder="Viết câu trả lời..."
                                    value={newAnswers[question.id] || ""}
                                    onChange={(e) =>
                                        setNewAnswers({
                                            ...newAnswers,
                                            [question.id]: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                                <Button
                                    type="primary"
                                    onClick={() => handleAddAnswer(question.id)}
                                    disabled={!newAnswers[question.id]?.trim()}
                                    block
                                    style={{ marginTop: "10px" }}
                                >
                                    Gửi câu trả lời
                                </Button>
                            </div>
                        </Card>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
}
