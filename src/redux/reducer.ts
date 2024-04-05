import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "../interface/main";
import { MusicData } from "../interface/music";
import { musicData } from "../musicData";

interface MusicState {
  nowWeather: WeatherData;
  musicData: MusicData[];
  selectedPlaylist: string;
  playMusics: MusicData[];
  volume: number;
}

const localStoragePlaylist = JSON.parse(
  localStorage.getItem("playlist") || "[]"
);
const localStorageVolume = parseInt(
  localStorage.getItem("sidYoutubeMusicPlayerVolume") || "10"
);

let initialState: MusicState = {
  nowWeather: {},
  musicData: musicData,
  selectedPlaylist: "음악 전체 보기",
  playMusics: localStoragePlaylist ? localStoragePlaylist : [],
  volume: localStorageVolume,
};

const musicSlice = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    setNowWeather(state, action: PayloadAction<WeatherData>) {
      state.nowWeather = action.payload;
    },
    setMusicData(state, action: PayloadAction<MusicData[]>) {
      state.musicData = action.payload;
    },
    setSelectedPlaylist(state, action: PayloadAction<string>) {
      state.selectedPlaylist = action.payload;
    },
    setPlayMusics(state, action: PayloadAction<MusicData[]>) {
      state.playMusics = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
