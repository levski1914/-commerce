import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSucceedScreen = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Успешно направена поръчка!
        </h1>
        <p className="mt-4 text-lg">
          Очаквайте потвърждение на имейла или телефона си.
        </p>
        <p className="mt-2 text-gray-600">
          Ще бъдете пренасочени към началната страница след няколко секунди.
        </p>
      </div>
    </div>
  );
};

export default OrderSucceedScreen;
