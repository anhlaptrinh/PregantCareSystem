import APIClient from "../apiClient";

// Tính toán ngày dự sinh dựa trên chu kỳ cuối cùng (last period)
export const calculateDueDateFromLastPeriod = (lastPeriodInput) => {
  return APIClient.post({
    url: "/api/duedate/last-period",
    data: lastPeriodInput,
  });
};

// Tính toán ngày dự sinh dựa trên ngày thụ thai (conception date)
export const calculateDueDateFromConception = (conceptionInput) => {
  return APIClient.post({
    url: "/api/duedate/conception-date",
    data: conceptionInput,
  });
};

// Tính toán ngày dự sinh cho các ca IVF dựa trên ngày chuyển phôi
export const calculateDueDateForIVF = (ivfInput) => {
  return APIClient.post({
    url: "/api/duedate/ivf",
    data: ivfInput,
  });
};

// Tính toán ngày dự sinh dựa trên siêu âm (ultrasound)
export const getDueDateFromUltrasound = (ultrasoundInput) => {
  return APIClient.post({
    url: "/api/duedate/ultrasound",
    data: ultrasoundInput,
  });
};

// Tạo timeline thai kỳ dựa trên ngày dự sinh đã tính (from due date)
export const getPregnancyTimelineFromDueDate = (dueDateInput) => {
  return APIClient.post({
    url: "/api/duedate/from-due-date",
    data: dueDateInput,
  });
};
