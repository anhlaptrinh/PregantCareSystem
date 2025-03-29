import { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select, message } from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useCreateArticle } from "../../../../apis/CallAPIBlog";
import { useGetCategories } from "../../../../apis/CallAPICategory";
import { useUploadImage } from "../../../../apis/CallAPIFirebase";

const { TextArea } = Input;

const ArticleForm = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);

  // Xử lý khi người dùng chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const onFinish = async (values) => {
    setSubmitting(true);
    console.log("Form Values:", values);
    // Chuyển đổi dữ liệu từ form sang cấu trúc article
    const newArticle = {
      title: values.title,
      description: values.description,
      blogCategoryId: values.blogCategoryId,
      articleSections:
        values.sections?.map((section) => ({
          sectionTitle: section.section_title,
          description: section.description,
          displayOrder: Number(section.display_order),
        })) || [],
    };
    try {
      const res = await useCreateArticle(newArticle);
      // Lưu ảnh với tên là article id
      if (res.code == 200) {
        console.log(res.data);
        await useUploadImage(
          `pregnancyCareImages/articles`,
          imageFile,
          res.data.id
        );
      }
      message.success("Article created successfully!");
      setSubmitting(false);
    } catch (err) {
      message.error("Error creating article: " + err.message);
      setSubmitting(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await useGetCategories();
      if (res.code == 200) {
        setCategories(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 800, margin: "0 auto", padding: "24px" }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", mb: 5, color: "#615EFC" }}
      >
        New Article
      </Typography>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title!" }]}
        >
          <Input placeholder="Enter title..." />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <TextArea rows={4} placeholder="Enter description..." />
        </Form.Item>

        <Form.Item
          label="Blog Category"
          name="blogCategoryId"
          rules={[{ required: true, message: "Please select blog category!" }]}
        >
          <Select placeholder="Select blog category">
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Upload Image  */}
        <Form.Item
          label="Upload Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            name="image"
            listType="picture"
            maxCount={1} // Chỉ cho phép upload tối đa 1 ảnh
            onChange={(info) => {
              // Khi có file được chọn (originFileObj chứa file gốc)
              if (info.file.originFileObj) {
                // Tạo đối tượng giả event để gọi handleFileChange
                handleFileChange({
                  target: { files: [info.file.originFileObj] },
                });
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        {/* Dynamic list cho các section */}
        <Form.List name="sections">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={`${field.key}-${index}`}
                  style={{
                    border: "1px solid #d9d9d9",
                    padding: "16px",
                    marginBottom: "16px",
                    borderRadius: "4px",
                  }}
                >
                  <Form.Item
                    {...field}
                    label="Section"
                    name={[field.name, "section_title"]}
                    fieldKey={[field.fieldKey, "section_title"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter section!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter section" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label="Description"
                    name={[field.name, "description"]}
                    fieldKey={[field.fieldKey, "description"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter description for section!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Enter section description"
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label="Display order"
                    name={[field.name, "display_order"]}
                    fieldKey={[field.fieldKey, "display_order"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter display order!",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Enter display order..." />
                  </Form.Item>

                  <Button
                    type="dashed"
                    danger
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Delete section
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add new section
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            htmlType="submit"
            variant="contained"
            disabled={submitting}
            style={{
              width: "100%",
              backgroundColor: "#615EFC",
              color: "white",
              height: 40,
              fontSize: 16,
            }}
          >
            {submitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Post Article"
            )}
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default ArticleForm;
