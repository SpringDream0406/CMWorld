import { musicData } from "../pages/Jukbox/musicData";

let initialState = {
  nowWeather: null,
  musicData: musicData,
  selectedPlaylist: "음악 전체 보기",
  checkedMusics: [],
};

const reducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case "NOWWEATHER":
      return { ...state, nowWeather: action.payload };

    case "MUSICDATA":
      return { ...state, musicData: action.payload };

    case "SELECTEDPLAYLIST":
      return { ...state, selectedPlaylist: action.payload };

    case "CHECKEDMUSICS":
      return { ...state, checkedMusics: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
