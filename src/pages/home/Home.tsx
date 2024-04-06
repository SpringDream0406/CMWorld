import "../../styles/Home.css";
import Profile from "./components/Profile";
import Introduce from "./components/Introduce";
import OpenSite from "../../components/OpenSite";
import HomeRight from "./components/HomeRight";

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
            <OpenSite />
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
