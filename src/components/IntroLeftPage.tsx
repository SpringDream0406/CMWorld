import "../styles/Components.css";
import Profile from "./home/ProfileImg";
import Introduce from "../components/home/Introduce";
import OpenSite from "../components/OpenSite";
import { homeOpenSiteData } from "../data/openSiteData";

const IntroLeftPage = ({ introduceData }: { introduceData: JSX.Element }) => {
  return (
    <>
      <div className="wrapper__left__header">
        <Profile />
      </div>
      <div className="wrapper__left__body">
        <Introduce introduceData={introduceData} />
        <OpenSite openSiteData={homeOpenSiteData} />
      </div>
    </>
  );
};

export default IntroLeftPage;
