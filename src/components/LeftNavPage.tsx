import { NavLink } from "react-router-dom";
import { ITags } from "../interface/main";
import "../styles/Components.css";

const LeftNavPage = ({ tags, url }: { tags: ITags; url: string }) => {
  return (
    <div className="LeftNavPage">
      {Object.entries(tags).map(([key, value]) => (
        <NavLink
          key={key}
          to={`${url}${key}`}
          className={({ isActive }) =>
            "LeftNavPage-Nav" + (isActive ? " active" : "")
          }
        >
          {value}
        </NavLink>
      ))}
    </div>
  );
};

export default LeftNavPage;
