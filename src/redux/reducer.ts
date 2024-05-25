import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeatherData } from "../interface/main.interface";
import { IMusicData } from "../interface/music.interface";
import { LsUtils } from "../utils/lsUtils";

interface IMusicState {
  nowWeather: IWeatherData;
  playMusics: IMusicData[];
  volume: number;
}

let initialState: IMusicState = {
  nowWeather: {},
  playMusics: [],
  volume: LsUtils.getMusicPlayerVolume(),
};

const musicSlice = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    setNowWeather(state, action: PayloadAction<IWeatherData>) {
      state.nowWeather = action.payload;
    },
    setPlayMusics(state, action: PayloadAction<IMusicData[]>) {
      state.playMusics = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
