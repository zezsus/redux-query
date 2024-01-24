/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  listCartItem: any;
  numberItem: number;
}

const initialState: CartState = {
  listCartItem: [],
  numberItem: 0,
};

export const cartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addCartItem: (state, aciton) => {
      state.numberItem += 1;
      state.listCartItem.push(aciton.payload);
    },
    removeCartItem: (state, action) => {
      state.numberItem -= 1;
      const removeItem = action.payload;
      state.listCartItem = state.listCartItem.filter(
        (item: any) => item.id !== removeItem.id
      );
    },
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
