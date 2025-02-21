import React, { useState } from "react";
import { Form, Input, Typography } from "antd";
import SigninBackground from "../../../assets/Signin.jpg";

const { Title, Text } = Typography;

export default function Signin() {
  // State
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle
  const handleSubmit = () => {
    alert(user.email + " " + user.password);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Login form */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div class="row justify-content-md-center">
          <div class="col-md-auto mb-3">
            <Title>Sign in</Title>
          </div>
        </div>
        <Text style={{ display: "block", marginBottom: "20px" }}>
          Enter your email to become a new PregnancyCare member
        </Text>
        <Form layout="vertical" onFinish={() => handleSubmit}>
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
                  Sign in
                </button>
              </div>
            </div>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Text>New to Pregnancy Care?</Text>
        </div>
      </div>
      {/* Image */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <img
          src={SigninBackground}
          alt="Login background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
