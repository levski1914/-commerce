import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  if (userInfo && redirectTo === "/") {
    return <Navigate to="/" replace />;
  }

  if (!userInfo && redirectTo === "/login") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
