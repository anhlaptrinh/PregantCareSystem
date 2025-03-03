import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Radio,
  Button,
  Upload,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { storage } from "../../../../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddFetusModal({ visible, onClose }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fetus, setFetus] = useState({
    name: "",
    conceptionDate: null,
    gender: "",
    status: false,
  });

  // Disable dates before today or more than 280 days from today.
  const disabledDate = (current) => {
    const today = moment().startOf("day");
    const maxDate = moment().add(280, "days"); // Limit: 280 days from today (adjust as needed)
    return current && (current < today || current > maxDate);
  };

  // Handle file selection and upload to Firebase Storage
  const handleUpload = async ({ file }) => {
    setFile(file);
    const localImageUrl = URL.createObjectURL(file);
    setImageUrl(localImageUrl);

    // Upload file to Firebase Storage
    const storageRef = ref(storage, `pregnancyCareImages/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
      // Optionally, you might want to store the downloadURL in form values
      // form.setFieldsValue({ imageUrl: downloadURL });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    alert(fetus.conceptionDate);
    alert(fetus.name);
    alert(fetus.gender);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<span style={{ cursor: "pointer" }}>&times;</span>}
    >
      <div>
        <Typography style={{ color: "#615EFC", fontSize: 35, fontWeight: 500 }}>
          My pregnancy
        </Typography>
        <Form layout="vertical">
          <div className="row">
            <div className="col">
              <span>A photo helps you personalize yourself</span>
            </div>
            <div className="col-3">
              <Upload
                showUploadList={false}
                beforeUpload={() => false} // Prevent auto upload by Ant Design
                onChange={(value) => handleUpload(value)}
              >
                <Button icon={<UploadOutlined />}>Update</Button>
              </Upload>
            </div>
          </div>

          <Form.Item label="Due date" name="dueDate">
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              onChange={(e) => setFetus({ ...fetus, conceptionDate: e })}
            />
          </Form.Item>

          <Form.Item
            label="Baby's name"
            name="babyName"
            rules={[{ required: true, message: "Baby's name is required" }]}
          >
            <Input
              style={{ height: "38px" }}
              onChange={(e) => setFetus({ ...fetus, name: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Baby's sex" name="babySex">
            <Radio.Group
              onChange={(e) => setFetus({ ...fetus, gender: e.target.value })}
            >
              <Radio value="girl">Girl</Radio>
              <Radio value="boy">Boy</Radio>
              <Radio value="dontKnow">Don't know</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <div style={{ marginTop: "8px", fontSize: "12px" }}>
              You can unsubscribe at any time. By continuing, you agree to our
              Terms of Use and Privacy Policy.
            </div>
          </Form.Item>

          <div style={{ marginTop: "16px" }}>
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <button
                  type="submit"
                  className="rts-btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                  Add to my family
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
