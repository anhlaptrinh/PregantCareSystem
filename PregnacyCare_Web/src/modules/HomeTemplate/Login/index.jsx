import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
import LoginBackground from "../../../assets/Login.jpg";

const { Title, Text } = Typography;

export default function Login({ open, onClose }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    alert(user.email + " " + user.password);
  };

  return (
    <Modal visible={open} onCancel={onClose} footer={null} width={800}>
      <div style={{ display: "flex", height: "100%" }}>
        {/* Image */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <img
            src={LoginBackground}
            alt="Login background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        {/* Login form */}
        <div style={{ flex: 1, padding: "40px" }}>
          <Title level={1}>Login</Title>
          <Text style={{ display: "block", marginBottom: "20px" }}>
            Enter your email to log in to your PregnancyCare account
          </Text>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Email is incorrect!" },
                { required: true, message: "Please enter email!" },
              ]}
              style={{ marginBottom: 35 }}
            >
              <Input
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter password!" }]}
              style={{ marginBottom: 50 }}
            >
              <Input.Password
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item>
              <div class="row justify-content-md-center">
                <div class="col-md-auto">
                  <button
                    className="rts-btn btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </Form.Item>
          </Form>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text>New to Pregnancy Care?</Text>
          </div>
        </div>
      </div>
    </Modal>
  );
}
