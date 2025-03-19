// src/api/appointmentApi.js
import APIClient from "../apiClient"; // Giả sử APIClient đã được cấu hình sẵn
import API_ROUTES from "../apiRoute";


const appointmentApi = {
  getAppointments: () => APIClient.get({ url:  API_ROUTES.APPOINTMENT }),
  getAppointmentById: (id) => APIClient.get({ url: `${API_ROUTES.APPOINTMENT}/${id}` }),
  createAppointment: (data) => APIClient.post({ url: `${API_ROUTES.APPOINTMENT}`, data }),
  updateAppointment: (data) => APIClient.put({ url: `${API_ROUTES.APPOINTMENT_UPDATE}`, data }),
  deleteAppointment: (id) => APIClient.delete({ url: `${API_ROUTES.APPOINTMENT}/${id}` }),
};

export default appointmentApi;
