import React from "react";
import JukboxLeft from "../components/jukbox/JukboxLeft";
import JukboxRight from "../components/jukbox/JukboxRight";

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
