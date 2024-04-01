import React from "react";
import "../../styles/Home.css";
import Profile from "./components/Profile";
import Introduce from "./components/Introduce";
import SelectSite from "./components/SelectSite";

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
            <SelectSite />
          </div>
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">MainRight</div>;
      </div>
    </>
  );
};

export default Home;
