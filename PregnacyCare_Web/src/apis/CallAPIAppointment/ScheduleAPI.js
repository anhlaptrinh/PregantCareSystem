// src/api/appointmentApi.js
import APIClient from "../apiClient"; // Giả sử APIClient đã được cấu hình sẵn
import API_ROUTES from "../apiRoute";


const scheduleApi = {
  getScheduleById: (id) => APIClient.get({ url: `${API_ROUTES.SCHEDULE}${id}`,silent:true }),
  createSchedule: (data) => APIClient.post({ url: `${API_ROUTES.SCHEDULE}`, data }),
  updateSchedule: (id, data) => APIClient.put({ url: `${API_ROUTES.SCHEDULE}/${id}`, data }),
  deleteSchedule: (id) => APIClient.delete({ url: `${API_ROUTES.APPOINTMENT}/${id}` }),
};

export default scheduleApi;
