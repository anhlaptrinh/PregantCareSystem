import { Col, Row } from "antd"
import moment from "moment"
import { useState } from "react"
import {
  Calendar,
  Views,
  momentLocalizer,
} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

const messages = {
  allDay: "Cả ngày",
  previous: "Trước",
  next: "Tiếp",
  today: "Hôm nay",
  month: "Tháng",
  week: "Tuần",
  day: "Ngày",
  agenda: "Lịch dạy",
  date: "Ngày",
  time: "Thời gian",
  event: "Sự kiện",
  "There are no events in this range.": "Không có",
}
const formats = {
  monthHeaderFormat: (date, culture, localizer) =>
    "Tháng " + localizer.format(date, "MM/YYYY", culture), // Định dạng tiêu đề tháng
  dayFormat: "ddd, DD/MM", // Định dạng hiển thị ngày trong ngày
  dayHeaderFormat: "dddd, DD/MM/YYYY", // Tiêu đề nagyf
  dayRangeHeaderFormat: ({ start, end }) =>
    `${moment(start).format("DD/MM/YYYY")} - ${moment(end).format(
      "DD/MM/YYYY",
    )}`, // Định dạng tiêu đề ngày khi chọn khoảng thời gian
  agendaDateFormat: (date, culture, localizer) =>
    localizer.format(date, "dddd, DD/MM/YYYY", culture), //Cột trong lịch làm việc
}

const AppointmentCalendar = () => {

  const [openModalDetailSchedule, setOpenModalDetailSchedule] = useState(false)
  const timetables = [
    {
      start: moment("2025-03-11T01:00:00.000+00:00"),
      end: moment("2025-03-11T02:30:00.000+00:00"),
      title: "ABC"
    },
    {
      start: moment("2025-03-12T02:00:00.000+00:00"),
      end: moment("2025-03-12T03:30:00.000+00:00"),
      title: "ABC"
    },
    {
      start: moment("2025-03-13T05:00:00.000+00:00"),
      end: moment("2025-03-13T06:30:00.000+00:00"),
      title: "ABC"
    }, {
      start: moment("2025-03-14T04:00:00.000+00:00"),
      end: moment("2025-03-14T05:30:00.000+00:00"),
      title: "ABC"
    },
  ]


  return (
    <Row>
      <Col span={24}>
        <Calendar
          localizer={localizer}
          events={timetables}
          startAccessor={event => {
            return new Date(event.start)
          }}
          endAccessor={event => {
            return new Date(event.end)
          }}
          style={{ width: "100%", height: 700 }}
          defaultView={Views.WEEK}
          onSelectEvent={event => setOpenModalDetailSchedule(event)}
          messages={messages}
          formats={formats}
          onShowMore={(timetables) =>
            this.setState({ showModal: true, timetables })
          }
          min={new Date(new Date().setHours(7, 0, 0, 0))}
          max={new Date(new Date().setHours(23, 0, 0, 0))}
        />
      </Col>

      {/* {
        !!openModalDetailSchedule &&
        <ModalDetailSchedule
          open={openModalDetailSchedule}
          onCancel={() => setOpenModalDetailSchedule(false)}
          setOpenModalDetailSchedule={setOpenModalDetailSchedule}
          buttonShow={buttonShow}
          getTimeTable={getTimeTable}
        />
      } */}
    </Row>
  )
}

export default AppointmentCalendar