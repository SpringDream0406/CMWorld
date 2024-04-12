import "../styles/Components.css";
import Profile from "./home/ProfileImg";
import Introduce from "../components/home/Introduce";
import OpenSite from "../components/OpenSite";
import { homeOpenSiteData } from "../data/homeData";

const IntroLeftPage = ({ introduceData }: { introduceData: JSX.Element }) => {
  return (
    <>
      <div className="wrapper__left__header">
        <Profile />
      </div>
      <div className="wrapper__left__body">
        <Introduce introduceData={introduceData} />
      </div>
      <div className="wrapper__left__footer">
        <span className="emailAddress">springdream0406@gamil.com</span>
        <OpenSite openSiteData={homeOpenSiteData} />
      </div>
    </>
  );
};

export default IntroLeftPage;
