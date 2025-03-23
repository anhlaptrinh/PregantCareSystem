import APIClient from "../apiClient"; // Giả sử APIClient đã được cấu hình sẵn
import API_ROUTES from "../apiRoute";


const fetusRecordApi = {
  getFetusRecords: (id) => APIClient.get({ url:  `${API_ROUTES.FETUS_RECORD}${id}` }),
  getFetusRecordStatistics: (id) => APIClient.get({ url: `${API_ROUTES.FETUS_RECORD_STATISTICS}${id}` }),
  getFetusWho: () => APIClient.get({ url: `${API_ROUTES.FETUS_WHO}` }),
  createFetusRecord: (id,data) => APIClient.post({ url: `${API_ROUTES.FETUS_RECORD_CREATE}${id}`, data }),
  updateFetusRecord: (data) => APIClient.put({ url: `${API_ROUTES.APPOINTMENT_UPDATE}`, data }),
  deleteFetusRecord: (id) => APIClient.delete({ url: `${API_ROUTES.FETUS_RECORD_DELETE}${id}` }),
};

export default fetusRecordApi;