import React, { useEffect } from "react";
import "../../styles/Main.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideMusic from "./components/SideMusic";
import SideWeather from "./components/SideWeather";
import NavigationBar from "./components/NavigationBar";
import SideClock from "./components/SideClock";
import { useSelector } from "react-redux";
import { Utils } from "../../utils/utils";
import { RootState } from "../../redux/store";

const Main = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/images/backgrounds/clear.gif"
  );
  const nowWeather = useSelector((state: RootState) => state.music.nowWeather);

  useEffect(() => {
    Utils.changeBackground(setBackgroundImage, nowWeather);
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
            </div>
          </div>
        </div>
      </div>
      <NavigationBar />
      <div className="side">
        <div className="music" id="music">
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
