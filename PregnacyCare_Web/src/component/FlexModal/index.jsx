import { Modal, Form, Input, DatePicker, Button } from "antd";
import { useEffect } from "react";
const FlexModal = ({ visible, onClose, onSubmit, fields, title }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && fields.length > 0) {
      setTimeout(() => {
        const initialValues = fields.reduce((acc, field) => {
          acc[field.name] = field.value || null;
          return acc;
        }, {});
        form.setFieldsValue(initialValues);
      }, 1);
    }
  }, [visible, fields]);

  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      const formattedValues = {
        ...values,

        dateIssue: values.dateIssue ? values.dateIssue.toISOString() : null,
        dateRemind: values.dateRemind ? values.dateRemind.toISOString() : null,
      };

      onSubmit(formattedValues);
      console.log("date type: ", values.dateIssue);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation Failed:", error);
      console.log("date type: ", values.dateIssue.type);
    }
  };
  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" preserve={false}>
        {fields.map(({ name, label, type, value }) => (
          <Form.Item
            key={name}
            name={name}
            label={type === "hidden" ? undefined : label} // Ẩn label nếu là hidden
            initialValue={value}
            rules={[{ required: true, message: `${label} is required!` }]}
            hidden={type === "hidden"} // Ẩn nhưng vẫn giữ giá trị
          >
            {type === "text" ? (
              <Input
                placeholder={`Enter ${label}`}
                disabled={["id", "appointmentId"].includes(name)}
              />
            ) : type === "date" ? (
              <DatePicker showTime style={{ width: "100%" }} />
            ) : (
              <Input type="hidden" />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default FlexModal;
