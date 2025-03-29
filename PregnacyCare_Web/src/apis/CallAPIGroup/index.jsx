import APIClient from "../apiClient";

/**
 * Hàm lấy danh sách group từ API Spring Boot.
 * @returns {Promise} - Promise trả về kết quả từ API với danh sách group.
 */
export const useGetGroupList = () => {
  return APIClient.get({
    url: "/api/groups",
  });
};

/**
 * Hàm lấy danh sách my group từ API Spring Boot.
 * @returns {Promise} - Promise trả về kết quả từ API với danh sách group.
 */
export const useGetMyGroupList = () => {
  return APIClient.get({
    url: "/api/groups/my-groups",
  });
};

/**
 * Hàm tạo một group mới thông qua API Spring Boot.
 * @param {object} groupData - Dữ liệu của group cần tạo.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useCreateGroup = (groupData) => {
  return APIClient.post({
    url: "/api/groups",
    data: groupData,
  });
};

/**
 * Hàm cập nhật thông tin của một group thông qua API Spring Boot.
 * Vì API yêu cầu truyền name và description dưới dạng query parameters,
 * nên chúng ta sử dụng thuộc tính params trong cấu hình của axios.
 * @param {number} id - ID của group cần cập nhật.
 * @param {string} name - Tên mới của group.
 * @param {string} description - Mô tả mới của group.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useUpdateGroup = (id, name, description) => {
  return APIClient.put({
    url: `/api/groups/${id}`,
    params: { name, description },
  });
};

/**
 * Hàm xóa một group thông qua API Spring Boot.
 * @param {number} id - ID của group cần xóa.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useDeleteGroup = (id) => {
  return APIClient.delete({
    url: `/api/groups/${id}`,
  });
};

/**
 * Hàm đăng ký người dùng vào group thông qua API Spring Boot.
 * Vì API yêu cầu truyền email dưới dạng query parameter,
 * nên chúng ta sử dụng thuộc tính params trong cấu hình của axios.
 * @param {number} groupId - ID của group mà người dùng muốn đăng ký.
 * @param {string} email - Email của người dùng cần đăng ký.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useRegisterUserToGroup = (groupId) => {
  return APIClient.post({
    url: `/api/groups/register/${groupId}`,
  });
};

/**
 * Hàm xóa một group thông qua API Spring Boot.
 * @param {number} id - ID của group cần xóa.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useGetGroup = (id) => {
  return APIClient.get({
    url: `/api/groups/${id}`,
  });
};
