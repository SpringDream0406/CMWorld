import "../styles/Setting.css";
import { Link, Outlet } from "react-router-dom";

const Setting = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <Link to="#">뮤직 플레이어</Link>
          SettingLeft
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <Outlet />
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Setting;
