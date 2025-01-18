import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
