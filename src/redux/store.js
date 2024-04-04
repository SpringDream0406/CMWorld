import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducer";

const store = configureStore({
  reducer: {
    music: musicReducer,
  },
});

export default store;
