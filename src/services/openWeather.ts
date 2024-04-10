import axios from "axios";
import { IWeatherData } from "../interface/main";

export const getWeather = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<IWeatherData | null> => {
  const weatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
  console.log(weatherAPIKEY);

  const weaherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKEY}&units=metric&lang=kr`;

  try {
    const res = await axios.get(weaherURL);
    return res.data;
  } catch (err) {
    console.error(err);
    alert("날씨 데이터를 가져오는데 실패했습니다.");
    return null;
  }
};
