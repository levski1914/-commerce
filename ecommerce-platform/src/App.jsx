import { useState } from "react";
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute redirectTo="/">
                <LoginScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute redirectTo="/">
                <RegisterScreen />
              </ProtectedRoute>
            }
          />
          {/* Защитени маршрути за профила */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/login">
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
