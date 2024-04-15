import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMusicSetting } from "../data/settingData";
import { ISwitch } from "../interface/setting.interface";
import { Utils } from "../utils/utils";

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
      Utils.setObjLocalData("musicPlayerSetting", action.payload);
      if (!action.payload["플레이리스트 저장"])
        localStorage.removeItem("playlist");
    },
  },
});

export const settingAction = settingSlice.actions;
export default settingSlice.reducer;
