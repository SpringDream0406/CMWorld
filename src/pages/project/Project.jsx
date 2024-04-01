import React from "react";
import { Link, Outlet } from "react-router-dom";

const Project = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <Link to="/project/teamproject">team</Link>
          <br />
          <Link to="/project/personalproject">person</Link>
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

export default Project;
