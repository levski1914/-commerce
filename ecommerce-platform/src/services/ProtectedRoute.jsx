import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  // Защита, ако потребителят е логнат и се опитва да влезе в /login или /register
  if (userInfo && (redirectTo === "/login" || redirectTo === "/register")) {
    return <Navigate to="/" replace />;
  }

  // Защита, ако потребителят не е логнат и се опитва да влезе в защитен маршрут
  if (!userInfo && (redirectTo === "/profile" || redirectTo === "/checkout")) {
    return <Navigate to="/login" replace />;
  }

  // Връща children ако проверките преминат
  return children;
};

export default ProtectedRoute;
