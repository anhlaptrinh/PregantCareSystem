import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Select,
  Badge,
  Pagination,
  Modal,
  Form,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllUser } from "../../../apis/CallAPIUser";
import FlexModal from "../../../component/FlexModal";
import { useAddUser, useEditeUser } from "../../../apis/CallAPIUser";

const { Title } = Typography;
const { Option } = Select;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [modalMode, setModalMode] = useState(""); // Lưu mode (update hoặc create)
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmit = async (values) => {
    

    if (modalMode  === "update") {
      const formattedValues = {
        ...values,
        
      };
      useEditeUser(formattedValues)
            .then(() => {
              message.success("Updated user successfully");
              refreshData();
            })
            .catch((error) => {
              console.error("Update error:", error);
            });
    } else if (modalMode  === "create") {
      const formattedValues = {
        ...values,
      };
      useAddUser(formattedValues)
            .then((res) => {
              message.success("Sign in successfully");
              refreshData();
            })
            .catch((error) => {
              message.error("Failed sign in" + error.message);
              setLoading(false);
            });
    }
  };
  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  const handleOpenModal = (event, mode) => {
    setModalMode(mode);
    setModalTitle(
      mode === "update" ? "Edit User" : "Create User"
    );
    setModalFields(
      mode === "update"
        ? [
            { name: "id", label: "id", type: "hidden", value: event.id },
            { name: "status", label: "status", type: "select",value: event.status, options: [
                { label: "Active", value: true },
                { label: "Inactive", value: false },] },
            { name: "role", label: "Role", type: "select", value: event.roles, options: [
                { label: "Admin", value: "ADMIN" },
                { label: "Expert", value: "EXPERT" },
                { label: "Member", value: "MEMBER" }
              ]
            }
            
          ]
        : [
            {
              name: "fullName",
              label: "Username",
              type: "text",
             
            },
            { name: "email", label: "Email", type: "text" },
            { name: "password", label: "Password", type: "text" },
            { name: "role", label: "Role", type: "select", value: "member", options: [
                { label: "Admin", value: "ADMIN" },
                { label: "Expert", value: "EXPERT" },
                { label: "Member", value: "MEMBER" }
              ]
            },

          ]
    );

    setModalVisible(true);
  };
  // 🛠 Gọi API lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await useGetAllUser();
        setUsers(response.data); // Giả sử API trả về `data`
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
        message.error("Không thể tải danh sách người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshTrigger]);
  
  

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 50 },
    { title: "Username", dataIndex: "fullName", key: "fullName", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Role", dataIndex: "roles", key: "roles", width: 120 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (text) => (
        <Badge
          status={text === true ? "success" : "error"}
          text={text === true ? "Active" : "Inactive"}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(record, "update");
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm user..."
            className="w-50"
            size="large"
          />
          <Button
            type="primary"
            size="large"
            onClick={(e) => {
                e.stopPropagation();
                handleOpenModal({},"create");
              }}
          >
            Add User
          </Button>
        </div>
      </nav>

      <Card className="mt-4">
        <Title level={4}>User List</Title>
        <Table
          dataSource={paginatedUsers}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: users.length,
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
    </div>
  );
}
