import {
  Form,
  DatePicker,
  InputNumber,
  Radio,
  Select,
  Row,
  Col,
  Space,
  Image,
  Button,
} from "antd";

const FetusInput = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: 800, margin: "10px auto", position: "relative" }}>
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

      <Form form={form} layout="vertical">
        <h2 style={{ marginBottom: 24 }}>Fetus Information</h2>

        {/* Giới tính */}
        <Form.Item label="Sex" name="sex">
          <Radio.Group>
            <Radio value="girl">Girl</Radio>
            <Radio value="boy">Boy</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Ngày tháng */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Child's birthday" name="birthday">
              <DatePicker style={{ width: "100%" }} format="MM-DD-YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date of measurement" name="measurementDate">
              <DatePicker style={{ width: "100%" }} format="MM-DD-YYYY" />
            </Form.Item>
          </Col>
        </Row>

        {/* Các chỉ số đo lường */}
        <Form.Item label="Weight">
          <Row gutter={8}>
            <Col span={8}>
              <Space.Compact>
                <Form.Item name="weight_lb" noStyle initialValue={0}>
                  <InputNumber style={{ width: "60%" }} min={0} />
                </Form.Item>
                <Form.Item name="weight_lb_unit" noStyle initialValue="lb">
                  <Select style={{ width: "40%" }}>
                    <Select.Option value="lb">lb</Select.Option>
                    <Select.Option value="kg">kg</Select.Option>
                  </Select>
                </Form.Item>
              </Space.Compact>
            </Col>
            <Col span={8}>
              <Space.Compact>
                <Form.Item name="weight_oz" noStyle initialValue={0}>
                  <InputNumber style={{ width: "60%" }} min={0} />
                </Form.Item>
                <Form.Item name="weight_oz_unit" noStyle initialValue="oz">
                  <Select style={{ width: "40%" }}>
                    <Select.Option value="oz">oz</Select.Option>
                  </Select>
                </Form.Item>
              </Space.Compact>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Height">
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item name="height" noStyle initialValue={0}>
              <InputNumber style={{ width: "70%" }} min={0} />
            </Form.Item>
            <Form.Item name="height_unit" noStyle initialValue="in">
              <Select style={{ width: "30%" }}>
                <Select.Option value="in">in</Select.Option>
                <Select.Option value="cm">cm</Select.Option>
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="Head circumference">
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item name="head_circumference" noStyle initialValue={0}>
              <InputNumber style={{ width: "70%" }} min={0} />
            </Form.Item>
            <Form.Item name="head_unit" noStyle initialValue="cm">
              <Select style={{ width: "30%" }}>
                <Select.Option value="cm">cm</Select.Option>
                <Select.Option value="in">in</Select.Option>
              </Select>
            </Form.Item>
            {/* Measurement input for head circumference */}
          </Space.Compact>
        </Form.Item>
        <Button size="large" color="primary">
          Caculate
        </Button>
      </Form>

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
