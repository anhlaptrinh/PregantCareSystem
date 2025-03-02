import { useState } from "react";
import { Card, Button, Input } from "antd";

const { TextArea } = Input;

export default function AskForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onSubmit(title, description);
            setTitle("");
            setDescription("");
        }
    };

    return (
        <Card title="Đặt câu hỏi">
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <Input
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <TextArea
                        placeholder="Mô tả chi tiết câu hỏi..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        required
                    />
                </div>
                <Button type="primary" htmlType="submit" block>
                    Đăng câu hỏi
                </Button>
            </form>
        </Card>
    );
}
