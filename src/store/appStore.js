import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/searchSlice.js";
import userReducer from "../slices/userSlice.js";
import channelReducer from "../slices/channelSlice.js";
const appStore = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    channel: channelReducer,
  },
});

export default appStore;
