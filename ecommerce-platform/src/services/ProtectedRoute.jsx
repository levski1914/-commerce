import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, requireAuth = false, redirectTo }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  if (requireAuth && !userInfo) {
    return <Navigate to={redirectTo || "/login"} replace />;
  }

  if (!requireAuth && userInfo) {
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return children;
};

export default ProtectedRoute;