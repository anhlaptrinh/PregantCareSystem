import APIClient from "../apiClient";

export const useCompareFetalData = (
  week,
  headCircumference,
  fetalLength,
  fetalWeight
) => {
  return APIClient.post({
    url: "/api/fetal-growth/compare",
    params: { week, headCircumference, fetalLength, fetalWeight },
  });
};
