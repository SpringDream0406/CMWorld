import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../../../services/geolocation";
import { getWeather } from "../../../services/openWeather";
import { Utils } from "../../../utils/utils";

const SideWeather = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nowWeather = useSelector((state) => state.nowWeather);
  const utils = new Utils();

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

  if (utils.isEmptyObject(nowWeather)) {
    return <div>로딩중</div>;
  }

  const { name, weather, main, wind } = nowWeather;
  const iconURL = ` https://openweathermap.org/img/wn/${weather[0].icon}.png`;

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
