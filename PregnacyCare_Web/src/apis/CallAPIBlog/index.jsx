import APIClient from "../apiClient";

/**
 * Tạo một blog mới.
 * @param {Object} blog - Đối tượng BlogRequest chứa thông tin của blog.
 * @returns {Promise} Promise trả về kết quả từ API.
 */
export const useCreateBlog = (blog) => {
  return APIClient.post({
    url: "/api/blogs",
    data: blog, // Vì API sử dụng @RequestBody nên sử dụng data
  });
};

/**
 * Lấy danh sách tất cả các post.
 * @returns {Promise} Promise trả về danh sách blog.
 */
export const useGetPosts = () => {
  return APIClient.get({
    url: "/api/blogs/posts",
  });
};

/**
 * Lấy danh sách tất cả các post.
 * @returns {Promise} Promise trả về danh sách blog.
 */
export const useGetMyPosts = () => {
  return APIClient.get({
    url: "/api/blogs/my-posts",
  });
};

/**
 * Lấy danh sách tất cả các article.
 * @returns {Promise} Promise trả về danh sách blog.
 */
export const useGetArticles = () => {
  return APIClient.get({
    url: "/api/blogs/articles",
  });
};

/**
 * Xóa blog theo id.
 * @param {number} id - ID của blog cần xóa.
 * @returns {Promise} Promise trả về kết quả từ API.
 */
export const useDeleteBlog = (id) => {
  return APIClient.delete({
    url: `/api/blogs/${id}`,
  });
};

/**
 * Cập nhật blog.
 * @param {number} id - ID của blog cần cập nhật.
 * @param {Object} blog - Đối tượng BlogRequest chứa thông tin cập nhật.
 * @returns {Promise} Promise trả về kết quả từ API.
 */
export const useUpdateBlog = (id, blog) => {
  return APIClient.put({
    url: `/api/blogs/${id}`,
    data: blog,
  });
};

export const useGetPostDetail = (id) => {
  return APIClient.get({
    url: `/api/blogs/post-detail/${id}`,
  });
};
