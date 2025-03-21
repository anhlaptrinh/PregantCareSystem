import {
  Button,
  Card,
  Col,
  Tag,
  Row,
  Space,
  Typography,
  Popconfirm,
} from "antd";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useFetchAppointment } from "../../../hooks/AppointmentHooks/useFetchAppointment";
import { useEffect, useState } from "react";
import scheduleApi from "../../../apis/CallAPIAppointment/ScheduleAPI";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useUpdateSchedule } from "../../../hooks/ScheduleHooks/useUpdateSchedule";
import FlexModal from "../../../component/FlexModal";
import dayjs from "dayjs";
import { useDeleteSchedule } from "../../../hooks/ScheduleHooks/useDeleteSchedule";

const { Title, Text } = Typography;

const AppointmentSchedule = () => {
  const { data: appointments, isLoading, error } = useFetchAppointment();
  const [groupedSchedules, setGroupedSchedules] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const {mutate: deleteSchedule} = useDeleteSchedule();
  const { mutate: updateSchedule } = useUpdateSchedule();
  const monthNames = [
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

  const [refreshTrigger, setRefreshTrigger] = useState(0);

useEffect(() => {
  const fetchAllSchedules = async () => {
    if (!appointments) return;

    const tempGroupedSchedules = {};

    await Promise.all(
      appointments.map(async (appointment) => {
        try {
          const response = await scheduleApi.getScheduleById(appointment.id);
          if (response?.data) {
            response.data.forEach((schedule) => {
              const scheduleDate = new Date(schedule.dateRemind);
              const key = `${scheduleDate.getFullYear()}-${scheduleDate.getMonth()}`;

              if (!tempGroupedSchedules[key]) {
                tempGroupedSchedules[key] = [];
              }
              tempGroupedSchedules[key].push(schedule);
            });
          }
        } catch (err) {
          console.error("Error fetching schedule for:", appointment.id);
        }
      })
    );

    setGroupedSchedules(tempGroupedSchedules);
  };

  fetchAllSchedules();
}, [appointments, refreshTrigger]); // Thêm refreshTrigger để theo dõi cập nhật

// Hàm gọi lại API sau khi cập nhật dữ liệu
const refreshData = () => {
  setRefreshTrigger((prev) => prev + 1);
};

  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>Error loading appointments</div>;
  const handleSubmit = async (values) => {
    const localDate = new Date(values.dateIssue);
    localDate.setMinutes(
      localDate.getMinutes() - localDate.getTimezoneOffset()
    ); // Giữ nguyên ngày theo local time

    const formattedValues = {
      ...values,
      dateRemind: localDate.toISOString(), // Giữ nguyên ngày đúng với local time
    };
    await updateSchedule(formattedValues, {
      onSuccess: () => {
        refreshData();
      }});
  };
const handleDelete = async (id) => {
  await deleteSchedule(id, {
    onSuccess: () => {
      refreshData();
    }});
}
  const handleOpenModal = (schedule) => {
    setModalTitle("Update Schedule");
    setModalFields([
      { name: "id", label: "id", type: "hidden",value: schedule.id },
      { name: "appointmentId", label: "apponintmentId", type:"hidden", value: schedule.appointmentId },
      { name: "notify", label: "notify", type: "text",value: schedule.notify },
      { name: "type", label: "type", type: "text",value: schedule.type },
      { name: "dateRemind", label: "Date Remind", type: "date",value: dayjs(schedule.dateRemind) },
    ]);
    setModalVisible(true);
  };
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
            2025
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
        {Object.keys(groupedSchedules)
          .sort()
          .map((key) => {
            const [year, month] = key.split("-");
            const monthIndex = parseInt(month, 10);
            const schedules = groupedSchedules[key];
           
            return (
              <div key={key}>
                <Space
                  style={{
                    marginBottom: 16,
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <Text strong style={{ fontSize: 16 }}>
                    {monthNames[monthIndex]} {year}
                  </Text>
                  <Tag color="blue">{schedules.length} Events</Tag>
                </Space>

                <Row gutter={[16, 16]}>
                  {schedules
                  .map((schedule) => (
                    <Col span={8} key={schedule.id}>
                      <Card
                        bordered={false}
                        style={{
                          borderLeft: `4px solid ${
                            schedule.type === "important"
                              ? "#ff4d4f"
                              : "#52c41a"
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
                          <Space
                            style={{
                              marginTop: 8,
                              justifyContent: "flex-end",
                              width: "100%",
                            }}
                          >
                            <Button
                              icon={<EditOutlined />}
                              onClick={() => handleOpenModal(schedule)}
                            >
                              Update
                            </Button>
                            <Popconfirm
                              title="Are you sure to delete this schedule?"
                              onConfirm={() => handleDelete(schedule.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button danger icon={<DeleteOutline />}>
                                Delete
                              </Button>
                            </Popconfirm>
                          </Space>
                        </Space>
                      </Card>
                      <FlexModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onSubmit={handleSubmit}
                        fields={modalFields}
                        title={modalTitle}
                      />
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
