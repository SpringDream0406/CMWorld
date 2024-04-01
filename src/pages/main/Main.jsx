import React, { useEffect } from "react";
import "../../styles/Main.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideMusic from "./components/SideMusic";
import SideWeather from "./components/SideWeather";
import NavigationBar from "./components/NavigationBar";
import SideClock from "./components/SideClock";
import { useSelector } from "react-redux";

const Main = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "/images/backgrounds/background.jpg"
  );
  const nowWeather = useSelector((state) => state.nowWeather);
  useEffect(() => {
    if (nowWeather) {
      const weather = nowWeather.weather[0].main;
      const imageURL = `/images/backgrounds/${weather}.gif`;
      setBackgroundImage(imageURL);
    }
  }, [nowWeather]);

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="outerBlue">
        <div className="whiteSolid">
          <div className="outerbox">
            <div className="wrapper">
              <Outlet />
              <NavigationBar />
            </div>
          </div>
        </div>
      </div>
      <div className="side">
        <div className="music">
          <SideMusic />
        </div>
        <div className="weather">
          <SideWeather />
        </div>
        <div className="time">
          <SideClock />
        </div>
      </div>
    </div>
  );
};

export default Main;
