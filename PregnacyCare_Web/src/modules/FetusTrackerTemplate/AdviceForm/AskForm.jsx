import { useState } from "react";
import { Card, Input } from "antd";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";

const { TextArea } = Input;

export default function AskForm({ onSubmit, categories }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && description.trim() && categoryId) {
      setSubmitting(true);
      await onSubmit(title, description, categoryId);
      setTitle("");
      setDescription("");
      setCategoryId("");
      setSubmitting(false);
    }
  };

  return (
    <Card title="Ask a question">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        {/* Select Category */}
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={submitting}
          style={{
            backgroundColor: "#615EFC",
            height: 40,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {submitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Post question"
          )}
        </Button>
      </form>
    </Card>
  );
}
