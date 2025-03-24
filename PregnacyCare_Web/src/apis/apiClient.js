import { message as Message } from "antd";
import axios from "axios";

// Utility functions for storage (Replace with actual implementation)
const getItem = (key) => JSON.parse(localStorage.getItem(key));
const removeItem = (key) => localStorage.removeItem(key);

// Manually define StorageEnum since JavaScript doesn't support `enum`
const StorageEnum = {
  Token: "USER_TOKEN",
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "http://localhost:8080",
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getItem(StorageEnum.Token);
    if (accessToken && accessToken.accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (!res.data)
      throw new Error("The interface request failed, please try again later!");
    const { message } = res.data;
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
    throw new Error(
      message || "The interface request failed, please try again later!"
    );
  },
  async (error) => {
    let errMsg = "";
    const { response, message, config } = error || {};

    if (response?.status === 401) {
      // Token hết hạn: xóa token và chuyển hướng về trang chủ để đăng nhập lại.
      removeItem(StorageEnum.Token);
      Message.error("Token Expired! Please log in again.");
      window.location.href = "/";
      return Promise.reject(error);
    }
    if(response?.status === 404){
      
      return Promise.reject(error);
    }


    try {
      errMsg = response?.data?.message || message;
      Message.error(errMsg);
      
    } catch (error) {
      throw new Error(error.toString());
    }
    return Promise.reject(error);
  }
);

class APIClient {
  download(config) {
    return axiosInstance.request({
      ...config,
      responseType: "blob",
    });
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  put(config) {
    return this.request({ ...config, method: "PUT" });
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  request(config) {
    return axiosInstance
      .request(config)
      .then((res) => res)
      .catch((e) => Promise.reject(e));
  }
}

export default new APIClient();
