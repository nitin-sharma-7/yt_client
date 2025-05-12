import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    item: JSON.parse(sessionStorage.getItem("channel")),
  },
  reducers: {
    addChannel: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { addChannel } = channelSlice.actions;
export default channelSlice.reducer;
