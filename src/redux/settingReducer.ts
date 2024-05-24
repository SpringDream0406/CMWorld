import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMusicSetting } from "../data/settingData";
import { ISwitch } from "../interface/setting.interface";

interface ISettingState {
  musicPlayerSetting: ISwitch;
}

let initialState: ISettingState = {
  musicPlayerSetting: initialMusicSetting,
};

const settingSlice = createSlice({
  name: "setting",
  initialState: initialState,
  reducers: {
    setMusicPlayerSetting(state, action: PayloadAction<ISwitch>) {
      state.musicPlayerSetting = action.payload;
    },
  },
});

export const settingAction = settingSlice.actions;
export default settingSlice.reducer;
