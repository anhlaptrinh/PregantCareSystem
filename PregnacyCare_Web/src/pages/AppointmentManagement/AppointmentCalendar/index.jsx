import { Col, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
  return (
    <div
      style={{
        fontSize: "18px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#fff",
        color: "black",
      }}
    >
      {event.title}
    </div>
  );
};

const AppointmentCalendar = () => {
  const [openModalDetailSchedule, setOpenModalDetailSchedule] = useState(false);
  const timetables = [
    {
      start: moment("2025-03-11T01:00:00.000+00:00"),
      end: moment("2025-03-11T02:30:00.000+00:00"),
      title: "ABC",
    },
    {
      start: moment("2025-03-12T02:00:00.000+00:00"),
      end: moment("2025-03-12T03:30:00.000+00:00"),
      title: "ABC",
    },
    {
      start: moment("2025-03-13T05:00:00.000+00:00"),
      end: moment("2025-03-13T06:30:00.000+00:00"),
      title: "ABC",
    },
    {
      start: moment("2025-03-14T04:00:00.000+00:00"),
      end: moment("2025-03-14T05:30:00.000+00:00"),
      title: "ABC",
    },
  ];

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
