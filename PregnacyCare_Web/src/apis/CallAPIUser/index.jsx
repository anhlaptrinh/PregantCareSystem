import APIClient from "../apiClient";
import { jwtDecode } from "jwt-decode";

export const useGetAllUsers = () => {
  return APIClient.get({
    url: `/api/users`,
  });
};

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
    if (response.code === 200) {
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
        role: decoded.scope || null,
      };
      localStorage.setItem("USER_TOKEN", JSON.stringify(userData));
    }
    return response;
  });
};

/**
 * Đăng ký người dùng mới
 * @param {string} email
 * @param {string} password
 * @param {string} fullName -
 * @returns {Promise} - Promise chứa thông tin đăng ký thành công
 */
export const useRegister = (email, password, fullName) => {
  return APIClient.post({
    url: "/api/users/register",
    data: { email, password, fullName },
  }).then((res) => {
    if (res.code === 200) {
      return res;
    } else throw new Error(res.message || "Failed sign in");
  });
};

export const useAddUser = (data) => {
  return APIClient.post({
    url: "/api/Admin/addUser",
    data: data,
  }).then((res) => {
    if (res.code === 200) {
      return res;
    } else throw new Error(res.message || "Failed sign in");
  });
};

export const useUserInfo = () => {
  return APIClient.get({
    url: "/api/users/my-info",
  });
};
export const useGetAllUser = () => {
  return APIClient.get({
    url: "/api/users",
  });
};

export const useUpdateUser = (id, user) => {
  return APIClient.put({
    url: `/api/users/${id}`,
    params: {
      name: user.fullName,
      email: user.email,
    },
  });
};

export const useEditeUser = (data) => {
  return APIClient.put({
    url: `/api/Admin/updateUser`,
    data: data,
  });
};

export const useChangePassword = (oldPassword, newPassword) => {
  return APIClient.put({
    url: `/api/authentication/change-password`,
    params: {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
  });
};

export const useForgotPassword = (email) => {
  return APIClient.post({
    url: `/api/authentication/forgot-password`,
    params: {
      email,
    },
  });
};

export const useGetAllExperts = () => {
  return APIClient.get({
    url: `/api/users/experts`,
  });
};

export const useGetExpertDetail = (id) => {
  return APIClient.get({
    url: `/api/users/experts/${id}`,
  });
};
