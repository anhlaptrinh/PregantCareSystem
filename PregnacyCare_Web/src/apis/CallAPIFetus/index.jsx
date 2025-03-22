import APIClient from "../apiClient";

/**
 * Hàm lấy danh sách thai nhi từ API Spring Boot.
 * @returns {Promise} - Promise trả về kết quả từ API với danh sách thai nhi.
 */
export const useGetFetusList = () => {
  return APIClient.get({
    url: "/api/fetus",
  });
};
/**
 * Hàm lấy danh sách thai nhi từ API Spring Boot.
 * @returns {Promise} - Promise trả về kết quả từ API với danh sách thai nhi.
 */
export const useGetMyFetusList = () => {
  return APIClient.get({
    url: "/api/fetus/MyFetus",
  });
};

/**
 * Hàm tạo một thai nhi mới thông qua API Spring Boot.
 * @param {object} fetusData - Dữ liệu của thai nhi cần tạo.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useCreateFetus = (fetusData) => {
  return APIClient.post({
    url: "/api/fetus",
    data: fetusData,
  });
};

/**
 * Hàm cập nhật thông tin của một thai nhi thông qua API Spring Boot.
 * @param {number} id - ID của thai nhi cần cập nhật.
 * @param {object} fetusData - Dữ liệu cập nhật của thai nhi.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useUpdateFetus = (id, fetusData) => {
  return APIClient.put({
    url: `/api/fetus/${id}`,
    data: fetusData,
  });
};

/**
 * Hàm xóa một thai nhi thông qua API Spring Boot.
 * @param {number} id - ID của thai nhi cần xóa.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useDeleteFetus = (id) => {
  return APIClient.delete({
    url: `/api/fetus/${id}`,
  });
};
