import React from "react";

const SideWeather = ({ weatherData }) => {
  if (!weatherData) {
    return <div>로딩중</div>;
  }

  // console.log(weatherData.data);
  const classData = weatherData.data;

  class Weather {
    constructor() {
      this.location = classData.name;
      this.weather = classData.weather[0].main;
      this.temp = classData.main.temp;
      this.feels_like = classData.main.feels_like;
      this.temp_max = classData.main.temp_max;
      this.temp_min = classData.main.temp_min;
      this.humidity = classData.main.humidity;
      this.pressure = classData.main.pressure;
      this.deg = classData.wind.deg;
      this.speed = classData.wind.speed;
    }
  }

  const weather = new Weather();

  return (
    <div>
      <div>위치: {weather.location}</div>
      <div>날씨: {weather.weather}</div>
      <div>현재기온: {weather.temp}</div>
      <div>체감기온: {weather.feels_like}</div>
      <div>최고기온: {weather.temp}</div>
      <div>최저기온: {weather.temp}</div>
      <div>습도: {weather.humidity}</div>
      <div>기압: {weather.pressure}</div>
      <div>풍향: {weather.deg}</div>
      <div>풍속: {weather.speed}</div>
    </div>
  );
};

export default SideWeather;
