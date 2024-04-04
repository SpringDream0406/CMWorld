import React, { useEffect } from "react";
import "../../../styles/SideWeather.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../../../services/geolocation";
import { getWeather } from "../../../services/openWeather";
import { Utils } from "../../../utils/utils";
import { musicActions } from "../../../redux/reducer";

const SideWeather = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nowWeather = useSelector((state) => state.music.nowWeather);

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
        dispatch(musicActions.setNowWeather(weatherData.data));
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

  if (Utils.isEmptyObject(nowWeather)) {
    return <div>로딩중</div>;
  }

  const { name, weather, main, wind } = nowWeather;
  const weatherData = {
    날씨: weather[0].main,
    기온: `${main.temp} °C`,
    체감: `${main.feels_like} °C`,
    습도: `${main.humidity} %`,
    풍속: `${wind.speed} m/s`,
  };
  const renderWeather = (weatherData) => {
    return Object.entries(weatherData).map(([key, value]) => (
      <div className="sideWeather-info" key={key}>
        <div>{key}</div>
        <div>:</div>
        <div>{value}</div>
      </div>
    ));
  };

  return (
    <div className="sideWeather-box">
      <div className="sideWeather-location">{name}</div>
      <div className="sideWeather-InfoBox">{renderWeather(weatherData)}</div>
    </div>
  );
};

export default SideWeather;
