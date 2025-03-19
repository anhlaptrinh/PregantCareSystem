import { Button, Card, Col, Tag, Row, Space, Typography } from "antd";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import { useFetchAppointment } from "../../../hooks/AppointmentHooks/useFetchAppointment";
import useFetchSchedule from "../../../hooks/ScheduleHooks/useFetchSchedule";
import { useEffect, useState } from "react";
import scheduleApi from "../../../apis/CallAPIAppointment/ScheduleAPI";

const { Title, Text } = Typography;

const AppointmentSchedule = () => {
  const { data: appointments, isLoading, error } = useFetchAppointment();
  const [allSchedules, setAllSchedules] = useState({});
  const monthNames = [
    // Month names as previously defined
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const fetchAllSchedules = async () => {
      if (!appointments) return;

      const schedulesMap = {};

      // Fetch all schedules for the appointments
      await Promise.all(
        appointments.map(async (appointment) => {
          try {
            const response = await scheduleApi.getScheduleById(appointment.id);
            if (response) {  
                
              schedulesMap[appointment.id] = response.data || []; // Ensure data is an array  
            } else {  
              console.error(`Failed to fetch schedule for appointment ID: ${appointment.id}`);  
              schedulesMap[appointment.id] = [];  
            }  
          } catch (err) {
            console.error(
              "Error fetching schedule for appointment ID:",
              appointment.id,
              
            );
            schedulesMap[appointment.id] = []; // Handle error by setting an empty array
          }
        })
      );

      setAllSchedules(schedulesMap);
    };

    fetchAllSchedules();
  }, [appointments]);

  // Handling loading and error states
  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>Error loading appointments</div>;

  return (
    <Row>
      <Col
        span={24}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "black",
              marginRight: "12px",
            }}
          >
            2023
          </div>
          <Button
            style={{ marginRight: "12px" }}
            size="small"
            shape="circle"
            icon={<ArrowBackIosOutlinedIcon />}
          />
          <Button
            style={{ marginRight: "12px" }}
            size="small"
            shape="circle"
            icon={<ArrowForwardIosOutlinedIcon />}
          />
          <Button>This Month</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button>Week</Button>
          <Button style={{ marginLeft: "12px" }}>Month</Button>
          <Button
            style={{ marginLeft: "12px" }}
            icon={<FilterAltOutlinedIcon />}
          >
            Filter
          </Button>
        </div>
      </Col>
      <Col span={24} style={{ padding: "20px 16px" }}>
        {appointments?.map((appointment, index) => {
          // Lọc lịch trình cho appointmentId này
          const schedules = allSchedules[appointment.id] || [];
          const appointmentDate = new Date(appointment.dateIssue);

          if (schedules.length === 0) {
            return null; // Skip rendering if there are no schedules
          }
          return (
            <div key={appointmentDate.getMonth()}>
              {/* Phần header */}
              <Space style={{ marginBottom: 16, alignItems: "center",marginTop:16 }}>
                <Text strong style={{ fontSize: 16 }}>
                  {monthNames[appointmentDate.getMonth()]}{" "}
                  {appointmentDate.getFullYear()}
                </Text>
                <Tag color="blue">{schedules.length} Events</Tag>
              </Space>

              {/* Danh sách schedules */}
              <Row gutter={[16, 16]}>
                {schedules.map((schedule) => (
                  <Col span={8} key={schedule.id}>
                    <Card
                      bordered={false}
                      style={{
                        borderLeft: `4px solid ${
                          schedule.type === "important" ? "#ff4d4f" : "#52c41a"
                        }`,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
                      }}
                    >
                      <Space direction="vertical" size={8}>
                        <Text strong>{schedule.notify.toUpperCase()}</Text>
                        <Space>
                          <AccessTimeOutlinedIcon />
                          <Text>
                            {new Date(schedule.dateRemind).toLocaleString()}
                          </Text>
                        </Space>
                        <Space>
                          <CalendarMonthOutlinedIcon />
                          <Text>{schedule.type}</Text>
                        </Space>
                        {schedule.link && (
                          <a
                            href={schedule.link}
                            target="_blank"
                            rel="noopener"
                          >
                            <InsertLinkOutlinedIcon /> Booking Link
                          </a>
                        )}
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default AppointmentSchedule;
