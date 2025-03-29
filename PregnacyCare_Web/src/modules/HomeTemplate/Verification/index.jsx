import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Layout } from "antd";
import { motion } from "framer-motion";
import { useRegister } from "../../../apis/CallAPIUser";
import { useLocation, useNavigate } from "react-router-dom";

const Verification = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { newUser } = location.state || {};

  const onFinish = async (values) => {
    console.log(newUser);
    let role = "";
    setLoading(true);
    try {
      const res = await useRegister(
        newUser.email,
        newUser.password,
        newUser.fullName,
        role,
        values.verificationCode
      );
      if (res.code === 200) {
        message.success("Registration successful. Please login.");
        navigate("/login");
      }
    } catch (e) {
      console.error(
        "Error occurred during verification code submission:",
        e.message
      );
      message.error(
        "Failed to register verification code. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ backgroundColor: "#615EFC", height: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: 700,
          width: "70%",
          margin: "auto auto",
          padding: 50,
          border: "1px solid #f0f0f0",
          borderRadius: 10,
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
          backgroundColor: "white",
        }}
      >
        <Typography.Title level={2}>Confirm Verification Code</Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="verificationCode"
            label="Verification Code"
            rules={[
              {
                required: true,
                message: "Please input the verification code!",
              },
            ]}
          >
            <Input placeholder="Enter the verification code..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}
            >
              Confirm Registration
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </Layout>
  );
};

export default Verification;
