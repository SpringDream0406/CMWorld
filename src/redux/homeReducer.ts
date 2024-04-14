import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  numberOfGuestbookPosts: 0,
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    setnumberOfGuestbookPosts(state, action) {
      state.numberOfGuestbookPosts = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;
