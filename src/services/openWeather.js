import axios from "axios";

export const getWeather = async ({ latitude, longitude }) => {
  const weatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
  const weaherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKEY}&units=metric&lang=kr`;

  try {
    const res = await axios.get(weaherURL);
    return res;
  } catch (err) {
    console.error(err);
    alert("날씨 데이터를 가져오는데 실패했습니다.");
  }
};
