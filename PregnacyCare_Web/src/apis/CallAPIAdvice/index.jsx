import APIClient from "../apiClient";

export const useGetAllAdvices = () => {
  return APIClient.get({
    url: "/api/advices",
  });
};

export const useAnswerAdvice = (adviceId, answer) => {
  return APIClient.put({
    url: `/api/advices/status/${adviceId}`,
    params: { answer },
  });
};
