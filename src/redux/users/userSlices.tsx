/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  accessToken: string;
}

const initialState: userState = {
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAccessToken } = userSlice.actions;

export default userSlice.reducer;
