import "../styles/Components.css";
import Profile from "./ProfileImg";
import Introduce from "./Introduce";
import OpenSite from "../components/OpenSite";
import { homeOpenSiteData } from "../data/opensiteData";

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
