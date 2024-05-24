import { useEffect, useMemo } from "react";
import "../../styles/Main.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideMusic from "./MainConponents/SideMusic";
import SideWeather from "./MainConponents/SideWeather";
import NavigationBar from "./MainConponents/NavigationBar";
import SideClock from "./MainConponents/SideClock";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../../utils/utils";
import { RootState } from "../../redux/store";
import { GuestbookController } from "../../utils/controller/guestbook.controller";

const Main = () => {
  const dispatch = useDispatch();
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/images/backgrounds/clear.gif"
  );
  const nowWeather = useSelector((state: RootState) => state.music.nowWeather);
  const guestbookController = useMemo(
    () => new GuestbookController(dispatch),
    [dispatch]
  );

  // 날씨 가져와서 배경 변경
  useEffect(() => {
    Utils.changeBackground(setBackgroundImage, nowWeather);
  }, [nowWeather]);

  // firebase 인증 시작
  useEffect(() => {
    guestbookController.firebaseOnAuthStateChanged();
  }, [guestbookController]);

  // console.log("load count");

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
