import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {

    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
    SettingOutlined,
    AlignLeftOutlined,
    HomeOutlined,
    DashboardOutlined,

} from "@ant-design/icons";
import avatar from "../../assets/avatar.jpg";
import { Link, useLocation } from "react-router-dom";
import { Dashboard, Home } from "@mui/icons-material";

const { Header, Content, Sider } = Layout;

const breadcrumbNameMap = {
  "/admin/dashboard": "Dashboard",
  "/admin/blog": "Blog Management",
  "/admin/appointments": "Appointments",
  "/admin/settings": "Settings",
  "/admin/forum": "Forum",
  "/admin/user": "User Management",
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets
    .map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return breadcrumbNameMap[url]
        ? { key: url, title: <Link to={url}>{breadcrumbNameMap[url]}</Link> }
        : null;
    })
    .filter((item) => item !== null);

  // Lấy thông tin role từ USER_TOKEN trong localStorage (nếu tồn tại)
  const storedUser = localStorage.getItem("USER_TOKEN");
  const role = storedUser ? JSON.parse(storedUser).role : null;


  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Sider
        width={220}
        style={{ background: "#f8f9fa", borderRight: "1px solid #ddd" }}
      >
        <div className="text-center my-4">
          <h4 style={{ color: "#000" }}>
            <img src={avatar} alt="Avatar" />
          </h4>
        </div>
        <Menu mode="vertical" defaultSelectedKeys={["1"]} style={{ background: "#f8f9fa" }}>
          {role === "ADMIN" && (
            <>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FileTextOutlined />}>
                <Link to="/admin/blog">Blog Management</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to="/admin/user">User</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
            </>
          )}
          {role === "EXPERT" && (
            <Menu.Item key="3" icon={<AlignLeftOutlined />}>
              <Link to="/expert/forum">Forum</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Breadcrumb
            style={{ margin: "0 16px" }}
            items={[
              { key: "/", title: <Link to="/">Home</Link> },
              ...breadcrumbItems,
            ]}
          />
        </Header>
        <Content style={{ padding: "20px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
