import React from "react";
import { Modal, Typography, Button, Divider } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

export default function MyAdviceDetailModal({ visible, onClose, advice }) {
  return (
    <Modal
      visible={visible}
      title="Advice Details"
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {advice ? (
        <>
          <Title level={5}>Description</Title>
          <Text>{advice.description || "not yet"}</Text>
          <Divider />
          <Title level={5}>Answer</Title>
          <Text>{advice.answer || "not yet"}</Text>
          <Divider />
          <Title level={5}>Answer Date</Title>
          <Text>
            {advice.answerDate
              ? moment(advice.answerDate).format("MMMM D, YYYY")
              : "not yet"}
          </Text>
          <Divider />
          <Title level={5}>Category</Title>
          <Text>
            {advice.blogCategory && advice.blogCategory.name
              ? advice.blogCategory.name
              : "not yet"}
          </Text>
          <Divider />
          <Title level={5}>Date Published</Title>
          <Text>
            {advice.datePublish
              ? moment(advice.datePublish).format("MMMM D, YYYY")
              : "not yet"}
          </Text>
        </>
      ) : (
        <Text>No details available</Text>
      )}
    </Modal>
  );
}
