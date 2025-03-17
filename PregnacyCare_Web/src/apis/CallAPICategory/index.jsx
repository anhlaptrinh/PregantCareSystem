import APIClient from "../apiClient";

/**
 * Tạo một blog category mới.
 * @param {string} name - Tên của danh mục.
 * @param {string} description - Mô tả của danh mục.
 * @returns {Promise} Promise chứa phản hồi từ API.
 */
export const useCreateCategory = (name, description) => {
  return APIClient.post({
    url: "/api/blog-categories",
    // Vì API sử dụng @RequestParam, nên truyền dữ liệu qua params.
    params: { name, description },
  });
};

/**
 * Lấy danh sách tất cả blog categories.
 * @returns {Promise} Promise chứa danh sách blog categories.
 */
export const useGetCategories = () => {
  return APIClient.get({
    url: "/api/blog-categories",
  });
};

/**
 * Xóa blog category theo id.
 * @param {number} id - ID của danh mục cần xóa.
 * @returns {Promise} Promise chứa phản hồi từ API.
 */
export const useDeleteCategory = (id) => {
  return APIClient.delete({
    url: `/api/blog-categories/${id}`,
  });
};

/**
 * Cập nhật blog category.
 * @param {number} id - ID của danh mục cần cập nhật.
 * @param {string} name - Tên mới của danh mục.
 * @param {string} description - Mô tả mới của danh mục.
 * @returns {Promise} Promise chứa phản hồi từ API.
 */
export const useUpdateCategory = (id, name, description) => {
  return APIClient.put({
    url: `/api/blog-categories/${id}`,
    params: { name, description },
  });
};
