import React from "react";
import { Typography, Card, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const PaymentFailure = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 500, margin: "50px auto", textAlign: "center" }}
    >
      <Card
        style={{
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <CloseCircleOutlined style={{ fontSize: 50, color: "#ff4d4f" }} />
        </motion.div>
        <Title level={3} style={{ color: "#ff4d4f" }}>
          Payment Failed
        </Title>
        <Text type="secondary">Your payment could not be processed.</Text>
        <div style={{ marginTop: 20, textAlign: "left" }}>
          <p>
            <b>Possible Reasons:</b>
          </p>
          <ul style={{ textAlign: "left", paddingLeft: 20 }}>
            <li>Insufficient funds</li>
            <li>Payment declined by bank</li>
            <li>Technical issues</li>
          </ul>
        </div>
        <Button type="primary" href="/" style={{ marginTop: 20 }}>
          Try Again
        </Button>
      </Card>
    </motion.div>
  );
};

export default PaymentFailure;
