import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    loginData: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.loginData = action.payload;
    },
    removeUser: (state, action) => {
      state.loginData = [];
    },
  },
});

export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
