import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../../../services/geolocation";
import { getWeather } from "../../../services/openWeather";

const SideWeather = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nowWeather = useSelector((state) => state.nowWeather);

  useEffect(() => {
    const moveGeoPage = (inputCode) => {
      navigate("geolocation", { state: { code: inputCode } });
    };
    const fetchDate = async () => {
      try {
        const geoLocation = await getLocation();
        if (geoLocation.code) {
          moveGeoPage(geoLocation.code);
          return;
        }
        const weatherData = await getWeather(geoLocation);
        dispatch({ type: "NOWWEATHER", payload: weatherData.data });
      } catch (err) {
        if (err.code) {
          moveGeoPage(err.code);
          return;
        }
        console.log(err);
      }
    };
    fetchDate();
  }, [dispatch, navigate]);

  if (!nowWeather) {
    return <div>로딩중</div>;
  }

  // console.log(weatherData.data);
  const { name, weather, main, wind } = nowWeather;
  const iconURL = ` https://openweathermap.org/img/wn/${weather[0].icon}.png`;

  // <a href="https://kr.freepik.com/free-vector/sky-background-pastel-paper-cut-design-vector_18938534.htm#query=clouds%20background&position=0&from_view=keyword&track=ais&uuid=b4209833-19bc-4cd1-ad45-111712393ea9">작가 rawpixel.com</a> 출처 Freepik

  return (
    <div>
      <div>위치: {name}</div>
      <div>
        날씨: {weather[0].main} <img src={`${iconURL}`} alt="weatherIcon" />
      </div>
      <div>현재기온: {main.temp}</div>
      <div>체감기온: {main.feels_like}</div>
      <div>최고기온: {main.temp_max}</div>
      <div>최저기온: {main.temp_min}</div>
      <div>습도: {main.humidity}</div>
      <div>기압: {main.pressure}</div>
      <div>풍향: {wind.deg}</div>
      <div>풍속: {wind.speed}</div>
    </div>
  );
};

export default SideWeather;
