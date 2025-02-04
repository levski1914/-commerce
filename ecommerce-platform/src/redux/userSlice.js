import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../services/api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
