import React, { useState } from "react";
import { Form, Input, message, Typography } from "antd";
import { useForgotPassword } from "../../../apis/CallAPIUser";
import avatar from "../../../assets/ForgotPassword.jpg";
import { Button, Box } from "@mui/material";

const { Title } = Typography;

const ForgotPassword = ({ setActiveTab }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await useForgotPassword(email);
      if (res.code === 200) {
        message.success(res.message);
        setActiveTab(0);
        setLoading(false);
      } else {
        message.error("Please try again");
        setLoading(false);
      }
    } catch (error) {
      console.log("Please try again");
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <Box
          component="img"
          src={avatar}
          alt="Pregnancy"
          sx={{ width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="col">
        <div className="row justify-content-md-center">
          <div className="col-md-auto mb-3">
            <Title style={{ color: "#615EFC" }}>Forgot Password</Title>
          </div>
        </div>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email!" },
              { type: "email", message: "Email is not correct!" },
            ]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{ height: 50, fontSize: 16 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                width: "100%",
                backgroundColor: "#615EFC",
                borderColor: "#615EFC",
                fontSize: 12,
                py: 1,
                transition: "background-color 0.3s, border-color 0.3s",
                "&:hover": {
                  backgroundColor: "#4a3ecf",
                  borderColor: "#4a3ecf",
                },
              }}
            >
              {loading ? "Logging in..." : "Post"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
