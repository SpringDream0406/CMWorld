import "../styles/Setting.css";
import { Outlet } from "react-router-dom";
import LeftNavPage from "../components/LeftNavPage";
import { settingtags } from "../data/leftNavPageData";

const Setting = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <LeftNavPage tags={settingtags} url={"/setting/"} />
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Setting;
