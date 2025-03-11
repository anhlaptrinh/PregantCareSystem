import React, { useState } from "react";
import { Form, Input, Typography, message as Message } from "antd";
import SigninBackground from "../../../assets/Signin.jpg";
import { useRegister } from "../../../apis/CallAPIUser";

const { Title, Text } = Typography;

export default function Signin({ setActiveTab }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  // Handle existing users

  // Xử lý đăng ký
  const handleSubmit = () => {
    useRegister(user.email, user.password, user.fullname)
      .then((res) => {
        Message.success("Sign in successfully");
        console.log(res.data);
        setTimeout(() => {
          setActiveTab(0);
        }, 1000);
      })
      .catch((error) => {
        Message.error("Failed sign in" + error.message);
      });
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <div className="row justify-content-md-center">
          <div className="col-md-auto mb-3">
            <Title>Sign in</Title>
          </div>
        </div>
        <Text style={{ display: "block", marginBottom: "20px" }}>
          Enter your email to become a new PregnancyCare member
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
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <button className="rts-btn btn-primary" type="submit">
                  Sign in
                </button>
              </div>
            </div>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Text>Already have an account? Log in now!</Text>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <img
          src={SigninBackground}
          alt="Signin background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
