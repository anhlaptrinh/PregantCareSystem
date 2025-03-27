import { Col, Popconfirm, Row, Spin, Popover, Button } from "antd";
import moment from "moment";
import { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFetchAppointment } from "../../../hooks/AppointmentHooks/useFetchAppointment";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FlexModal from "../../../component/FlexModal";
import { useUpdateAppointment } from "../../../hooks/AppointmentHooks/useUpdateAppointment";
import dayjs from "dayjs";
import { useDeleteAppointment } from "../../../hooks/AppointmentHooks/useDeleteAppointment";
import { useCreateSchedule } from "../../../hooks/ScheduleHooks/useCreateSchedule";

const localizer = momentLocalizer(moment);

const messages = {
  allDay: "All Day",
  previous: "Previous",
  next: "Next",
  today: "Today",
  month: "Month",
  date: "Date",
  time: "Time",
  event: "Event",
  "There are no events in this range.": "No events",
};

const formats = {
  monthHeaderFormat: (date, culture, localizer) =>
    "Month " + localizer.format(date, "MM/YYYY", culture),
};

// Custom event component để phóng to ô chứa title
const CustomEvent = ({ event }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [idUpdate, setIdUpdate] = useState(null);
  const [modalFields, setModalFields] = useState([]);
  const { mutate: deleteAppointment } = useDeleteAppointment();
  const { mutate: createSchedule } = useCreateSchedule();
  const { mutate: updateAppointment } = useUpdateAppointment();
  if (!event) return null;
  const handleSubmit = async (values, mode) => {
    const localDate = new Date(values.dateIssue || values.dateRemind);
    localDate.setMinutes(
      localDate.getMinutes() - localDate.getTimezoneOffset()
    ); // Đảm bảo múi giờ chính xác

    if (mode === "Appointment") {
      const formattedValues = {
        ...values,
        dateIssue: localDate.toISOString(),
      };
      updateAppointment(formattedValues);
    } else if (mode === "Reminder") {
      const formattedValues = {
        ...values,
        dateRemind: localDate.toISOString(),
      };
      createSchedule(formattedValues);
    }
  };

  const handleOpenModal = (event, mode) => {
    setIdUpdate(event.id);
    setModalTitle(
      mode === "Appointment" ? "Update Appointment" : "Create Reminder"
    );
    setModalFields(
      mode === "Appointment"
        ? [
            { name: "id", label: "id", type: "hidden", value: event.id },
            { name: "event", label: "Event", type: "text", value: event.title },
            {
              name: "dateIssue",
              label: "Date Issue",
              type: "date",
              value: dayjs(event.start),
              dateDisabled: true,
            },
          ]
        : [
            {
              name: "appointmentId",
              label: "appointmentId",
              type: "hidden",
              value: event.id,
            },
            { name: "notify", label: "Notify", type: "text" },
            {
              name: "dateRemind",
              label: "Date Remind",
              type: "date",
              value: dayjs(event.start),
            },
            { name: "type", label: "Type", type: "text" },
          ]
    );

    setModalVisible(true);
  };
  const content = (
    <>
      <p>
        <strong>Title:</strong> {event.title}
      </p>
      <p>
        <strong>Time:</strong> {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {/* Nếu sự kiện đã qua, chỉ hiển thị nút xóa */}
        {new Date(event.start) < new Date() ? (
          <Popconfirm
            title="Are you sure you want to delete this event?"
            onConfirm={(e) => {
              e.stopPropagation();
              deleteAppointment(event.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
            >
              Delete
            </Button>
          </Popconfirm>
        ) : (
          <>
            {/* Nút chỉnh sửa */}
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(event, "Appointment");
              }}
            >
              Edit Appointment
            </Button>

            {/* Nút xóa */}
            <Popconfirm
              title="Are you sure you want to delete this event?"
              onConfirm={(e) => {
                e.stopPropagation();
                deleteAppointment(event.id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => e.stopPropagation()}
              >
                Delete
              </Button>
            </Popconfirm>

            {/* Nút tạo lịch */}
            <Button
              type="default"
              style={{ backgroundColor: "#FFA500", color: "white" }}
              icon={<PlusOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(event, "Reminder");
              }}
            >
              Create Reminder
            </Button>
          </>
        )}
      </div>
    </>
  );
  return (
    <>
      <Popover content={content} title="Appointment Details" trigger="hover">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            background:
              new Date(event.start) > new Date()
                ? "linear-gradient(to right, #DD83E0, #B6C0C5)" // Màu xám khi event.start lớn hơn hiện tại
                : "gray", // Gradient bình thường
            color: "white",
            textAlign: "center",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            border: "none",
          }}
        >
          {event.title}
        </div>
      </Popover>
      <FlexModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(values) =>
          handleSubmit(
            values,
            modalTitle.includes("Appointment") ? "Appointment" : "Reminder"
          )
        }
        fields={modalFields}
        title={modalTitle}
      />
    </>
  );
};

const AppointmentCalendar = () => {
  const [openModalDetailSchedule, setOpenModalDetailSchedule] = useState(false);
  const { data: appointments, isLoading, error } = useFetchAppointment();
  if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;
  if (!appointments || !Array.isArray(appointments) || isLoading)
    return <Spin size="large" />;
  const timetables = (appointments || []).map((appointment) => ({
    id: appointment.id,
    start: moment(appointment.dateIssue).toDate(),
    end: moment(appointment.dateIssue).add(1, "hours").toDate(),
    title: appointment.event,
  }));
  return (
    <Row>
      <Col span={24}>
        <Calendar
          localizer={localizer}
          events={timetables}
          startAccessor={(event) => new Date(event.start)}
          endAccessor={(event) => new Date(event.end)}
          style={{ width: "100%", height: 700 }}
          defaultView={Views.MONTH}
          views={["month"]}
          onSelectEvent={(event) => setOpenModalDetailSchedule(event)}
          messages={messages}
          formats={formats}
          min={new Date(new Date().setHours(7, 0, 0, 0))}
          max={new Date(new Date().setHours(23, 0, 0, 0))}
          components={{
            event: CustomEvent, // Sử dụng custom event component
          }}
        />
      </Col>
      {/* Modal for event details can be shown when needed */}
    </Row>
  );
};

export default AppointmentCalendar;
