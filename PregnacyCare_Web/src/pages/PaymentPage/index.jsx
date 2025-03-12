import { useState } from "react";
import { Typography, Input, Select, Checkbox, Button, Space, Radio, Row, Col, Form, DatePicker } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

const { Text } = Typography;

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div style={{ width: "50%", margin: "50px auto" }}>
      <Form layout="vertical">
        <Row gutter={[8, 0]}>
          <Col span={24} style={{ marginBottom: "12px" }}>
            <div>
              <CreditCardOutlined style={{ marginRight: 8, color: "#3CB4AC", fontSize: "20px" }} />
              <span style={{ fontSize: "18px", fontWeight: 700 }}>Payment method</span>
            </div>
            <Text type="secondary">Ad enim veniam amet</Text>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <Space size={16}>
                  <Radio value="card" style={{ border: "1px solid rgb(208, 208, 208)", padding: "12px 30px", borderRadius: "12px" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" width={40} style={{ marginRight: 8 }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} style={{ marginRight: 8 }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" width={40} />
                  </Radio>
                  <Radio value="paypal" style={{ border: "1px solid rgb(208, 208, 208)", padding: "12px 30px", borderRadius: "12px" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png" alt="paypal" style={{ marginRight: 8, width: "90px", height: "38px" }} />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Name on card"
            >
              <Input placeholder="Enter name on card" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Card number"
            >
              <Input placeholder="Enter card number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Expiration date"
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="MM/YY"
                format="MM/YY"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="CVV"
            >
              <Input placeholder="Enter CVV" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Checkbox>Use same address as billing info</Checkbox>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
            >
              <Input placeholder="Add address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Zip/Postal code"
            >
              <Input placeholder="Input code" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Country/Region"
            >
              <Select placeholder="Select country/region" style={{ width: "100%" }}>
                <Select.Option value="us">United States</Select.Option>
                <Select.Option value="uk">United Kingdom</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
            <Button className="rts-btn btn-primary">
              Save information
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PaymentPage;
