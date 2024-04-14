import { useEffect } from "react";
import "../../styles/SideWeather.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../../services/geolocation";
import { getWeather } from "../../services/openWeather";
import { Utils } from "../../utils/utils";
import { musicActions } from "../../redux/reducer";
import { IWeatherData } from "../../interface/main";
import { RootState } from "../../redux/store";
import { IPosition, IPositionError } from "../../interface/service";

const SideWeather = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nowWeather = useSelector((state: RootState) => state.music.nowWeather);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const geoLocation: IPosition | IPositionError = await getLocation(); // 위경도 요청
        if (geoLocation.code) {
          Utils.moveToPage(navigate, "geolocation", geoLocation.code); // 한국 아닌 경우
          return;
        }
        const weatherData = await getWeather(geoLocation as IPosition); // 날씨 조회
        if (weatherData) {
          dispatch(musicActions.setNowWeather(weatherData)); // 배경 변경을 위해 redux로 보냄
        }
      } catch (err: any) {
        if (err.code) {
          Utils.moveToPage(navigate, err.code); // geolocation 에러의 경우 메시지와 함께 geo로 가고, 날씨는 alert만 띄우게 해놓음
          return;
        }
      }
    };
    fetchDate();
  }, [dispatch, navigate]);

  // 날씨 데이터가 없을 경우
  if (Utils.isEmptyObject(nowWeather)) {
    return <div>로딩중</div>;
  }

  const { name, weather, main, wind } = nowWeather;
  const weatherData: IWeatherData = {
    날씨: weather[0].main,
    기온: `${main.temp} °C`,
    체감: `${main.feels_like} °C`,
    습도: `${main.humidity} %`,
    풍속: `${wind.speed} m/s`,
  };

  const renderWeather = (weatherData: IWeatherData) => {
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
