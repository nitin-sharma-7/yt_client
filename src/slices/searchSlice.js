import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchItem: "",
  },
  reducers: {
    addSearch: (state, action) => {
      state.searchItem = action.payload;
    },
  },
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;
