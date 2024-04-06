import "../styles/Home.css";
import Profile from "../components/home//Profile";
import Introduce from "../components/home/Introduce";
import OpenSite from "../components/OpenSite";
import HomeRight from "../components/home/HomeRight";
import { homeOpenSiteData } from "../data/openSiteData";

const Home = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <div className="wrapper__left__header">
            <Profile />
          </div>
          <div className="wrapper__left__body">
            <Introduce />
            <OpenSite openSiteData={homeOpenSiteData} />
          </div>
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <HomeRight />
        </div>
      </div>
    </>
  );
};

export default Home;
