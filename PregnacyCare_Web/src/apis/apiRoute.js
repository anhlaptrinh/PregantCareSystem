const API_ROUTES = {
    APPOINTMENT: "/api/appointment",
    APPOINTMENT_UPDATE: "/api/appointment/event",
    SCHEDULE: "/api/appointment/schedule?appointmentId=",
    SCHEDULE_UPDATE: "/api/appointment/schedule/edit-schedule",
    SCHEDULE_DELETE: "/api/appointment/schedule",
    FETUS_RECORD: "/api/fetus-record/findById?fetusId=",
    FETUS_RECORD_STATISTICS: "/api/fetus-record/Statistic/findById?fetusId=",
    FETUS_WHO:"/api/fetus/Who",
    FETUS_RECORD_CREATE:"/api/fetus-record?id=",
    FETUS_RECORD_DELETE:"/api/fetus-record/",
  };
  
  export default API_ROUTES;
  