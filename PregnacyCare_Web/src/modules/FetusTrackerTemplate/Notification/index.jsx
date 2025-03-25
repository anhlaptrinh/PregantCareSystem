import {
  Form,
  DatePicker,
  InputNumber,
  Alert,
  Select,
  Row,
  Col,
  Spin,
  Image,
  Button,
  Typography,
  Divider,
} from "antd";
import FetusRecord from "../FetusRecord";
import { useCreateFetusRecord } from "../../../hooks/FetusRecordHooks/useCreateFetusRecord";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import FlexModal from "../../../component/FlexModal";

const { Title, Text } = Typography;
const FetusInput = ({ selectedFetus }) => {
  const [form] = Form.useForm();
  const { mutate: createFetusRecord } = useCreateFetusRecord();

  const handleCalculate = () => {
    form.validateFields().then((values) => {
      const { weight, height, dateRecord } = values;
      const localDate = new Date(dateRecord);
      localDate.setMinutes(
        localDate.getMinutes() - localDate.getTimezoneOffset()
      );
      // Chuyển đổi giá trị sang định dạng phù hợp với BE
      const payload = {
        id: 0,
        weight,
        height,
        dateRecord: localDate.toISOString(), // Chuyển đổi sang LocalDateTime
      };
      if (selectedFetus?.id) {
        //    console.log(selectedFetus.id);
        createFetusRecord({ id: selectedFetus.id, data: payload });
      }
    });
  };

  useEffect(() => {
    // Thiết lập giá trị mặc định cho dateRecord là ngày hiện tại
    form.setFieldsValue({ dateRecord: dayjs() });
  }, []);
  return (
    <div style={{ maxWidth: 1000, margin: "10px auto", position: "relative" }}>
      <FetusRecord selectedFetus={selectedFetus} />

      {/* Ảnh minh họa - đường dẫn tượng trưng */}
      <Image
        src="path/to/top-image.png"
        preview={false}
        style={{
          position: "absolute",
          right: -120,
          top: 0,
          width: 100,
          height: 100,
        }}
      />

      <div style={{ maxWidth: 500, padding: 24, backgroundColor: "white" }}>
        <Title level={4} style={{ marginBottom: 24, fontWeight: 500 }}>
          Fetus Record
        </Title>

        <Form form={form} layout="vertical">
          {/* Weight Field */}
          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true }]}
            style={{ marginBottom: 16 }}
          >
            <Row gutter={8}>
              <Col span={16}>
                <InputNumber
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#f9fafb",
                  }}
                  min={0}
                  defaultValue={0.0}
                  step={0.1}
                  precision={1}
                />
              </Col>
              <Col span={8}>
                <Select defaultValue="lb" style={{ width: "100%", height: 40 }}>
                  <Select.Option value="lb">lb</Select.Option>
                  <Select.Option value="kg">kg</Select.Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>

          {/* Height Field */}
          <Form.Item
            label="Height"
            name="height"
            rules={[{ required: true }]}
            style={{ marginBottom: 16 }}
          >
            <Row gutter={8} align="middle">
              <Col span={16}>
                <InputNumber
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#f9fafb",
                  }}
                  min={0}
                  defaultValue={0.0}
                  step={0.1}
                  precision={1}
                />
              </Col>
              <Col span={8}>
                <Select
                  defaultValue="inch"
                  style={{ width: "100%", height: 40 }}
                >
                  <Select.Option value="inch">inch</Select.Option>
                  <Select.Option value="cm">cm</Select.Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Date Record" name="dateRecord">
            <DatePicker showTime disabled />
          </Form.Item>

          <Divider style={{ margin: "24px 0" }} />

          {/* Notification Section */}

          {/* Update Button */}
          <Button
            type="primary"
            size="large"
            block
            onClick={handleCalculate}
            style={{
              height: 44,
              backgroundColor: "#6366f1",
              borderColor: "#6366f1",
            }}
          >
            Create Record
          </Button>
        </Form>
      </div>

      {/* Ảnh ở góc dưới */}
      <Image
        src="path/to/bottom-image.png"
        preview={false}
        style={{
          position: "absolute",
          left: -120,
          bottom: 0,
          width: 100,
          height: 100,
        }}
      />
    </div>
  );
};

export default FetusInput;
