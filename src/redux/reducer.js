import { createSlice } from "@reduxjs/toolkit";
import { musicData } from "../musicData";

const localStoragePlaylist = JSON.parse(localStorage.getItem("playlist"));
const localStorageVolume = localStorage.getItem("sidYoutubeMusicPlayerVolume");

let initialState = {
  nowWeather: {},
  musicData: musicData,
  selectedPlaylist: "음악 전체 보기",
  playMusics: localStoragePlaylist ? localStoragePlaylist : [],
  volume: localStorageVolume ? localStorageVolume : 10,
};

const musicSlice = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    setNowWeather(state, action) {
      state.nowWeather = action.payload;
    },
    setMusicData(state, action) {
      state.musicData = action.payload;
    },
    setSelectedPlaylist(state, action) {
      state.selectedPlaylist = action.payload;
    },
    setPlayMusics(state, action) {
      state.playMusics = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
