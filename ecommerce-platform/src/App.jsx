import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProtectedRoute from "./services/ProtectedRoute";
import ProfileScreen from "./screens/ProfileScreen";
import Checkout from "./screens/Checkout";
import CheckOutProtected from "./services/CheckOutProtected";
import { useDispatch } from "react-redux";
import { setCartItems } from "./redux/cartSlice";
import OrderSucceedScreen from "./screens/OrderSucceedScreen";
import axios from "axios";
import AdminScreen from "./screens/adminScreen";
import { useSelector } from "react-redux";

import {logoutUser,setUser} from './redux/userSlice'

function App() {
 const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      dispatch(setUser(userData));
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setUser(response.data));
        })
        .catch((error) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(logoutUser());
        });
    } else {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  const handleLogin = (token, userData) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    // Извличане на количката от localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    dispatch(setCartItems(storedCartItems));
  }, [dispatch]);

  return (
    <>
     <Router>
  <Header user={user} onLogout={handleLogout} />
  <Routes>
    <Route path="/" element={<HomeScreen />} />
    <Route path="/product/:id" element={<ProductScreen />} />
    <Route path="/cart" element={<CartScreen />} />
    <Route path="/order-success" element={<OrderSucceedScreen />} />

    {/* Публични маршрути */}
    <Route
      path="/login"
      element={
        <ProtectedRoute requireAuth={false} redirectTo="/">
          <LoginScreen onLogin={handleLogin} />
        </ProtectedRoute>
      }
    />
    <Route
      path="/register"
      element={
        <ProtectedRoute requireAuth={false} redirectTo="/">
          <RegisterScreen onLogin={handleLogin} />
        </ProtectedRoute>
      }
    />

    {/* Защитени маршрути */}
    <Route
      path="/profile"
      element={
        <ProtectedRoute requireAuth={true} redirectTo="/login">
          <ProfileScreen />
        </ProtectedRoute>
      }
    />
    <Route
      path="/checkout"
      element={
        <ProtectedRoute requireAuth={true} redirectTo="/login">
          <Checkout />
        </ProtectedRoute>
      }
    />
    <Route path="/admin" element={<AdminScreen />} />
  </Routes>
</Router>
    </>
  );
}

export default App;
