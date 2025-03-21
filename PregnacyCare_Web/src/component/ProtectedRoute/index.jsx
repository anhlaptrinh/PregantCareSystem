/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPages";

const ProtectedRoute = ({ allowedRoles }) => {
  const storedUser = localStorage.getItem("USER_TOKEN");

  // Nếu không có token, chuyển hướng về trang login
  if (!storedUser) {
    return <ErrorPage />;
  }

  const userData = JSON.parse(storedUser);

  // Kiểm tra nếu role của người dùng nằm trong danh sách allowedRoles
  return allowedRoles.includes(userData.role) ? <Outlet /> : <ErrorPage />;
};

export default ProtectedRoute;
