import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Typography,
  Space,
  message,
  Modal,
  Dropdown,
  Menu,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import {
  useGetAllPackages,
  useCreatePackage,
  useUpdatePackage,
  useDeletePackage,
} from "../../../apis/CallAPIPackage";
import FlexModal from "../../../component/FlexModal";

const { Title } = Typography;

export default function PackageManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [modalMode, setModalMode] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreatePackage = async (values) => {
    console.log(values);
    const newPackage = {
      name: values.name,
      price: parseFloat(values.price),
      description: values.description,
    };
    try {
      const res = await useCreatePackage(newPackage);
      message.success("Added package successfully");
      refreshData();
    } catch (err) {
      console.error("Create error:", err.message);
    }
  };

  const handleUpdatePackage = async (values) => {
    const updatePackage = {
      name: values.name,
      price: parseFloat(values.price),
      description: values.description,
    };
    try {
      const res = await useUpdatePackage(values.id, updatePackage);
      message.success("Updated package successfully");

      refreshData();
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const handleDeletePackage = async (value) => {
    try {
      const res = await useDeletePackage(value.id);
      message.success("Deleted package successfully");
      refreshData();
    } catch (err) {
      console.error("Delete error:", err.message);
      message.error("Failed to delete package.");
    }
  };

  const handleSubmit = async (values) => {
    if (modalMode === "update") {
      handleUpdatePackage(values);
    } else {
      handleCreatePackage(values);
    }
  };

  const refreshData = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await useGetAllPackages();
        console.log(response);
        setPackages(response);
      } catch (error) {
        console.error("Error fetching packages:", error);
        message.error("Cannot load package list.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [refreshTrigger]);

  const handleOpenModal = (event, mode) => {
    setModalMode(mode);
    setModalTitle(mode === "update" ? "Edit Package" : "Create Package");
    setModalFields(
      mode === "update"
        ? [
            { name: "id", label: "ID", type: "hidden", value: event.id },
            {
              name: "name",
              label: "Package Name",
              type: "text",
              value: event.name,
            },
            {
              name: "price",
              label: "Price",
              type: "number",
              value: event.price,
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              value: event.description,
            },
          ]
        : [
            { name: "name", label: "Package Name", type: "text" },
            { name: "price", label: "Price", type: "number" },
            { name: "description", label: "Description", type: "text" },
          ]
    );
    setModalVisible(true);
  };

  const confirmDelete = (record) => {
    Modal.confirm({
      title: "Are you sure?",
      content: `Do you really want to delete package "${record.name}"?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDeletePackage(record),
    });
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Render Dropdown menu for actions
  const renderActionMenu = (record) => {
    const menu = (
      <Menu
        onClick={({ key }) => {
          if (key === "edit") {
            handleOpenModal(record, "update");
          } else if (key === "delete") {
            confirmDelete(record);
          }
        }}
        items={[
          { key: "edit", label: "Edit" },
          { key: "delete", label: "Delete" },
        ]}
      />
    );
    return (
      <Dropdown overlay={menu}>
        <Button>Actions</Button>
      </Dropdown>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="mt-4">
        <Title level={4}>Package List</Title>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search package..."
          className="w-50 mb-3"
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => handleOpenModal({}, "create")}
        >
          Add Package
        </Button>
        <Table
          dataSource={paginatedPackages}
          columns={[
            { title: "ID", dataIndex: "id", key: "id", width: 50 },
            {
              title: "Package Name",
              dataIndex: "name",
              key: "name",
              width: 200,
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              width: 100,
              render: (text) => `$${text}`,
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
              width: 100,
            },
            {
              title: "Action",
              key: "action",
              align: "center",
              width: 150,
              render: (_, record) => renderActionMenu(record),
            },
          ]}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredPackages.length,
            onChange: (page) => setCurrentPage(page),
          }}
          bordered
        />
        <FlexModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          fields={modalFields}
          title={modalTitle}
        />
      </Card>
    </motion.div>
  );
}
