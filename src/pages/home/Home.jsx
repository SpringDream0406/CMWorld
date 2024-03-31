import { navigationTags } from "../../components/navigationTagName";
import { useNavigate, useParams } from "react-router-dom";
import { getLocation } from "../../components/geolocation";
import "./Home.css";
import NavigationBar from "../NavigationBar";
import NotFound from "../NotFound";
import { getWeather } from "../../components/openWeather";
import SideWeather from "../SideWeather";
import SideMusic from "../SideMusic";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [nowWeather, setNowWeather] = useState(null);
  const { navigationTagName } = useParams();
  const navigation = new navigationTags();
  const selectedPage = navigation.getNavigationTagName(navigationTagName);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const geoLocation = await getLocation();
        if (geoLocation.code) {
          navigate("/geolocation", {
            state: { code: geoLocation.code },
          });
        }
        const weatherData = await getWeather(geoLocation);
        setNowWeather(weatherData);
      } catch (error) {
        console.log(error);
        navigate("/geolocation", { state: { code: error.code } });
      }
    };
    fetchDate();
  }, []);

  if (!selectedPage) {
    return <NotFound />;
  }

  return (
    <div className="background">
      <div className="outerBlue">
        <div className="whiteSolid">
          <div className="outerbox">
            <div className="wrapper">
              <div className="wrapper__left">
                <selectedPage.left />
              </div>
              <div className="wrapper__right">
                <selectedPage.right />
              </div>
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
          <SideWeather weatherData={nowWeather} />
        </div>
      </div>
    </div>
  );
};

export default Home;
