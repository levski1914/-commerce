import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
// import { logout } from "../redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const user = useSelector((state) => state.user.userInfo); // Вземаме потребителя директно от Redux

  const handleLogout = () => {
    dispatch(logoutUser()); // Изпълняваме Redux logout екшън
    navigate("/")
  };
  return (
    <header className="bg-orange-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ShopLogo
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-gray-300">Cart</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile" className="hover:text-gray-300">Profile</Link>
                </li>
                {user.isAdmin && (
                  <li>
                    <Link to="/admin" className="hover:text-gray-300">Admin Panel</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-300">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-300">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
