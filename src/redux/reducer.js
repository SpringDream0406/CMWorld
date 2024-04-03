import { musicData } from "../musicData";

let initialState = {
  nowWeather: {},
  musicData: musicData,
  selectedPlaylist: "음악 전체 보기",
  playMusics: {},
  volume: 5,
};

// 로컬저장 가져와서 요런식으로 넣으면 될듯?
// if (local있냐?) {
//   initialState.playMusics = [
//     {
//       videoId: "CpJo0MnQIpg",
//       artist: "크리스포터 X 청하",
//       title: "When I Get Old",
//       time: "4:41",
//       playlists: ["CM추천"],
//     },
//   ];
// }

const reducer = (state = initialState, action) => {
  // console.log("state", state);
  // console.log("action", action);
  switch (action.type) {
    case "NOWWEATHER":
      return { ...state, nowWeather: action.payload };

    case "MUSICDATA":
      return { ...state, musicData: action.payload };

    case "SELECTEDPLAYLIST":
      return { ...state, selectedPlaylist: action.payload };

    case "PLAYMUSICS":
      return { ...state, playMusics: action.payload };

    case "VOLUME":
      return { ...state, volume: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
