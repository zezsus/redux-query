/** @format */

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./redux/products/productSlices";
import cartReducer from "./redux/cart/cartSlices";
import userReducer from "./redux/users/userSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    carts: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
