let initialState = {
  nowWeather: null,
};

const reducer = (state = initialState, action) => {
  // console.log("action?", action);
  // console.log(action.payload);
  // console.log("state", state);

  if (action.type === "NOWWEATHER") {
    return { ...state, nowWeather: action.payload };
  }
  //   if (action.type === "INCREMENT") {
  //     return { ...state, count: state.count + action.payload.num };
  //   }

  return { ...state };
};

export default reducer;
