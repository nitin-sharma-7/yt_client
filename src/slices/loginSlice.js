import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginCondition: true,
  },
  reducers: {
    updateLogin: (state, action) => {
      state.loginCondition = action.payload;
    },
  },
});

export const { updateLogin } = loginSlice.actions;
export default loginSlice.reducer;
