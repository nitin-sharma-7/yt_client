import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/searchSlice.js";

const appStore = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export default appStore;
