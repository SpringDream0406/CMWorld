import { NavLink } from "react-router-dom";
import { ITags } from "../interface/main";
import "../styles/Components.css";

const LeftNavPage = ({ tags }: { tags: ITags }) => {
  return (
    <div className="LeftNavPage">
      {Object.entries(tags).map(([key, value]) => (
        <NavLink
          to={`/setting/${key}`}
          className={({ isActive }) =>
            "LeftNavPage-NavBtn" + (isActive ? " active" : "")
          }
        >
          {value}
        </NavLink>
      ))}
    </div>
  );
};

export default LeftNavPage;
