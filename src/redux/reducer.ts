import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeatherData } from "../interface/main";
import { IMusicData } from "../interface/music";

const localStoragePlaylist = JSON.parse(
  localStorage.getItem("playlist") || "[]"
);
const localStorageVolume = parseInt(
  localStorage.getItem("sidYoutubeMusicPlayerVolume") || "10"
);

interface IMusicState {
  nowWeather: IWeatherData;
  musicData: IMusicData[];
  selectedPlaylist: string;
  playMusics: IMusicData[];
  volume: number;
}

let initialState: IMusicState = {
  nowWeather: {},
  musicData: [],
  selectedPlaylist: "음악 전체 보기",
  playMusics: localStoragePlaylist ? localStoragePlaylist : [],
  volume: localStorageVolume,
};

const musicSlice = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    setNowWeather(state, action: PayloadAction<IWeatherData>) {
      state.nowWeather = action.payload;
    },
    setMusicData(state, action: PayloadAction<IMusicData[]>) {
      state.musicData = action.payload;
    },
    setSelectedPlaylist(state, action: PayloadAction<string>) {
      state.selectedPlaylist = action.payload;
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
