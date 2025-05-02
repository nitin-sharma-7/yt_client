import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/searchSlice.js";
import loginReducer from "../slices/loginSlice.js";
const appStore = configureStore({
  reducer: {
    search: searchReducer,
    login: loginReducer,
  },
});

export default appStore;
