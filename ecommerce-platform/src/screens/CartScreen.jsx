import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

const CartScreen = () => {
  // Селектор за достъп до състоянието на количката
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

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
  console.log("Cart Items:", cartItems);

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
    </div>
  );
};

export default CartScreen;
