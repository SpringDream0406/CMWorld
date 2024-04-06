import { NavLink } from "react-router-dom";
import { Tags } from "../../interface/main";

const tags: Tags = {
  "": "홈",
  profile: "프로필",
  project: "프로젝트",
  jukbox: "쥬크박스",
  playground: "놀이터",
  photo: "사진첩",
  guestbook: "방명록",
  setting: "설정",
};

const NavigationBar = () => {
  const navigationBars = Object.entries(tags).map(([key, value]) => (
    <NavLink
      key={key}
      to={`/${key}`}
      className={({ isActive }) =>
        "navigation__item" + (isActive ? " active" : "")
      }
    >
      {value}
    </NavLink>
  ));

  return <div className="navigation">{navigationBars}</div>;
};

export default NavigationBar;
