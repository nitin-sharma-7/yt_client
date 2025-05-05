import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/searchSlice.js";
import loginReducer from "../slices/loginSlice.js";
import userReducer from "../slices/userSlice.js";
const appStore = configureStore({
  reducer: {
    search: searchReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default appStore;
