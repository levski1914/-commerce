import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const CheckOutProtected = ({ children, redirectTo = "/cart" }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const currentPath = window.location.pathname;

  // Пропускай проверката, ако сме на страницата за успешна поръчка
  if (currentPath === "/order-success") {
    return children;
  }

  return cartItems.length > 0 ? children : <Navigate to={redirectTo} />;
};

export default CheckOutProtected;
