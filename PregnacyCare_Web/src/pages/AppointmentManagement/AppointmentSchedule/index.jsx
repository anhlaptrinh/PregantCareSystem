import { Button, Card, Col, Row, Space, Typography } from "antd"
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'

const { Title, Text } = Typography

const AppointmentSchedule = () => {
  return (
    <Row>
      <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "black", marginRight: "12px" }}>2023</div>
          <Button style={{ marginRight: "12px" }} size="small" shape="circle" icon={<ArrowBackIosOutlinedIcon />} />
          <Button style={{ marginRight: "12px" }} size="small" shape="circle" icon={<ArrowForwardIosOutlinedIcon />} />
          <Button>This Month</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Button>Week</Button>
          <Button style={{ marginLeft: "12px" }}>Month</Button>
          <Button style={{ marginLeft: "12px" }} icon={<FilterAltOutlinedIcon />}>Filter</Button>
        </div>
      </Col>
      <Col span={24} style={{ padding: "20px 16px" }}>
        <Space style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "black", marginRight: "12px" }}>JULY</div>
          <Button size="small">3 Events</Button>
        </Space>
        <Row>
          <Col span={8}>
            <Card style={{
              width: 300,
              borderLeft: "6px solid #3CB4AC",
              borderTop: "1px solid rgb(208, 208, 208)",
              borderRight: "1px solid rgb(208, 208, 208)",
              borderBottom: "1px solid rgb(208, 208, 208)",
            }}>
              <Title level={5} style={{ color: "#3CB4AC", marginBottom: 8 }}>
                Monthly Review - DES
              </Title>
              <Space size={16} style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeOutlinedIcon />
                <Text>60 mins</Text>
                <CalendarMonthOutlinedIcon />
                <Text>2 bookings</Text>
              </Space>
              <Text style={{ display: "block", marginTop: 12, color: "#1890ff" }}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Booking page ↗
                </a>
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                <InsertLinkOutlinedIcon /> <a href="#">link.com</a>
              </Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{
              width: 300,
              borderLeft: "6px solid #3CB4AC",
              borderTop: "1px solid rgb(208, 208, 208)",
              borderRight: "1px solid rgb(208, 208, 208)",
              borderBottom: "1px solid rgb(208, 208, 208)",
            }}>
              <Title level={5} style={{ color: "#3CB4AC", marginBottom: 8 }}>
                Monthly Review - DES
              </Title>
              <Space size={16} style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeOutlinedIcon />
                <Text>60 mins</Text>
                <CalendarMonthOutlinedIcon />
                <Text>2 bookings</Text>
              </Space>
              <Text style={{ display: "block", marginTop: 12, color: "#1890ff" }}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Booking page ↗
                </a>
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                <InsertLinkOutlinedIcon /> <a href="#">link.com</a>
              </Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{
              width: 300,
              borderLeft: "6px solid #3CB4AC",
              borderTop: "1px solid rgb(208, 208, 208)",
              borderRight: "1px solid rgb(208, 208, 208)",
              borderBottom: "1px solid rgb(208, 208, 208)",
            }}>
              <Title level={5} style={{ color: "#3CB4AC", marginBottom: 8 }}>
                Monthly Review - DES
              </Title>
              <Space size={16} style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeOutlinedIcon />
                <Text>60 mins</Text>
                <CalendarMonthOutlinedIcon />
                <Text>2 bookings</Text>
              </Space>
              <Text style={{ display: "block", marginTop: 12, color: "#1890ff" }}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Booking page ↗
                </a>
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                <InsertLinkOutlinedIcon /> <a href="#">link.com</a>
              </Text>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ padding: "20px 16px" }}>
        <Space style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "black", marginRight: "12px" }}>JULY</div>
          <Button size="small">3 Events</Button>
        </Space>
        <Row>
          <Col span={8}>
            <Card style={{
              width: 300,
              borderLeft: "6px solid #3CB4AC",
              borderTop: "1px solid rgb(208, 208, 208)",
              borderRight: "1px solid rgb(208, 208, 208)",
              borderBottom: "1px solid rgb(208, 208, 208)",
            }}>
              <Title level={5} style={{ color: "#3CB4AC", marginBottom: 8 }}>
                Monthly Review - DES
              </Title>
              <Space size={16} style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeOutlinedIcon />
                <Text>60 mins</Text>
                <CalendarMonthOutlinedIcon />
                <Text>2 bookings</Text>
              </Space>
              <Text style={{ display: "block", marginTop: 12, color: "#1890ff" }}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Booking page ↗
                </a>
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                <InsertLinkOutlinedIcon /> <a href="#">link.com</a>
              </Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{
              width: 300,
              borderLeft: "6px solid #3CB4AC",
              borderTop: "1px solid rgb(208, 208, 208)",
              borderRight: "1px solid rgb(208, 208, 208)",
              borderBottom: "1px solid rgb(208, 208, 208)",
            }}>
              <Title level={5} style={{ color: "#3CB4AC", marginBottom: 8 }}>
                Monthly Review - DES
              </Title>
              <Space size={16} style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeOutlinedIcon />
                <Text>60 mins</Text>
                <CalendarMonthOutlinedIcon />
                <Text>2 bookings</Text>
              </Space>
              <Text style={{ display: "block", marginTop: 12, color: "#1890ff" }}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Booking page ↗
                </a>
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                <InsertLinkOutlinedIcon /> <a href="#">link.com</a>
              </Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{
              width: 300,
              borderLeft: "6px solid #3CB4AC",
              borderTop: "1px solid rgb(208, 208, 208)",
              borderRight: "1px solid rgb(208, 208, 208)",
              borderBottom: "1px solid rgb(208, 208, 208)",
            }}>
              <Title level={5} style={{ color: "#3CB4AC", marginBottom: 8 }}>
                Monthly Review - DES
              </Title>
              <Space size={16} style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeOutlinedIcon />
                <Text>60 mins</Text>
                <CalendarMonthOutlinedIcon />
                <Text>2 bookings</Text>
              </Space>
              <Text style={{ display: "block", marginTop: 12, color: "#1890ff" }}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Booking page ↗
                </a>
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                <InsertLinkOutlinedIcon /> <a href="#">link.com</a>
              </Text>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AppointmentSchedule