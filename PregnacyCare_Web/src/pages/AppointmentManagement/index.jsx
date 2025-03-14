import { Button, Col, Menu, Row } from "antd";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import "./index.css";

const menuAppointment = () => [
  {
    icon: <CalendarTodayOutlinedIcon />,
    label: "Calendar",
    key: "/calendar",
  },
  {
    icon: <EditCalendarOutlinedIcon />,
    label: "Appointment Schedule",
    key: "/appointment-schedule",
  },
  {
    label: "Workflows",
    key: "/workflow",
  },
];

// eslint-disable-next-line react/prop-types
const AppointmentManagement = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location?.pathname", location?.pathname);

  return (
    <Row style={{ padding: "20px 16px" }}>
      <Col span={4} className="menu-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span>
            <CalendarMonthOutlinedIcon
              style={{
                fontSize: "30px",
                color: "var(--color-primary)",
                marginRight: "6px",
              }}
            />
          </span>
          <span style={{ fontSize: "18px", fontWeight: 700 }}>Appointopia</span>
        </div>
        <div>
          <Menu
            mode="inline"
            onClick={(e) => navigate(e.key)}
            items={menuAppointment()}
            selectedKeys={location?.pathname}
          />
        </div>
      </Col>
      <Col span={20} style={{ padding: "0px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <div style={{ color: "black", fontSize: "25px", fontWeight: 700 }}>
            {
              menuAppointment()?.find((i) => i?.key === location?.pathname)
                ?.label
            }
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button icon={<AddIcon />} className="rts-btn btn-primary">
              Create
            </Button>
            <div style={{ marginLeft: "12px" }}>
              <SearchIcon style={{ fontSize: "23px" }} />
            </div>
            <div style={{ marginLeft: "12px" }}>
              <NotificationsNoneIcon style={{ fontSize: "23px" }} />
            </div>
            <div style={{ marginLeft: "12px" }}>
              <MessageOutlinedIcon style={{ fontSize: "23px" }} />
            </div>
            <div
              style={{ marginLeft: "8px" }}
              className="menu-btn"
              id="menu-btn"
            >
              <svg
                width={20}
                height={16}
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y={14} width={20} height={2} fill="#1F1F25" />
                <rect y={7} width={20} height={2} fill="#1F1F25" />
                <rect width={20} height={2} fill="#1F1F25" />
              </svg>
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </Col>
    </Row>
  );
};

export default AppointmentManagement;
