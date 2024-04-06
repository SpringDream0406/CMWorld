import { Link, Outlet } from "react-router-dom";

const Project = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <Link to="/project">team</Link>
          <br />
          <Link to="/project/personal">person</Link>
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
