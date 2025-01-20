import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  // Селектор за достъп до състоянието на количката
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Функция за премахване на продукт
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Функция за обновяване на количеството
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  // Проверка на текущото състояние в конзолата (премахни я по-късно)
  // console.log("Cart Items:", cartItems);

  const calculatePrices = () => {
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

  const goToCheckout = () => {
    navigate("/checkout"); // Пренасочване към Checkout компонента
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? ( // Ако няма продукти в количката
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border-b pb-4 mb-4 flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="border p-1 w-16 text-center"
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value, 10))
                  }
                />
                <button
                  className="bg-red-500 text-white py-1 px-3 ml-4 rounded-lg"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Обобщение на поръчката */}
      {cartItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Order Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              $
              {calculatePrices().totalPrice -
                calculatePrices().shippingPrice -
                calculatePrices().taxPrice}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${calculatePrices().shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${calculatePrices().taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span>Total:</span>
            <span>${calculatePrices().totalPrice.toFixed(2)}</span>
          </div>

          {/* Бутон за прехвърляне към Checkout */}
          <button
            className="bg-green-500 text-white py-2 px-6 mt-4 rounded-lg"
            onClick={goToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
