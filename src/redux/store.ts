import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducer";
import settingReducer from "./settingReducer";
import firebaseReducer from "./firebaseReducer";
import homeReducer from "./homeReducer";

const store = configureStore({
  reducer: {
    music: musicReducer,
    setting: settingReducer,
    firebase: firebaseReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
