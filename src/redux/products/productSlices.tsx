/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  listProduct: [];
  isShowAddProduct: boolean;
}

const initialState: ProductState = {
  listProduct: [],
  isShowAddProduct: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    seaarchProduct: (state: any) => {
      return state.listProduct;
    },
    setShowAddProduct: (state, action) => {
      state.isShowAddProduct = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { seaarchProduct, setShowAddProduct } = productSlice.actions;

export default productSlice.reducer;
