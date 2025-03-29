import React, { useState } from "react";
import { InputNumber, Button, Form, Card, message } from "antd";
import { motion } from "framer-motion";
import { useCompareFetalData } from "../../../apis/CallAPIFetusGrowth";

const FetalGrowth = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await useCompareFetalData(
        values.week,
        values.headCircumference,
        values.fetalLength,
        values.fetalWeight
      );
      console.log(response);
      setResult(response);
      setShowResult(true);
    } catch (error) {
      message.error("Error fetching data");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 flex flex-col items-center justify-center"
    >
      {!showResult ? (
        <Card
          title="Fetal Growth Calculator"
          className="p-5"
          style={{ backgroundColor: "#E3F2FD" }}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Week"
              name="week"
              rules={[
                { required: true, message: "Please enter week" },
                {
                  type: "number",
                  min: 12,
                  max: 40,
                  message: "Week must be between 12 and 40",
                },
              ]}
              style={{ width: "100%" }}
            >
              <InputNumber min={12} max={40} style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item
              label="Head Circumference"
              name="headCircumference"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <InputNumber min={1} style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item
              label="Fetal Length (cm)"
              name="fetalLength"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <InputNumber min={1} style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item
              label="Fetal Weight (g)"
              name="fetalWeight"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <InputNumber min={1} style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Calculate
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4 w-full max-w-md p-5"
        >
          <Card
            title={<h3 className="pt-4">Result</h3>}
            className="shadow-md text-white text-center"
            style={{ backgroundColor: "#E3F2FD" }}
          >
            <p>
              <strong>Week: </strong> {result.week}
            </p>
            <p>
              <strong>Head Circumference:</strong>{" "}
              {result.headCircumferenceResult}
            </p>
            <p>
              <strong>Fetal Length:</strong> {result.fetalLengthResult}
            </p>
            <p>
              <strong>Fetal Weight:</strong> {result.fetalWeightResult}
            </p>
            <Button
              type="default"
              onClick={() => setShowResult(false)}
              className="mt-4 w-full"
            >
              Recalculate
            </Button>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FetalGrowth;
