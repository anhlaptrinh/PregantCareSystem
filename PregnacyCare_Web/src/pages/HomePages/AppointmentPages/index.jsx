// import arrow from "../../../assets/images/banner/icons/arrow--up-right.svg";
import appoint from "../../../assets/images/appoinment/01.webp"
// import service from '../../../assets/images/service/01.svg'
// import service02 from "../../../assets/images/service/02.svg"
// import service03 from "../../../assets/images/service/03.svg"
// import service04 from "../../../assets/images/service/04.svg"
import { Form, Input, Select, DatePicker, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
export default function AppointmentPages() {
  const { Option } = Select;

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
  };
  
  return (
    <div>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">Appoinment</h1>
              <div className="nav-bread-crumb">
                <a href="https://html.themewant.com/">Home</a>
                <i className="fa-solid fa-chevron-right" />
                <a href="#" className="current">
                  Appoinment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="book-your-consulting rts-section-gap">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="appoinment-area-main appoinment-page bg_image">
              <h2 className="title mb--40">Make an Appointment</h2>
              <Form onFinish={handleSubmit} layout="vertical">
                <div className="half-input-wrapper">
                  <Form.Item
                    label="Patient Name"
                    name="patientName"
                    rules={[{ required: true, message: 'Please enter patient name' }]}
                  >
                     <Input placeholder="Patient name" style={{ color: 'black',backgroundColor: 'white' }} />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                  >
                    <Input placeholder="Phone Number" style={{ color: 'black',backgroundColor: 'white' }} />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Select Department"
                  name="department"
                  rules={[{ required: true, message: 'Please select a department' }]}
                >
                  <Select placeholder="Select Department">
                    <Option value="1">Medicine</Option>
                    <Option value="2">Cardiology</Option>
                    <Option value="3">Surgery</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Select Doctor"
                  name="doctor"
                  rules={[{ required: true, message: 'Please select a doctor' }]}
                >
                  <Select placeholder="Select Doctor">
                    <Option value="1">Dr. Kadir</Option>
                    <Option value="2">Dr. David John Lee</Option>
                    <Option value="3">Dr. Mark John</Option>
                    <Option value="4">Dr. Kapoor Sharma</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Select Appointment Time"
                  name="time"
                  rules={[{ required: true, message: 'Please select an appointment time' }]}
                >
                  <Select placeholder="Select Time">
                    <Option value="1">Morning 10 AM</Option>
                    <Option value="2">Morning 11 AM</Option>
                    <Option value="3">Morning 12 AM</Option>
                    <Option value="4">Evening 5 PM</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Select Date"
                  name="date"
                  rules={[{ required: true, message: 'Please select a date' }]}
                >
                  <DatePicker style={{ width: '100%' }} placeholder="mm/dd/yyyy" />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                >
                  <Input.TextArea placeholder="Text message" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />}>
                    Appointment
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="thumbnail-appoinment wow move-right">
              <img src={appoint} alt="appoinment" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
