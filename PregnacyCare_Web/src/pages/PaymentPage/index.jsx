import React, { useEffect, useState } from "react";
import {
  Typography,
  InputNumber,
  Select,
  Button,
  Form,
  Layout,
  message,
} from "antd";
import { useCreatePayment } from "../../apis/CallAPIPayment";
import { useGetPackage } from "../../apis/CallAPIPackage";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const PaymentPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [packageDetail, setPackageDetail] = useState(null);
  const { id } = useParams();

  const onFinish = async (values) => {
    setLoading(true);
    console.log(id);
    localStorage.setItem("PACKAGE_ID", JSON.stringify(id));
    try {
      const amount = parseFloat(packageDetail.price);
      // Gọi API tạo payment
      const response = await useCreatePayment(amount, values.currency);

      if (!response) {
        throw new Error("Invalid response from API");
      }

      // Tìm link 'approval_url' để redirect người dùng đến PayPal
      const approvalLink = response.links?.find(
        (link) => link.rel === "approval_url"
      );

      if (approvalLink) {
        message.success("Redirecting to PayPal...");
        window.location.href = approvalLink.href; // Chuyển hướng người dùng
      } else {
        throw new Error("Approval URL not found in PayPal response");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      message.error(`Payment error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await useGetPackage(id);
        setPackageDetail(res);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackage();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <div
        style={{
          maxWidth: 400,
          margin: "100px auto",
          padding: 24,
          background: "white",
          borderRadius: 8,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3}>Confirm package information</Title>
        <Text type="secondary">
          You will be redirected to PayPal to complete your payment.
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 24 }}
        >
          <Form.Item label="Package Name" name="name">
            <Text type="primary">{packageDetail?.name}</Text>
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Text type="primary">{packageDetail?.price}</Text>
          </Form.Item>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: "Please select a currency" }]}
          >
            <Select placeholder="Select a currency">
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="EUR">EUR</Select.Option>
              <Select.Option value="JPY">JPY</Select.Option>
              <Select.Option value="VND">VND</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Processing..." : "Pay with PayPal"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default PaymentPage;
