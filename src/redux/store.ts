import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducer";
import settingReducer from "./settingReducer";
import firebaseReducer from "./firebaseReducer";

const store = configureStore({
  reducer: {
    music: musicReducer,
    setting: settingReducer,
    firebase: firebaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
