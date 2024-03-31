import React, { useRef } from "react";

const SideWeather = ({ weatherData }) => {
  const divRef = useRef(null);

  if (!weatherData) {
    return <div>로딩중</div>;
  }

  // console.log(weatherData.data);
  const { name, weather, main, wind } = weatherData.data;
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
