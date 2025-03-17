import {
  Box,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import Advertisement from "../../../../component/Advertisement";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import { useGetCategories } from "../../../../apis/CallAPICategory";
import BackdropLoader from "../../../../component/BackdropLoader";
import { useCreateBlog } from "../../../../apis/CallAPIBlog";
import { message as Message } from "antd";
import BackButton from "../../../../component/BackButton";

export default function CreatePostPages() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    groupId: groupId,
    blogCategoryId: 0,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetCategories = async () => {
    setLoading(true);
    const res = await useGetCategories();
    if (res.code === 200 && res.data) {
      setCategories(res.data);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await useCreateBlog(post);
    if (res.code == 200) {
      Message.success("Success!");
      navigate(-1);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <Container>
      <BackdropLoader open={loading} />
      <div className="row">
        <div className="col-8 mt-5">
          <Box>
            <BackButton />
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Create a post
            </Typography>
            <TextField
              className="mb-5"
              placeholder="Post title *"
              multiline
              rows={1}
              fullWidth
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              sx={{
                "& input::placeholder": {
                  fontSize: "3rem",
                },
              }}
            />
            <TextField
              placeholder="Post detail *"
              multiline
              rows={5}
              fullWidth
              inputProps={{ style: { resize: "vertical" } }}
              className="mb-5"
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              sx={{
                "& input::placeholder": {
                  fontSize: "1.5rem",
                },
                "& textarea::placeholder": {
                  fontSize: "1.5rem",
                },
              }}
            />
            {/* Select danh mục */}
            <FormControl fullWidth className="mb-5">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={post.blogCategoryId}
                label="Category"
                onChange={(e) =>
                  setPost({ ...post, blogCategoryId: e.target.value })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="row mb-5">
              <button
                className="rts-btn btn-primary"
                onClick={() => handleSubmit()}
              >
                Create Post
              </button>
            </div>
          </Box>
        </div>
        <div className="col-4">
          <Advertisement />
        </div>
      </div>
    </Container>
  );
}
