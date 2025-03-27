import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useCreateUserPackage } from "../../../apis/CallAPIPayment";

const { Title, Text } = Typography;

const PaymentSuccess = () => {
  const { paymentId } = useParams(); // Lấy paymentId từ URL

  useEffect(() => {
    // Call API để lưu lại và đưa user đã thanh toán vào danh sách đã thanh toán
    const savePayment = async (paymentId) => {
      const storedPackageId = localStorage.getItem("PACKAGE_ID");
      const packageId = JSON.parse(storedPackageId);
      try {
        const res = await useCreateUserPackage(packageId);
        console.log(res);
        if (res.code === 200) {
          console.log("Payment saved successfully");
        }
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    };
    savePayment(paymentId);
  }, []);

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
          <CheckCircleOutlined style={{ fontSize: 50, color: "#52c41a" }} />
        </motion.div>
        <Title level={3}>Payment Successful</Title>
        <Text type="secondary">Your payment was processed successfully.</Text>
        <div style={{ marginTop: 20, textAlign: "left" }}>
          <p>
            <b>Transaction ID:</b> {paymentId}
          </p>
          <p>
            <b>Status:</b> Completed
          </p>
          <p>
            <b>Date:</b> {new Date().toLocaleString()}
          </p>
        </div>
        <Button type="primary" href="/" style={{ marginTop: 20 }}>
          Back to Home
        </Button>
      </Card>
    </motion.div>
  );
};

export default PaymentSuccess;
