import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    item: {},
  },
  reducers: {
    addChannelState: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { addChannelState } = channelSlice.actions;
export default channelSlice.reducer;
