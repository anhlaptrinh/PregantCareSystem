import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const storedUser = localStorage.getItem("USER_TOKEN");

  // Nếu không có token, chuyển hướng về trang login
  if (!storedUser) {
    return <Navigate to="/" />;
  }

  const userData = JSON.parse(storedUser);

  // Kiểm tra nếu role của người dùng nằm trong danh sách allowedRoles
  return allowedRoles.includes(userData.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
