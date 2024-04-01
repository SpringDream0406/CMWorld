import React from "react";
import JukboxLeft from "./components/JukboxLeft";
import JukboxRight from "./components/JukboxRight";

const Jukbox = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <JukboxLeft />
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <JukboxRight />
        </div>
      </div>
    </>
  );
};

export default Jukbox;
