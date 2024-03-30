import React from "react";
import Intoduce from "./components/Intoduce";
import Profile from "./components/Profile";
import SelectSite from "./components/SelectSite";
import "./Main.css";

function MainLeft() {
  return (
    <div className="main__left">
      <div className="wrapper__left__header">
        <Profile />
      </div>
      <div className="wrapper__left__body">
        <Intoduce />
        <SelectSite />
      </div>
    </div>
  );
}

export default MainLeft;
