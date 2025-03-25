import APIClient from "../apiClient";

export const useGetAllAdvices = () => {
  return APIClient.get({
    url: "/api/advices",
  });
};

export const useGetAllMyAdvices = () => {
  return APIClient.get({
    url: "/api/advices/members",
  });
};

export const useAnswerAdvice = (adviceId, answer) => {
  return APIClient.put({
    url: `/api/advices/status/${adviceId}`,
    params: { answer },
  });
};

export const useCreateAdvice = (advice) => {
  return APIClient.post({
    url: `/api/advices`,
    data: advice,
  });
};
