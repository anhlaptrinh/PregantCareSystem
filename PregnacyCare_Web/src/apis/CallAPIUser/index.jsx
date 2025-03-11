import APIClient from "../apiClient";
import * as jwtDecode from "jwt-decode";

/**
 * Hàm loginUser gọi API đăng nhập từ Spring Boot.
 * @param {string} email - Email của người dùng.
 * @param {string} password - Mật khẩu của người dùng.
 * @returns {Promise} - Promise trả về kết quả từ API.
 */
export const useLogin = (email, password) => {
  return APIClient.post({
    url: "/api/authentication/login",
    // Vì API sử dụng @RequestParam nên truyền dữ liệu qua params
    params: { email, password },
  }).then((response) => {
    // API trả về đối tượng có cấu trúc { code, message, data } với data là token
    if (response.code === 200 && response.data) {
      const token = response.data;
      // Giải mã token để lấy thông tin role (nếu token có chứa thông tin này)
      let decoded = {};
      try {
        decoded = jwtDecode(token);
      } catch (error) {
        console.error("Error token: ", error);
      }
      // Lưu token, email và role (nếu có) vào localStorage
      const userData = {
        accessToken: token,
        email: email,
        role: decoded.role || null,
      };
      localStorage.setItem("USER_TOKEN", JSON.stringify(userData));
    }
    return response;
  });
};
