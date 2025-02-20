import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Link,
} from "@mui/material";
import { Form, Input } from "antd";

export default function Login({ open, onClose }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    alert(user.email + " " + user.password);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      }}
    >
      {/* Title */}
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: 40 }}
      >
        Welcome back
      </DialogTitle>

      {/* Main conntent */}
      <DialogContent>
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Enter your email to log in to your PregnancyCare account
        </Typography>
        <Form name="login_form">
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Email is incorrect!",
              },
              {
                required: true,
                message: "Please enter email!",
              },
            ]}
            style={{ marginBottom: 35 }}
          >
            <Input
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={{ fontSize: 15, height: 40 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
            style={{ marginBottom: 45 }}
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              style={{ fontSize: 15, height: 40 }}
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
      </DialogContent>

      {/* Link */}
      <DialogActions
        sx={{ flexDirection: "column", alignItems: "stretch", pb: 3 }}
      >
        <Typography variant="h5" align="center">
          New to Pregnancy Care?
        </Typography>
      </DialogActions>
    </Dialog>
  );
}
