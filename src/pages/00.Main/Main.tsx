import { useEffect } from "react";
import "../../styles/Main.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import SideWeather from "./MainConponents/SideWeather";
import NavigationBar from "./MainConponents/NavigationBar";
import SideClock from "./MainConponents/SideClock";
import { useSelector } from "react-redux";
import { Utils } from "../../utils/utils";
import { RootState } from "../../redux/store";

const Main = () => {
  const nowWeather = useSelector((state: RootState) => state.music.nowWeather); // 현재 날씨 가져오기
  const [backgroundImage, setBackgroundImage] = useState<string>( // 배경 이미지
    "/images/backgrounds/Clear.gif"
  );

  // 날씨 가져오면 배경화면 변경
  useEffect(() => {
    Utils.changeBackground(setBackgroundImage, nowWeather);
  }, [nowWeather]);

  // console.log("load count");

  // 본문
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
          <MusicPlayer />
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
