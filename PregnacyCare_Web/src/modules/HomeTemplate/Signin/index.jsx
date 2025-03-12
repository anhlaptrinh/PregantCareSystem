import React, { useState } from "react";
<<<<<<< HEAD
import { Form, Input, Typography, message as Message } from "antd";
import SigninBackground from "../../../assets/Signin.jpg";
import { useRegister } from "../../../apis/CallAPIUser";
import BackdropLoader from "../../../component/BackdropLoader";

const { Title, Text } = Typography;

export default function Signin({ setActiveTab }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  // Xử lý đăng ký
  const handleSubmit = () => {
    setLoading(true);
    useRegister(user.email, user.password, user.fullname)
      .then((res) => {
        Message.success("Sign in successfully");
        setActiveTab(0);
        setLoading(false);
      })
      .catch((error) => {
        Message.error("Failed sign in" + error.message);
        setLoading(false);
      });
=======
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
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
<<<<<<< HEAD
      <BackdropLoader open={loading} />
      <div style={{ flex: 1, padding: "20px" }}>
        <div className="row justify-content-md-center">
          <div className="col-md-auto mb-3">
=======
      {/* Login form */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div class="row justify-content-md-center">
          <div class="col-md-auto mb-3">
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
            <Title>Sign in</Title>
          </div>
        </div>
        <Text style={{ display: "block", marginBottom: "20px" }}>
          Enter your email to become a new PregnancyCare member
        </Text>
<<<<<<< HEAD
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: "Please enter full name!" }]}
            style={{ marginBottom: 35 }}
          >
            <Input
              placeholder="Full name"
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              style={{ height: 50, fontSize: 16 }}
            />
          </Form.Item>
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
<<<<<<< HEAD
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <button className="rts-btn btn-primary" type="submit">
=======
            <div class="row justify-content-md-center">
              <div class="col-md-auto">
                <button
                  className="rts-btn btn-primary"
                  onClick={() => handleSubmit()}
                >
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
                  Sign in
                </button>
              </div>
            </div>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
<<<<<<< HEAD
          <Text>Already have an account? Log in now!</Text>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <img
          src={SigninBackground}
          alt="Signin background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
=======
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
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
        />
      </div>
    </div>
  );
}
