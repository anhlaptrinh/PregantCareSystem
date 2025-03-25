import React from "react";
import { Modal, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Định nghĩa các animation variants cho framer-motion
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export default function LoginPromptModal({ open }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Modal
      visible={open}
      onCancel={() => {}}
      footer={[
        <Button key="login" type="primary" onClick={handleLogin}>
          Log in
        </Button>,
      ]}
      maskClosable={false} // không cho phép đóng Modal khi click ra ngoài
      keyboard={false} // không cho phép đóng Modal bằng phím ESC
      closable={false} // ẩn nút đóng ở góc trên
      transitionName="" // vô hiệu hóa animation mặc định của Ant Design
      maskTransitionName=""
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <Typography.Title level={2}>
          Please join us to keep reading.
        </Typography.Title>
        <Typography.Paragraph>
          Sign up now to gain FREE unlimited access to all discussions,
          articles, and tools.
        </Typography.Paragraph>
      </motion.div>
    </Modal>
  );
}
