import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import checkReducer from "./checkSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    check: checkReducer,
    admin: adminReducer,
  },
});
