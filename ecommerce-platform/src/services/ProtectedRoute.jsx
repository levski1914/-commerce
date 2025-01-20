import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, requireAuth = false, redirectTo }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  if (requireAuth && !userInfo) {
    // Ако маршрутът изисква потребителят да е логнат, но не е
    return <Navigate to={redirectTo || "/login"} replace />;
  }

  if (!requireAuth && userInfo) {
    // Ако маршрутът е публичен, но потребителят е вече логнат
    return <Navigate to={redirectTo || "/"} replace />;
  }

  // Връща съдържанието, ако проверките са успешни
  return children;
};

export default ProtectedRoute;