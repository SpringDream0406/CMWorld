import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  firebaseUID: "",
  firebaseUserName: "",
};

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: initialState,
  reducers: {
    setFirebaseUID(state, action) {
      state.firebaseUID = action.payload;
    },
    setUserName(state, action) {
      state.firebaseUserName = action.payload;
    },
  },
});

export const firebaseAction = firebaseSlice.actions;
export default firebaseSlice.reducer;
