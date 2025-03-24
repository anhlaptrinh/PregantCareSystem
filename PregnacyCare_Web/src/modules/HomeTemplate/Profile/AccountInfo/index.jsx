import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";
import { useUpdateUser, useUserInfo } from "../../../../apis/CallAPIUser";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import { Box, Container } from "@mui/material";
import BackdropLoader from "../../../../component/BackdropLoader";
import ChangePassword from "./ChangePassword";
import { useQuery } from "@tanstack/react-query";

export default function AccountInfo() {
  const [form] = Form.useForm();
  // local state chỉ dùng để lưu file image khi upload
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const defaultAvatar = avatar;
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Sử dụng React Query để lấy thông tin user
  const {
    data: userData,
    isLoading: loadingUser,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await useUserInfo();
      if (res.code === 200 && res.data) return res.data;
      throw new Error("Error fetching user info");
    },
    staleTime: 1000 * 60 * 5, // dữ liệu fresh trong 5 phút
  });

  // Lấy ảnh từ Firebase dựa trên user id
  const handleGetImage = async (id) => {
    const storageRef = ref(storage, `pregnancyCareImages/users/${id}`);
    try {
      const downloadURL = await getDownloadURL(storageRef);
      if (downloadURL) {
        form.setFieldsValue({ imageUrl: downloadURL });
      }
    } catch (error) {
      form.setFieldsValue({ imageUrl: defaultAvatar });
    }
  };

  // Khi userData thay đổi, set dữ liệu vào form
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        fullName: userData.fullName,
        email: userData.email,
      });
      handleGetImage(userData.id);
    }
  }, [userData, form]);

  // Upload ảnh lên Firebase nếu có file được chọn
  const handleUpload = async (userId) => {
    if (!imageFile) return;
    const storageRef = ref(storage, `pregnancyCareImages/users/${userId}`);
    try {
      await uploadBytes(storageRef, imageFile);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Xử lý submit form cập nhật thông tin người dùng
  const onFinish = async () => {
    if (!userData) return;
    setLoading(true);
    const data = {
      fullName: form.getFieldValue("fullName"),
      email: form.getFieldValue("email"),
      password: "", // Giữ trống nếu không update password
    };

    try {
      await useUpdateUser(userData.id, data);
      message.success("Updated user successfully");
      if (imageFile) await handleUpload(userData.id);
      refetch();
    } catch (error) {
      console.error("Update error:", error);
      message.error("Update failed");
    }
    setLoading(false);
  };

  return (
    <Container sx={{ width: "50%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <BackdropLoader open={loading || loadingUser} />
        {/* Hiển thị Avatar */}
        <div className="row justify-content-md-center mt-5">
          <div className="col-md-auto">
            <Avatar
              size={80}
              src={form.getFieldValue("imageUrl") || defaultAvatar}
              style={{ marginBottom: 16 }}
            />
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Please enter full name!" }]}
          >
            <Input
              placeholder="Full name"
              style={{ height: 50, fontSize: 16 }}
              onChange={(e) =>
                form.setFieldsValue({ fullName: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter email!" }]}
          >
            <Input
              placeholder="Email"
              style={{ height: 50, fontSize: 16 }}
              onChange={(e) => form.setFieldsValue({ email: e.target.value })}
            />
          </Form.Item>

          {/* Upload ảnh */}
          <Form.Item name="image">
            <Upload
              showUploadList={false}
              beforeUpload={() => false} // Ngăn upload tự động
              onChange={(value) => {
                setImageFile(value.file);
              }}
            >
              <Button icon={<UploadOutlined />}>Update</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="Password"
              disabled
              style={{ height: 50, fontSize: 16 }}
            />
          </Form.Item>

          {/* Link mở modal ChangePassword */}
          <a
            href="#"
            className="text-decoration-underline"
            onClick={(e) => {
              e.preventDefault();
              setShowChangePassword(true);
            }}
          >
            Change password
          </a>

          <Form.Item>
            <div className="row justify-content-center">
              <div className="col-md-auto">
                <button type="submit" className="rts-btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </Form.Item>
        </Form>

        {/* Gọi ChangePasswordModal */}
        <ChangePassword
          visible={showChangePassword}
          onCancel={() => setShowChangePassword(false)}
        />
      </Box>
    </Container>
  );
}
