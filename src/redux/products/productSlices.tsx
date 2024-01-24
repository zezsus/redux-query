/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  listProduct: [];
}

const initialState: ProductState = {
  listProduct: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    seaarchProduct: (state: any) => {
      return state.listProduct;
    },
  },
});

// Action creators are generated for each case reducer function
export const { seaarchProduct } = productSlice.actions;

export default productSlice.reducer;
