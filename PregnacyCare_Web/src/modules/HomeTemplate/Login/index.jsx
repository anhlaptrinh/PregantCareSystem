import React, { useState } from "react";
<<<<<<< HEAD
import { Form, Input, Typography, message as Message } from "antd";
import LoginBackground from "../../../assets/Login.png";
import { useLogin } from "../../../apis/CallAPIUser";
import { error } from "jquery";
import { useNavigate } from "react-router-dom";
import BackdropLoader from "../../../component/BackdropLoader";

const { Title, Text } = Typography;

export default function Login({ onClose }) {
  // State
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
=======
import { Form, Input, Typography } from "antd";
import LoginBackground from "../../../assets/LoginBackground.png";

const { Title, Text } = Typography;

export default function Login() {
  // State
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle
  const handleSubmit = () => {
<<<<<<< HEAD
    setLoading(true);
    useLogin(user.email, user.password)
      .then(() => {
        Message.success("Login successful");
        const storedData = localStorage.getItem("USER_TOKEN");
        if (storedData) {
          const user = JSON.parse(storedData);
          onClose();
          navigate("/");
          setLoading(false);
        }
      })
      .catch(() => {
        Message.error("Login failed, please check your email or password ");
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div>
      <BackdropLoader open={loading} />
=======
    alert(user.email + " " + user.password);
  };
  return (
    <div>
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
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
        <div style={{ flex: 1, padding: "20px" }}>
          <div class="row justify-content-md-center">
            <div class="col-md-auto mb-3">
              <Title>Login</Title>
            </div>
          </div>
          <Text style={{ display: "block", marginBottom: "20px" }}>
            Enter your email to log in to your PregnancyCare account
          </Text>
<<<<<<< HEAD
          <Form layout="vertical" onFinish={handleSubmit}>
=======
          <Form layout="vertical" onFinish={() => handleSubmit}>
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
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
<<<<<<< HEAD
                  <button className="rts-btn btn-primary" type="submit">
=======
                  <button
                    className="rts-btn btn-primary"
                    onClick={() => handleSubmit()}
                  >
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
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
    </div>
  );
}
