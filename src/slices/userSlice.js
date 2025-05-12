import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    item: JSON.parse(sessionStorage.getItem("user")),
  },
  reducers: {
    addUser: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
