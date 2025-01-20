import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrderItem } from "../redux/checkSlice";
import { clearCart } from "../redux/cartSlice";
const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculatePrice = () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingPrice = totalPrice > 50 ? 0 : 10;
    const taxPrice = totalPrice * 0.1;
    return {
      totalPrice: totalPrice + shippingPrice + taxPrice,
      shippingPrice,
      taxPrice,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвратява презареждането на страницата

    // Проверка за задължителните полета
    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country ||
      !paymentMethod ||
      cartItems.length === 0 // Проверка дали количката не е празна
    ) {
      setError("Моля, попълнете всички задължителни полета.");
      return;
    }

    const { totalPrice, shippingPrice, taxPrice } = calculatePrice();

    try {
      // Подготовка на данните за изпращане
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id, // Проверете дали имате _id за всеки продукт
        })),
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      console.log("Sending order data:", orderData); // Логирай данните за поръчката

      // Изпращане на поръчката
      await dispatch(addOrderItem(orderData));

      // Изчистване на количката
      dispatch(clearCart());
      localStorage.removeItem("cartItems");

      // Пренасочване към страницата за успех след като всичко е завършено
      console.log("Navigating to /order-success");
      navigate("/order-success");
    } catch (error) {
      setError("Процесът на поръчка не можа да бъде завършен.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Адрес за доставка */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Адрес за доставка</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Адрес*"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className={`border p-2 w-full rounded-lg ${
                !shippingAddress.address && error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <input
              type="text"
              placeholder="Град*"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              className={`border p-2 w-full rounded-lg ${
                !shippingAddress.city && error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <input
              type="text"
              placeholder="Пощенски код*"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value,
                })
              }
              className={`border p-2 w-full rounded-lg ${
                !shippingAddress.postalCode && error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <input
              type="text"
              placeholder="Държава*"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className={`border p-2 w-full rounded-lg ${
                !shippingAddress.country && error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>
        </div>

        {/* Метод на плащане */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Метод на плащане</h3>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            className={`border p-2 w-full rounded-lg ${
              !paymentMethod && error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Изберете метод*</option>
            <option value="card">Карти</option>
            <option value="cod">Наложен платеж</option>
          </select>
        </div>

        {/* Обобщение на поръчката */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Обобщение на поръчката</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-2">
              <span className="font-semibold">Общо:</span>{" "}
              {calculatePrice().totalPrice.toFixed(2)} лв.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Доставка:</span>{" "}
              {calculatePrice().shippingPrice.toFixed(2)} лв.
            </p>
            <p>
              <span className="font-semibold">Данък:</span>{" "}
              {calculatePrice().taxPrice.toFixed(2)} лв.
            </p>
          </div>
        </div>

        {/* Грешка */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Бутон за потвърждение */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Потвърди поръчката
        </button>
      </form>
    </div>
  );
};

export default Checkout;
