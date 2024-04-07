import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducer";
import settingReducer from "./settingReducer";

const store = configureStore({
  reducer: {
    music: musicReducer,
    setting: settingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
